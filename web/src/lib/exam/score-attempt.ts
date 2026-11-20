import { buildSubtest } from "@/lib/generators";
import { childSeed } from "@/lib/rng";
import { scoreSubtest } from "./scoring";
import { TESTS, type Attempt } from "./tests";

/** Score an attempt from its seed and answers (used on the server, so it cannot be faked in the browser). */
export function scoreAttempt(a: Attempt): { score: number; max: number } {
  let score = 0;
  let max = 0;
  TESTS[a.kind].subtests.forEach((spec, i) => {
    const items = buildSubtest(spec, childSeed(a.seed, i + 1), a.textSet ?? 1);
    const s = scoreSubtest(
      items.map((g) => g.key),
      (a.answers[i] ?? []).map((x) => x ?? undefined),
    );
    score += s.correct;
    max += s.total;
  });
  return { score, max };
}
