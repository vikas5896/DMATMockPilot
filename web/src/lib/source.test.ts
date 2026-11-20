import { describe, expect, it } from "vitest";
import { describeVisit, parseSource, sourceChannel } from "./source";

const own = "www.dmatmockprep.com";
const at = (path: string) => new URL(`https://${own}${path}`);

describe("describeVisit", () => {
  it("uses utm tags first", () => {
    expect(describeVisit(at("/live-classes?utm_source=insta_reel3&utm_medium=social"), "", own)).toEqual({
      label: "insta_reel3 / social → /live-classes",
      tagged: true,
    });
  });
  it("records promo codes", () => {
    expect(describeVisit(at("/?code=riya50"), "https://instagram.com/", own)).toEqual({ label: "code RIYA50 → /", tagged: true });
  });
  it("falls back to the referring site", () => {
    expect(describeVisit(at("/packs"), "https://www.google.com/", own)).toEqual({ label: "google.com → /packs", tagged: false });
    expect(describeVisit(at("/"), "https://l.instagram.com/?u=x", own).label).toBe("instagram.com → /");
  });
  it("treats own site and no referrer as direct", () => {
    expect(describeVisit(at("/"), "", own).label).toBe("direct → /");
    expect(describeVisit(at("/"), "https://dmatmockprep.com/packs", own).label).toBe("direct → /");
  });
  it("strips odd characters", () => {
    expect(describeVisit(at("/?utm_source=%3Cscript%3E"), "", own).label).toBe("script → /");
  });
});

describe("parseSource / sourceChannel", () => {
  it("round-trips a cookie value", () => {
    const v = parseSource(encodeURIComponent("google.com → /packs"));
    expect(v).toBe("google.com → /packs");
    expect(sourceChannel(v)).toBe("google.com");
    expect(sourceChannel(null)).toBe("unknown (before tracking)");
    expect(parseSource("%E0%A4%A")).toBeNull();
  });
});
