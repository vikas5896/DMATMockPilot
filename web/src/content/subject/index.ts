import type { GeneratedItem } from "@/lib/exam/types";
import { childSeed, createRng } from "@/lib/rng";
import { ALGORITHMS } from "./algorithms";
import { CIRCUITS } from "./circuits";
import { ENZYMES } from "./enzymes";
import { INSULATION } from "./insulation";
import { LOANS } from "./loans";
import { MARKETS } from "./markets";
import { POPULATION } from "./population";
import { SOLUTIONS } from "./solutions";
import { STATISTICS } from "./statistics";
import { SURVEYS } from "./surveys";
import { SET_B } from "./set-b";
import { SET_C } from "./set-c";
import { SET_D } from "./set-d";
import { SET_E } from "./set-e";
import { SET_F } from "./set-f";
import { SET_G } from "./set-g";
import { SET_H } from "./set-h";
import { SET_I } from "./set-i";
import { SET_J } from "./set-j";
import type { SubjectText } from "./types";

/** Set A (used by Academic Test 1 and Full Mock 1): 10 texts, numbered 1–10 in the exam footer. */
export const SET_A: SubjectText[] = [
  LOANS, // 1 Economics
  ENZYMES, // 2 Life Sciences
  CIRCUITS, // 3 Engineering
  SURVEYS, // 4 Social Sciences
  STATISTICS, // 5 Mathematics
  POPULATION, // 6 Biology
  MARKETS, // 7 Economics
  SOLUTIONS, // 8 Chemistry
  INSULATION, // 9 Engineering
  ALGORITHMS, // 10 Computer Science
];

/**
 * One set of 10 texts per test number: set 1 (A) for test 1, set 2 (B) for test 2, …
 * Academic Test N and Full Mock N use set N. Tests without a written set show "Coming soon".
 * Every set must have 10 texts and 74 questions (same exam format).
 */
export const SUBJECT_SETS: SubjectText[][] = [SET_A, SET_B, SET_C, SET_D, SET_E, SET_F, SET_G, SET_H, SET_I, SET_J];

/** Kept for the blueprint (question count and timing are the same for every set). */
export const SUBJECT_TEXTS = SET_A;
export const SUBJECT_QUESTION_COUNT = SUBJECT_TEXTS.reduce((n, t) => n + t.questions.length, 0);

export const hasSubjectSet = (set: number) => Number.isInteger(set) && set >= 1 && set <= SUBJECT_SETS.length;

/**
 * Turn the authored texts of one set into exam items + answer keys.
 * Options are shuffled per question from the test seed, so the correct letter is not predictable.
 */
export function buildSubjectItems(seed: number, set = 1): GeneratedItem[] {
  const texts = SUBJECT_SETS[(hasSubjectSet(set) ? set : 1) - 1];
  return texts.flatMap((t, ti) =>
    t.questions.map((q, i) => {
      const order = createRng(childSeed(seed, ti * 100 + i)).shuffle([0, 1, 2, 3]);
      const options = order.map((o) => q.options[o]) as [string, string, string, string];
      return {
        item: {
          type: "passage-mcq" as const,
          id: `${t.passage.id}-${i + 1}`,
          seed,
          difficulty: q.difficulty,
          passage: t.passage,
          number: i + 1,
          stem: q.stem,
          options,
          explanation: q.explanation,
          rulesUsed: [t.passage.field],
        },
        key: { type: "passage-mcq" as const, correct: order.indexOf(q.answer) },
      };
    }),
  );
}
