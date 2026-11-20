import { describe, expect, it } from "vitest";
import { applyDiscount, chooseOffer, normalizeCode, promoProblem, todayInIndia, type PromoRule } from "./pricing";

const rule: PromoRule = { active: true, percentOff: 50, packSlugs: [], maxUses: null, expiresOn: null };

describe("promo pricing", () => {
  it("50% off ₹1,599 is ₹799 (rounded down to whole rupees)", () => {
    expect(applyDiscount(1599, 50)).toBe(799);
    expect(applyDiscount(499, 50)).toBe(249);
    expect(applyDiscount(1599, 0)).toBe(1599);
    expect(applyDiscount(1599, 100)).toBe(0);
    expect(applyDiscount(1599, 150)).toBe(0);
  });

  it("normalises codes typed in any way", () => {
    expect(normalizeCode("  riya50 ")).toBe("RIYA50");
    expect(normalizeCode("aman-50!")).toBe("AMAN-50");
  });

  it("accepts a valid code and explains invalid ones", () => {
    expect(promoProblem(rule, "full-pack", 0, "2026-11-20")).toBeNull();
    expect(promoProblem(null, "full-pack", 0)).toMatch(/does not exist/);
    expect(promoProblem({ ...rule, active: false }, "full-pack", 0)).toMatch(/no longer active/);
    expect(promoProblem({ ...rule, expiresOn: "2026-11-19" }, "full-pack", 0, "2026-11-20")).toMatch(/expired/);
    expect(promoProblem({ ...rule, expiresOn: "2026-11-20" }, "full-pack", 0, "2026-11-20")).toBeNull();
    expect(promoProblem({ ...rule, maxUses: 3 }, "full-pack", 3)).toMatch(/fully used/);
    expect(promoProblem({ ...rule, packSlugs: ["section-pack"] }, "full-pack", 0)).toMatch(/not valid for this pack/);
  });

  it("uses the Indian date for expiry", () => {
    // 20:00 UTC on 19 Nov is already 20 Nov in India
    expect(todayInIndia(new Date("2026-11-19T20:00:00Z"))).toBe("2026-11-20");
  });
});

describe("automatic offer and entered codes", () => {
  it("an entered code with a bigger discount replaces the automatic offer", () => {
    expect(chooseOffer(50, 20)).toBe("entered");
    expect(applyDiscount(1599, 20)).toBe(1279);
  });
  it("the automatic offer stays when the entered code is not better", () => {
    expect(chooseOffer(10, 20)).toBe("auto");
    expect(chooseOffer(20, 20)).toBe("auto");
  });
  it("without an automatic offer, the entered code is used", () => {
    expect(chooseOffer(10, null)).toBe("entered");
  });
});
