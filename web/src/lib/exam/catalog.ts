import { TESTS, type TestKind } from "./tests";

/**
 * The catalogue students see: Full Mocks 1–10 and section tests 1–10.
 * Test 1 of each type is free (once per account); 2–10 need a paid pack (payments coming soon).
 */
export const CATALOG_KINDS = ["full", "figure-sequences", "equations", "latin-squares", "subject"] as const;
export type CatalogKind = (typeof CATALOG_KINDS)[number];
export const TESTS_PER_KIND = 10;
export const FREE_NUMBERS = [1];

export type CatalogTest = {
  id: string; // e.g. "full-1", "equations-3"
  kind: CatalogKind;
  number: number;
  title: string;
  short: string;
  free: boolean;
  seed: number;
  minutes: number;
};

const KIND_TITLE: Record<CatalogKind, string> = {
  full: "Full dMAT Mock",
  "figure-sequences": "Figure Sequences",
  equations: "Mathematical Equations",
  "latin-squares": "Latin Squares",
  subject: "General Academic Module",
};

/** Stable seed per test id, so "Full Mock 3" has the same questions for everyone. */
function seedFor(id: string): number {
  let h = 2166136261;
  for (const ch of id) h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0;
  return h % 2_000_000_000;
}

const minutesFor = (kind: TestKind) => TESTS[kind].subtests.reduce((m, s) => m + s.timeSec / 60, 0);

export function catalogTest(kind: CatalogKind, number: number): CatalogTest {
  const id = `${kind}-${number}`;
  return {
    id,
    kind,
    number,
    title: kind === "full" ? `${KIND_TITLE[kind]} ${number}` : `${KIND_TITLE[kind]} – Test ${number}`,
    short: `${kind === "full" ? "Mock" : "Test"} ${number}`,
    free: FREE_NUMBERS.includes(number),
    seed: seedFor(id),
    minutes: minutesFor(kind),
  };
}

export function parseTestId(id: string): CatalogTest | null {
  const m = /^([a-z-]+)-(\d{1,2})$/.exec(id);
  if (!m) return null;
  const kind = m[1] as CatalogKind;
  const n = Number(m[2]);
  if (!CATALOG_KINDS.includes(kind) || n < 1 || n > TESTS_PER_KIND) return null;
  return catalogTest(kind, n);
}

export const CATALOG: { kind: CatalogKind; title: string; blurb: string; tests: CatalogTest[] }[] = CATALOG_KINDS.map(
  (kind) => ({
    kind,
    title: KIND_TITLE[kind],
    blurb: TESTS[kind].blurb,
    tests: Array.from({ length: TESTS_PER_KIND }, (_, i) => catalogTest(kind, i + 1)),
  }),
);
