import katex from "katex";
import { describe, expect, it } from "vitest";
import { SUBJECT_MODULE } from "@/lib/exam/blueprint";
import type { PassageMcqItem } from "@/lib/exam/types";
import { buildSubjectItems, SUBJECT_SETS } from "./index";
import { SUBJECT_SET_COUNT } from "./set-count";

const mathIn = (s: string) => [...s.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);
const parses = (tex: string, display = false) =>
  expect(() => katex.renderToString(tex, { throwOnError: true, displayMode: display })).not.toThrow();
const ALL_TEXTS = SUBJECT_SETS.flat();

describe("subject module content", () => {
  it("the set count used by the catalogue matches the written sets", () => {
    expect(SUBJECT_SET_COUNT).toBe(SUBJECT_SETS.length);
  });

  it("every text has 7–8 questions with 4 different options and a valid answer", () => {
    for (const t of ALL_TEXTS) {
      expect([7, 8], t.passage.id).toContain(t.questions.length);
      for (const q of t.questions) {
        expect(new Set(q.options).size, `${t.passage.id}: ${q.stem}`).toBe(4);
        expect([0, 1, 2, 3]).toContain(q.answer);
        expect(q.explanation.length).toBeGreaterThan(20);
      }
    }
  });

  it("all formulas and inline math render without KaTeX errors", () => {
    for (const t of ALL_TEXTS) {
      for (const b of t.passage.blocks) {
        if (b.k === "formula") parses(b.tex, true);
        if (b.k === "p" || b.k === "h") mathIn(b.text).forEach((m) => parses(m));
        if (b.k === "list") b.items.flatMap(mathIn).forEach((m) => parses(m));
        if (b.k === "table") [b.caption, ...b.head, ...b.rows.flat()].flatMap(mathIn).forEach((m) => parses(m));
      }
      for (const q of t.questions) {
        [q.stem, ...q.options, q.explanation].flatMap(mathIn).forEach((m) => parses(m));
      }
    }
  });

  it("$ signs are paired in every text and question", () => {
    const odd = (s: string) => (s.match(/\$/g)?.length ?? 0) % 2 === 1;
    for (const t of ALL_TEXTS) {
      for (const b of t.passage.blocks) {
        if (b.k === "p" || b.k === "h") expect(odd(b.text), t.passage.id).toBe(false);
        if (b.k === "list") b.items.forEach((x) => expect(odd(x), t.passage.id).toBe(false));
      }
      for (const q of t.questions) [q.stem, ...q.options, q.explanation].forEach((x) => expect(odd(x), q.stem).toBe(false));
    }
  });

  it("charts have one value per category in every series", () => {
    for (const t of ALL_TEXTS)
      for (const b of t.passage.blocks)
        if (b.k === "chart") for (const s of b.series) expect(s.values).toHaveLength(b.categories.length);
  });

  it("charts have at most 3 series, so every series gets its own colour", () => {
    for (const t of ALL_TEXTS)
      for (const b of t.passage.blocks) if (b.k === "chart") expect(b.series.length, t.passage.id).toBeLessThanOrEqual(3);
  });

  it("tables have the same number of cells in every row as in the header", () => {
    for (const t of ALL_TEXTS)
      for (const b of t.passage.blocks) if (b.k === "table") for (const r of b.rows) expect(r, t.passage.id).toHaveLength(b.head.length);
  });

  it("shuffling options keeps the correct answer and is the same for the same seed, in every set", () => {
    SUBJECT_SETS.forEach((texts, si) => {
      const a = buildSubjectItems(123, si + 1);
      expect(JSON.stringify(a)).toBe(JSON.stringify(buildSubjectItems(123, si + 1)));
      let qi = 0;
      for (const t of texts)
        for (const q of t.questions) {
          const g = a[qi++];
          const item = g.item as PassageMcqItem;
          if (g.key.type !== "passage-mcq") throw new Error("wrong key");
          expect(item.passage.id).toBe(t.passage.id);
          expect(item.options[g.key.correct]).toBe(q.options[q.answer]);
        }
    });
  });

  it("correct answers are spread over a)–d) after shuffling", () => {
    SUBJECT_SETS.forEach((_, si) => {
      const counts = [0, 0, 0, 0];
      for (const g of buildSubjectItems(2026, si + 1)) if (g.key.type === "passage-mcq") counts[g.key.correct]++;
      for (const c of counts) expect(c).toBeGreaterThan(5);
    });
  });

  it("every set has 10 texts and exactly the exam's 74 questions, in 90 minutes", () => {
    expect(SUBJECT_MODULE.timeSec).toBe(90 * 60);
    SUBJECT_SETS.forEach((texts, si) => {
      expect(texts, `set ${si + 1}`).toHaveLength(10);
      const n = texts.reduce((s, t) => s + t.questions.length, 0);
      expect(n, `set ${si + 1}`).toBe(SUBJECT_MODULE.count);
      // a mix of difficulties in every set
      const d = texts.flatMap((t) => t.questions.map((q) => q.difficulty));
      for (const level of ["low", "medium", "high"] as const) expect(d.filter((x) => x === level).length).toBeGreaterThan(10);
    });
  });

  it("texts never repeat: ids and titles are unique across all sets", () => {
    expect(new Set(ALL_TEXTS.map((t) => t.passage.id)).size).toBe(ALL_TEXTS.length);
    expect(new Set(ALL_TEXTS.map((t) => t.passage.title)).size).toBe(ALL_TEXTS.length);
  });

  it("unknown set numbers fall back to set 1 instead of crashing", () => {
    expect(buildSubjectItems(1, 99)[0].item).toMatchObject({ passage: { id: SUBJECT_SETS[0][0].passage.id } });
  });
});
