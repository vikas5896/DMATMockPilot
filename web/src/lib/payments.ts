import "server-only";
import { and, eq, inArray, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { accessRequests, classEnrollments, grants, payments, students, type Payment } from "@/db/schema";
import { getPack } from "@/lib/access";
import { getStoredBatch } from "@/lib/batch-store";
import { formatRange } from "@/content/site/batches";
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

export async function recordOrder(v: {
  orderId: string;
  studentId: number;
  packSlug?: string | null;
  classSlug?: string | null;
  promoCode: string | null;
  amountInr: number;
}) {
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

  if (claimed.classSlug) {
    await enrolInClass(claimed.studentId, claimed.classSlug, claimed.amountInr, claimed.promoCode, paymentId);
    return "granted";
  }
  if (!claimed.packSlug) return "unknown";

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
        eq(accessRequests.packSlug, claimed.packSlug!),
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

/** A paid live class: enrol the student (once) and confirm by email to the student and the admins. */
async function enrolInClass(studentId: number, classSlug: string, amountInr: number, promoCode: string | null, paymentId: string) {
  const db = await getDb();
  await db
    .insert(classEnrollments)
    .values({ studentId, classSlug, amountInr, promoCode, paymentRef: `Razorpay ${paymentId}`, source: "online" })
    .onConflictDoNothing();
  const [[s], b] = await Promise.all([db.select().from(students).where(eq(students.id, studentId)), getStoredBatch(classSlug)]);
  const title = b?.title ?? classSlug;
  const when = b ? `${formatRange(b.start, b.end)}, ${b.days}, ${b.time}` : "";
  const price = `${rupees(amountInr)}${promoCode ? ` with code ${promoCode}` : ""}`;
  await Promise.all([
    s &&
      sendEmail({
        to: s.email,
        subject: `You're enrolled: ${title}`,
        text: [
          `Hi ${(s.name ?? "").split(" ")[0] || "there"},`,
          "",
          `Thank you for your payment of ${price}. Your seat in "${title}" is confirmed.`,
          when ? `When: ${when}` : "",
          "We will send you the joining link on WhatsApp before the first session.",
          `Details: ${SITE_URL}/live-classes/${classSlug}`,
          "",
          `Your account: log in at ${SITE_URL}/login with this email address (${s?.email ?? ""}) to see your booking and take your free full dMAT mock test.`,
          "",
          `Payment ID: ${paymentId}`,
          signature(),
        ]
          .filter((l) => l !== "")
          .join("\n"),
        replyTo: BRAND.contact.email || undefined,
      }),
    notifyAdmins(`New enrolment: ${title} – ${s?.name ?? "student"} (${rupees(amountInr)})`, [
      `${s?.name ?? "A student"} paid ${price} for the live class "${title}".`,
      `Email: ${s?.email ?? "-"}`,
      `Phone: ${s?.phone ?? "-"}`,
      `Razorpay payment: ${paymentId}`,
      promoCode ? `Promo code: ${promoCode}` : "",
      "Remember to send the joining link on WhatsApp.",
    ]),
  ]);
}

/** Students enrolled in a class (for the admin panel). */
export async function listEnrollments(classSlug?: string) {
  const db = await getDb();
  const q = db
    .select({ e: classEnrollments, s: students })
    .from(classEnrollments)
    .innerJoin(students, eq(students.id, classEnrollments.studentId));
  return classSlug ? q.where(eq(classEnrollments.classSlug, classSlug)) : q;
}

/** The live classes a student has booked, with title and schedule (for My tests). */
export async function studentClasses(studentId: number) {
  const db = await getDb();
  const rows = await db.select().from(classEnrollments).where(eq(classEnrollments.studentId, studentId));
  return Promise.all(
    rows.map(async (e) => {
      const b = await getStoredBatch(e.classSlug);
      return {
        slug: e.classSlug,
        title: b?.title ?? e.classSlug,
        when: b ? `${formatRange(b.start, b.end)} · ${b.days}, ${b.time}` : "",
      };
    }),
  );
}

export async function isEnrolled(studentId: number, classSlug: string): Promise<boolean> {
  const db = await getDb();
  const [r] = await db
    .select({ id: classEnrollments.id })
    .from(classEnrollments)
    .where(and(eq(classEnrollments.studentId, studentId), eq(classEnrollments.classSlug, classSlug)));
  return !!r;
}
