import { desc, ilike, or } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { adminField, AdminShell, Loading } from "@/components/admin/AdminShell";
import { getDb } from "@/db";
import { attempts, students } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { parseTestId } from "@/lib/exam/catalog";

export const metadata = { title: "Students" };
type SP = Promise<{ [k: string]: string | string[] | undefined }>;

export default function StudentsPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <Students searchParams={searchParams} />
    </Suspense>
  );
}

async function Students({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q.trim() : "";
  const db = await getDb();
  const like = `%${q.replace(/[%_]/g, "")}%`;
  const rows = await db
    .select()
    .from(students)
    .where(q ? or(ilike(students.name, like), ilike(students.email, like), ilike(students.phone, like)) : undefined)
    .orderBy(desc(students.createdAt))
    .limit(500);
  const all = await db.select().from(attempts);
  const byStudent = new Map<number, typeof all>();
  for (const a of all) byStudent.set(a.studentId, [...(byStudent.get(a.studentId) ?? []), a]);
  const date = (d: Date | null) => (d ? d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" }) : "—");

  return (
    <AdminShell
      email={email}
      active="/admin/students"
      title="Students"
      actions={
        <a href="/admin/students/export" download className="rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft">
          Download CSV
        </a>
      }
    >
      <form className="mb-5 flex gap-3 rounded-xl border border-zinc-200 bg-white p-4" method="get">
        <label className="flex-1 text-xs font-medium text-zinc-600">
          Search name, email or phone
          <input name="q" defaultValue={q} className={adminField} />
        </label>
        <button className="self-end rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white">Search</button>
        {q && (
          <Link href="/admin/students" className="self-end px-2 py-2 text-sm text-zinc-600">
            Clear
          </Link>
        )}
      </form>

      <p className="mb-2 text-sm text-zinc-500">{rows.length} student{rows.length === 1 ? "" : "s"}</p>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Last login</th>
              <th className="px-4 py-3">Tests</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 align-top">
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-zinc-500">
                  No students yet.
                </td>
              </tr>
            )}
            {rows.map((s) => {
              const tests = (byStudent.get(s.id) ?? []).sort((a, b) => a.testId.localeCompare(b.testId));
              return (
                <tr key={s.id}>
                  <td className="px-4 py-3">
                    <Link href={`/admin/students/${s.id}`} className="font-medium text-zinc-900 hover:text-brand hover:underline">
                      {s.name ?? <span className="text-zinc-400">(profile not finished)</span>}
                    </Link>
                    <a href={`mailto:${s.email}`} className="block text-brand hover:underline">
                      {s.email}
                    </a>
                    {s.phone && (
                      <span className="flex gap-2 text-zinc-600">
                        <a href={`tel:${s.phone.replace(/[^\d+]/g, "")}`} className="hover:text-brand">
                          {s.phone}
                        </a>
                        <a
                          href={`https://wa.me/${(s.phone.replace(/\D/g, "").length === 10 ? "91" : "") + s.phone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline"
                        >
                          WhatsApp
                        </a>
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{date(s.createdAt)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{date(s.lastLoginAt)}</td>
                  <td className="px-4 py-3">
                    {tests.length === 0 ? (
                      <span className="text-zinc-400">none yet</span>
                    ) : (
                      <ul className="space-y-0.5">
                        {tests.map((t) => (
                          <li key={t.id}>
                            {parseTestId(t.testId)?.title ?? t.testId}:{" "}
                            {t.status === "completed" ? (
                              <strong>
                                {t.score}/{t.maxScore}
                              </strong>
                            ) : (
                              <span className="text-amber-700">in progress</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
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
