"use server";

import { currentStudent } from "@/lib/auth";
import { activeGrants, createRequest, getPack } from "@/lib/access";
import {
  createRazorpayOrder,
  fulfillPayment,
  getPayment,
  markFailed,
  paymentsEnabled,
  razorpayKeyId,
  razorpayKeySecret,
  recordOrder,
} from "@/lib/payments";
import { verifyPaymentSignature } from "@/lib/razorpay-signature";
import { normalizeCode } from "@/lib/pricing";
import { checkPromo, type PromoCheck } from "@/lib/promo";
import { BRAND } from "@/lib/brand";
import { notifyAdmins, sendEmail, signature } from "@/lib/email";

export type RequestResult = { ok: boolean; error?: string; already?: boolean };

const waNumber = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
};

/** Check a promo code for a pack (no login needed, so visitors can see the discounted price). */
export async function checkPromoAction(code: string, packSlug: string): Promise<PromoCheck> {
  if (!normalizeCode(code)) return { ok: false, error: "Please enter a promo code." };
  return checkPromo(code, packSlug);
}

export async function requestAccessAction(
  packSlug: string,
  message: string,
  from: string,
  promoCode?: string,
): Promise<RequestResult> {
  const me = await currentStudent();
  if (!me || !me.name || !me.phone) return { ok: false, error: "Please log in first." };
  const pack = await getPack(packSlug);
  if (!pack || !pack.published) return { ok: false, error: "This pack is not available." };
  const note = message.trim().slice(0, 1000) || null;

  let code: string | null = null;
  let quoted = pack.priceInr;
  if (promoCode && normalizeCode(promoCode)) {
    const check = await checkPromo(promoCode, pack.slug);
    if (!check.ok) return { ok: false, error: check.error };
    code = check.code;
    quoted = check.finalPriceInr;
  }

  const created = await createRequest(me.id, pack.slug, note, code, quoted);
  if (!created) return { ok: true, already: true };

  const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const price =
    quoted == null ? "price on request" : code && pack.priceInr != null ? `${rupees(quoted)} with code ${code}, instead of ${rupees(pack.priceInr)}` : rupees(quoted);
  await Promise.all([
    notifyAdmins(`Access request: ${pack.name} – ${me.name}`, [
      `${me.name} wants the ${pack.name} (${price}).`,
      `Email: ${me.email}`,
      `Phone: ${me.phone}`,
      `WhatsApp: https://wa.me/${waNumber(me.phone)}`,
      `Asked from: ${from}`,
      code ? `Promo code: ${code}` : "",
      note ? `Message: ${note}` : "",
    ]),
    sendEmail({
      to: me.email,
      subject: `We received your request for the ${pack.name}`,
      text: [
        `Hi ${me.name.split(" ")[0]},`,
        "",
        `Thank you for your interest in the ${BRAND.name} ${pack.name} (${price}).`,
        "We will contact you on WhatsApp or by phone shortly with the payment details. As soon as your payment is confirmed, the tests unlock in your account under My tests.",
        "",
        "Questions? Just reply to this email or message us on WhatsApp.",
        signature(),
      ].join("\n"),
      replyTo: BRAND.contact.email || undefined,
    }),
  ]);
  return { ok: true };
}

// ---------- online payment (Razorpay) ----------
export type OrderResult =
  | {
      ok: true;
      keyId: string;
      orderId: string;
      amountPaise: number;
      packName: string;
      prefill: { name: string; email: string; contact: string };
    }
  | { ok: false; error: string };

/** Start a payment: the price (with any promo code) is worked out here, never taken from the browser. */
export async function createOrderAction(packSlug: string, promoCode?: string): Promise<OrderResult> {
  if (!paymentsEnabled()) return { ok: false, error: "Online payment is not available yet. Please use Request access." };
  const me = await currentStudent();
  if (!me || !me.name || !me.phone) return { ok: false, error: "Please log in first." };
  const pack = await getPack(packSlug);
  if (!pack || !pack.published || pack.priceInr == null) return { ok: false, error: "This pack cannot be bought online." };
  if ((await activeGrants(me.id)).some((g) => g.packSlug === pack.slug)) return { ok: false, error: "You already have this pack." };

  let code: string | null = null;
  let amount = pack.priceInr;
  if (promoCode && normalizeCode(promoCode)) {
    const check = await checkPromo(promoCode, pack.slug);
    if (!check.ok) return { ok: false, error: check.error };
    code = check.code;
    amount = check.finalPriceInr;
  }
  if (amount < 1) return { ok: false, error: "With this code the pack is free: please use Request access and we unlock it for you." };

  try {
    const orderId = await createRazorpayOrder(amount, `s${me.id}-${pack.slug}-${Date.now()}`, {
      student: String(me.id),
      pack: pack.slug,
      promo: code ?? "",
    });
    await recordOrder({ orderId, studentId: me.id, packSlug: pack.slug, promoCode: code, amountInr: amount });
    return {
      ok: true,
      keyId: razorpayKeyId(),
      orderId,
      amountPaise: amount * 100,
      packName: pack.name,
      prefill: { name: me.name, email: me.email, contact: me.phone },
    };
  } catch {
    return { ok: false, error: "Could not start the payment. Please try again, or use Request access." };
  }
}

/** Called by the checkout window after a successful payment. The webhook does the same as a backup. */
export async function confirmPaymentAction(orderId: string, paymentId: string, sig: string): Promise<{ ok: boolean; error?: string }> {
  const me = await currentStudent();
  const order = await getPayment(orderId);
  if (!me || !order || order.studentId !== me.id) return { ok: false, error: "Payment not found." };
  if (!verifyPaymentSignature(orderId, paymentId, sig, razorpayKeySecret())) {
    return { ok: false, error: "We could not verify the payment. If money was deducted, message us on WhatsApp with your payment ID." };
  }
  const r = await fulfillPayment(orderId, paymentId);
  return r === "granted" || r === "already" ? { ok: true } : { ok: false, error: "Please message us on WhatsApp with your payment ID." };
}

/** The checkout reported a failed attempt (the student can try again with the same order). */
export async function paymentFailedAction(orderId: string, reason: string) {
  const me = await currentStudent();
  const order = await getPayment(orderId);
  if (me && order && order.studentId === me.id) await markFailed(orderId, reason || "failed");
}
