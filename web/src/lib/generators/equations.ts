import { createRng, type Rng } from "../rng";
import type { Difficulty, EquationsItem, GeneratedItem } from "../exam/types";

export const MIN_VALUE = 1;
export const MAX_VALUE = 20;

// ---------- tiny expression language ----------
type Op = "+" | "-" | "*" | "/";
export type Expr =
  | { k: "var"; v: string }
  | { k: "num"; n: number }
  | { k: "coef"; c: number; v: string } // 2A
  | { k: "bin"; op: Op; l: Expr; r: Expr };
export type Equation = { l: Expr; r: Expr };

const V = (v: string): Expr => ({ k: "var", v });
const N = (n: number): Expr => ({ k: "num", n });
const C = (c: number, v: string): Expr => ({ k: "coef", c, v });
const B = (op: Op, l: Expr, r: Expr): Expr => ({ k: "bin", op, l, r });

export function evaluate(e: Expr, env: Record<string, number>): number {
  switch (e.k) {
    case "var":
      return env[e.v];
    case "num":
      return e.n;
    case "coef":
      return e.c * env[e.v];
    case "bin": {
      const a = evaluate(e.l, env);
      const b = evaluate(e.r, env);
      if (e.op === "+") return a + b;
      if (e.op === "-") return a - b;
      if (e.op === "*") return a * b;
      return a / b;
    }
  }
}

const prec = (op: Op) => (op === "+" || op === "-" ? 1 : 2);
const SYMBOL: Record<Op, string> = { "+": "+", "-": "−", "*": "×", "/": "÷" };

export function formatExpr(e: Expr): string {
  if (e.k === "var") return e.v;
  if (e.k === "num") return String(e.n);
  if (e.k === "coef") return `${e.c}${e.v}`;
  const wrap = (child: Expr, right: boolean) => {
    const s = formatExpr(child);
    if (child.k !== "bin") return s;
    const p = prec(child.op), q = prec(e.op);
    const needs = p < q || (right && p === q && (e.op === "-" || e.op === "/"));
    return needs ? `(${s})` : s;
  };
  return `${wrap(e.l, false)} ${SYMBOL[e.op]} ${wrap(e.r, true)}`;
}

export const formatEquation = (eq: Equation) => `${formatExpr(eq.l)} = ${formatExpr(eq.r)}`;

function varsOf(e: Expr, out = new Set<string>()): Set<string> {
  if (e.k === "var" || e.k === "coef") out.add(e.v);
  if (e.k === "bin") {
    varsOf(e.l, out);
    varsOf(e.r, out);
  }
  return out;
}
export const eqVars = (eq: Equation) => [...varsOf(eq.r, varsOf(eq.l))];

const holds = (eq: Equation, env: Record<string, number>) =>
  Math.abs(evaluate(eq.l, env) - evaluate(eq.r, env)) < 1e-9;

/** All solutions with every variable in 1..20 (stops after `limit`). */
export function solveAll(
  eqs: Equation[],
  variables: string[],
  limit = 2,
): Record<string, number>[] {
  const eqInfo = eqs.map((eq) => ({ eq, vars: eqVars(eq) }));
  const found: Record<string, number>[] = [];
  const env: Record<string, number> = {};
  const assigned = new Set<string>();
  const rec = (i: number) => {
    if (found.length >= limit) return;
    if (i === variables.length) {
      found.push({ ...env });
      return;
    }
    const v = variables[i];
    assigned.add(v);
    // equations that become fully assigned at this variable
    const ready = eqInfo.filter((x) => x.vars.includes(v) && x.vars.every((w) => assigned.has(w)));
    for (let val = MIN_VALUE; val <= MAX_VALUE; val++) {
      env[v] = val;
      if (ready.every((x) => holds(x.eq, env))) rec(i + 1);
      if (found.length >= limit) break;
    }
    assigned.delete(v);
    delete env[v];
  };
  rec(0);
  return found;
}

// ---------- templates ----------
type Template = {
  arity: number;
  build: (rng: Rng, vs: string[], val: Record<string, number>) => Equation | null;
};
const ok = (n: number) => Number.isInteger(n) && n >= 1 && n <= 400;

