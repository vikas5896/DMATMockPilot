import { createRng, type Rng } from "../rng";
import type {
  Difficulty,
  FigColor,
  Figure,
  FigureSequenceItem,
  Frame,
  GeneratedItem,
  Shape,
} from "../exam/types";

export const SIZE = 4;
const FRAMES = 6; // 4 shown + 2 to find
const COLORS: FigColor[] = ["green", "blue", "red", "yellow"];
const ORIENTED: Shape[] = ["arrow", "triangle"];
const SYMMETRIC: Shape[] = ["diamond", "circle", "square"];

/** Outer ring of the 4×4 grid, clockwise from the top-left corner. */
export const RING: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3], [3, 2], [3, 1], [3, 0], [2, 0], [1, 0],
];

type Motion =
  | { kind: "line"; dr: number; dc: number; step: number; grow: boolean }
  | { kind: "ring"; dir: 1 | -1; step: number; grow: boolean }
  | { kind: "static" };

type Spec = {
  shape: Shape;
  colors: FigColor[]; // cycle; length 1 = never changes
  start: { row: number; col: number };
  rot0: number;
  spin: number; // degrees per step: 0, 90, -90, 180
  motion: Motion;
};

const isOriented = (s: Shape) => ORIENTED.includes(s);
const norm = (deg: number) => ((deg % 360) + 360) % 360;

/** Simulate all 6 frames of one figure. */
function simulate(spec: Spec): Figure[] {
  const out: Figure[] = [];
  let { row, col } = spec.start;
  let dr = spec.motion.kind === "line" ? spec.motion.dr : 0;
  let dc = spec.motion.kind === "line" ? spec.motion.dc : 0;
  let ringIdx = RING.findIndex(([r, c]) => r === row && c === col);
  let rot = spec.rot0;
  for (let f = 0; f < FRAMES; f++) {
    out.push({
      shape: spec.shape,
      color: spec.colors[f % spec.colors.length],
      row,
      col,
      rot: isOriented(spec.shape) ? norm(rot) : 0,
    });
    // transition f -> f+1
    const m = spec.motion;
    if (m.kind === "line") {
      const steps = m.step + (m.grow ? f : 0);
      for (let s = 0; s < steps; s++) {
        if (row + dr < 0 || row + dr >= SIZE) dr = -dr;
        if (col + dc < 0 || col + dc >= SIZE) dc = -dc;
        row += dr;
        col += dc;
      }
    } else if (m.kind === "ring") {
      const steps = m.step + (m.grow ? f : 0);
      ringIdx = (((ringIdx + m.dir * steps) % RING.length) + RING.length) % RING.length;
      [row, col] = RING[ringIdx];
    }
    rot += spec.spin;
  }
  return out;
}

const figKey = (f: Figure) => `${f.shape}|${f.color}|${f.row}|${f.col}|${f.rot}`;
export const frameKey = (fr: Frame) => fr.map(figKey).sort().join(";");
const noOverlap = (fr: Frame) => new Set(fr.map((f) => `${f.row},${f.col}`)).size === fr.length;

function frames(specs: Spec[]): Frame[] {
  const per = specs.map(simulate);
  return Array.from({ length: FRAMES }, (_, f) => per.map((figs) => figs[f]));
}

// ---------- random specs by difficulty ----------
const DIRS: [number, number][] = [
  [-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1],
];

type Knobs = { figures: [number, number]; grow: number; spin: number; color: number; ring: number; bigStep: number };
const KNOBS: Record<Difficulty, Knobs> = {
  low: { figures: [1, 1], grow: 0, spin: 0.15, color: 0.2, ring: 0.3, bigStep: 0.15 },
  medium: { figures: [1, 2], grow: 0.35, spin: 0.4, color: 0.35, ring: 0.35, bigStep: 0.25 },
  high: { figures: [2, 3], grow: 0.4, spin: 0.5, color: 0.45, ring: 0.35, bigStep: 0.3 },
};

