export type Difficulty = "low" | "medium" | "high";

export type ItemType = "figure-sequence" | "equations" | "latin-square";

// ---------- Figure Sequences ----------
export type Shape = "diamond" | "circle" | "square" | "arrow" | "triangle";
export type FigColor = "green" | "blue" | "red" | "yellow";

export type Figure = {
  shape: Shape;
  color: FigColor;
  row: number; // 0..3
  col: number; // 0..3
  rot: number; // degrees, multiple of 90
};

export type Frame = Figure[];

export type FigureSequenceItem = {
  type: "figure-sequence";
  id: string;
  seed: number;
  difficulty: Difficulty;
  shown: Frame[]; // 4 frames
  /** options[0] = 3 candidates for the 5th picture, options[1] = for the 6th */
  options: [Frame[], Frame[]];
  explanation: string;
  rulesUsed: string[];
};
/** chosen option index for each of the two missing pictures */
export type FigureSequenceAnswer = [number | null, number | null];

// ---------- Mathematical Equations ----------
export type EquationsItem = {
  type: "equations";
  id: string;
  seed: number;
  difficulty: Difficulty;
  /** standard = solvable by substitution; range = needs the 1–20 limit (e.g. B + C = 2 → B = C = 1) */
  style: "standard" | "range";
  equations: string[]; // display strings, e.g. "7 + A = 14"
  variables: string[]; // ["A", "B"]
  explanation: string;
  rulesUsed: string[];
};
export type EquationsAnswer = Record<string, string>; // variable -> typed text

// ---------- Latin Squares ----------
export type LatinLetter = "A" | "B" | "C" | "D" | "E";
export type LatinSquareItem = {
  type: "latin-square";
  id: string;
  seed: number;
  difficulty: Difficulty;
  grid: (LatinLetter | null)[][]; // 5x5, null = empty
  target: { row: number; col: number };
  explanation: string;
  rulesUsed: string[];
};
export type LatinSquareAnswer = LatinLetter | null;

export type Item = FigureSequenceItem | EquationsItem | LatinSquareItem;
export type Answer = FigureSequenceAnswer | EquationsAnswer | LatinSquareAnswer;

/** Answer keys are kept apart from item content so they can stay server-side later. */
export type AnswerKey =
  | { type: "figure-sequence"; correct: [number, number] }
  | { type: "equations"; correct: Record<string, number> }
  | { type: "latin-square"; correct: LatinLetter };

export type GeneratedItem = { item: Item; key: AnswerKey };

// ---------- Blueprint ----------
export type SubtestSpec = {
  key: string;
  title: string;
  itemType: ItemType;
  count: number;
  timeSec: number;
  /** difficulty for each position, length = count */
  difficultyPlan: Difficulty[];
  /** optional question style per position (used by Equations: "standard" | "range") */
  stylePlan?: string[];
  instructions: { heading: string; lines: string[] };
};

export type ModuleSpec = {
  key: "core" | "subject";
  title: string;
  subtitle: string;
  subtests: SubtestSpec[];
};

export type ExamBlueprint = {
  id: string;
  version: number;
  title: string;
  modules: ModuleSpec[];
  breakSec: number;
};
