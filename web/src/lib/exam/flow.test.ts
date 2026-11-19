import { describe, expect, it } from "vitest";
import { afterSubtest, newAttempt } from "./tests";

describe("exam flow", () => {
  it("full mock: 3 Core subtests, then a 30-minute break, then the Subject Module, then results", () => {
    let a = newAttempt("full", 1);
    const t = 1_000_000;
    const seen: string[] = [];
    for (let i = 0; i < 4; i++) {
      a = afterSubtest({ ...a, status: "running" }, t);
      seen.push(`${a.stage}:${a.status}`);
    }
    expect(seen).toEqual(["1:intro", "2:intro", "3:break", "3:finished"]);
  });

  it("the break lasts 30 minutes", () => {
    const a = afterSubtest({ ...newAttempt("full", 1), stage: 2, status: "running" }, 0);
    expect(a.status).toBe("break");
    expect(a.deadline).toBe(30 * 60 * 1000);
  });

  it("Core-only and Subject-only tests have no break", () => {
    let c = newAttempt("core", 1);
    for (let i = 0; i < 2; i++) c = afterSubtest(c, 0);
    expect(c.status).toBe("intro");
    expect(afterSubtest(c, 0).status).toBe("finished");
    expect(afterSubtest(newAttempt("subject", 1), 0).status).toBe("finished");
  });
});
