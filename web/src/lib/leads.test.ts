import { describe, expect, it } from "vitest";
import { validateLead } from "./leads";

const ok = { name: "Asha Rao", email: "asha@example.com", interest: "live-classes" as const, consent: true };

describe("enquiry validation", () => {
  it("accepts a complete enquiry", () => {
    expect(validateLead(ok)).toBeNull();
    expect(validateLead({ ...ok, phone: "+91 98765 43210", message: "Hi" })).toBeNull();
  });

  it("rejects missing or invalid fields", () => {
    expect(validateLead({ ...ok, name: "" })).toMatch(/name/);
    expect(validateLead({ ...ok, email: "not-an-email" })).toMatch(/email/);
    expect(validateLead({ ...ok, phone: "abc" })).toMatch(/phone/);
    expect(validateLead({ ...ok, interest: "nonsense" as never })).toMatch(/interested/);
    expect(validateLead({ ...ok, consent: false })).toMatch(/contacted/);
    expect(validateLead({ ...ok, message: "x".repeat(2001) })).toMatch(/too long/);
  });
});
