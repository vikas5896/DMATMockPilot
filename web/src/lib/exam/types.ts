export type Difficulty = "low" | "medium" | "high";

export type ItemType = "figure-sequence" | "equations" | "latin-square" | "passage-mcq";

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

// ---------- Subject Module (passage + single-choice questions) ----------
/** Text may contain inline math between $…$ (KaTeX). */
export type PassageBlock =
  | { k: "h"; text: string }
  | { k: "p"; text: string }
  | { k: "list"; items: string[] }
  | { k: "formula"; tex: string; label?: string }
  | { k: "table"; caption: string; head: string[]; rows: string[][] }
  | {
      k: "chart";
      caption: string;
      kind: "bar" | "line";
      xLabel: string;
      yLabel: string;
      categories: string[];
      series: { name: string; values: number[] }[];
    };

export type Passage = {
  id: string;
  title: string;
  field: string; // e.g. "Economics"
  blocks: PassageBlock[];
};

export type PassageMcqItem = {
  type: "passage-mcq";
  id: string;
  seed: number;
  difficulty: Difficulty;
  passage: Passage;
  /** 1-based number of this question within its text */
  number: number;
  stem: string;
  options: [string, string, string, string];
  explanation: string;
  rulesUsed: string[];
};
export type PassageMcqAnswer = number | null; // 0..3

export type Item = FigureSequenceItem | EquationsItem | LatinSquareItem | PassageMcqItem;
export type Answer = FigureSequenceAnswer | EquationsAnswer | LatinSquareAnswer | PassageMcqAnswer;

/** Answer keys are kept apart from item content so they can stay server-side later. */
export type AnswerKey =
  | { type: "figure-sequence"; correct: [number, number] }
  | { type: "equations"; correct: Record<string, number> }
  | { type: "latin-square"; correct: LatinLetter }
  | { type: "passage-mcq"; correct: number };

export type GeneratedItem = { item: Item; key: AnswerKey };

// ---------- Blueprint ----------
export type SubtestSpec = {
  key: string;
  module: "core" | "subject";
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
