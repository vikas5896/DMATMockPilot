import "server-only";
import { and, eq, inArray, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { accessRequests, grants, payments, students, type Payment } from "@/db/schema";
import { getPack } from "@/lib/access";
import { BRAND } from "@/lib/brand";
import { notifyAdmins, sendEmail, signature } from "@/lib/email";
import { SITE_URL } from "@/lib/site";
import { cleanKey, describeKeys } from "@/lib/razorpay-keys";

/**
 * Razorpay keys (set in Vercel → Environment Variables; test keys locally in .env.local):
 *   RAZORPAY_KEY_ID          rzp_test_… or rzp_live_…
 *   RAZORPAY_KEY_SECRET
 *   RAZORPAY_WEBHOOK_SECRET  the secret you type when adding the webhook in the Razorpay dashboard
 */
export const razorpayKeyId = () => cleanKey(process.env.RAZORPAY_KEY_ID, "RAZORPAY_KEY_ID");
export const razorpayKeySecret = () => cleanKey(process.env.RAZORPAY_KEY_SECRET, "RAZORPAY_KEY_SECRET");
export const razorpayWebhookSecret = () => cleanKey(process.env.RAZORPAY_WEBHOOK_SECRET, "RAZORPAY_WEBHOOK_SECRET");
export const paymentsEnabled = () => !!(razorpayKeyId() && razorpayKeySecret());

export const keyReport = () => describeKeys(razorpayKeyId(), razorpayKeySecret(), razorpayWebhookSecret());

/** Ask Razorpay whether the Key ID + Key Secret pair is accepted (reads one order; changes nothing). */
export async function testRazorpayConnection(): Promise<{ ok: boolean; message: string }> {
  if (!paymentsEnabled()) return { ok: false, message: "RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing." };
  try {
    const res = await fetch("https://api.razorpay.com/v1/orders?count=1", {
      headers: { Authorization: `Basic ${Buffer.from(`${razorpayKeyId()}:${razorpayKeySecret()}`).toString("base64")}` },
      cache: "no-store",
    });
    if (res.ok) return { ok: true, message: "Razorpay accepted the keys." };
    const data = (await res.json().catch(() => ({}))) as { error?: { description?: string } };
    return { ok: false, message: `Razorpay answered ${res.status}: ${data.error?.description ?? "error"}` };
  } catch {
    return { ok: false, message: "Could not reach Razorpay." };
  }
}

/** Create a Razorpay order (amount in paise). */
export async function createRazorpayOrder(amountInr: number, receipt: string, notes: Record<string, string>) {
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${razorpayKeyId()}:${razorpayKeySecret()}`).toString("base64")}`,
    },
    body: JSON.stringify({ amount: amountInr * 100, currency: "INR", receipt: receipt.slice(0, 40), notes }),
    cache: "no-store",
  });
  const data = (await res.json().catch(() => ({}))) as { id?: string; error?: { description?: string } };
  if (!res.ok || !data.id) {
    console.error("Razorpay order failed", res.status, data.error?.description);
    throw new Error(data.error?.description || `Razorpay error ${res.status}`);
  }
  return data.id;
}

export async function recordOrder(v: { orderId: string; studentId: number; packSlug: string; promoCode: string | null; amountInr: number }) {
  const db = await getDb();
  await db.insert(payments).values(v);
}

export async function getPayment(orderId: string): Promise<Payment | null> {
  const db = await getDb();
  const [p] = await db.select().from(payments).where(eq(payments.orderId, orderId));
  return p ?? null;
}

export async function markFailed(orderId: string, error: string) {
  const db = await getDb();
  await db
    .update(payments)
    .set({ status: "failed", error: error.slice(0, 500) })
    .where(and(eq(payments.orderId, orderId), eq(payments.status, "created")));
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * A verified payment: unlock the pack. Safe to call twice (browser and webhook): only the first call grants.
 * `paidAmountInr` (from the webhook) is checked against the order when given.
 */
export async function fulfillPayment(orderId: string, paymentId: string, paidAmountInr?: number): Promise<"granted" | "already" | "unknown" | "mismatch"> {
  const db = await getDb();
  const existing = await getPayment(orderId);
  if (!existing) return "unknown";
  if (existing.status === "paid") return "already";
  if (paidAmountInr != null && paidAmountInr !== existing.amountInr) {
    await db.update(payments).set({ error: `Paid ${paidAmountInr}, expected ${existing.amountInr}` }).where(eq(payments.id, existing.id));
    await notifyAdmins(`Payment amount mismatch – ${orderId}`, [`Razorpay payment ${paymentId} paid ₹${paidAmountInr}, the order expected ₹${existing.amountInr}. Please check in Razorpay.`]);
    return "mismatch";
  }

  // claim the order atomically, so two calls at the same moment cannot both grant
  const [claimed] = await db
    .update(payments)
    .set({ status: "paid", paymentId, paidAt: new Date(), error: null })
    .where(and(eq(payments.orderId, orderId), ne(payments.status, "paid")))
    .returning();
  if (!claimed) return "already";

  const pack = await getPack(claimed.packSlug);
  const days = pack?.validityDays ?? 180;
  const expiresAt = new Date(Date.now() + days * 24 * 3600 * 1000);
  const [grant] = await db
    .insert(grants)
    .values({
      studentId: claimed.studentId,
      packSlug: claimed.packSlug,
      expiresAt,
      amountInr: claimed.amountInr,
      paymentRef: `Razorpay ${paymentId}`,
      paymentDate: new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }),
      promoCode: claimed.promoCode,
      note: "Paid online",
      grantedBy: "razorpay",
    })
    .returning();
  await db.update(payments).set({ grantId: grant.id }).where(eq(payments.id, claimed.id));
  await db
    .update(accessRequests)
    .set({ status: "granted", updatedAt: new Date() })
    .where(
      and(
        eq(accessRequests.studentId, claimed.studentId),
        eq(accessRequests.packSlug, claimed.packSlug),
        inArray(accessRequests.status, ["new", "contacted", "paid"]),
      ),
    );

  const [s] = await db.select().from(students).where(eq(students.id, claimed.studentId));
  const packName = pack?.name ?? claimed.packSlug;
  const until = expiresAt.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "long", year: "numeric" });
  const price = `${rupees(claimed.amountInr)}${claimed.promoCode ? ` with code ${claimed.promoCode}` : ""}`;
  await Promise.all([
    s &&
      sendEmail({
        to: s.email,
        subject: `Payment received: your ${packName} is active`,
        text: [
          `Hi ${(s.name ?? "").split(" ")[0] || "there"},`,
          "",
          `Thank you for your payment of ${price}. Your ${BRAND.name} ${packName} is now active until ${until}.`,
          `Start here: ${SITE_URL}/account`,
          "",
          `Payment ID: ${paymentId}`,
          "",
          "All the best for your preparation!",
          signature(),
        ].join("\n"),
        replyTo: BRAND.contact.email || undefined,
      }),
    notifyAdmins(`Paid online: ${packName} – ${s?.name ?? "student"} (${rupees(claimed.amountInr)})`, [
      `${s?.name ?? "A student"} paid ${price} for the ${packName}. The pack is unlocked automatically.`,
      `Email: ${s?.email ?? "-"}`,
      `Phone: ${s?.phone ?? "-"}`,
      `Razorpay payment: ${paymentId}`,
      claimed.promoCode ? `Promo code: ${claimed.promoCode}` : "",
    ]),
  ]);
  return "granted";
}
