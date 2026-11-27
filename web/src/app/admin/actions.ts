"use server";

import { and, eq, inArray, ne } from "drizzle-orm";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getDb } from "@/db";
import {
  accessRequests,
  EVALUATION_STATUSES,
  grants,
  LEAD_STATUSES,
  leads,
  packs,
  profileEvaluations,
  promoCodes,
  REQUEST_STATUSES,
  students,
  type EvaluationStatus,
  type LeadStatus,
} from "@/db/schema";
import { approvePlan, emailEvaluated, revokePlan } from "@/lib/evaluation-store";
import { getPack, listPacks, PACKS_TAG } from "@/lib/access";
import { normalizeCode } from "@/lib/pricing";
import { getPromo } from "@/lib/promo";
import { testRazorpayConnection } from "@/lib/payments";
import { BRAND } from "@/lib/brand";
import { sendEmail, signature } from "@/lib/email";
import { CATALOG_KINDS } from "@/lib/exam/catalog";
import { SITE_URL } from "@/lib/site";
import { logout, requestLoginCode, requireAdmin, verifyLoginCode } from "@/lib/auth";
import { BATCHES_TAG, deleteBatch, getStoredBatch, listAllBatches, saveBatch } from "@/lib/batch-store";
import { fieldsToBatch, formDataToFields, type BatchFields } from "@/lib/batch-form";

// ---------- login ----------
export type LoginState = { step: "email" | "code"; email: string; error?: string; info?: string };

export async function loginAction(prev: LoginState, fd: FormData): Promise<LoginState> {
  const email = String(fd.get("email") ?? prev.email).trim().toLowerCase();

  if (prev.step === "email" || fd.get("resend")) {
    const r = await requestLoginCode(email);
    if (!r.ok) return { step: "email", email, error: r.error };
    return {
      step: "code",
      email,
      info: "If this email has admin access, a 6-digit code is on its way. It is valid for 10 minutes.",
    };
  }

  const r = await verifyLoginCode(email, String(fd.get("code") ?? ""));
  if (!r.ok) return { ...prev, error: r.error, info: undefined };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// ---------- enquiries ----------
export async function setLeadStatusAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const status = String(fd.get("status")) as LeadStatus;
  if (!Number.isInteger(id) || !LEAD_STATUSES.includes(status)) return;
  const db = await getDb();
  await db.update(leads).set({ status }).where(eq(leads.id, id));
  redirect(String(fd.get("back") || "/admin/enquiries"));
}

export async function setLeadNotesAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isInteger(id)) return;
  const notes = String(fd.get("notes") ?? "").slice(0, 2000).trim() || null;
  const db = await getDb();
  await db.update(leads).set({ notes }).where(eq(leads.id, id));
  redirect(String(fd.get("back") || "/admin/enquiries"));
}

// ---------- batches ----------
export type BatchFormState = { errors?: string[]; fields?: BatchFields };

export async function saveBatchAction(prev: BatchFormState, fd: FormData): Promise<BatchFormState> {
  await requireAdmin();
  const fields = formDataToFields(fd);
  const original = String(fd.get("originalSlug") ?? "") || undefined;
  const parsed = fieldsToBatch(fields);
  if (!parsed.ok) return { errors: parsed.errors, fields };
  if (parsed.batch.slug !== original && (await getStoredBatch(parsed.batch.slug))) {
    return { errors: ["Another batch already uses this web address (slug)."], fields };
  }
  await saveBatch(parsed.batch, original);
  updateTag(BATCHES_TAG); // public pages show the change immediately
  redirect(`/admin/batches?saved=${encodeURIComponent(parsed.batch.slug)}`);
}

export async function deleteBatchAction(fd: FormData) {
  await requireAdmin();
  const slug = String(fd.get("slug") ?? "");
  if (slug) await deleteBatch(slug);
  updateTag(BATCHES_TAG);
  redirect("/admin/batches?deleted=1");
}

// ---------- access requests and grants ----------
export async function setRequestStatusAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const status = String(fd.get("status"));
  if (!Number.isInteger(id) || !(REQUEST_STATUSES as readonly string[]).includes(status)) return;
  const db = await getDb();
  await db.update(accessRequests).set({ status, updatedAt: new Date() }).where(eq(accessRequests.id, id));
  redirect(String(fd.get("back") || "/admin/requests"));
}

export type GrantState = { error?: string; ok?: boolean };

