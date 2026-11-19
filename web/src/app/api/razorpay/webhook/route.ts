import { fulfillPayment, markFailed, razorpayWebhookSecret } from "@/lib/payments";
import { verifyWebhookSignature } from "@/lib/razorpay-signature";

/**
 * Razorpay webhook (Dashboard → Account & Settings → Webhooks):
 *   URL     https://www.dmatmockprep.com/api/razorpay/webhook
 *   Secret  the same value as RAZORPAY_WEBHOOK_SECRET
 *   Events  payment.captured, order.paid, payment.failed
 * Unlocks the pack even when the student closed the browser right after paying.
 */
type PaymentEntity = { id: string; order_id: string; amount: number; error_description?: string | null };
type WebhookBody = { event?: string; payload?: { payment?: { entity?: PaymentEntity } } };

export async function POST(request: Request) {
  const raw = await request.text();
  if (!verifyWebhookSignature(raw, request.headers.get("x-razorpay-signature"), razorpayWebhookSecret())) {
    return Response.json({ error: "invalid signature" }, { status: 400 });
  }
  let body: WebhookBody;
  try {
    body = JSON.parse(raw) as WebhookBody;
  } catch {
    return Response.json({ error: "invalid body" }, { status: 400 });
  }
  const p = body.payload?.payment?.entity;
  if (!p?.order_id) return Response.json({ ok: true, ignored: true }); // e.g. payment links or other products

  try {
    if (body.event === "payment.captured" || body.event === "order.paid") {
      const r = await fulfillPayment(p.order_id, p.id, Math.round(p.amount / 100));
      return Response.json({ ok: true, result: r });
    }
    if (body.event === "payment.failed") {
      await markFailed(p.order_id, p.error_description || "failed");
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Razorpay webhook failed", e);
    return Response.json({ error: "server error" }, { status: 500 }); // Razorpay retries later
  }
}
