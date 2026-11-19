import { describe, expect, it } from "vitest";
import { BATCHES } from "@/content/site/batches";
import { batchToFields, fieldsToBatch, syllabusToText, textToSyllabus } from "./batch-form";

describe("batch form", () => {
  it("every existing batch survives a round trip through the form unchanged", () => {
    for (const b of BATCHES) {
      const r = fieldsToBatch(batchToFields({ ...b, sort: 5, published: true }));
      if (!r.ok) throw new Error(r.errors.join("; "));
      expect(r.batch).toEqual({ ...b, sort: 5, published: true });
    }
  });

  it("parses syllabus text with titles, points and blank lines", () => {
    const text = "Weeks 1–2: Figures\n- Movement\n- Rotation\n\n\nWeek 3\n• Equations\nLatin squares";
    expect(textToSyllabus(text)).toEqual([
      { title: "Weeks 1–2: Figures", points: ["Movement", "Rotation"] },
      { title: "Week 3", points: ["Equations", "Latin squares"] },
    ]);
    expect(textToSyllabus(syllabusToText(textToSyllabus(text)))).toEqual(textToSyllabus(text));
  });

  it("rejects bad input with readable messages", () => {
    const f = batchToFields({ ...BATCHES[1], sort: 0, published: true });
    const bad = fieldsToBatch({ ...f, slug: "Bad Slug!", end: "2020-01-01", sessions: "two", title: "" });
    expect(bad.ok).toBe(false);
    if (!bad.ok) {
      expect(bad.errors.join(" ")).toMatch(/slug/);
      expect(bad.errors.join(" ")).toMatch(/End date/);
      expect(bad.errors.join(" ")).toMatch(/Sessions/);
      expect(bad.errors.join(" ")).toMatch(/Title/);
    }
  });

  it("empty fee and instructor become 'not set'", () => {
    const f = batchToFields({ ...BATCHES[1], sort: 0, published: true });
    const r = fieldsToBatch({ ...f, fee: "  ", instructor: "" });
    expect(r.ok && r.batch.fee).toBeUndefined();
    expect(r.ok && r.batch.instructor).toBeUndefined();
  });
});
