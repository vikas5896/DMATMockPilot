import { and, desc, eq, ilike, or, type SQL } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { setLeadNotesAction, setLeadStatusAction } from "@/app/admin/actions";
import { adminField, AdminShell, Loading } from "@/components/admin/AdminShell";
import { getDb } from "@/db";
import { LEAD_STATUSES, leads } from "@/db/schema";
import { requireAdmin } from "@/lib/auth";
import { listAllBatches } from "@/lib/batch-store";
import { INTERESTS, type Interest } from "@/lib/leads";

export const metadata = { title: "Enquiries" };

type SP = Promise<{ [k: string]: string | string[] | undefined }>;

export default function EnquiriesPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <Enquiries searchParams={searchParams} />
    </Suspense>
  );
}

const STATUS_STYLE: Record<string, string> = {
  new: "bg-brand-soft text-brand",
  contacted: "bg-amber-50 text-amber-800",
  enrolled: "bg-emerald-50 text-emerald-700",
  closed: "bg-zinc-100 text-zinc-500",
};

async function Enquiries({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const filter = { interest: one("interest"), status: one("status"), batch: one("batch"), q: one("q") };

  const where: SQL[] = [];
  if (filter.interest) where.push(eq(leads.interest, filter.interest));
  if (filter.status) where.push(eq(leads.status, filter.status));
  if (filter.batch) where.push(eq(leads.batch, filter.batch));
  if (filter.q) {
    const like = `%${filter.q.replace(/[%_]/g, "")}%`;
    where.push(or(ilike(leads.name, like), ilike(leads.email, like), ilike(leads.phone, like))!);
  }

  const db = await getDb();
  const [rows, batches] = await Promise.all([
    db.select().from(leads).where(where.length ? and(...where) : undefined).orderBy(desc(leads.createdAt)).limit(500),
    listAllBatches(),
  ]);
  const batchTitle = (slug: string | null) => batches.find((b) => b.slug === slug)?.title ?? slug;
  const qs = new URLSearchParams(Object.entries(filter).filter(([, v]) => v)).toString();
  const back = `/admin/enquiries${qs ? `?${qs}` : ""}`;

  return (
    <AdminShell
      email={email}
      active="/admin/enquiries"
      title="Enquiries"
      actions={
        <a href={`/admin/enquiries/export${qs ? `?${qs}` : ""}`} className="rounded-md border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft">
          Download CSV
        </a>
      }
    >
      <form className="mb-5 grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-5" method="get">
        <label className="text-xs font-medium text-zinc-600 sm:col-span-2">
          Search name, email or phone
          <input name="q" defaultValue={filter.q} className={adminField} />
        </label>
        <label className="text-xs font-medium text-zinc-600">
          Interest
          <select name="interest" defaultValue={filter.interest} className={adminField}>
            <option value="">All</option>
            {Object.entries(INTERESTS).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium text-zinc-600">
          Batch
          <select name="batch" defaultValue={filter.batch} className={adminField}>
            <option value="">All</option>
            {batches.map((b) => (
              <option key={b.slug} value={b.slug}>
                {b.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium text-zinc-600">
          Status
          <select name="status" defaultValue={filter.status} className={adminField}>
            <option value="">All</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 sm:col-span-5">
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white">Filter</button>
          {qs && (
            <Link href="/admin/enquiries" className="rounded-md px-4 py-2 text-sm text-zinc-600 hover:text-brand">
              Clear
            </Link>
          )}
        </div>
      </form>

      <p className="mb-2 text-sm text-zinc-500">{rows.length} enquir{rows.length === 1 ? "y" : "ies"}</p>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Received</th>
              <th className="px-4 py-3">Name and contact</th>
              <th className="px-4 py-3">Interest</th>
              <th className="px-4 py-3">Message and notes</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 align-top">
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No enquiries match.
                </td>
              </tr>
            )}
            {rows.map((l) => (
              <tr key={l.id}>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                  {l.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  <br />
                  <span className="text-xs">{l.createdAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{l.name}</p>
                  <a href={`mailto:${l.email}`} className="block text-brand hover:underline">
                    {l.email}
                  </a>
                  {l.phone && (
                    <span className="flex gap-2 text-zinc-600">
                      <a href={`tel:${l.phone}`} className="hover:text-brand">
                        {l.phone}
                      </a>
                      <a
                        href={`https://wa.me/${l.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 hover:underline"
                      >
                        WhatsApp
                      </a>
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {INTERESTS[l.interest as Interest] ?? l.interest}
                  {l.batch && <p className="text-xs text-zinc-500">{batchTitle(l.batch)}</p>}
                </td>
                <td className="max-w-md px-4 py-3">
                  {l.message && <p className="whitespace-pre-line text-zinc-700">{l.message}</p>}
                  <details className="mt-1">
                    <summary className="cursor-pointer text-xs text-brand">{l.notes ? "Notes" : "Add note"}</summary>
                    <form action={setLeadNotesAction} className="mt-2 space-y-2">
                      <input type="hidden" name="id" value={l.id} />
                      <input type="hidden" name="back" value={back} />
                      <textarea name="notes" defaultValue={l.notes ?? ""} className={`${adminField} min-h-16`} />
                      <button className="rounded-md bg-zinc-800 px-3 py-1 text-xs text-white">Save note</button>
                    </form>
                  </details>
                  {l.notes && <p className="mt-1 whitespace-pre-line text-xs text-zinc-500">{l.notes}</p>}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[l.status] ?? ""}`}>
                    {l.status}
                  </span>
                  <form action={setLeadStatusAction} className="mt-2 flex gap-1">
                    <input type="hidden" name="id" value={l.id} />
                    <input type="hidden" name="back" value={back} />
                    <select name="status" defaultValue={l.status} className="rounded border border-zinc-300 px-1 py-1 text-xs">
                      {LEAD_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button className="rounded bg-zinc-800 px-2 py-1 text-xs text-white">Set</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
