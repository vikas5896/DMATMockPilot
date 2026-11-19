import { BRAND } from "./brand";

/** Indian 10-digit numbers get the 91 country code for wa.me links. */
export const waNumber = (phone: string) => {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
};

export const waLink = (phone: string, text: string) => `https://wa.me/${waNumber(phone)}?text=${encodeURIComponent(text)}`;

const first = (name: string | null) => (name ?? "").trim().split(/\s+/)[0] || "there";
const price = (p: number | null) => (p != null ? `₹${p.toLocaleString("en-IN")}` : "");

/** Ready-written WhatsApp messages for the admin panel. They open in WhatsApp, where you can edit them before sending. */
export const WA = {
  welcome: (name: string | null) =>
    `Hi ${first(name)}, welcome to ${BRAND.name}! 👋 Thanks for signing up. Have you tried your free full dMAT mock yet? If you have any questions about the dMAT or your preparation, just reply here.`,
  request: (name: string | null, pack: string, p: number | null, code?: string | null) =>
    `Hi ${first(name)}, thank you for requesting the ${BRAND.name} ${pack}${p != null ? ` (${price(p)}${code ? ` with code ${code}` : ""})` : ""}. 🙏 You can pay by UPI or bank transfer; I will share the details here. Once the payment is done, please send a screenshot and I will unlock your tests right away.`,
  unlocked: (name: string | null, pack: string) =>
    `Hi ${first(name)}, your ${pack} is now active! ✅ Log in at ${BRAND.name} and open "My tests" to start. All the best for your preparation!`,
  result: (name: string | null, test: string, score: string) =>
    `Hi ${first(name)}, I saw you completed ${test} (${score}). Would you like a quick call to go through your result and plan your preparation?`,
};
