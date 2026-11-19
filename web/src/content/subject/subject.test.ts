import katex from "katex";
import { describe, expect, it } from "vitest";
import { SUBJECT_MODULE } from "@/lib/exam/blueprint";
import type { PassageMcqItem } from "@/lib/exam/types";
import { buildSubjectItems, SUBJECT_TEXTS } from "./index";

const mathIn = (s: string) => [...s.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);
const parses = (tex: string, display = false) =>
  expect(() => katex.renderToString(tex, { throwOnError: true, displayMode: display })).not.toThrow();

describe("subject module content", () => {
  it("every text has 5–8 questions with 4 different options and a valid answer", () => {
    for (const t of SUBJECT_TEXTS) {
      expect(t.questions.length).toBeGreaterThanOrEqual(5);
      expect(t.questions.length).toBeLessThanOrEqual(8);
      for (const q of t.questions) {
        expect(new Set(q.options).size).toBe(4);
        expect([0, 1, 2, 3]).toContain(q.answer);
        expect(q.explanation.length).toBeGreaterThan(20);
      }
    }
  });

  it("all formulas and inline math render without KaTeX errors", () => {
    for (const t of SUBJECT_TEXTS) {
      for (const b of t.passage.blocks) {
        if (b.k === "formula") parses(b.tex, true);
        if (b.k === "p" || b.k === "h") mathIn(b.text).forEach((m) => parses(m));
        if (b.k === "list") b.items.flatMap(mathIn).forEach((m) => parses(m));
      }
      for (const q of t.questions) {
        [q.stem, ...q.options, q.explanation].flatMap(mathIn).forEach((m) => parses(m));
      }
    }
  });

  it("charts have one value per category in every series", () => {
    for (const t of SUBJECT_TEXTS)
      for (const b of t.passage.blocks)
        if (b.k === "chart") for (const s of b.series) expect(s.values).toHaveLength(b.categories.length);
  });

  it("shuffling options keeps the correct answer and is the same for the same seed", () => {
    const a = buildSubjectItems(123);
    const b = buildSubjectItems(123);
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
    let qi = 0;
    for (const t of SUBJECT_TEXTS)
      for (const q of t.questions) {
        const g = a[qi++];
        const item = g.item as PassageMcqItem;
        if (g.key.type !== "passage-mcq") throw new Error("wrong key");
        expect(item.options[g.key.correct]).toBe(q.options[q.answer]);
      }
  });

  it("correct answers are spread over a)–d) after shuffling", () => {
    const counts = [0, 0, 0, 0];
    for (const g of buildSubjectItems(2026)) if (g.key.type === "passage-mcq") counts[g.key.correct]++;
    for (const c of counts) expect(c).toBeGreaterThan(0);
  });

  it("the mock has 10 texts with 7–8 questions each, in 90 minutes", () => {
    expect(SUBJECT_TEXTS).toHaveLength(10);
    for (const t of SUBJECT_TEXTS) expect([7, 8]).toContain(t.questions.length);
    const n = SUBJECT_TEXTS.reduce((s, t) => s + t.questions.length, 0);
    expect(SUBJECT_MODULE.count).toBe(n);
    expect(SUBJECT_MODULE.timeSec).toBe(90 * 60);
    expect(SUBJECT_MODULE.difficultyPlan).toHaveLength(n);
  });

  it("every text has its own id and title", () => {
    expect(new Set(SUBJECT_TEXTS.map((t) => t.passage.id)).size).toBe(10);
    expect(new Set(SUBJECT_TEXTS.map((t) => t.passage.title)).size).toBe(10);
  });
});
