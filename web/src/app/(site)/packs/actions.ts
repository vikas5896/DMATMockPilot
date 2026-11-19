"use server";

import { currentStudent } from "@/lib/auth";
import { createRequest, getPack } from "@/lib/access";
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
