"use server";

import { currentStudent } from "@/lib/auth";
import { createRequest, getPack } from "@/lib/access";
import { BRAND } from "@/lib/brand";
import { notifyAdmins, sendEmail, signature } from "@/lib/email";

export type RequestResult = { ok: boolean; error?: string; already?: boolean };

const waNumber = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
};

export async function requestAccessAction(packSlug: string, message: string, from: string): Promise<RequestResult> {
  const me = await currentStudent();
  if (!me || !me.name || !me.phone) return { ok: false, error: "Please log in first." };
  const pack = await getPack(packSlug);
  if (!pack || !pack.published) return { ok: false, error: "This pack is not available." };
  const note = message.trim().slice(0, 1000) || null;

  const created = await createRequest(me.id, pack.slug, note);
  if (!created) return { ok: true, already: true };

  const price = pack.priceInr != null ? `₹${pack.priceInr.toLocaleString("en-IN")}` : "price on request";
  await Promise.all([
    notifyAdmins(`Access request: ${pack.name} – ${me.name}`, [
      `${me.name} wants the ${pack.name} (${price}).`,
      `Email: ${me.email}`,
      `Phone: ${me.phone}`,
      `WhatsApp: https://wa.me/${waNumber(me.phone)}`,
      `Asked from: ${from}`,
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
