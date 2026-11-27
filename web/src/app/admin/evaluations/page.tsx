import Link from "next/link";
import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { EVALUATION_STATUSES } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { EVAL_LABEL, EVAL_STYLE } from "@/lib/evaluation";
import { listEvaluations } from "@/lib/evaluation-store";

export const metadata = { title: "Profile evaluations" };
type SP = Promise<{ [k: string]: string | string[] | undefined }>;

/** Hours since a date (admin pages are rendered per request). */
const hoursSince = (d: Date) => Math.floor((Date.now() - d.getTime()) / 36e5);

export default function EvaluationsPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <Evaluations searchParams={searchParams} />
    </Suspense>
  );
}

async function Evaluations({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const status = typeof sp.status === "string" && (EVALUATION_STATUSES as readonly string[]).includes(sp.status) ? sp.status : "";
  const [rows, all] = await Promise.all([listEvaluations(status || undefined), status ? listEvaluations() : null]);
  const counts = (all ?? rows).reduce<Record<string, number>>((c, r) => ({ ...c, [r.status]: (c[r.status] ?? 0) + 1 }), {});

  return (
    <AdminShell email={email} active="/admin/evaluations" title="Profile evaluations">
      <div className="mb-5 flex flex-wrap gap-2 text-sm">
        <Link href="/admin/evaluations" className={`rounded-full px-3 py-1 ${!status ? "bg-brand text-white" : "bg-white ring-1 ring-zinc-200"}`}>
          All ({(all ?? rows).length})
        </Link>
        {EVALUATION_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/evaluations?status=${s}`}
            className={`rounded-full px-3 py-1 ${status === s ? "bg-brand text-white" : "bg-white ring-1 ring-zinc-200"}`}
          >
            {EVAL_LABEL[s]} ({counts[s] ?? 0})
          </Link>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Degree</th>
              <th className="px-4 py-3">Wants</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 align-top">
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No profiles here yet.
                </td>
              </tr>
            )}
            {rows.map((r) => {
              const hours = hoursSince(r.createdAt);
              const late = r.status === "submitted" && hours >= 36;
              return (
                <tr key={r.id} className="hover:bg-zinc-50">
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                    {r.createdAt.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short" })}
                    {r.status === "submitted" && (
                      <span className={`block text-xs ${late ? "font-semibold text-red-600" : ""}`}>{hours} h ago</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/evaluations/${r.id}`} className="font-semibold text-brand hover:underline">
                      {r.name ?? r.email}
                    </Link>
                    <span className="block text-xs text-zinc-500">{r.phone}</span>
                  </td>
                  <td className="px-4 py-3">
                    {r.details.degree}
                    <span className="block text-xs text-zinc-500">
                      {r.details.university} · {r.details.score} · {r.details.gradYear}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.details.targetCourse}
                    <span className="block text-xs text-zinc-500">{r.details.intake}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${EVAL_STYLE[r.status] ?? ""}`}>
                      {EVAL_LABEL[r.status] ?? r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
