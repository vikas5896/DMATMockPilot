import { getDb } from "@/db";
import { profileEvaluations } from "@/db/schema";
import { currentStudent } from "@/lib/auth";
import { notifyAdmins } from "@/lib/email";
import { checkDocument, validateEvaluation } from "@/lib/evaluation";
import { emailSubmitted, latestEvaluation } from "@/lib/evaluation-store";

const fail = (error: string, status = 400) => Response.json({ ok: false, error }, { status });

/** Free profile evaluation: the logged-in student's details and one document (transcript or semester results). */
export async function POST(request: Request) {
  const me = await currentStudent();
  if (!me?.name || !me.phone) return fail("Please log in first.", 401);

  const prev = await latestEvaluation(me.id);
  if (prev && prev.status !== "not_fit") return fail("You have already submitted your profile. Refresh this page to see its status.", 409);

  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return fail("The upload did not work. Please try a smaller file (max. 4 MB).");
  }
  if (fd.get("website")) return Response.json({ ok: true }); // honeypot

  const raw: Record<string, unknown> = {};
  fd.forEach((v, k) => {
    if (typeof v === "string") raw[k] = v;
  });
  const v = validateEvaluation(raw);
  if (!v.ok) return fail(v.error);
  if (fd.get("consent") !== "on") return fail("Please agree that we may review your document.");

  const file = fd.get("document");
  if (!(file instanceof File)) return fail("Please attach your transcript or semester results.");
  const bytes = new Uint8Array(await file.arrayBuffer());
  const doc = checkDocument(file.name, bytes);
  if (!doc.ok) return fail(doc.error);

  try {
    const db = await getDb();
    await db.insert(profileEvaluations).values({
      studentId: me.id,
      details: v.details,
      docName: file.name,
      docType: doc.type,
      docSize: bytes.length,
      docData: bytes,
    });
  } catch (e) {
    console.error("could not save profile evaluation", e);
    return fail("Sorry, we could not save your profile. Please try again later.", 500);
  }

  await Promise.all([
    emailSubmitted(me),
    notifyAdmins(`New profile to evaluate: ${me.name}`, [
      `${me.name} submitted a profile for evaluation.`,
      `Degree: ${v.details.degree}, ${v.details.university} (${v.details.score}, ${v.details.gradYear})`,
      `Wants: ${v.details.targetCourse}, ${v.details.intake}`,
      `Phone: ${me.phone}`,
    ]),
  ]).catch((e) => console.error("evaluation emails failed", e));

  return Response.json({ ok: true });
}