export async function grantAccessAction(prev: GrantState, fd: FormData): Promise<GrantState> {
  const admin = await requireAdmin();
  const studentId = Number(fd.get("studentId"));
  const packSlug = String(fd.get("packSlug") ?? "");
  const requestId = Number(fd.get("requestId") || 0);
  const amountRaw = String(fd.get("amount") ?? "").replace(/[^\d]/g, "");
  const validity = Number(fd.get("validityDays") || 0);
  const db = await getDb();
  const [student] = await db.select().from(students).where(eq(students.id, studentId));
  const pack = await getPack(packSlug);
  if (!student || !pack) return { error: "Choose a student and a pack." };
  if (!Number.isInteger(validity) || validity < 1 || validity > 3650) return { error: "Access days must be between 1 and 3650." };

  const expiresAt = new Date(Date.now() + validity * 24 * 3600 * 1000);
  await db.insert(grants).values({
    studentId,
    packSlug,
    expiresAt,
    amountInr: amountRaw ? Number(amountRaw) : null,
    paymentRef: String(fd.get("paymentRef") ?? "").trim().slice(0, 200) || null,
    paymentDate: String(fd.get("paymentDate") ?? "").trim() || null,
    note: String(fd.get("note") ?? "").trim().slice(0, 1000) || null,
    promoCode: normalizeCode(String(fd.get("promoCode") ?? "")) || null,
    grantedBy: admin,
  });
  // close the matching open request(s) for this pack
  await db
    .update(accessRequests)
    .set({ status: "granted", updatedAt: new Date() })
    .where(
      requestId
        ? eq(accessRequests.id, requestId)
        : and(eq(accessRequests.studentId, studentId), eq(accessRequests.packSlug, packSlug), inArray(accessRequests.status, ["new", "contacted", "paid"])),
    );
  if (fd.get("notify") === "on") {
    const until = expiresAt.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "long", year: "numeric" });
    await sendEmail({
      to: student.email,
      subject: `Your ${pack.name} is active`,
      text: [
        `Hi ${(student.name ?? "").split(" ")[0] || "there"},`,
        "",
        `Your ${BRAND.name} ${pack.name} is now active until ${until}.`,
        `Log in and open My tests to start: ${SITE_URL}/account`,
        "",
        "All the best for your preparation!",
        signature(),
      ].join("\n"),
      replyTo: BRAND.contact.email || undefined,
    });
  }
  redirect(`/admin/students/${studentId}?granted=1`);
}

export async function revokeGrantAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const studentId = Number(fd.get("studentId"));
  if (!Number.isInteger(id)) return;
  const db = await getDb();
  await db.update(grants).set({ revokedAt: new Date() }).where(eq(grants.id, id));
  redirect(`/admin/students/${studentId}`);
}

// ---------- Complete Germany Plan approval ----------
/**
 * After the free profile evaluation: let this student pay for the Complete Germany Plan online.
 * Marks their plan request "approved" (creating one if needed) and emails them the payment link.
 * mode=revoke takes the approval back (the request goes to "closed").
 */
export async function setPlanApprovalAction(fd: FormData) {
  await requireAdmin();
  const studentId = Number(fd.get("studentId"));
  const mode = String(fd.get("mode") ?? "approve");
  if (!Number.isInteger(studentId)) return;
  const db = await getDb();
  const [s] = await db.select().from(students).where(eq(students.id, studentId));
  if (!s) return;
  if (mode === "revoke") {
    await revokePlan(studentId);
    redirect(`/admin/students/${studentId}`);
  }
  await approvePlan(s);
  redirect(`/admin/students/${studentId}?approved=1`);
}

// ---------- profile evaluations ----------
/**
 * submitted → fit / not_fit (emails the result) → call_done (after our call: approves the plan and emails the payment link).
 * Moving away from call_done takes the plan approval back.
 */
export async function setEvaluationStatusAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  const status = String(fd.get("status") ?? "") as EvaluationStatus;
  if (!Number.isInteger(id) || !EVALUATION_STATUSES.includes(status)) return;
  const db = await getDb();
  const [e] = await db.select({ id: profileEvaluations.id, studentId: profileEvaluations.studentId, status: profileEvaluations.status }).from(profileEvaluations).where(eq(profileEvaluations.id, id));
  if (!e) return;
  const [s] = await db.select().from(students).where(eq(students.id, e.studentId));
  if (!s) return;
  const noteRaw = fd.get("noteToStudent");
  const note = typeof noteRaw === "string" ? noteRaw.trim().slice(0, 1000) || null : undefined;
  const now = new Date();
  await db
    .update(profileEvaluations)
    .set({
      status,
      updatedAt: now,
      ...(note !== undefined ? { noteToStudent: note } : {}),
      ...(status === "fit" || status === "not_fit" ? { evaluatedAt: now } : {}),
      ...(status === "call_done" ? { calledAt: now } : {}),
    })
    .where(eq(profileEvaluations.id, id));
  if (status === "call_done") await approvePlan(s);
  else if (e.status === "call_done") await revokePlan(s.id);
  if ((status === "fit" || status === "not_fit") && e.status !== status && fd.get("notify") !== "0") {
    await emailEvaluated(s, status, note ?? null);
  }
  redirect(`/admin/evaluations/${id}?saved=${status}`);
}

export async function setEvaluationNotesAction(fd: FormData) {
  await requireAdmin();
  const id = Number(fd.get("id"));
  if (!Number.isInteger(id)) return;
  const db = await getDb();
  await db
    .update(profileEvaluations)
    .set({ adminNotes: String(fd.get("adminNotes") ?? "").trim().slice(0, 4000) || null, updatedAt: new Date() })
    .where(eq(profileEvaluations.id, id));
  redirect(`/admin/evaluations/${id}?saved=notes`);
}

