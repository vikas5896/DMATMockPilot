import { createRng, type Rng } from "../rng";
import type { Difficulty, GeneratedItem, LatinLetter, LatinSquareItem } from "../exam/types";

export const LETTERS: LatinLetter[] = ["A", "B", "C", "D", "E"];
const N = 5;

type Grid = (LatinLetter | null)[][];

function randomLatinSquare(rng: Rng): LatinLetter[][] {
  const rows = rng.shuffle([0, 1, 2, 3, 4]);
  const cols = rng.shuffle([0, 1, 2, 3, 4]);
  const syms = rng.shuffle(LETTERS);
  return rows.map((r) => cols.map((c) => syms[(r + c) % N]));
}

function candidates(grid: Grid, r: number, c: number): LatinLetter[] {
  const used = new Set<LatinLetter>();
  for (let i = 0; i < N; i++) {
    const a = grid[r][i];
    const b = grid[i][c];
    if (a) used.add(a);
    if (b) used.add(b);
  }
  return LETTERS.filter((l) => !used.has(l));
}

export type Deduction = { row: number; col: number; letter: LatinLetter; round: number };

/**
 * Solve by "naked singles" only: a field whose row and column already contain
 * four different letters must hold the fifth. Fields are filled in rounds.
 * Returns the round in which the target was filled (0 = directly), or -1.
 */
export function deduce(
  givens: Grid,
  target: { row: number; col: number },
): { targetRound: number; steps: Deduction[] } {
  const grid = givens.map((row) => [...row]);
  const steps: Deduction[] = [];
  for (let round = 0; round < N * N; round++) {
    const fills: Deduction[] = [];
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        if (grid[r][c]) continue;
        const cand = candidates(grid, r, c);
        if (cand.length === 1) fills.push({ row: r, col: c, letter: cand[0], round });
      }
    if (fills.length === 0) return { targetRound: -1, steps };
    for (const f of fills) grid[f.row][f.col] = f.letter;
    steps.push(...fills);
    if (fills.some((f) => f.row === target.row && f.col === target.col)) {
      return { targetRound: round, steps };
    }
  }
  return { targetRound: -1, steps };
}

const ROUND_RANGE: Record<Difficulty, [number, number]> = {
  low: [0, 0],
  medium: [1, 1],
  high: [2, 6],
};

function tryBuild(rng: Rng, difficulty: Difficulty) {
  const solution = randomLatinSquare(rng);
  const target = { row: rng.int(0, 4), col: rng.int(0, 4) };
  const grid: Grid = solution.map((row) => [...row]);
  grid[target.row][target.col] = null;
  const [minRound, maxRound] = ROUND_RANGE[difficulty];

  // Remove givens one by one while the target stays deducible within the allowed depth.
  const cells = rng.shuffle(
    Array.from({ length: N * N }, (_, i) => ({ r: Math.floor(i / N), c: i % N })).filter(
      (p) => !(p.r === target.row && p.c === target.col),
    ),
  );
  for (const { r, c } of cells) {
    const keep = grid[r][c];
    grid[r][c] = null;
    const { targetRound } = deduce(grid, target);
    if (targetRound < 0 || targetRound > maxRound) grid[r][c] = keep;
  }
  if (deduce(grid, target).targetRound < minRound) return null;

  // Add back a few decoy letters (as in the real test) as long as the difficulty is unchanged.
  const empty = rng.shuffle(cells.filter(({ r, c }) => !grid[r][c]));
  let decoys = rng.int(2, 4);
  for (const { r, c } of empty) {
    if (decoys === 0) break;
    grid[r][c] = solution[r][c];
    const round = deduce(grid, target).targetRound;
    if (round < minRound || round > maxRound) grid[r][c] = null;
    else decoys--;
  }

  const { targetRound, steps } = deduce(grid, target);
  if (targetRound < minRound || targetRound > maxRound) return null;
  return { solution, grid, target, targetRound, steps };
}

const pos = (r: number, c: number) => `row ${r + 1}, column ${c + 1}`;

export function generateLatinSquare(seed: number, difficulty: Difficulty): GeneratedItem {
  const rng = createRng(seed);
  let built = null;
  for (let attempt = 0; attempt < 200 && !built; attempt++) built = tryBuild(rng, difficulty);
  if (!built) throw new Error(`latin-square: could not build ${difficulty} item for seed ${seed}`);

  const { solution, grid, target, targetRound, steps } = built;
  const answer = solution[target.row][target.col];

  // Explanation: only the deductions on the path to the target matter;
  // list the earlier-round fills that share a row or column with later ones, then the target.
  const finalStep = steps.find((s) => s.row === target.row && s.col === target.col)!;
  // Walk backwards: a fill matters if it shares a row/column with a later fill that matters.
  const relevant = new Set<Deduction>([finalStep]);
  for (let round = targetRound; round > 0; round--) {
    const later = [...relevant].filter((x) => x.round === round);
    for (const s of steps) {
      if (s.round >= round) continue;
      if (later.some((x) => x.row === s.row || x.col === s.col)) relevant.add(s);
    }
  }
  const helpers = [...relevant].filter((s) => s !== finalStep).sort((a, b) => a.round - b.round);
  const parts: string[] = [];
  if (targetRound === 0) {
    parts.push(
      `Row ${target.row + 1} and column ${target.col + 1} together already contain every letter except ${answer}, so ${answer} replaces the question mark.`,
    );
  } else {
    helpers.slice(0, 4).forEach((h, i) => {
      parts.push(
        `${i === 0 ? "First" : "Next"}, ${h.letter} must go in ${pos(h.row, h.col)} (the only letter missing from that row and column).`,
      );
    });
    parts.push(`Then row ${target.row + 1} and column ${target.col + 1} contain every letter except ${finalStep.letter}, so the answer is ${answer}.`);
  }

  const item: LatinSquareItem = {
    type: "latin-square",
    id: `ls-${seed}-${difficulty}`,
    seed,
    difficulty,
    grid,
    target,
    explanation: parts.join(" "),
    rulesUsed: [`deduction-depth-${targetRound}`],
  };
  return { item, key: { type: "latin-square", correct: answer } };
}
