import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { setRequestStatusAction } from "@/app/admin/actions";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { getDb } from "@/db";
import { accessRequests, REQUEST_STATUSES, students } from "@/db/schema";
import { listPacks } from "@/lib/access";
import { requireAdmin } from "@/lib/auth";
import { WA, waLink } from "@/lib/wa-templates";

export const metadata = { title: "Access requests" };
type SP = Promise<{ [k: string]: string | string[] | undefined }>;

const STYLE: Record<string, string> = {
  new: "bg-brand-soft text-brand",
  contacted: "bg-amber-50 text-amber-800",
  approved: "bg-violet-50 text-violet-800",
  paid: "bg-sky-50 text-sky-800",
  granted: "bg-emerald-50 text-emerald-700",
  closed: "bg-zinc-100 text-zinc-500",
};

export default function RequestsPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <Requests searchParams={searchParams} />
    </Suspense>
  );
}

async function Requests({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const filter = typeof sp.status === "string" ? sp.status : "open";
  const db = await getDb();
  const [rows, packList] = await Promise.all([
    db
      .select({ r: accessRequests, s: students })
      .from(accessRequests)
      .innerJoin(students, eq(students.id, accessRequests.studentId))
      .orderBy(desc(accessRequests.createdAt))
      .limit(500),
    listPacks(),
  ]);
  const shown = rows.filter(({ r }) =>
    filter === "all" ? true : filter === "open" ? ["new", "contacted", "approved", "paid"].includes(r.status) : r.status === filter,
  );
  const pack = (slug: string) => packList.find((p) => p.slug === slug);
  const back = `/admin/requests${filter !== "open" ? `?status=${filter}` : ""}`;

  return (
    <AdminShell email={email} active="/admin/requests" title="Access requests">
      <div className="mb-5 flex flex-wrap gap-2 text-sm">
        {["open", ...REQUEST_STATUSES, "all"].map((f) => (
          <Link
            key={f}
            href={f === "open" ? "/admin/requests" : `/admin/requests?status=${f}`}
            className={`rounded-full px-3 py-1 ${filter === f ? "bg-brand text-white" : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:ring-brand"}`}
          >
            {f === "open" ? "Open (new, contacted, paid)" : f}
          </Link>
        ))}
      </div>
      <p className="mb-2 text-sm text-zinc-500">{shown.length} request{shown.length === 1 ? "" : "s"}</p>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Requested</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Pack</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Next step</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 align-top">
            {shown.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-zinc-500">
                  No requests here.
                </td>
              </tr>
            )}
            {shown.map(({ r, s }) => {
              const p = pack(r.packSlug);
              return (
                <tr key={r.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                    {r.createdAt.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short" })}
                    <br />
                    <span className="text-xs">{r.createdAt.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit" })}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/students/${s.id}`} className="font-medium hover:text-brand">
                      {s.name}
                    </Link>
                    <p className="text-zinc-600">{s.phone}</p>
                    <p className="text-xs text-zinc-500">{s.email}</p>
                    {r.message && <p className="mt-1 max-w-xs whitespace-pre-line text-xs text-zinc-700">“{r.message}”</p>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{p?.name ?? r.packSlug}</p>
                    {r.promoCode && r.quotedPriceInr != null ? (
                      <p className="text-zinc-600">
                        <strong className="text-emerald-700">₹{r.quotedPriceInr.toLocaleString("en-IN")}</strong>
                        {p?.priceInr != null && <span className="ml-1 text-xs line-through">₹{p.priceInr.toLocaleString("en-IN")}</span>}
                        <span className="mt-0.5 block w-fit rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-800">
                          code {r.promoCode}
                        </span>
                      </p>
                    ) : (
                      (r.quotedPriceInr ?? p?.priceInr) != null && (
                        <p className="text-zinc-600">₹{(r.quotedPriceInr ?? p?.priceInr ?? 0).toLocaleString("en-IN")}</p>
                      )
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STYLE[r.status] ?? ""}`}>{r.status}</span>
                    <form action={setRequestStatusAction} className="mt-2 flex gap-1">
                      <input type="hidden" name="id" value={r.id} />
                      <input type="hidden" name="back" value={back} />
                      <select name="status" defaultValue={r.status} className="rounded border border-zinc-300 px-1 py-1 text-xs">
                        {REQUEST_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      <button className="rounded bg-zinc-800 px-2 py-1 text-xs text-white">Set</button>
                    </form>
                  </td>
                  <td className="space-y-1.5 px-4 py-3">
                    {s.phone && (
                      <a
                        href={waLink(s.phone, WA.request(s.name, p?.name ?? r.packSlug, r.quotedPriceInr ?? p?.priceInr ?? null, r.promoCode))}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-md bg-emerald-600 px-3 py-1.5 text-center text-xs font-semibold text-white hover:bg-emerald-700"
                      >
                        WhatsApp with payment message
                      </a>
                    )}
                    {r.status !== "granted" && (
                      <Link
                        href={`/admin/students/${s.id}?pack=${r.packSlug}&request=${r.id}#grant`}
                        className="block rounded-md border border-brand px-3 py-1.5 text-center text-xs font-semibold text-brand hover:bg-brand-soft"
                      >
                        Payment received → grant access
                      </Link>
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