const T = {
  // A = 6
  direct: { arity: 1, build: (_r, [a], v) => ({ l: V(a), r: N(v[a]) }) } as Template,
  // 7 + A = 14  |  A − 3 = 4  |  A + 5 = 12
  addConst: {
    arity: 1,
    build: (r, [a], v) => {
      const k = r.int(1, 12);
      const kind = r.int(0, 2);
      if (kind === 0) return { l: B("+", N(k), V(a)), r: N(v[a] + k) };
      if (kind === 1) return v[a] - k >= 1 ? { l: B("-", V(a), N(k)), r: N(v[a] - k) } : null;
      return { l: B("+", V(a), N(k)), r: N(v[a] + k) };
    },
  } as Template,
  // B − 3 = A  |  A + 2 = B
  linkConst: {
    arity: 2,
    build: (r, [a, b], v) => {
      const d = v[b] - v[a];
      if (d === 0) return { l: V(a), r: V(b) };
      return d > 0 ? { l: B("-", V(b), N(d)), r: V(a) } : r.chance(0.5)
        ? { l: B("+", V(b), N(-d)), r: V(a) }
        : { l: B("-", V(a), N(-d)), r: V(b) };
    },
  } as Template,
  // A + B = 17  |  B − A = 5
  sumConst: {
    arity: 2,
    build: (r, [a, b], v) =>
      r.chance(0.6)
        ? { l: B("+", V(a), V(b)), r: N(v[a] + v[b]) }
        : v[a] - v[b] >= 1
          ? { l: B("-", V(a), V(b)), r: N(v[a] - v[b]) }
          : null,
  } as Template,
  // 3 × A = 18  |  A ÷ 2 = 4
  mulConst: {
    arity: 1,
    build: (r, [a], v) => {
      const k = r.int(2, 5);
      if (r.chance(0.6)) return { l: B("*", N(k), V(a)), r: N(k * v[a]) };
      return v[a] % k === 0 ? { l: B("/", V(a), N(k)), r: N(v[a] / k) } : null;
    },
  } as Template,
  // B = 2A  |  B ÷ 2 = A
  ratio: {
    arity: 2,
    build: (r, [a, b], v) => {
      if (v[a] === v[b] || v[b] % v[a] !== 0) return null;
      const k = v[b] / v[a];
      if (k > 5) return null;
      return r.chance(0.5) ? { l: V(b), r: C(k, a) } : { l: B("/", V(b), N(k)), r: V(a) };
    },
  } as Template,
  // A × B = 24
  product: {
    arity: 2,
    build: (_r, [a, b], v) => (v[a] * v[b] <= 120 ? { l: B("*", V(a), V(b)), r: N(v[a] * v[b]) } : null),
  } as Template,
  // 2A − B = C  |  A + B − C = 9
  three: {
    arity: 3,
    build: (r, [a, b, c], v) => {
      if (r.chance(0.5)) {
        const k = r.int(2, 3);
        const lhs = k * v[a] - v[b];
        return lhs === v[c] ? { l: B("-", C(k, a), V(b)), r: V(c) } : ok(lhs) ? { l: B("-", C(k, a), V(b)), r: N(lhs) } : null;
      }
      const n = v[a] + v[b] - v[c];
      return ok(n) ? { l: B("-", B("+", V(a), V(b)), V(c)), r: N(n) } : null;
    },
  } as Template,
  // 18 − 2A = A  |  C + 5C − (13 − C) = 1-style mixes
  nested: {
    arity: 2,
    build: (r, [a, b], v) => {
      const k = r.int(2, 4);
      const n = v[b] + k * v[a];
      if (r.chance(0.5)) return ok(n) ? { l: B("-", N(n), C(k, a)), r: V(b) } : null;
      const m = r.int(v[b] + 1, v[b] + 15);
      const total = v[a] + k * v[a] - (m - v[b]);
      return ok(total) ? { l: B("-", B("+", V(a), C(k, a)), B("-", N(m), V(b))), r: N(total) } : null;
    },
  } as Template,
};

const PLAN: Record<Difficulty, { vars: number; anchors: Template[]; links: Template[]; chain: boolean }> = {
  low: { vars: 2, anchors: [T.direct, T.addConst], links: [T.linkConst, T.sumConst], chain: true },
  medium: {
    vars: 3,
    anchors: [T.addConst, T.mulConst],
    links: [T.linkConst, T.sumConst, T.ratio, T.product],
    chain: true,
  },
  high: {
    vars: 4,
    anchors: [T.mulConst, T.addConst],
    links: [T.ratio, T.product, T.three, T.nested, T.sumConst],
    chain: false,
  },
};

