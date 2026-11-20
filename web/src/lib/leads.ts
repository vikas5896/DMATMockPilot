/** Enquiries from the website forms (live classes, consultancy, contact). */
export const INTERESTS = {
  "live-classes": "Live classes",
  "mock-tests": "Mock tests",
  consultancy: "Study in Germany (consultancy)",
  other: "Something else",
} as const;
export type Interest = keyof typeof INTERESTS;

export type LeadInput = {
  name: string;
  email: string;
  phone: string;
  interest: Interest;
  batch?: string;
  message?: string;
  consent: boolean;
  /** honeypot: real people leave it empty */
  website?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s-]{6,18}$/;

/** Returns an error message, or null when the input is valid. Shared by the form and the API. */
export function validateLead(x: Partial<LeadInput>): string | null {
  if (!x.name || x.name.trim().length < 2) return "Please enter your name.";
  if (x.name.length > 100) return "Name is too long.";
  if (!x.email || !EMAIL.test(x.email.trim())) return "Please enter a valid email address.";
  // required: this is how we contact students (call or WhatsApp)
  const digits = (x.phone ?? "").replace(/\D/g, "").length;
  if (!x.phone || !x.phone.trim()) return "Please enter your phone / WhatsApp number.";
  if (!PHONE.test(x.phone.trim()) || digits < 10 || digits > 15) return "Please enter a valid phone number, e.g. 98765 43210.";
  if (!x.interest || !(x.interest in INTERESTS)) return "Please choose what you are interested in.";
  if (x.message && x.message.length > 2000) return "Message is too long (max. 2,000 characters).";
  if (!x.consent) return "Please agree to be contacted.";
  return null;
}
