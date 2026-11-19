import { describe, expect, it } from "vitest";
import { cleanKey, describeKeys } from "./razorpay-keys";

describe("Razorpay key cleaning", () => {
  it("removes common paste mistakes", () => {
    expect(cleanKey("  abc123 \n", "X")).toBe("abc123");
    expect(cleanKey('"abc123"', "X")).toBe("abc123");
    expect(cleanKey("'abc123'", "X")).toBe("abc123");
    expect(cleanKey("RAZORPAY_KEY_SECRET=abc123", "RAZORPAY_KEY_SECRET")).toBe("abc123");
    expect(cleanKey('RAZORPAY_KEY_SECRET="abc123"', "RAZORPAY_KEY_SECRET")).toBe("abc123");
    expect(cleanKey(undefined, "X")).toBe("");
  });

  it("describes keys without revealing the secret", () => {
    const r = describeKeys("rzp_live_ABCDEFGHIJKLMN", "a1b2c3d4e5f6g7h8i9j0k1l2", "w");
    expect(r).toMatchObject({ mode: "live", idLooksRight: true, secretLength: 24, secretLooksRight: true, webhookSet: true });
    expect(r.idShown).toBe("rzp_live_AB…MN");
    expect(JSON.stringify(r)).not.toContain("a1b2c3");
    expect(describeKeys("", "", "").mode).toBe("missing");
    expect(describeKeys("rzp_live_ABC DEF", "has space", "").idLooksRight).toBe(false);
  });
});