/** Solve step by step: repeatedly use an equation with exactly one unknown. */
export function chainSolve(eqs: Equation[], variables: string[]) {
  const known: Record<string, number> = {};
  const steps: { eq: Equation; v: string; value: number; usedKnown: string[] }[] = [];
  let progress = true;
  while (progress && Object.keys(known).length < variables.length) {
    progress = false;
    for (const eq of eqs) {
      const vs = eqVars(eq);
      const unknown = vs.filter((x) => !(x in known));
      if (unknown.length !== 1) continue;
      const v = unknown[0];
      const sols: number[] = [];
      for (let val = MIN_VALUE; val <= MAX_VALUE; val++) {
        if (holds(eq, { ...known, [v]: val })) sols.push(val);
      }
      if (sols.length === 1) {
        steps.push({ eq, v, value: sols[0], usedKnown: vs.filter((x) => x !== v) });
        known[v] = sols[0];
        progress = true;
      }
    }
  }
  return { steps, complete: Object.keys(known).length === variables.length };
}

function tryBuild(rng: Rng, difficulty: Difficulty) {
  const plan = PLAN[difficulty];
  const variables = ["A", "B", "C", "D"].slice(0, plan.vars);
  const val: Record<string, number> = {};
  for (const v of variables) val[v] = rng.int(MIN_VALUE, MAX_VALUE);

  const eqs: Equation[] = [];
  // one anchor on a single variable, then link the rest in a random order
  const order = rng.shuffle(variables);
  const anchor = rng.pick(plan.anchors).build(rng, [order[0]], val);
  if (!anchor) return null;
  eqs.push(anchor);
  for (let i = 1; i < order.length; i++) {
    const t = rng.pick(plan.links);
    const others = rng.shuffle(order.slice(0, i));
    const vs = [order[i], ...others].slice(0, t.arity);
    if (vs.length < t.arity) return null;
    const eq = t.build(rng, rng.shuffle(vs), val);
    if (!eq || !eqVars(eq).includes(order[i])) return null;
    eqs.push(eq);
  }
  const shown = rng.shuffle(eqs);
  const sols = solveAll(shown, variables);
  if (sols.length !== 1) return null;
  const chain = chainSolve(shown, variables);
  if (plan.chain && !chain.complete) return null;
  return { variables, eqs: shown, solution: sols[0] };
}

// ---------- range-based systems (the 1–20 limit decides the values) ----------
/** A "boundary" equation fixes its letters' values; returns the equation and the values it forces. */
type Bound = {
  arity: number;
  build: (rng: Rng, vs: string[]) => { eq: Equation; values: number[] };
};

const BOUNDS: Record<string, Bound> = {
  // B + C = 2  → both 1
  sumMin: { arity: 2, build: (_r, [a, b]) => ({ eq: { l: B("+", V(a), V(b)), r: N(2) }, values: [1, 1] }) },
  // A + B = 40 → both 20
  sumMax: { arity: 2, build: (_r, [a, b]) => ({ eq: { l: B("+", V(a), V(b)), r: N(40) }, values: [20, 20] }) },
  // A − B = 19 → A = 20, B = 1
  diffMax: { arity: 2, build: (_r, [a, b]) => ({ eq: { l: B("-", V(a), V(b)), r: N(19) }, values: [20, 1] }) },
  // A × B = 1 → both 1
  prodMin: { arity: 2, build: (_r, [a, b]) => ({ eq: { l: B("*", V(a), V(b)), r: N(1) }, values: [1, 1] }) },
  // A × B = 400 → both 20
  prodMax: { arity: 2, build: (_r, [a, b]) => ({ eq: { l: B("*", V(a), V(b)), r: N(400) }, values: [20, 20] }) },
  // 3A + B = 4 → both 1
  weighted: {
    arity: 2,
    build: (r, [a, b]) => {
      const k = r.int(2, 4);
      return { eq: { l: B("+", C(k, a), V(b)), r: N(k + 1) }, values: [1, 1] };
    },
  },
  // A + B + C = 3 → all 1
  sum3Min: {
    arity: 3,
    build: (_r, [a, b, c]) => ({ eq: { l: B("+", B("+", V(a), V(b)), V(c)), r: N(3) }, values: [1, 1, 1] }),
  },
  // A + B + C = 60 → all 20
  sum3Max: {
    arity: 3,
    build: (_r, [a, b, c]) => ({ eq: { l: B("+", B("+", V(a), V(b)), V(c)), r: N(60) }, values: [20, 20, 20] }),
  },
  // A + B = 39 → {19, 20} in some order: another equation must decide which
  near: {
    arity: 2,
    build: (r, [a, b]) => ({ eq: { l: B("+", V(a), V(b)), r: N(39) }, values: r.chance(0.5) ? [19, 20] : [20, 19] }),
  },
  // A − B = 18 → (20, 2) or (19, 1): another equation must decide which
  nearDiff: {
    arity: 2,
    build: (r, [a, b]) => ({ eq: { l: B("-", V(a), V(b)), r: N(18) }, values: r.chance(0.5) ? [20, 2] : [19, 1] }),
  },
};

