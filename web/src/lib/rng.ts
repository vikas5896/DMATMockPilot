/**
 * Small seeded pseudo-random generator (mulberry32).
 * Every generated question stores its seed, so the same seed always
 * rebuilds exactly the same question.
 */
export type Rng = {
  /** float in [0, 1) */
  next: () => number;
  /** integer in [min, max] inclusive */
  int: (min: number, max: number) => number;
  pick: <T>(items: readonly T[]) => T;
  shuffle: <T>(items: readonly T[]) => T[];
  chance: (p: number) => boolean;
};

export function createRng(seed: number): Rng {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1));
  const pick = <T,>(items: readonly T[]) => items[Math.floor(next() * items.length)];
  const shuffle = <T,>(items: readonly T[]) => {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const chance = (p: number) => next() < p;
  return { next, int, pick, shuffle, chance };
}

/** Derive a stable child seed, e.g. one per question in a test. */
export function childSeed(seed: number, index: number): number {
  let h = (seed ^ Math.imul(index + 1, 0x9e3779b1)) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x85ebca6b) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35) >>> 0;
  return (h ^ (h >>> 16)) >>> 0;
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}
