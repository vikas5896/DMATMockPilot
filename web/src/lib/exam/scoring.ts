import type {
  Answer,
  AnswerKey,
  EquationsAnswer,
  FigureSequenceAnswer,
  LatinSquareAnswer,
} from "./types";

/** true / false for a whole item. No negative marking: blank simply scores 0. */
export function isCorrect(key: AnswerKey, answer: Answer | undefined): boolean {
  if (answer == null) return false;
  switch (key.type) {
    case "figure-sequence": {
      const a = answer as FigureSequenceAnswer;
      return a[0] === key.correct[0] && a[1] === key.correct[1];
    }
    case "equations": {
      const a = answer as EquationsAnswer;
      return Object.entries(key.correct).every(([v, n]) => Number((a[v] ?? "").trim()) === n);
    }
    case "latin-square":
      return (answer as LatinSquareAnswer) === key.correct;
    case "passage-mcq":
      return answer === key.correct;
  }
}

/** Has the student given a complete answer (used for the palette colours)? */
export function isAnswered(answer: Answer | undefined, variables?: string[]): boolean {
  if (answer == null) return false;
  if (Array.isArray(answer)) return answer[0] != null && answer[1] != null;
  if (typeof answer === "string" || typeof answer === "number") return true;
  const vars = variables ?? Object.keys(answer);
  return vars.length > 0 && vars.every((v) => (answer as EquationsAnswer)[v]?.trim());
}

export type SubtestScore = { correct: number; total: number; answered: number };

export function scoreSubtest(
  keys: AnswerKey[],
  answers: (Answer | undefined)[],
): SubtestScore {
  let correct = 0;
  let answered = 0;
  keys.forEach((k, i) => {
    if (answers[i] != null) answered++;
    if (isCorrect(k, answers[i])) correct++;
  });
  return { correct, total: keys.length, answered };
}
