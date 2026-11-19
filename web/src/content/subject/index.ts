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
import type { SubjectText } from "./types";

/** Mock set A: 10 texts, numbered 1–10 in the exam footer. Fields alternate so no two neighbours match. */
export const SUBJECT_TEXTS: SubjectText[] = [
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

export const SUBJECT_QUESTION_COUNT = SUBJECT_TEXTS.reduce((n, t) => n + t.questions.length, 0);

/**
 * Turn authored texts into exam items + answer keys.
 * Options are shuffled per question from the test seed, so the correct letter is not predictable.
 */
export function buildSubjectItems(seed: number): GeneratedItem[] {
  return SUBJECT_TEXTS.flatMap((t, ti) =>
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
