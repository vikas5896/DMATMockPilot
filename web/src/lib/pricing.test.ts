import { describe, expect, it } from "vitest";
import {
  applyDiscount,
  chooseOffer,
  itemKey,
  normalizeCode,
  parseItem,
  promoCovers,
  PLAN_PACK,
  promoProblem,
  todayInIndia,
  type Item,
  type PromoRule,
} from "./pricing";

const rule: PromoRule = { active: true, percentOff: 50, appliesToAll: true, packSlugs: [], classSlugs: [], maxUses: null, expiresOn: null };
const FULL: Item = { kind: "pack", slug: "full-pack" };
const COURSE: Item = { kind: "class", slug: "core-crash-course-jan" };

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
    expect(promoProblem(rule, FULL, 0, "2026-11-20")).toBeNull();
    expect(promoProblem(null, FULL, 0)).toMatch(/does not exist/);
    expect(promoProblem({ ...rule, active: false }, FULL, 0)).toMatch(/no longer active/);
    expect(promoProblem({ ...rule, expiresOn: "2026-11-19" }, FULL, 0, "2026-11-20")).toMatch(/expired/);
    expect(promoProblem({ ...rule, expiresOn: "2026-11-20" }, FULL, 0, "2026-11-20")).toBeNull();
    expect(promoProblem({ ...rule, maxUses: 3 }, FULL, 3)).toMatch(/fully used/);
  });

  it("uses the Indian date for expiry", () => {
    // 20:00 UTC on 19 Nov is already 20 Nov in India
    expect(todayInIndia(new Date("2026-11-19T20:00:00Z"))).toBe("2026-11-20");
  });
});

describe("where a code is valid: packs and live classes", () => {
  it("a code for everything works for packs and classes", () => {
    expect(promoCovers(rule, FULL)).toBe(true);
    expect(promoCovers(rule, COURSE)).toBe(true);
  });

  it("a code limited to ticked items works only there", () => {
    const onlyFull = { ...rule, appliesToAll: false, packSlugs: ["full-pack"] };
    expect(promoProblem(onlyFull, FULL, 0)).toBeNull();
    expect(promoProblem(onlyFull, { kind: "pack", slug: "section-pack" }, 0)).toMatch(/not valid for this pack/);
    expect(promoProblem(onlyFull, COURSE, 0)).toMatch(/not valid for this live class/);

    const onlyCourse = { ...rule, appliesToAll: false, classSlugs: ["core-crash-course-jan"] };
    expect(promoProblem(onlyCourse, COURSE, 0)).toBeNull();
    expect(promoProblem(onlyCourse, FULL, 0)).toMatch(/not valid for this pack/);
  });

  it("a code limited to nothing is valid nowhere", () => {
    const none = { ...rule, appliesToAll: false };
    expect(promoCovers(none, FULL)).toBe(false);
    expect(promoCovers(none, COURSE)).toBe(false);
  });

  it("item keys round-trip, and bare slugs mean packs", () => {
    expect(parseItem("class:core-crash-course-jan")).toEqual(COURSE);
    expect(parseItem("pack:full-pack")).toEqual(FULL);
    expect(parseItem("full-pack")).toEqual(FULL);
    expect(itemKey(COURSE)).toBe("class:core-crash-course-jan");
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

describe("Complete Germany Plan and promo codes", () => {
  const PLAN = { kind: "pack" as const, slug: PLAN_PACK };
  it("is not covered by codes for all packs (e.g. the automatic PREP20)", () => {
    expect(promoCovers({ appliesToAll: true, packSlugs: [], classSlugs: [] }, PLAN)).toBe(false);
  });
  it("is covered only when the code ticks it explicitly", () => {
    expect(promoCovers({ appliesToAll: true, packSlugs: [PLAN_PACK], classSlugs: [] }, PLAN)).toBe(true);
    expect(promoCovers({ appliesToAll: false, packSlugs: [PLAN_PACK], classSlugs: [] }, PLAN)).toBe(true);
    expect(promoCovers({ appliesToAll: false, packSlugs: ["full-pack"], classSlugs: [] }, PLAN)).toBe(false);
  });
});
