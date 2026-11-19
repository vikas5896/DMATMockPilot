import type { Difficulty, Passage } from "@/lib/exam/types";

/**
 * Authoring format for Subject Module content.
 * All texts and questions here are ORIGINAL. Never copy g.a.s.t. preparation material.
 * Inline math: write it between $…$ (KaTeX syntax). Calculations must be doable without a calculator.
 */
export type AuthoredQuestion = {
  difficulty: Difficulty;
  stem: string;
  options: [string, string, string, string];
  /** index of the correct option, 0 = a) … 3 = d) */
  answer: 0 | 1 | 2 | 3;
  explanation: string;
};

export type SubjectText = {
  passage: Passage;
  questions: AuthoredQuestion[];
};
