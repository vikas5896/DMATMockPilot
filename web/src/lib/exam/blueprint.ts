import { SUBJECT_QUESTION_COUNT, SUBJECT_TEXTS } from "@/content/subject";
import type { Difficulty, ExamBlueprint, SubtestSpec } from "./types";

/** 20 items rising in difficulty: 7 low, 7 medium, 6 high. */
export const RISING_20: Difficulty[] = [
  ...Array<Difficulty>(7).fill("low"),
  ...Array<Difficulty>(7).fill("medium"),
  ...Array<Difficulty>(6).fill("high"),
];

export const FIGURE_SEQUENCES: SubtestSpec = {
  key: "figure-sequences",
  module: "core",
  title: "Figure Sequences",
  itemType: "figure-sequence",
  count: 20,
  timeSec: 25 * 60,
  difficultyPlan: RISING_20,
  instructions: {
    heading: "Which two pictures continue the row?",
    lines: [
      "Each picture is a 4×4 grid with one or more symbols. From picture to picture, symbols follow fixed rules: they can move, rotate or change colour.",
      "Find the rules and choose the 5th and 6th pictures. Under each question mark there are three options; click one option for each.",
      "There is no negative marking, so guess if you are unsure.",
    ],
  },
};

export const EQUATIONS: SubtestSpec = {
  key: "equations",
  module: "core",
  title: "Mathematical Equations",
  itemType: "equations",
  count: 20,
  timeSec: 25 * 60,
  difficultyPlan: RISING_20,
  // 10 range-based (values decided by the 1–20 limit) and 10 substitution tasks, alternating
  stylePlan: Array.from({ length: 20 }, (_, i) => (i % 2 === 1 ? "range" : "standard")),
  instructions: {
    heading: "Which whole numbers do the letters stand for?",
    lines: [
      "Each letter stands for a whole number from 1 to 20, and every system has exactly one solution.",
      "Click an answer box, then type the number with the on-screen keypad or your keyboard.",
      "No calculator or notes: work it out in your head.",
    ],
  },
};

export const LATIN_SQUARES: SubtestSpec = {
  key: "latin-squares",
  module: "core",
  title: "Latin Squares",
  itemType: "latin-square",
  count: 20,
  timeSec: 25 * 60,
  difficultyPlan: RISING_20,
  instructions: {
    heading: "Which letter belongs in the field with the question mark?",
    lines: [
      "Each letter A–E appears exactly once in every row and every column of the 5×5 square.",
      "Sometimes you must fill other fields in your head first. Click the letter in the answer column.",
    ],
  },
};

export const CORE_SUBTESTS = [FIGURE_SEQUENCES, EQUATIONS, LATIN_SQUARES];

/** The real module: 90 minutes for all texts together. */
export const SUBJECT_TIME_SEC = 90 * 60;

export const SUBJECT_MODULE: SubtestSpec = {
  key: "general-academic",
  module: "subject",
  title: "General Academic Module",
  itemType: "passage-mcq",
  count: SUBJECT_QUESTION_COUNT,
  timeSec: SUBJECT_TIME_SEC,
  difficultyPlan: SUBJECT_TEXTS.flatMap((t) => t.questions.map((q) => q.difficulty)),
  instructions: {
    heading: "Read the texts and answer the questions.",
    lines: [
      "There are 10 texts. Each comes with 7–8 questions, shown next to the text; every question has four options and exactly one is correct.",
      "Texts may contain figures, tables and formulas. Use the numbers 1–10 at the bottom to move freely between texts until the time runs out.",
      "No notes, no calculator. Guess if you are unsure: there is no negative marking.",
    ],
  },
};

export const DMAT_BLUEPRINT: ExamBlueprint = {
  id: "dmat-general-academic",
  version: 1,
  title: "Full mock – General Academic Module",
  breakSec: 30 * 60,
  modules: [
    {
      key: "core",
      title: "Core Module",
      subtitle: "General cognitive skills",
      subtests: CORE_SUBTESTS,
    },
    {
      key: "subject",
      title: "Subject Module",
      subtitle: "General Academic Module",
      subtests: [SUBJECT_MODULE],
    },
  ],
};

export function subtestByKey(key: string): SubtestSpec | undefined {
  return [...CORE_SUBTESTS, SUBJECT_MODULE].find((s) => s.key === key);
}
