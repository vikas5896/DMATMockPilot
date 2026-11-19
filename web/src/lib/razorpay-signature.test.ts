import { describe, expect, it } from "vitest";
import { signForTest, verifyPaymentSignature, verifyWebhookSignature } from "./razorpay-signature";

describe("Razorpay signatures", () => {
  const secret = "test_secret_123";

  it("accepts a correct checkout signature and rejects tampered ones", () => {
    const sig = signForTest(secret, "order_ABC|pay_XYZ");
    expect(verifyPaymentSignature("order_ABC", "pay_XYZ", sig, secret)).toBe(true);
    expect(verifyPaymentSignature("order_ABC", "pay_OTHER", sig, secret)).toBe(false);
    expect(verifyPaymentSignature("order_ABC", "pay_XYZ", sig, "wrong_secret")).toBe(false);
    expect(verifyPaymentSignature("order_ABC", "pay_XYZ", "", secret)).toBe(false);
    expect(verifyPaymentSignature("order_ABC", "pay_XYZ", sig, "")).toBe(false);
  });

  it("checks webhook bodies byte for byte", () => {
    const body = JSON.stringify({ event: "payment.captured", payload: {} });
    const sig = signForTest(secret, body);
    expect(verifyWebhookSignature(body, sig, secret)).toBe(true);
    expect(verifyWebhookSignature(body + " ", sig, secret)).toBe(false);
    expect(verifyWebhookSignature(body, null, secret)).toBe(false);
    expect(verifyWebhookSignature(body, sig, "")).toBe(false);
  });
});
