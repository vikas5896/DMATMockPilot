import { describe, expect, it } from "vitest";
import { CORE_SUBTESTS, EQUATIONS } from "../exam/blueprint";
import type { Difficulty, EquationsItem, FigureSequenceItem, LatinLetter, LatinSquareItem } from "../exam/types";
import { generateEquations } from "./equations";
import { frameKey, generateFigureSequence, SIZE } from "./figureSequence";
import { buildSubtest } from "./index";
import { deduce, generateLatinSquare, LETTERS } from "./latinSquare";

const LEVELS: Difficulty[] = ["low", "medium", "high"];
const SEEDS = Array.from({ length: 40 }, (_, i) => 1000 + i * 7919);

// ---------- Latin squares ----------
/** Which letters can the target take in ANY valid completion of the grid? */
function possibleTargetLetters(item: LatinSquareItem): Set<LatinLetter> {
  const g = item.grid.map((r) => [...r]);
  const found = new Set<LatinLetter>();
  const okAt = (r: number, c: number, l: LatinLetter) => {
    for (let i = 0; i < 5; i++) if (g[r][i] === l || g[i][c] === l) return false;
    return true;
  };
  const solve = (idx: number): boolean => {
    if (idx === 25) return true;
    const r = Math.floor(idx / 5), c = idx % 5;
    if (g[r][c]) return solve(idx + 1);
    for (const l of LETTERS) {
      if (!okAt(r, c, l)) continue;
      g[r][c] = l;
      if (solve(idx + 1)) {
        g[r][c] = null;
        return true;
      }
      g[r][c] = null;
    }
    return false;
  };
  const { row, col } = item.target;
  for (const l of LETTERS) {
    if (!okAt(row, col, l)) continue;
    g[row][col] = l;
    if (solve(0)) found.add(l);
    g[row][col] = null;
  }
  return found;
}

describe("latin squares", () => {
  for (const d of LEVELS) {
    it(`${d}: givens are valid and the ? has exactly one possible letter`, () => {
      for (const seed of SEEDS) {
        const { item, key } = generateLatinSquare(seed, d);
        const it = item as LatinSquareItem;
        expect(it.grid[it.target.row][it.target.col]).toBeNull();
        for (let i = 0; i < 5; i++) {
          const row = it.grid[i].filter(Boolean);
          const col = it.grid.map((r) => r[i]).filter(Boolean);
          expect(new Set(row).size).toBe(row.length);
          expect(new Set(col).size).toBe(col.length);
        }
        const possible = possibleTargetLetters(it);
        expect([...possible]).toEqual([key.type === "latin-square" && key.correct]);
        const depth = deduce(it.grid, it.target).targetRound;
        if (d === "low") expect(depth).toBe(0);
        if (d === "medium") expect(depth).toBe(1);
        if (d === "high") expect(depth).toBeGreaterThanOrEqual(2);
      }
    });
  }
});

// ---------- Equations ----------
function toFn(eq: string, vars: string[]) {
  const js = eq
    .replace(/(\d+)([A-D])/g, "($1*$2)")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace("=", "===");
  // compare with tolerance for division
  const [l, r] = js.split("===");
  return new Function(...vars, `return Math.abs((${l}) - (${r})) < 1e-9;`) as (...a: number[]) => boolean;
}

function countSolutions(item: EquationsItem): number {
  const fns = item.equations.map((e) => toFn(e, item.variables));
  let count = 0;
  const vals: number[] = [];
  const rec = (i: number) => {
    if (count > 1) return;
    if (i === item.variables.length) {
      if (fns.every((f) => f(...vals))) count++;
      return;
    }
    for (let v = 1; v <= 20; v++) {
      vals[i] = v;
      rec(i + 1);
    }
  };
  rec(0);
  return count;
}

