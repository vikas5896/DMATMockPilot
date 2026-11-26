/** The three ways to work with us (shown on /plans). Edit prices and inclusions here. */
export type Plan = {
  id: "mocks" | "classes" | "complete";
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  highlight?: string;
  bullets: string[];
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export const COMPLETE_PLAN_PRICE_INR = 14999;

export const PLANS: Plan[] = [
  {
    id: "mocks",
    name: "Mock Tests",
    tagline: "Practise on your own, in the real exam format.",
    price: "Free",
    priceNote: "to start · packs from ₹499",
    bullets: [
      "Free full dMAT mock plus one free test per section",
      "Section Pack ₹499: 27 timed tests for the three Core sections",
      "Full Pack ₹1,599: full mocks 2–10 and every section test, including the Subject Module",
      "Real exam timer, no pen and paper, step-by-step solutions",
    ],
    cta: { label: "Start the free mock", href: "/mock-tests" },
    secondary: { label: "See packs", href: "/packs" },
  },
  {
    id: "classes",
    name: "Live Classes",
    tagline: "Learn the dMAT live, with a teacher who sat it.",
    price: "Per course",
    priceNote: "fee shown with each batch",
    highlight: "Full Pack (₹1,599) included free",
    bullets: [
      "Live online dMAT courses with recordings",
      "Rules, shortcuts and timed drills for every section",
      "Full Pack of mock tests unlocked at no extra cost",
      "Doubt-solving and feedback from people who sat the real exam",
    ],
    cta: { label: "See upcoming courses", href: "/live-classes" },
  },
  {
    id: "complete",
    name: "Complete Germany Plan",
    tagline: "Everything from the dMAT to your visa, with one team.",
    price: `₹${COMPLETE_PLAN_PRICE_INR.toLocaleString("en-IN")}`,
    priceNote: "one-time · limited seats per intake",
    highlight: "Most complete",
    bullets: [
      "Everything in Live Classes, plus the Full Pack",
      "Profile evaluation and profile building",
      "University shortlisting matched to your profile and budget",
      "Documents: SOP / motivation letter, CV, recommendation letters",
      "APS guidance",
      "Blocked account and health insurance guidance",
      "Student visa guidance and mock interview",
    ],
    cta: { label: "Book a free profile check", href: "#profile-check" },
  },
];

/** Feature comparison rows: [feature, mocks, classes, complete]. */
export const COMPARE: [string, string, string, string][] = [
  ["Free full dMAT mock", "Included", "Included", "Included"],
  ["Mock test packs", "From ₹499", "Full Pack included", "Full Pack included"],
  ["Live dMAT classes", "–", "Included", "Included"],
  ["Profile evaluation and building", "–", "–", "Included"],
  ["University shortlisting", "–", "–", "Included"],
  ["SOP, CV and recommendation letters", "–", "–", "Included"],
  ["APS guidance", "–", "–", "Included"],
  ["Blocked account and insurance guidance", "–", "–", "Included"],
  ["Visa guidance and mock interview", "–", "–", "Included"],
];
