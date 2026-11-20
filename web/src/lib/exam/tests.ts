import { CORE_SUBTESTS, EQUATIONS, FIGURE_SEQUENCES, LATIN_SQUARES, SUBJECT_MODULE } from "./blueprint";
import type { Answer, SubtestSpec } from "./types";

export type TestKind = "full" | "core" | "subject" | "figure-sequences" | "equations" | "latin-squares";

export type TestDef = {
  title: string;
  blurb: string;
  subtests: SubtestSpec[];
  /** a break is offered before the subtest with this index */
  breakBefore?: number;
  breakSec?: number;
};

export const TESTS: Record<TestKind, TestDef> = {
  full: {
    title: "Full dMAT mock",
    blurb: "Core Module, 30-minute break, then the General Academic Module, exactly in exam order.",
    subtests: [...CORE_SUBTESTS, SUBJECT_MODULE],
    breakBefore: 3,
    breakSec: 30 * 60,
  },
  core: {
    title: "Full Core Module mock",
    blurb: "All three Core subtests back to back, 75 minutes.",
    subtests: CORE_SUBTESTS,
  },
  subject: {
    title: "General Academic Module",
    blurb: "10 academic texts with tables, figures and formulas, 7–8 single-choice questions each, 90 minutes.",
    subtests: [SUBJECT_MODULE],
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
  /** Academic Module text set (missing in attempts made before sets existed = set 1) */
  textSet?: number;
  stage: number; // index of the current subtest
  status: "intro" | "running" | "break" | "finished";
  deadline: number | null; // epoch ms for the running subtest or the break
  answers: (Answer | null)[][];
  current: number[];
  timeMs: number[][];
  usedMs: number[]; // time used per subtest
};

export function newAttempt(kind: TestKind, seed: number, textSet = 1): Attempt {
  const subs = TESTS[kind].subtests;
  return {
    v: 1,
    kind,
    seed,
    textSet,
    stage: 0,
    status: "intro",
    deadline: null,
    answers: subs.map((s) => Array(s.count).fill(null)),
    current: subs.map(() => 0),
    timeMs: subs.map((s) => Array(s.count).fill(0)),
    usedMs: subs.map(() => 0),
  };
}

/** What happens when the running subtest ends (time up or End Subtest): next intro, the break, or the results. */
export function afterSubtest(a: Attempt, now: number): Attempt {
  const test = TESTS[a.kind];
  const last = a.stage === test.subtests.length - 1;
  if (last) return { ...a, status: "finished", deadline: null };
  if (test.breakBefore === a.stage + 1 && test.breakSec) {
    return { ...a, stage: a.stage + 1, status: "break", deadline: now + test.breakSec * 1000 };
  }
  return { ...a, stage: a.stage + 1, status: "intro", deadline: null };
}
