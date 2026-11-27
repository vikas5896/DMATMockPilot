"use server";

import { currentStudent, isValidEmail, PHONE_RE, studentForBooking } from "@/lib/auth";
import type { Student } from "@/db/schema";
import { activeGrants, createRequest, getPack, planApproval } from "@/lib/access";
import {
  createRazorpayOrder,
  fulfillPayment,
  getPayment,
  isEnrolled,
  markFailed,
  paymentsEnabled,
  razorpayKeyId,
  razorpayKeySecret,
  recordOrder,
} from "@/lib/payments";
import { verifyPaymentSignature } from "@/lib/razorpay-signature";
import { normalizeCode, parseItem, PLAN_PACK } from "@/lib/pricing";
import { getItemInfo, resolvePromo, type ResolvedPromo } from "@/lib/promo";
import { BRAND } from "@/lib/brand";
import { notifyAdmins, sendEmail, signature } from "@/lib/email";

export type RequestResult = { ok: boolean; error?: string; already?: boolean };

const waNumber = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
};

/**
 * Check a promo code for a pack (no login needed, so visitors can see the price).
 * Returns the offer that applies: the entered code, or the automatic offer if that is better.
 */
export async function checkPromoAction(code: string, itemKey: string): Promise<ResolvedPromo> {
  if (!normalizeCode(code)) return { ok: false, error: "Please enter a promo code.", offer: null };
  return resolvePromo(code, parseItem(itemKey));
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

  // the automatic offer, or the student's code if it is better (codes never stack)
  const promo = await resolvePromo(promoCode, { kind: "pack", slug: pack.slug });
  if (!promo.ok) return { ok: false, error: promo.error };
  const code = promo.offer?.code ?? null;
  const quoted = promo.offer ? promo.offer.finalPriceInr : pack.priceInr;

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

/**
 * Start a payment for a pack ("pack:<slug>" or a bare pack slug) or a live class ("class:<slug>").
 * The price (with any promo code) is worked out here, never taken from the browser.
 */
export async function createOrderAction(itemKey: string, promoCode?: string): Promise<OrderResult> {
  if (!paymentsEnabled()) return { ok: false, error: "Online payment is not available yet. Please contact us." };
  const me = await currentStudent();
  if (!me || !me.name || !me.phone) return { ok: false, error: "Please log in first." };
  return startOrder(me, itemKey, promoCode);
}

/**
 * One-step booking for a paid live class, without logging in first: name, email and phone, then pay.
 * The seat is booked on the account for that email (created if new); the student sees it after logging in
 * with the same email. Packs still need a login first.
 */
export async function createGuestClassOrderAction(
  classSlug: string,
  details: { name: string; email: string; phone: string; consent: boolean },
  promoCode?: string,
): Promise<OrderResult> {
  if (!paymentsEnabled()) return { ok: false, error: "Online payment is not available yet. Please contact us." };
  const name = details.name.trim().replace(/\s+/g, " ");
  const email = details.email.trim().toLowerCase();
  const phone = details.phone.trim();
  if (name.length < 2 || name.length > 100) return { ok: false, error: "Please enter your full name." };
  if (!isValidEmail(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!PHONE_RE.test(phone)) return { ok: false, error: "Please enter a valid Indian mobile number, e.g. 98765 43210." };
  if (!details.consent) return { ok: false, error: "Please agree to be contacted about your booking." };
  const student = await studentForBooking(email, name, phone);
  if (await isEnrolled(student.id, classSlug)) {
    return { ok: false, error: "This email is already booked for this class. Check your inbox for the confirmation." };
  }
  // prefill with what the visitor typed (never reveal stored details of an existing account)
  const r = await startOrder(student, `class:${classSlug}`, promoCode);
  return r.ok ? { ...r, prefill: { name, email, contact: phone } } : r;
}

async function startOrder(me: Student, itemKey: string, promoCode?: string): Promise<OrderResult> {
  const item = parseItem(itemKey);
  const info = await getItemInfo(item);
  if (!info || !info.available || info.priceInr == null) {
    return { ok: false, error: `This ${item.kind === "pack" ? "pack" : "class"} cannot be bought online.` };
  }
  if (item.kind === "pack" && (await activeGrants(me.id)).some((g) => g.packSlug === item.slug)) {
    return { ok: false, error: item.slug === PLAN_PACK ? "You are already enrolled in the Complete Germany Plan." : "You already have this pack." };
  }
  // the Complete Germany Plan: only after a free profile evaluation and our approval
  if (item.kind === "pack" && item.slug === PLAN_PACK && !(await planApproval(me.id))) {
    return { ok: false, error: "The Complete Germany Plan opens after your free profile evaluation. Book one on our Plans page." };
  }
  if (item.kind === "class" && (await isEnrolled(me.id, item.slug))) {
    return { ok: false, error: "You are already enrolled in this class." };
  }

  const promo = await resolvePromo(promoCode, item);
  if (!promo.ok) return { ok: false, error: promo.error };
  const code = promo.offer?.code ?? null;
  const amount = promo.offer ? promo.offer.finalPriceInr : info.priceInr;
  if (amount < 1) return { ok: false, error: "With this code it is free: please contact us and we add you directly." };

  try {
    const orderId = await createRazorpayOrder(amount, `s${me.id}-${item.slug}-${Date.now()}`, {
      student: String(me.id),
      [item.kind]: item.slug,
      promo: code ?? "",
    });
    await recordOrder({
      orderId,
      studentId: me.id,
      packSlug: item.kind === "pack" ? item.slug : null,
      classSlug: item.kind === "class" ? item.slug : null,
      promoCode: code,
      amountInr: amount,
    });
    return {
      ok: true,
      keyId: razorpayKeyId(),
      orderId,
      amountPaise: amount * 100,
      packName: info.name,
      prefill: { name: me.name ?? "", email: me.email, contact: me.phone ?? "" },
    };
  } catch {
    return {
      ok: false,
      error: `Could not start the payment. Please try again, or ${item.kind === "pack" ? "use Request access" : "message us on WhatsApp"}.`,
    };
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

/**
 * Guest booking: confirm without a session. The Razorpay signature proves this payment belongs to this order;
 * only class orders can be confirmed this way.
 */
export async function confirmGuestPaymentAction(orderId: string, paymentId: string, sig: string): Promise<{ ok: boolean; error?: string }> {
  const order = await getPayment(orderId);
  if (!order || !order.classSlug) return { ok: false, error: "Payment not found." };
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
  // guest class bookings have no session; markFailed only touches orders that are still unpaid
  if (order && ((me && order.studentId === me.id) || order.classSlug)) await markFailed(orderId, reason || "failed");
}