// ---------- packs ----------
export type PackFormState = { error?: string };

export async function savePackAction(prev: PackFormState, fd: FormData): Promise<PackFormState> {
  await requireAdmin();
  const original = String(fd.get("originalSlug") ?? "");
  const slug = String(fd.get("slug") ?? "").trim().toLowerCase();
  const name = String(fd.get("name") ?? "").trim();
  const priceRaw = String(fd.get("priceInr") ?? "").replace(/[^\d]/g, "");
  const validityDays = Number(fd.get("validityDays"));
  const kinds = fd.getAll("kinds").map(String).filter((k) => (CATALOG_KINDS as readonly string[]).includes(k));
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return { error: "Short name (slug): lowercase letters, numbers and dashes." };
  if (name.length < 2) return { error: "Name is required." };
  if (!Number.isInteger(validityDays) || validityDays < 1) return { error: "Access days must be a whole number." };
  if (!kinds.length) return { error: "Tick at least one test type the pack unlocks." };
  const values = {
    slug,
    name,
    description: String(fd.get("description") ?? "").trim(),
    priceInr: priceRaw ? Number(priceRaw) : null,
    validityDays,
    kinds,
    published: fd.get("published") === "on",
    sort: Number(fd.get("sort") || 0) || 0,
  };
  const db = await getDb();
  if (original && original !== slug) return { error: "The short name of an existing pack cannot be changed." };
  if (!original && (await getPack(slug))) return { error: "A pack with this short name already exists." };
  await db.insert(packs).values(values).onConflictDoUpdate({ target: packs.slug, set: values });
  updateTag(PACKS_TAG); // e.g. the Complete Germany Plan price on /plans
  redirect("/admin/packs?saved=1");
}

// ---------- promo codes ----------
export type PromoFormState = { error?: string };

export async function savePromoAction(prev: PromoFormState, fd: FormData): Promise<PromoFormState> {
  await requireAdmin();
  const original = String(fd.get("originalCode") ?? "");
  const code = normalizeCode(String(fd.get("code") ?? ""));
  const percentOff = Number(fd.get("percentOff"));
  const maxRaw = String(fd.get("maxUses") ?? "").replace(/[^\d]/g, "");
  const expiresOn = String(fd.get("expiresOn") ?? "").trim();
  const known = (await listPacks()).map((p) => p.slug);
  const knownClasses = (await listAllBatches()).map((b) => b.slug);
  const appliesToAll = fd.get("scope") !== "selected";
  const packSlugs = appliesToAll ? [] : fd.getAll("packSlugs").map(String).filter((s) => known.includes(s));
  const classSlugs = appliesToAll ? [] : fd.getAll("classSlugs").map(String).filter((s) => knownClasses.includes(s));
  if (!appliesToAll && !packSlugs.length && !classSlugs.length) {
    return { error: "Tick at least one pack or class, or choose \"All packs and live classes\"." };
  }
  if (code.length < 3) return { error: "The code needs at least 3 letters or numbers." };
  if (!Number.isInteger(percentOff) || percentOff < 1 || percentOff > 100) return { error: "Discount must be a whole number from 1 to 100 %." };
  if (expiresOn && !/^\d{4}-\d{2}-\d{2}$/.test(expiresOn)) return { error: "Expiry date is not valid." };
  if (original && original !== code) return { error: "The code of an existing promo cannot be changed. Create a new one instead." };
  if (!original && (await getPromo(code))) return { error: `The code ${code} already exists.` };
  const values = {
    code,
    percentOff,
    label: String(fd.get("label") ?? "").trim().slice(0, 120) || null,
    packSlugs,
    classSlugs,
    appliesToAll,
    active: fd.get("active") === "on",
    maxUses: maxRaw ? Number(maxRaw) : null,
    expiresOn: expiresOn || null,
    autoApply: fd.get("autoApply") === "on",
  };
  const db = await getDb();
  // only one code can be the automatic offer
  if (values.autoApply) await db.update(promoCodes).set({ autoApply: false }).where(ne(promoCodes.code, code));
  await db.insert(promoCodes).values(values).onConflictDoUpdate({ target: promoCodes.code, set: values });
  redirect(`/admin/promo-codes?saved=${encodeURIComponent(code)}`);
}

/** Delete a code. Past requests and sales keep the code name in their history. */
export async function deletePromoAction(fd: FormData) {
  await requireAdmin();
  const code = normalizeCode(String(fd.get("originalCode") ?? ""));
  if (!code) return;
  const db = await getDb();
  await db.delete(promoCodes).where(eq(promoCodes.code, code));
  redirect(`/admin/promo-codes?deleted=${encodeURIComponent(code)}`);
}

// ---------- Razorpay key check ----------
export async function testRazorpayAction() {
  await requireAdmin();
  const r = await testRazorpayConnection();
  redirect(`/admin/payments?check=${r.ok ? "ok" : "fail"}&msg=${encodeURIComponent(r.message)}`);
}