const RANGE_PLAN: Record<Difficulty, { vars: number; bounds: Bound[]; links: Template[] }> = {
  // like the example: A + C = 10, B + C = 2
  low: {
    vars: 3,
    bounds: [BOUNDS.sumMin, BOUNDS.sumMax, BOUNDS.diffMax, BOUNDS.prodMin],
    links: [T.sumConst, T.linkConst],
  },
  medium: {
    vars: 3,
    bounds: [BOUNDS.sumMin, BOUNDS.sumMax, BOUNDS.diffMax, BOUNDS.prodMax, BOUNDS.weighted, BOUNDS.near],
    links: [T.sumConst, T.linkConst, T.ratio, T.product],
  },
  high: {
    vars: 4,
    bounds: [BOUNDS.weighted, BOUNDS.sum3Min, BOUNDS.sum3Max, BOUNDS.near, BOUNDS.nearDiff, BOUNDS.prodMax],
    links: [T.sumConst, T.ratio, T.product, T.three, T.nested],
  },
};

function tryBuildRange(rng: Rng, difficulty: Difficulty) {
  const plan = RANGE_PLAN[difficulty];
  const variables = ["A", "B", "C", "D"].slice(0, plan.vars);
  const order = rng.shuffle(variables);
  const bound = rng.pick(plan.bounds);
  // boundary letters in alphabetical order reads naturally ("A + C = 10")
  const boundVars = order.slice(0, bound.arity).sort();
  order.splice(0, bound.arity, ...boundVars);
  const { eq: boundEq, values } = bound.build(rng, boundVars);
  const val: Record<string, number> = {};
  order.forEach((v, i) => (val[v] = i < bound.arity ? values[i] : rng.int(MIN_VALUE, MAX_VALUE)));

  const eqs: Equation[] = [boundEq];
  // tie every remaining letter to letters already used
  for (let i = bound.arity; i < order.length; i++) {
    const t = rng.pick(plan.links);
    const vs = [order[i], ...rng.shuffle(order.slice(0, i))].slice(0, t.arity);
    if (vs.length < t.arity) return null;
    const eq = t.build(rng, rng.shuffle(vs), val);
    if (!eq || !eqVars(eq).includes(order[i])) return null;
    eqs.push(eq);
  }
  // a "near" bound leaves two options: add equations until exactly one solution remains
  let sols = solveAll(eqs, variables);
  while (sols.length > 1 && eqs.length < variables.length) {
    const t = rng.pick(plan.links);
    const eq = t.build(rng, rng.shuffle(variables).slice(0, t.arity), val);
    if (!eq) return null;
    eqs.push(eq);
    sols = solveAll(eqs, variables);
  }
  if (sols.length !== 1) return null;
  // it must really need the 1–20 range, not just substitution
  if (chainSolve(eqs, variables).complete) return null;
  return { variables, eqs: rng.shuffle(eqs), solution: sols[0] };
}

// ---------- step-by-step solution text ----------
type Step =
  | { kind: "single"; eq: Equation; assigned: Record<string, number>; used: string[] }
  | { kind: "range"; eq: Equation; assigned: Record<string, number>; used: string[] }
  | { kind: "combine"; eq: Equation; options: Record<string, number>[]; assigned: Record<string, number> };

/** Combinations of the unknown letters in `eq` (1–20) that make it true, given the known ones. */
function combos(eq: Equation, unknown: string[], known: Record<string, number>, cap = 8001) {
  const out: Record<string, number>[] = [];
  const env = { ...known };
  const rec = (i: number) => {
    if (out.length >= cap) return;
    if (i === unknown.length) {
      if (holds(eq, env)) out.push(Object.fromEntries(unknown.map((u) => [u, env[u]])));
      return;
    }
    for (let v = MIN_VALUE; v <= MAX_VALUE; v++) {
      env[unknown[i]] = v;
      rec(i + 1);
    }
  };
  rec(0);
  return out;
}

