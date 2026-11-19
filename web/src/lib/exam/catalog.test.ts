import { describe, expect, it } from "vitest";
import { buildSubtest } from "@/lib/generators";
import { childSeed } from "@/lib/rng";
import { CATALOG, catalogTest, parseTestId } from "./catalog";
import { scoreAttempt } from "./score-attempt";
import { newAttempt, TESTS } from "./tests";

describe("test catalogue", () => {
  it("has 5 test types × 10 tests, with only test 1 free", () => {
    expect(CATALOG).toHaveLength(5);
    for (const g of CATALOG) {
      expect(g.tests).toHaveLength(10);
      expect(g.tests.filter((t) => t.free).map((t) => t.number)).toEqual([1]);
    }
  });

  it("every test has a fixed, unique seed (same questions for everyone)", () => {
    const all = CATALOG.flatMap((g) => g.tests);
    expect(new Set(all.map((t) => t.seed)).size).toBe(all.length);
    expect(catalogTest("full", 3).seed).toBe(catalogTest("full", 3).seed);
  });

  it("parses test ids and rejects bad ones", () => {
    expect(parseTestId("full-1")?.title).toBe("Full dMAT Mock 1");
    expect(parseTestId("latin-squares-10")?.free).toBe(false);
    for (const bad of ["full", "full-0", "full-11", "core-1", "../full-1", "full-1x"]) expect(parseTestId(bad)).toBeNull();
  });
});

describe("server-side scoring", () => {
  it("scores an empty attempt as 0 and a perfect Latin Squares attempt as full marks", () => {
    const t = catalogTest("latin-squares", 1);
    const empty = newAttempt(t.kind, t.seed);
    expect(scoreAttempt(empty)).toEqual({ score: 0, max: 20 });

    const items = buildSubtest(TESTS[t.kind].subtests[0], childSeed(t.seed, 1));
    const perfect = { ...empty, answers: [items.map((g) => (g.key.type === "latin-square" ? g.key.correct : null))] };
    expect(scoreAttempt(perfect)).toEqual({ score: 20, max: 20 });
  });

  it("the full mock is out of 60 Core tasks plus all Subject questions", () => {
    const t = catalogTest("full", 1);
    const { max } = scoreAttempt(newAttempt(t.kind, t.seed));
    expect(max).toBe(60 + TESTS.subject.subtests[0].count);
  });
});
