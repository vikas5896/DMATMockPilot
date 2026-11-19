import "server-only";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";

/**
 * Send a plain-text email through Resend.
 * Locally (no RESEND_API_KEY) the email is printed in the dev server console instead.
 */
export async function sendEmail(msg: { to: string | string[]; subject: string; text: string; replyTo?: string }): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`\n[email] to ${[msg.to].flat().join(", ")}: ${msg.subject}\n${msg.text}\n`);
      return true;
    }
    console.error("RESEND_API_KEY / EMAIL_FROM not set: cannot send email");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [msg.to].flat(),
        subject: msg.subject,
        text: msg.text,
        ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
      }),
    });
    if (!res.ok) console.error("Resend error", res.status, await res.text());
    return res.ok;
  } catch (e) {
    console.error("email failed", e);
    return false;
  }
}

/** Alert the admins (ADMIN_EMAILS). Never blocks the student's action if it fails. */
export async function notifyAdmins(subject: string, lines: string[]) {
  const to = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  if (!to.length) return;
  await sendEmail({
    to,
    subject: `[${BRAND.name}] ${subject}`,
    text: [...lines, "", `Admin panel: ${SITE_URL}/admin`].join("\n"),
  });
}

/** Signature for student emails. */
export function signature() {
  const c = BRAND.contact;
  return [
    "",
    `Team ${BRAND.name}`,
    SITE_URL.replace(/^https?:\/\//, ""),
    c.whatsapp ? `WhatsApp: ${c.whatsapp}` : "",
    c.email ? `Email: ${c.email}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
