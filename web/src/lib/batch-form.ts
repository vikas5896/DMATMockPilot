import type { Batch } from "@/content/site/batches";

/** A batch as plain form fields (what the admin edits). */
export type BatchFields = Record<
  | "slug"
  | "title"
  | "kind"
  | "summary"
  | "forSitting"
  | "start"
  | "end"
  | "days"
  | "time"
  | "sessions"
  | "sessionLength"
  | "fee"
  | "instructor"
  | "status"
  | "includes"
  | "syllabus"
  | "sort",
  string
> & { published: boolean };

/**
 * Syllabus as text: blocks separated by a blank line; first line = block title, other lines = points.
 *   Weeks 1–2: Figure Sequences
 *   - Movement rules
 *   - Rotation
 */
export function syllabusToText(s: Batch["syllabus"]): string {
  return s.map((b) => [b.title, ...b.points.map((p) => `- ${p}`)].join("\n")).join("\n\n");
}

export function textToSyllabus(text: string): Batch["syllabus"] {
  return text
    .replace(/\r/g, "")
    .split(/\n\s*\n/)
    .map((block) => block.split("\n").map((l) => l.trim()).filter(Boolean))
    .filter((lines) => lines.length > 0)
    .map(([title, ...points]) => ({ title, points: points.map((p) => p.replace(/^[-•*]\s*/, "")) }));
}

export function batchToFields(b: Batch & { sort?: number; published?: boolean }): BatchFields {
  return {
    slug: b.slug,
    title: b.title,
    kind: b.kind,
    summary: b.summary,
    forSitting: b.forSitting ?? "",
    start: b.start,
    end: b.end,
    days: b.days,
    time: b.time,
    sessions: String(b.sessions),
    sessionLength: b.sessionLength,
    fee: b.fee ?? "",
    instructor: b.instructor ?? "",
    status: b.status,
    includes: b.includes.join("\n"),
    syllabus: syllabusToText(b.syllabus),
    sort: String(b.sort ?? 0),
    published: b.published ?? true,
  };
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** Validate and convert form fields; returns the batch or a list of problems. */
export function fieldsToBatch(
  f: BatchFields,
): { ok: true; batch: Batch & { sort: number; published: boolean } } | { ok: false; errors: string[] } {
  const errors: string[] = [];
  const slug = f.slug.trim().toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push("Web address (slug): use lowercase letters, numbers and dashes, e.g. core-batch-may.");
  if (f.title.trim().length < 3) errors.push("Title is required.");
  if (!["course", "masterclass", "webinar"].includes(f.kind)) errors.push("Choose a type.");
  if (!["open", "soon", "full"].includes(f.status)) errors.push("Choose a status.");
  if (f.summary.trim().length < 10) errors.push("Summary is required (at least one sentence).");
  if (!ISO.test(f.start) || !ISO.test(f.end)) errors.push("Start and end dates are required.");
  else if (f.end < f.start) errors.push("End date must be on or after the start date.");
  if (!f.days.trim() || !f.time.trim()) errors.push("Days and time are required.");
  const sessions = Number(f.sessions);
  if (!Number.isInteger(sessions) || sessions < 1 || sessions > 500) errors.push("Sessions must be a whole number.");
  const sort = Number(f.sort || 0);
  if (!Number.isFinite(sort)) errors.push("Order must be a number.");
  const includes = f.includes.split(/\r?\n/).map((l) => l.replace(/^[-•*]\s*/, "").trim()).filter(Boolean);
  const syllabus = textToSyllabus(f.syllabus);
  if (errors.length) return { ok: false, errors };

  return {
    ok: true,
    batch: {
      slug,
      title: f.title.trim(),
      kind: f.kind as Batch["kind"],
      summary: f.summary.trim(),
      forSitting: f.forSitting.trim() || undefined,
      start: f.start,
      end: f.end,
      days: f.days.trim(),
      time: f.time.trim(),
      sessions,
      sessionLength: f.sessionLength.trim() || "90 min",
      fee: f.fee.trim() || undefined,
      instructor: f.instructor.trim() || undefined,
      status: f.status as Batch["status"],
      includes,
      syllabus,
      sort,
      published: f.published,
    },
  };
}

export function formDataToFields(fd: FormData): BatchFields {
  const g = (k: string) => String(fd.get(k) ?? "");
  return {
    slug: g("slug"),
    title: g("title"),
    kind: g("kind"),
    summary: g("summary"),
    forSitting: g("forSitting"),
    start: g("start"),
    end: g("end"),
    days: g("days"),
    time: g("time"),
    sessions: g("sessions"),
    sessionLength: g("sessionLength"),
    fee: g("fee"),
    instructor: g("instructor"),
    status: g("status"),
    includes: g("includes"),
    syllabus: g("syllabus"),
    sort: g("sort"),
    published: fd.get("published") === "on",
  };
}