function randomSpec(rng: Rng, k: Knobs, usedShapes: Set<string>): Spec {
  const wantSpin = rng.chance(k.spin);
  const shapePool = (wantSpin ? ORIENTED : [...SYMMETRIC, ...ORIENTED]).filter((s) => !usedShapes.has(s));
  const shape = rng.pick(shapePool.length ? shapePool : ORIENTED);
  usedShapes.add(shape);
  const base = rng.pick(COLORS);
  const colors: FigColor[] = rng.chance(k.color)
    ? rng.chance(0.6)
      ? [base, rng.pick(COLORS.filter((c) => c !== base))]
      : rng.shuffle(COLORS).slice(0, 3)
    : [base];
  const grow = rng.chance(k.grow);
  const step = grow ? 1 : rng.chance(k.bigStep) ? 2 : 1;
  let motion: Motion;
  let start: { row: number; col: number };
  if (rng.chance(k.ring)) {
    const idx = rng.int(0, RING.length - 1);
    start = { row: RING[idx][0], col: RING[idx][1] };
    motion = { kind: "ring", dir: rng.chance(0.5) ? 1 : -1, step, grow };
  } else {
    const [dr, dc] = rng.pick(DIRS);
    start = { row: rng.int(0, SIZE - 1), col: rng.int(0, SIZE - 1) };
    motion = { kind: "line", dr, dc, step, grow };
  }
  const spin = isOriented(shape) && wantSpin ? rng.pick([90, -90, 180]) : 0;
  return { shape, colors, start, rot0: rng.pick([0, 90, 180, 270]), spin, motion };
}

/** Every figure must visibly change each step, figures never overlap, and the line must not repeat early. */
function valid(specs: Spec[], fr: Frame[]): boolean {
  if (!fr.every(noOverlap)) return false;
  for (let f = 1; f < FRAMES; f++) {
    for (let i = 0; i < specs.length; i++) {
      const a = fr[f - 1][i], b = fr[f][i];
      if (a.row === b.row && a.col === b.col && a.rot === b.rot && a.color === b.color) return false;
    }
  }
  const keys = fr.map(frameKey);
  return new Set(keys).size === FRAMES; // no repeated picture, so the answer is not a copy
}

// ---------- wrong options ----------
function mutations(rng: Rng, specs: Spec[]): Spec[][] {
  const out: Spec[][] = [];
  specs.forEach((s, i) => {
    const swap = (patch: Partial<Spec>) => out.push(specs.map((x, j) => (j === i ? { ...x, ...patch } : x)));
    const m = s.motion;
    if (m.kind === "line") {
      swap({ motion: { ...m, grow: !m.grow } });
      swap({ motion: { ...m, step: m.step === 1 ? 2 : 1 } });
      swap({ motion: { ...m, dr: m.dc, dc: m.dr } });
      swap({ motion: { ...m, dr: -m.dr, dc: -m.dc } });
    } else if (m.kind === "ring") {
      swap({ motion: { ...m, grow: !m.grow } });
      swap({ motion: { ...m, dir: m.dir === 1 ? -1 : 1 } });
      swap({ motion: { ...m, step: m.step + 1 } });
    }
    if (s.spin !== 0) {
      swap({ spin: -s.spin });
      swap({ spin: s.spin === 180 ? 90 : 180 });
    } else if (isOriented(s.shape)) {
      swap({ spin: rng.pick([90, -90]) });
    }
    if (s.colors.length > 1) swap({ colors: [...s.colors].reverse() });
  });
  return out;
}

function nudges(rng: Rng, fr: Frame): Frame[] {
  const out: Frame[] = [];
  fr.forEach((fig, i) => {
    for (const [dr, dc] of DIRS) {
      const r = fig.row + dr, c = fig.col + dc;
      if (r < 0 || c < 0 || r >= SIZE || c >= SIZE) continue;
      out.push(fr.map((g, j) => (j === i ? { ...g, row: r, col: c } : g)));
    }
    if (isOriented(fig.shape)) out.push(fr.map((g, j) => (j === i ? { ...g, rot: norm(g.rot + 90) } : g)));
    const color = rng.pick(COLORS.filter((c) => c !== fig.color));
    out.push(fr.map((g, j) => (j === i ? { ...g, color } : g)));
  });
  return rng.shuffle(out);
}

