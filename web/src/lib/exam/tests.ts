import { CORE_SUBTESTS, EQUATIONS, FIGURE_SEQUENCES, LATIN_SQUARES } from "./blueprint";
import type { Answer, SubtestSpec } from "./types";

export type TestKind = "core" | "figure-sequences" | "equations" | "latin-squares";

export const TESTS: Record<TestKind, { title: string; blurb: string; subtests: SubtestSpec[] }> = {
  core: {
    title: "Full Core Module mock",
    blurb: "All three subtests back to back, 75 minutes, exactly like test day.",
    subtests: CORE_SUBTESTS,
  },
  "figure-sequences": {
    title: "Figure Sequences",
    blurb: "20 picture series, 25 minutes. Find the rules, pick the next two pictures.",
    subtests: [FIGURE_SEQUENCES],
  },
  equations: {
    title: "Mathematical Equations",
    blurb: "20 equation systems, 25 minutes. Whole numbers 1–20, no calculator.",
    subtests: [EQUATIONS],
  },
  "latin-squares": {
    title: "Latin Squares",
    blurb: "20 squares, 25 minutes. Which letter replaces the question mark?",
    subtests: [LATIN_SQUARES],
  },
};

export const isTestKind = (k: string): k is TestKind => k in TESTS;

export type Attempt = {
  v: 1;
  kind: TestKind;
  seed: number;
  stage: number; // index of the current subtest
  status: "intro" | "running" | "finished";
  deadline: number | null; // epoch ms for the running subtest
  answers: (Answer | null)[][];
  current: number[];
  timeMs: number[][];
  usedMs: number[]; // time used per subtest
};

export function newAttempt(kind: TestKind, seed: number): Attempt {
  const subs = TESTS[kind].subtests;
  return {
    v: 1,
    kind,
    seed,
    stage: 0,
    status: "intro",
    deadline: null,
    answers: subs.map((s) => Array(s.count).fill(null)),
    current: subs.map(() => 0),
    timeMs: subs.map((s) => Array(s.count).fill(0)),
    usedMs: subs.map(() => 0),
  };
}

const key = (kind: TestKind, seed: number) => `mp:attempt:${kind}:${seed}`;
const activeKey = (kind: TestKind) => `mp:active:${kind}`;

export function loadAttempt(kind: TestKind, seed: number): Attempt | null {
  try {
    const raw = localStorage.getItem(key(kind, seed));
    const a = raw ? (JSON.parse(raw) as Attempt) : null;
    return a?.v === 1 ? a : null;
  } catch {
    return null;
  }
}

export function saveAttempt(a: Attempt) {
  localStorage.setItem(key(a.kind, a.seed), JSON.stringify(a));
  if (a.status === "finished") localStorage.removeItem(activeKey(a.kind));
  else localStorage.setItem(activeKey(a.kind), String(a.seed));
}

export function activeSeed(kind: TestKind): number | null {
  const s = localStorage.getItem(activeKey(kind));
  return s ? Number(s) : null;
}
