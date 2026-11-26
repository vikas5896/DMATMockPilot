/** Study-in-Germany services. "available" ones can be booked now; the rest show "Coming soon" with a waitlist. */
export type Service = {
  title: string;
  text: string;
  status: "available" | "soon";
  href?: string;
};

export const SERVICES: Service[] = [
  {
    title: "dMAT preparation",
    text: "Mock tests and live classes for the digital Master Test that APS India requires from selected Master's applicants.",
    status: "available",
    href: "/live-classes",
  },
  {
    title: "Profile evaluation",
    text: "An honest look at your degree, grades, experience and goals, and which German Master's programmes fit them.",
    status: "available",
    href: "/plans#complete",
  },
  {
    title: "University shortlisting",
    text: "A shortlist of public and private universities matched to your profile, budget and intake, with deadlines.",
    status: "available",
    href: "/plans#complete",
  },
  {
    title: "APS certificate guidance",
    text: "Step-by-step help with the APS India verification: documents, application and interview preparation.",
    status: "available",
    href: "/plans#complete",
  },
  {
    title: "Application support",
    text: "Help with uni-assist and direct applications, SOP / motivation letter, CV in German format and recommendation letters.",
    status: "available",
    href: "/plans#complete",
  },
  {
    title: "Blocked account and insurance",
    text: "Guidance on opening a blocked account (Sperrkonto) and choosing student health insurance.",
    status: "available",
    href: "/plans#complete",
  },
  {
    title: "Student visa guidance",
    text: "Document checklist, appointment preparation and mock visa interview.",
    status: "available",
    href: "/plans#complete",
  },
  {
    title: "Pre-departure support",
    text: "Accommodation search, city registration (Anmeldung), opening a bank account and settling in.",
    status: "soon",
  },
];

/** The typical path for an Indian student applying for a Master's in Germany. */
export const JOURNEY = [
  { step: "Profile and shortlist", text: "Check eligibility and choose programmes and intakes (winter or summer semester)." },
  { step: "Tests", text: "Language tests (IELTS/TOEFL or German) and, if required for you, the dMAT." },
  { step: "APS certificate", text: "Get your academic documents verified by APS India; needed for the visa and many applications." },
  { step: "Applications", text: "Apply via uni-assist or directly to universities with SOP, CV and recommendations." },
  { step: "Admission and finances", text: "Accept your offer, open a blocked account and arrange health insurance." },
  { step: "Visa", text: "Book your appointment, submit documents and prepare for the visa interview." },
  { step: "Arrival", text: "Travel, find accommodation, register your address and enrol at your university." },
];
