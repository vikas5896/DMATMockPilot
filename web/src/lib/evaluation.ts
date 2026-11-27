/** Free profile evaluation: form rules and document checks, kept free of database code so they can be unit-tested. */
import type { EvaluationDetails } from "@/db/schema";

export const MAX_DOC_BYTES = 4 * 1024 * 1024; // Vercel accepts request bodies up to 4.5 MB
export const DOC_ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";
export const EVALUATION_HOURS = 48;

export const EVALUATION_FIELDS: { key: keyof EvaluationDetails; label: string; placeholder: string; optional?: boolean; max: number }[] = [
  { key: "degree", label: "Bachelor’s degree", placeholder: "e.g. B.Tech Mechanical Engineering", max: 150 },
  { key: "university", label: "College / university", placeholder: "e.g. VIT Vellore", max: 150 },
  { key: "score", label: "CGPA or percentage", placeholder: "e.g. 7.8/10 or 72%", max: 40 },
  { key: "gradYear", label: "Year of graduation", placeholder: "e.g. 2025 (or expected)", max: 20 },
  { key: "targetCourse", label: "Master’s you want to study", placeholder: "e.g. M.Sc. Mechatronics", max: 150 },
  { key: "intake", label: "Target intake", placeholder: "e.g. Winter 2027", max: 40 },
  { key: "workExperience", label: "Work experience", placeholder: "e.g. 1.5 years at Tata Motors (or none)", optional: true, max: 200 },
  { key: "englishTest", label: "IELTS / TOEFL / German", placeholder: "e.g. IELTS 7.0, or planned", optional: true, max: 100 },
];

/** Trimmed details, or an error message. */
export function validateEvaluation(raw: Record<string, unknown>): { ok: true; details: EvaluationDetails } | { ok: false; error: string } {
  const details: Record<string, string> = {};
  for (const f of EVALUATION_FIELDS) {
    const v = typeof raw[f.key] === "string" ? (raw[f.key] as string).trim() : "";
    if (!v && !f.optional) return { ok: false, error: `Please fill in “${f.label}”.` };
    if (v.length > f.max) return { ok: false, error: `“${f.label}” is too long.` };
    if (v) details[f.key] = v;
  }
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  if (message.length > 2000) return { ok: false, error: "Your message is too long (max. 2,000 characters)." };
  if (message) details.message = message;
  return { ok: true, details: details as EvaluationDetails };
}

const SIGNATURES: { type: string; bytes: number[] }[] = [
  { type: "application/pdf", bytes: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  { type: "image/png", bytes: [0x89, 0x50, 0x4e, 0x47] },
  { type: "image/jpeg", bytes: [0xff, 0xd8, 0xff] },
];

/**
 * The document's real type from its first bytes (never trust the browser's label), or an error.
 * Only PDF, JPG and PNG up to MAX_DOC_BYTES.
 */
export function checkDocument(name: string, bytes: Uint8Array): { ok: true; type: string } | { ok: false; error: string } {
  if (!bytes.length) return { ok: false, error: "Please attach your transcript or semester results." };
  if (bytes.length > MAX_DOC_BYTES) return { ok: false, error: "The file is larger than 4 MB. Please upload a smaller PDF or photo." };
  const sig = SIGNATURES.find((s) => s.bytes.every((b, i) => bytes[i] === b));
  if (!sig) return { ok: false, error: "Please upload a PDF, JPG or PNG file." };
  if (!name || name.length > 200) return { ok: false, error: "Please rename the file to something shorter." };
  return { ok: true, type: sig.type };
}

/** A safe file name for downloads. */
export const safeFileName = (name: string) => name.replace(/[^\w.\- ]+/g, "_").slice(0, 120) || "document";

/** Admin labels and badge colours per status. */
export const EVAL_LABEL: Record<string, string> = {
  submitted: "To evaluate",
  fit: "Fit: call them",
  not_fit: "Not a fit",
  call_done: "Call done: may pay",
};
export const EVAL_STYLE: Record<string, string> = {
  submitted: "bg-amber-50 text-amber-800",
  fit: "bg-emerald-50 text-emerald-700",
  not_fit: "bg-zinc-100 text-zinc-500",
  call_done: "bg-violet-50 text-violet-800",
};
