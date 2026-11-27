import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { setEvaluationNotesAction, setEvaluationStatusAction } from "@/app/admin/actions";
import { adminField, AdminShell, Loading } from "@/components/admin/AdminShell";
import type { EvaluationDetails } from "@/db/schema";
import { activeGrants, planApproval } from "@/lib/access";
import { requireAdmin } from "@/lib/auth";
import { EVAL_LABEL, EVAL_STYLE, EVALUATION_FIELDS } from "@/lib/evaluation";
import { getEvaluation } from "@/lib/evaluation-store";
import { PLAN_PACK } from "@/lib/pricing";
import { waLink } from "@/lib/wa-templates";

export const metadata = { title: "Profile evaluation" };
type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ [k: string]: string | string[] | undefined }> };

export default function EvaluationPage(props: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <Detail {...props} />
    </Suspense>
  );
}

const fmt = (d: Date | null) =>
  d ? d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "—";

const SAVED: Record<string, string> = {
  fit: "Marked as a fit. We emailed the student that we will call them.",
  not_fit: "Marked as not a fit. We emailed the student the result.",
  call_done: "Call done. The student is approved for the Complete Germany Plan and got the payment link by email.",
  submitted: "Moved back to “To evaluate”.",
  notes: "Notes saved.",
};

async function Detail({ params, searchParams }: Props) {
  const email = await requireAdmin();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [e, sp] = await Promise.all([getEvaluation(id), searchParams]);
  if (!e) notFound();
  const [approval, grants] = await Promise.all([planApproval(e.studentId), activeGrants(e.studentId)]);
  const paid = grants.some((g) => g.packSlug === PLAN_PACK);
  const saved = typeof sp.saved === "string" ? SAVED[sp.saved] : null;
  const isImage = e.docType.startsWith("image/");
  const docUrl = `/admin/evaluations/${e.id}/document`;
  const first = (e.name ?? "").split(" ")[0] || "there";

  const statusButton = (status: string, label: string, style: string, withNote = false, confirm?: string) => (
    <form action={setEvaluationStatusAction} className="space-y-2">
      <input type="hidden" name="id" value={e.id} />
      <input type="hidden" name="status" value={status} />
      {withNote && (
        <textarea
          name="noteToStudent"
          defaultValue={e.noteToStudent ?? ""}
          placeholder="Optional note shown to the student (and in the email)"
          className={`${adminField} min-h-16`}
        />
      )}
      <button className={`w-full rounded-md px-4 py-2 text-sm font-semibold ${style}`} title={confirm}>
        {label}
      </button>
    </form>
  );

  return (
    <AdminShell
      email={email}
      active="/admin/evaluations"
      title={`Evaluation: ${e.name ?? e.email}`}
      actions={
        <Link href="/admin/evaluations" className="text-sm text-brand underline">
          ← All evaluations
        </Link>
      }
    >
      {saved && <p className="mb-4 rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800">{saved}</p>}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold">Profile</h2>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${EVAL_STYLE[e.status] ?? ""}`}>{EVAL_LABEL[e.status] ?? e.status}</span>
            </div>
            <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              {EVALUATION_FIELDS.map((f) => (
                <div key={f.key}>
                  <dt className="text-xs text-zinc-500">{f.label}</dt>
                  <dd>{(e.details as EvaluationDetails)[f.key] || "—"}</dd>
                </div>
              ))}
            </dl>
            {e.details.message && (
              <p className="mt-4 whitespace-pre-line rounded-md bg-zinc-50 p-3 text-sm">
                <span className="block text-xs text-zinc-500">Message</span>
                {e.details.message}
              </p>
            )}
            <p className="mt-4 text-xs text-zinc-500">
              Submitted {fmt(e.createdAt)} · evaluated {fmt(e.evaluatedAt)} · call done {fmt(e.calledAt)}
            </p>
          </section>

          <section className="rounded-xl border border-zinc-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold">Document</h2>
              <a href={docUrl} target="_blank" rel="noopener" className="text-sm font-semibold text-brand underline">
                Open “{e.docName}” ({Math.max(1, Math.round(e.docSize / 1024))} KB) ↗
              </a>
            </div>
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={docUrl} alt={`Document from ${e.name ?? "student"}`} className="mt-3 max-h-[900px] w-full rounded-md border object-contain" />
            ) : (
              <iframe src={docUrl} title="Document" className="mt-3 h-[800px] w-full rounded-md border" />
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-xl border border-zinc-200 bg-white p-5 text-sm">
            <h2 className="font-bold">Student</h2>
            <p className="mt-2">
              <Link href={`/admin/students/${e.studentId}`} className="font-semibold text-brand underline">
                {e.name}
              </Link>
            </p>
            <p className="text-zinc-600">{e.email}</p>
            <p className="text-zinc-600">{e.phone}</p>
            {e.phone && (
              <p className="mt-2 flex gap-3">
                <a href={`tel:${e.phone.replace(/[^\d+]/g, "")}`} className="text-brand underline">
                  Call
                </a>
                <a
                  href={waLink(e.phone, `Hi ${first}, this is the DMAT Mock Prep team about your free profile evaluation.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline"
                >
                  WhatsApp
                </a>
              </p>
            )}
          </section>

          <section className="space-y-3 rounded-xl border-2 border-violet-200 bg-white p-5">
            <h2 className="font-bold">Next step</h2>
            {paid ? (
              <p className="rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">✓ Paid: enrolled in the Complete Germany Plan.</p>
            ) : e.status === "submitted" ? (
              <>
                <p className="text-sm text-zinc-600">1. Check the document and details. 2. Decide. The student gets an email and sees the result on the site.</p>
                {statusButton("fit", "✓ Fit: we will call them", "bg-emerald-600 text-white hover:bg-emerald-700", true)}
                {statusButton("not_fit", "Not a fit", "border border-zinc-300 text-zinc-700 hover:bg-zinc-50", true)}
              </>
            ) : e.status === "fit" ? (
              <>
                <p className="text-sm text-zinc-600">Call the student. When the call is done, click below: they can then pay for the plan on the site, and get the payment link by email.</p>
                {statusButton("call_done", "📞 Call done: let them pay", "bg-violet-600 text-white hover:bg-violet-700", true)}
                {statusButton("not_fit", "Not a fit after all", "border border-zinc-300 text-zinc-700 hover:bg-zinc-50")}
              </>
            ) : e.status === "call_done" ? (
              <>
                <p className="text-sm text-zinc-700">
                  {approval ? "Waiting for payment: the student can pay on the site." : "The plan approval was taken back on the student page."}
                </p>
                {!approval && statusButton("call_done", "Approve again and email the payment link", "bg-violet-600 text-white hover:bg-violet-700")}
                {statusButton("fit", "Undo “call done” (take payment approval back)", "border border-zinc-300 text-zinc-700 hover:bg-zinc-50")}
              </>
            ) : (
              <>
                <p className="text-sm text-zinc-600">Marked as not a fit.</p>
                {statusButton("fit", "Change to fit (emails the student)", "border border-emerald-300 text-emerald-700 hover:bg-emerald-50")}
              </>
            )}
          </section>

          <form action={setEvaluationNotesAction} className="space-y-2 rounded-xl border border-zinc-200 bg-white p-5">
            <input type="hidden" name="id" value={e.id} />
            <label className="block text-sm font-bold">
              Team notes <span className="font-normal text-zinc-500">(only you see these)</span>
              <textarea name="adminNotes" defaultValue={e.adminNotes ?? ""} className={`${adminField} min-h-24`} />
            </label>
            <button className="rounded-md border border-brand px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brand-soft">Save notes</button>
          </form>
        </aside>
      </div>
    </AdminShell>
  );
}
