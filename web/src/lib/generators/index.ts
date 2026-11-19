import { childSeed } from "../rng";
import type { Difficulty, GeneratedItem, ItemType, SubtestSpec } from "../exam/types";
import { generateEquations, type EquationStyle } from "./equations";
import { generateFigureSequence } from "./figureSequence";
import { generateLatinSquare } from "./latinSquare";

const GENERATORS: Record<ItemType, (seed: number, d: Difficulty, style?: string) => GeneratedItem> = {
  "figure-sequence": (seed, d) => generateFigureSequence(seed, d),
  equations: (seed, d, style) => generateEquations(seed, d, (style as EquationStyle) ?? "standard"),
  "latin-square": (seed, d) => generateLatinSquare(seed, d),
};

export function generateItem(type: ItemType, seed: number, difficulty: Difficulty, style?: string): GeneratedItem {
  return GENERATORS[type](seed, difficulty, style);
}

/** Build every item of a subtest from one test seed (deterministic). */
export function buildSubtest(spec: SubtestSpec, seed: number): GeneratedItem[] {
  return spec.difficultyPlan.map((d, i) =>
    generateItem(spec.itemType, childSeed(seed, i), d, spec.stylePlan?.[i]),
  );
}
