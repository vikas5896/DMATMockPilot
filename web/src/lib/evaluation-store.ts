import "server-only";
import { and, desc, eq, inArray } from "drizzle-orm";
import { getDb } from "@/db";
import { accessRequests, profileEvaluations, students, type EvaluationStatus, type ProfileEvaluation, type Student } from "@/db/schema";
import { getPack } from "@/lib/access";
import { BRAND } from "@/lib/brand";
import { sendEmail, signature } from "@/lib/email";
import { EVALUATION_HOURS } from "@/lib/evaluation";
import { PLAN_PACK } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

/** The evaluation without the document bytes (for lists and status pages). */
export type EvaluationSummary = Omit<ProfileEvaluation, "docData">;
const summaryCols = {
  id: profileEvaluations.id,
  studentId: profileEvaluations.studentId,
  status: profileEvaluations.status,
  details: profileEvaluations.details,
  docName: profileEvaluations.docName,
  docType: profileEvaluations.docType,
  docSize: profileEvaluations.docSize,
  noteToStudent: profileEvaluations.noteToStudent,
  adminNotes: profileEvaluations.adminNotes,
  createdAt: profileEvaluations.createdAt,
  updatedAt: profileEvaluations.updatedAt,
  evaluatedAt: profileEvaluations.evaluatedAt,
  calledAt: profileEvaluations.calledAt,
};

/** The student's newest evaluation, or null. */
export async function latestEvaluation(studentId: number): Promise<EvaluationSummary | null> {
  const db = await getDb();
  const [e] = await db
    .select(summaryCols)
    .from(profileEvaluations)
    .where(eq(profileEvaluations.studentId, studentId))
    .orderBy(desc(profileEvaluations.createdAt))
    .limit(1);
  return e ?? null;
}

export async function listEvaluations(status?: string) {
  const db = await getDb();
  return db
    .select({ ...summaryCols, name: students.name, email: students.email, phone: students.phone })
    .from(profileEvaluations)
    .innerJoin(students, eq(students.id, profileEvaluations.studentId))
    .where(status ? eq(profileEvaluations.status, status) : undefined)
    .orderBy(desc(profileEvaluations.createdAt))
    .limit(500);
}

export async function getEvaluation(id: number) {
  const db = await getDb();
  const [e] = await db
    .select({ ...summaryCols, name: students.name, email: students.email, phone: students.phone })
    .from(profileEvaluations)
    .innerJoin(students, eq(students.id, profileEvaluations.studentId))
    .where(eq(profileEvaluations.id, id));
  return e ?? null;
}

export async function evaluationDocument(id: number) {
  const db = await getDb();
  const [d] = await db
    .select({ name: profileEvaluations.docName, type: profileEvaluations.docType, data: profileEvaluations.docData })
    .from(profileEvaluations)
    .where(eq(profileEvaluations.id, id));
  return d ?? null;
}

const first = (s: Pick<Student, "name">) => (s.name ?? "").split(" ")[0] || "there";

export async function emailSubmitted(s: Student) {
  await sendEmail({
    to: s.email,
    subject: `Your free profile evaluation with ${BRAND.name}`,
    text: [
      `Hi ${first(s)},`,
      "",
      "Thank you for submitting your profile. Our team is evaluating it now.",
      `This takes up to ${EVALUATION_HOURS} hours. If your profile is a good fit for the Complete Germany Plan, we will call you on ${s.phone}.`,
      "",
      `You can check your status any time: ${SITE_URL}/profile-evaluation`,
      signature(),
    ].join("\n"),
    replyTo: BRAND.contact.email || undefined,
  });
}

/** Email after the evaluation (fit or not a fit). */
export async function emailEvaluated(s: Student, status: EvaluationStatus, note: string | null) {
  const fit = status === "fit";
  await sendEmail({
    to: s.email,
    subject: fit ? "Good news: your profile is a fit for the Complete Germany Plan" : "Your profile evaluation result",
    text: [
      `Hi ${first(s)},`,
      "",
      fit
        ? `We have evaluated your profile, and it is a good fit for the Complete Germany Plan. Our team will call you on ${s.phone} to discuss your plan and next steps.`
        : "Thank you for your patience. We have evaluated your profile, and we don't think the Complete Germany Plan is the right fit for you at this time.",
      ...(note ? ["", note] : []),
      ...(fit ? [] : ["", `You can still prepare for the dMAT with our mock tests and live classes: ${SITE_URL}/plans`]),
      "",
      `Your status: ${SITE_URL}/profile-evaluation`,
      signature(),
    ].join("\n"),
    replyTo: BRAND.contact.email || undefined,
  });
}

/** Open plan requests of a student (anything not granted or closed). */
async function openPlanRequests(studentId: number) {
  const db = await getDb();
  return db
    .select()
    .from(accessRequests)
    .where(
      and(
        eq(accessRequests.studentId, studentId),
        eq(accessRequests.packSlug, PLAN_PACK),
        inArray(accessRequests.status, ["new", "contacted", "approved", "paid"]),
      ),
    );
}

/** Lets the student pay for the Complete Germany Plan online and emails them the payment link. */
export async function approvePlan(s: Student) {
  const db = await getDb();
  const open = await openPlanRequests(s.id);
  const plan = await getPack(PLAN_PACK);
  if (open.length) {
    await db
      .update(accessRequests)
      .set({ status: "approved", updatedAt: new Date() })
      .where(inArray(accessRequests.id, open.map((r) => r.id)));
  } else {
    await db.insert(accessRequests).values({
      studentId: s.id,
      packSlug: PLAN_PACK,
      status: "approved",
      quotedPriceInr: plan?.priceInr ?? null,
      message: "Approved after the free profile evaluation",
    });
  }
  const price = plan?.priceInr != null ? `₹${plan.priceInr.toLocaleString("en-IN")}` : "";
  await sendEmail({
    to: s.email,
    subject: `You're approved for the ${BRAND.name} Complete Germany Plan`,
    text: [
      `Hi ${first(s)},`,
      "",
      "Thank you for your profile evaluation. We'd be glad to guide you through your Master's journey to Germany.",
      `Your seat in the Complete Germany Plan${price ? ` (${price})` : ""} is reserved for you. To confirm it, log in with this email address and complete the payment here:`,
      `${SITE_URL}/plans/complete-germany-plan`,
      "",
      "Questions before you join? Just reply to this email or message us on WhatsApp.",
      signature(),
    ].join("\n"),
    replyTo: BRAND.contact.email || undefined,
  });
}

/** Takes the plan approval back (the student can no longer pay online). Paid requests are left alone. */
export async function revokePlan(studentId: number) {
  const db = await getDb();
  const open = (await openPlanRequests(studentId)).filter((r) => r.status !== "paid");
  if (open.length) {
    await db
      .update(accessRequests)
      .set({ status: "closed", updatedAt: new Date() })
      .where(inArray(accessRequests.id, open.map((r) => r.id)));
  }
}