function buildOptions(
  rng: Rng,
  specs: Spec[],
  truth: Frame[],
  f: number,
): { options: Frame[]; answer: number } | null {
  const correct = truth[f];
  const ck = frameKey(correct);
  const shownKey = truth.slice(0, 4).map(frameKey).join("/");
  const seen = new Set([ck]);
  const pool: Frame[] = [];
  const add = (fr: Frame) => {
    const k = frameKey(fr);
    if (seen.has(k) || !noOverlap(fr)) return;
    seen.add(k);
    pool.push(fr);
  };
  for (const ms of rng.shuffle(mutations(rng, specs))) {
    const alt = frames(ms);
    // a wrong rule that also explains the 4 shown pictures would be a second correct answer
    if (alt.slice(0, 4).map(frameKey).join("/") === shownKey) continue;
    add(alt[f]);
  }
  for (const fr of nudges(rng, correct)) add(fr);
  if (pool.length < 2) return null;
  // pool starts with rule-based mistakes (most plausible), then small nudges
  const first = pool[0];
  const second = pool[1 + rng.int(0, Math.min(pool.length - 2, 3))];
  const options = rng.shuffle([correct, first, second]);
  return { options, answer: options.findIndex((o) => frameKey(o) === ck) };
}

// ---------- explanation ----------
const DIR_NAME: Record<string, string> = {
  "-1,0": "up", "1,0": "down", "0,-1": "left", "0,1": "right",
  "-1,-1": "diagonally up-left", "-1,1": "diagonally up-right", "1,-1": "diagonally down-left", "1,1": "diagonally down-right",
};

function describe(s: Spec): { text: string; rules: string[] } {
  const name = `${s.colors[0]} ${s.shape}`;
  const rules: string[] = [];
  const parts: string[] = [];
  const m = s.motion;
  const stepWords = (step: number, grow: boolean) =>
    grow ? `${step} field, then ${step + 1}, then ${step + 2} (one more each time)` : `${step} field${step > 1 ? "s" : ""} each time`;
  if (m.kind === "line") {
    const diag = m.dr !== 0 && m.dc !== 0;
    parts.push(`moves ${DIR_NAME[`${m.dr},${m.dc}`]} by ${stepWords(m.step, m.grow)} and bounces off the edge`);
    rules.push(diag ? "diagonal" : "straight", "bounce");
    if (m.grow) rules.push("growing-steps");
  } else if (m.kind === "ring") {
    parts.push(`runs ${m.dir === 1 ? "clockwise" : "anticlockwise"} along the outer border by ${stepWords(m.step, m.grow)}`);
    rules.push("border-path");
    if (m.grow) rules.push("growing-steps");
  }
  if (s.spin !== 0) {
    parts.push(s.spin === 180 ? "turns 180°" : `turns 90° ${s.spin > 0 ? "clockwise" : "anticlockwise"}`);
    rules.push("rotation");
  }
  if (s.colors.length > 1) {
    parts.push(`changes colour in the order ${s.colors.join(" → ")}`);
    rules.push("colour");
  }
  return { text: `The ${name} ${parts.join(", ")}.`, rules };
}

// ---------- public ----------
export function generateFigureSequence(seed: number, difficulty: Difficulty): GeneratedItem {
  const rng = createRng(seed);
  const k = KNOBS[difficulty];
  for (let attempt = 0; attempt < 500; attempt++) {
    const count = rng.int(k.figures[0], k.figures[1]);
    const used = new Set<string>();
    const specs = Array.from({ length: count }, () => randomSpec(rng, k, used));
    const fr = frames(specs);
    if (!valid(specs, fr)) continue;
    const o5 = buildOptions(rng, specs, fr, 4);
    const o6 = buildOptions(rng, specs, fr, 5);
    if (!o5 || !o6) continue;
    const described = specs.map(describe);
    const item: FigureSequenceItem = {
      type: "figure-sequence",
      id: `fs-${seed}-${difficulty}`,
      seed,
      difficulty,
      shown: fr.slice(0, 4),
      options: [o5.options, o6.options],
      explanation: described.map((d) => d.text).join(" "),
      rulesUsed: [...new Set(described.flatMap((d) => d.rules))],
    };
    return { item, key: { type: "figure-sequence", correct: [o5.answer, o6.answer] } };
  }
  throw new Error(`figure-sequence: could not build ${difficulty} item for seed ${seed}`);
}

/** Exposed for tests: rebuild the true 5th and 6th frames from the item's rule simulation. */
export const __test = { simulate, frames, valid, RING };
