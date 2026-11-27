import { describe, expect, it } from "vitest";
import { checkDocument, MAX_DOC_BYTES, safeFileName, validateEvaluation } from "./evaluation";

const good = {
  degree: " B.Tech Mechanical ",
  university: "VIT",
  score: "7.8/10",
  gradYear: "2025",
  targetCourse: "M.Sc. Mechatronics",
  intake: "Winter 2027",
};

describe("validateEvaluation", () => {
  it("accepts the required fields and trims them", () => {
    const r = validateEvaluation(good);
    expect(r.ok && r.details.degree).toBe("B.Tech Mechanical");
  });
  it("rejects a missing required field", () => {
    const r = validateEvaluation({ ...good, score: "  " });
    expect(r.ok).toBe(false);
  });
  it("keeps optional fields and the message only when filled", () => {
    const r = validateEvaluation({ ...good, workExperience: "", message: "Hi" });
    expect(r.ok && r.details.workExperience).toBeFalsy();
    expect(r.ok && r.details.message).toBe("Hi");
  });
  it("rejects over-long text", () => {
    expect(validateEvaluation({ ...good, degree: "x".repeat(151) }).ok).toBe(false);
  });
});

describe("checkDocument", () => {
  const pdf = new Uint8Array([0x25, 0x50, 0x44, 0x46, 1, 2]);
  it("detects PDF, PNG and JPG from the bytes", () => {
    expect(checkDocument("a.pdf", pdf)).toEqual({ ok: true, type: "application/pdf" });
    expect(checkDocument("a.png", new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0]))).toEqual({ ok: true, type: "image/png" });
    expect(checkDocument("a.jpg", new Uint8Array([0xff, 0xd8, 0xff, 0xe0]))).toEqual({ ok: true, type: "image/jpeg" });
  });
  it("rejects other files even with a PDF name", () => {
    expect(checkDocument("a.pdf", new TextEncoder().encode("<html>")).ok).toBe(false);
  });
  it("rejects empty and too-large files", () => {
    expect(checkDocument("a.pdf", new Uint8Array()).ok).toBe(false);
    const big = new Uint8Array(MAX_DOC_BYTES + 1);
    big.set([0x25, 0x50, 0x44, 0x46]);
    expect(checkDocument("a.pdf", big).ok).toBe(false);
  });
  it("makes file names safe for downloads", () => {
    expect(safeFileName('sem "results"\r\n.pdf')).toBe("sem _results_.pdf");
  });
});
