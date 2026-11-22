/**
 * Live class batches. EDIT BEFORE GOING PUBLIC: dates, times, fees and instructors below are a
 * starting schedule built around the reported 2027 dMAT sittings (16 Jan and 13 Mar 2027 — confirm on d-mat.de).
 * Leave `fee` empty to show "Fee announced soon"; leave `instructor` empty to show "To be announced".
 */
export type Batch = {
  slug: string;
  title: string;
  kind: "course" | "masterclass" | "webinar";
  summary: string;
  forSitting?: string;
  /** ISO dates (YYYY-MM-DD) */
  start: string;
  end: string;
  days: string;
  time: string; // in IST
  sessions: number;
  sessionLength: string;
  fee?: string;
  /** price for online payment in ₹; empty = no online payment (free class or enquiry only) */
  priceInr?: number;
  instructor?: string;
  status: "open" | "soon" | "full";
  includes: string[];
  syllabus: { title: string; points: string[] }[];
};

export const BATCHES: Batch[] = [
  {
    slug: "dmat-explained-webinar",
    title: "dMAT Explained: Format, Rules and Strategy",
    kind: "webinar",
    summary:
      "A 90-minute live session: who needs the dMAT, how each section works, how the timing rules affect your strategy, and how to plan your preparation.",
    start: "2026-11-29",
    end: "2026-11-29",
    days: "Sunday",
    time: "6:00–7:30 pm IST",
    sessions: 1,
    sessionLength: "90 min",
    fee: "₹49",
    priceInr: 49,
    status: "open",
    includes: ["Live Q&A", "Recording for registered participants", "Free full mock test afterwards"],
    syllabus: [
      {
        title: "Session outline",
        points: [
          "Who needs the dMAT for APS India, and when",
          "Core Module: Figure Sequences, Mathematical Equations, Latin Squares",
          "Subject Module: how academic texts and questions are built",
          "Timing rules, guessing strategy and a 6-week study plan",
        ],
      },
    ],
  },
  {
    slug: "core-crash-course-jan",
    title: "Core Module Crash Course",
    kind: "course",
    summary:
      "Six intensive weeks on the three Core subtests: rules, shortcuts and timed drills, with a full mock every week and a live review.",
    forSitting: "January 2027 sitting",
    start: "2026-12-01",
    end: "2027-01-09",
    days: "Mon, Wed, Fri",
    time: "7:00–8:30 pm IST",
    sessions: 18,
    sessionLength: "90 min",
    status: "open",
    includes: [
      "18 live sessions with recordings",
      "Weekly full Core mock with live review",
      "Doubt-clearing group",
      "Unlimited practice on the mock platform",
    ],
    syllabus: [
      {
        title: "Weeks 1–2: Figure Sequences",
        points: [
          "Movement rules: straight, diagonal, border paths, bouncing",
          "Growing steps (x + 1), rotation and colour cycles",
          "Spotting several figures with different rules at once",
        ],
      },
      {
        title: "Weeks 3–4: Mathematical Equations",
        points: [
          "Substitution chains and solving in your head",
          "Range reasoning: using the 1–20 limit (e.g. A + B = 2)",
          "Speed techniques and checking answers",
        ],
      },
      {
        title: "Weeks 5–6: Latin Squares and exam strategy",
        points: [
          "Direct and multi-step deductions",
          "Time management across 20 tasks in 25 minutes",
          "Two full Core mocks under exam conditions",
        ],
      },
    ],
  },
  {
    slug: "full-prep-mar",
    title: "Complete dMAT Preparation",
    kind: "course",
    summary:
      "Eight weeks covering the whole exam: all Core subtests plus the General Academic Module, with full 3.5-hour mocks and individual feedback.",
    forSitting: "March 2027 sitting",
    start: "2027-01-12",
    end: "2027-03-06",
    days: "Tue, Thu, Sat",
    time: "7:00–8:30 pm IST",
    sessions: 24,
    sessionLength: "90 min",
    status: "open",
    includes: [
      "24 live sessions with recordings",
      "4 full dMAT mocks with live review",
      "Reading strategy for academic texts",
      "One-to-one progress call",
    ],
    syllabus: [
      {
        title: "Weeks 1–4: Core Module",
        points: [
          "Figure Sequences, Mathematical Equations and Latin Squares in depth",
          "Timed drills and weekly Core mock",
        ],
      },
      {
        title: "Weeks 5–7: Subject Module",
        points: [
          "Reading dense academic texts quickly",
          "Tables, charts and formulas: extracting what the question needs",
          "Mental maths for science, engineering and economics texts",
        ],
      },
      {
        title: "Week 8: Exam rehearsal",
        points: ["Two full 3.5-hour mocks under exam conditions", "Final strategy and test-day checklist"],
      },
    ],
  },
  {
    slug: "subject-masterclass",
    title: "Subject Module Masterclass",
    kind: "masterclass",
    summary:
      "Four weekends focused only on the General Academic Module: how to read, reason and calculate across unfamiliar academic topics.",
    forSitting: "March 2027 sitting",
    start: "2027-02-06",
    end: "2027-02-28",
    days: "Sat, Sun",
    time: "11:00 am–1:00 pm IST",
    sessions: 8,
    sessionLength: "2 hours",
    status: "soon",
    includes: ["8 live sessions with recordings", "Practice texts from 8 academic fields", "Full Subject mock with review"],
    syllabus: [
      {
        title: "Topics",
        points: [
          "Economics and statistics texts",
          "Physics, engineering and chemistry texts",
          "Biology and life-science texts",
          "Social science and research-methods texts",
        ],
      },
    ],
  },
];

export const batchBySlug = (slug: string) => BATCHES.find((b) => b.slug === slug);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-12-01" → "1 Dec 2026" (string-based, so no time-zone shifts) */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
export function formatRange(a: string, b: string) {
  return a === b ? formatDate(a) : `${formatDate(a)} – ${formatDate(b)}`;
}