/** Solve like a student: one equation at a time, using the 1–20 range where needed. */
export function stepSolve(eqs: Equation[], variables: string[], solution: Record<string, number>): Step[] {
  const known: Record<string, number> = {};
  const steps: Step[] = [];
  const isDone = () => variables.every((v) => v in known);
  while (!isDone()) {
    let progressed = false;
    for (const eq of eqs) {
      const vs = eqVars(eq);
      const unknown = vs.filter((v) => !(v in known));
      if (unknown.length === 0 || unknown.length > 3) continue;
      const found = combos(eq, unknown, known);
      const fixed: Record<string, number> = {};
      for (const u of unknown) {
        const vals = new Set(found.map((f) => f[u]));
        if (vals.size === 1) fixed[u] = [...vals][0];
      }
      if (Object.keys(fixed).length === 0) continue;
      const used = vs.filter((v) => v in known);
      steps.push({ kind: unknown.length === 1 ? "single" : "range", eq, assigned: fixed, used });
      Object.assign(known, fixed);
      progressed = true;
      break;
    }
    if (progressed) continue;
    // no single equation decides a letter: take the one with the fewest options and test them
    let best: { eq: Equation; options: Record<string, number>[] } | null = null;
    for (const eq of eqs) {
      const unknown = eqVars(eq).filter((v) => !(v in known));
      if (unknown.length === 0 || unknown.length > 3) continue;
      const options = combos(eq, unknown, known, 7);
      if (options.length > 0 && (!best || options.length < best.options.length)) best = { eq, options };
    }
    const rest = Object.fromEntries(variables.filter((v) => !(v in known)).map((v) => [v, solution[v]]));
    steps.push({ kind: "combine", eq: best?.eq ?? eqs[0], options: best?.options ?? [], assigned: rest });
    Object.assign(known, rest);
  }
  return steps;
}

const list = (a: Record<string, number>) => {
  const parts = Object.entries(a).map(([k, v]) => `${k} = ${v}`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}` : parts[0];
};

function explain(steps: Step[], solution: Record<string, number>): string {
  return steps
    .map((s) => {
      const eq = formatEquation(s.eq);
      if (s.kind === "single") {
        if (s.used.length === 0) return `From ${eq}: ${list(s.assigned)}.`;
        return `Put ${list(Object.fromEntries(s.used.map((u) => [u, solution[u]])))} into ${eq}: ${list(s.assigned)}.`;
      }
      if (s.kind === "range") {
        const withKnown = s.used.length
          ? `With ${list(Object.fromEntries(s.used.map((u) => [u, solution[u]])))}, `
          : "";
        return `${withKnown}${withKnown ? "every" : "Every"} letter is a whole number from 1 to 20, so ${eq} only works with ${list(s.assigned)}.`;
      }
      if (s.options.length > 0 && s.options.length <= 6) {
        const opts = s.options.map(list).join(", or ");
        return `${eq} allows only a few options (${opts}); checking them in the other equations leaves ${list(s.assigned)}.`;
      }
      return `Substitute one equation into another; solving them together gives ${list(s.assigned)}.`;
    })
    .join(" ");
}

// ---------- public ----------
export type EquationStyle = "standard" | "range";

export function generateEquations(
  seed: number,
  difficulty: Difficulty,
  style: EquationStyle = "standard",
): GeneratedItem {
  const rng = createRng(seed);
  const build = style === "range" ? tryBuildRange : tryBuild;
  let built = null;
  for (let attempt = 0; attempt < 3000 && !built; attempt++) built = build(rng, difficulty);
  if (!built) throw new Error(`equations: could not build ${style} ${difficulty} item for seed ${seed}`);
  const { variables, eqs, solution } = built;
  const steps = stepSolve(eqs, variables, solution);

  const item: EquationsItem = {
    type: "equations",
    id: `eq-${seed}-${difficulty}-${style}`,
    seed,
    difficulty,
    style,
    equations: eqs.map(formatEquation),
    variables,
    explanation: explain(steps, solution),
    rulesUsed: [
      style,
      ...new Set(steps.map((s) => s.kind)),
      `${variables.length}-variables`,
    ],
  };
  return { item, key: { type: "equations", correct: solution } };
}