describe("mathematical equations", () => {
  for (const d of LEVELS) {
    it(`${d}: values are 1–20 and the system has exactly one solution`, () => {
      for (const seed of SEEDS.slice(0, d === "high" ? 15 : 40)) {
        const { item, key } = generateEquations(seed, d);
        const it = item as EquationsItem;
        if (key.type !== "equations") throw new Error("wrong key");
        expect(it.equations.length).toBe(it.variables.length);
        for (const v of it.variables) {
          expect(key.correct[v]).toBeGreaterThanOrEqual(1);
          expect(key.correct[v]).toBeLessThanOrEqual(20);
        }
        const fns = it.equations.map((e) => toFn(e, it.variables));
        expect(fns.every((f) => f(...it.variables.map((v) => key.correct[v])))).toBe(true);
        expect(countSolutions(it)).toBe(1);
      }
    });
  }
});

describe("range-based equations (values decided by the 1–20 limit)", () => {
  for (const d of LEVELS) {
    it(`${d}: exactly one solution, all values 1–20, and substitution alone is not enough`, () => {
      for (const seed of SEEDS.slice(0, d === "high" ? 15 : 40)) {
        const { item, key } = generateEquations(seed, d, "range");
        const it = item as EquationsItem;
        if (key.type !== "equations") throw new Error("wrong key");
        expect(it.style).toBe("range");
        for (const v of it.variables) {
          expect(Number.isInteger(key.correct[v])).toBe(true);
          expect(key.correct[v]).toBeGreaterThanOrEqual(1);
          expect(key.correct[v]).toBeLessThanOrEqual(20);
        }
        expect(countSolutions(it)).toBe(1);
        expect(it.rulesUsed.some((r) => r === "range" || r === "combine")).toBe(true);
        expect(it.explanation).toMatch(/1 to 20|few options|together/);
      }
    });
  }

  it("the Equations subtest has 10 range-based and 10 standard tasks", () => {
    const items = buildSubtest(EQUATIONS, 99).map((g) => g.item as EquationsItem);
    expect(items.filter((i) => i.style === "range")).toHaveLength(10);
    expect(items.filter((i) => i.style === "standard")).toHaveLength(10);
  });
});

// ---------- Figure sequences ----------
describe("figure sequences", () => {
  for (const d of LEVELS) {
    it(`${d}: 4 shown pictures, 3 distinct options per slot, no overlaps`, () => {
      for (const seed of SEEDS) {
        const { item, key } = generateFigureSequence(seed, d);
        const it = item as FigureSequenceItem;
        if (key.type !== "figure-sequence") throw new Error("wrong key");
        expect(it.shown).toHaveLength(4);
        for (const slot of [0, 1] as const) {
          const opts = it.options[slot];
          expect(opts).toHaveLength(3);
          expect(new Set(opts.map(frameKey)).size).toBe(3);
          expect(key.correct[slot]).toBeGreaterThanOrEqual(0);
          expect(key.correct[slot]).toBeLessThan(3);
          for (const fr of opts) {
            expect(new Set(fr.map((f) => `${f.row},${f.col}`)).size).toBe(fr.length);
            for (const f of fr) {
              expect(f.row).toBeGreaterThanOrEqual(0);
              expect(f.row).toBeLessThan(SIZE);
              expect(f.col).toBeGreaterThanOrEqual(0);
              expect(f.col).toBeLessThan(SIZE);
            }
          }
        }
        expect(it.explanation.length).toBeGreaterThan(10);
      }
    });
  }
});

// ---------- determinism and speed ----------
describe("subtests", () => {
  it("same seed builds the same subtest", () => {
    for (const spec of CORE_SUBTESTS) {
      const a = buildSubtest(spec, 42);
      const b = buildSubtest(spec, 42);
      expect(JSON.stringify(a)).toBe(JSON.stringify(b));
      expect(a).toHaveLength(20);
    }
  });

  it("a full Core Module (60 items) builds in under 3 seconds", () => {
    const t0 = performance.now();
    for (const spec of CORE_SUBTESTS) buildSubtest(spec, 7);
    expect(performance.now() - t0).toBeLessThan(3000);
  });
});
