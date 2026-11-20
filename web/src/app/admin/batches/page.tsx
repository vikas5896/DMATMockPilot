import Link from "next/link";
import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { formatRange } from "@/content/site/batches";
import { requireAdmin } from "@/lib/auth";
import { listAllBatches } from "@/lib/batch-store";
import { listEnrollments } from "@/lib/payments";
import { WA, waLink } from "@/lib/wa-templates";

export const metadata = { title: "Live batches" };
type SP = Promise<{ [k: string]: string | string[] | undefined }>;

export default function BatchesPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <Batches searchParams={searchParams} />
    </Suspense>
  );
}

const STATUS = { open: "Registrations open", soon: "Opening soon", full: "Full" } as const;

async function Batches({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const [batches, enrolments] = await Promise.all([listAllBatches(), listEnrollments()]);
  const enrolledIn = (slug: string) => enrolments.filter((r) => r.e.classSlug === slug);

  return (
    <AdminShell
      email={email}
      active="/admin/batches"
      title="Live batches"
      actions={
        <Link href="/admin/batches/new" className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
          + New batch
        </Link>
      }
    >
      {typeof sp.saved === "string" && (
        <p className="mb-4 rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800">
          Saved. The website shows the change now.{" "}
          <Link href={`/live-classes/${sp.saved}`} className="underline" target="_blank">
            View page ↗
          </Link>
        </p>
      )}
      {sp.deleted && <p className="mb-4 rounded-md bg-zinc-100 px-4 py-2 text-sm">Batch deleted.</p>}

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Batch</th>
              <th className="px-4 py-3">Dates</th>
              <th className="px-4 py-3">Fee shown</th>
              <th className="px-4 py-3">Online price</th>
              <th className="px-4 py-3">Enrolled</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">On website</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {batches.map((b) => (
              <tr key={b.slug}>
                <td className="px-4 py-3">
                  <p className="font-medium">{b.title}</p>
                  <p className="text-xs text-zinc-500">/live-classes/{b.slug}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3">{formatRange(b.start, b.end)}</td>
                <td className="px-4 py-3">{b.fee ?? <span className="text-zinc-400">not set</span>}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  {b.priceInr ? `₹${b.priceInr.toLocaleString("en-IN")}` : <span className="text-zinc-400">no online payment</span>}
                </td>
                <td className="px-4 py-3">
                  {enrolledIn(b.slug).length === 0 ? (
                    <span className="text-zinc-400">0</span>
                  ) : (
                    <details>
                      <summary className="cursor-pointer font-semibold text-brand">{enrolledIn(b.slug).length} paid</summary>
                      <ul className="mt-2 space-y-1 text-xs">
                        {enrolledIn(b.slug).map(({ e, s }) => (
                          <li key={e.id}>
                            <Link href={`/admin/students/${s.id}`} className="font-medium hover:text-brand">
                              {s.name ?? s.email}
                            </Link>{" "}
                            · {e.amountInr != null ? `₹${e.amountInr}` : "-"}
                            {e.promoCode ? ` · ${e.promoCode}` : ""}
                            {s.phone && (
                              <>
                                {" "}
                                ·{" "}
                                <a
                                  href={waLink(s.phone, WA.classLink(s.name, b.title))}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-emerald-700 underline"
                                >
                                  WhatsApp
                                </a>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </td>
                <td className="px-4 py-3">{STATUS[b.status]}</td>
                <td className="px-4 py-3">{b.published ? "Shown" : <span className="text-zinc-400">Hidden</span>}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/batches/${b.slug}`} className="font-semibold text-brand hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
