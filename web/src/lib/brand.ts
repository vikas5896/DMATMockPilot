/**
 * Brand shown across the site and in emails. Colours live in globals.css (--brand*).
 * The name contains the exam's name (owner's decision, domain dmatmockprep.com), so keep the
 * "independent, not affiliated with g.a.s.t." notices in the footer, About page and exam screens,
 * and never use g.a.s.t.'s logo or official material.
 */
export const BRAND = {
  name: "DMAT Mock Prep",
  tagline: "dMAT preparation and study in Germany",
  /** Public contact details shown on the site. Empty values are hidden. */
  contact: {
    email: "info@dmatmockprep.com",
    phone: "+91 86248 59052",
    whatsapp: "",
    city: "",
  },
};

/** "+91 86248 59052" → "+918624859052" for tel: links */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
