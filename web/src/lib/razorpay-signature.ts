import { createHmac, timingSafeEqual } from "node:crypto";

const hmac = (secret: string, data: string) => createHmac("sha256", secret).update(data).digest("hex");

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Checkout success: Razorpay signs "order_id|payment_id" with the key secret. */
export function verifyPaymentSignature(orderId: string, paymentId: string, signature: string, keySecret: string): boolean {
  if (!orderId || !paymentId || !signature || !keySecret) return false;
  return safeEqual(hmac(keySecret, `${orderId}|${paymentId}`), signature);
}

/** Webhooks: Razorpay signs the raw request body with the webhook secret (header X-Razorpay-Signature). */
export function verifyWebhookSignature(rawBody: string, signature: string | null, webhookSecret: string): boolean {
  if (!signature || !webhookSecret) return false;
  return safeEqual(hmac(webhookSecret, rawBody), signature);
}

/** Exported for tests and for simulating webhooks locally. */
export const signForTest = hmac;
