import Link from "next/link";
import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { formatRange } from "@/content/site/batches";
import { requireAdmin } from "@/lib/auth";
import { listAllBatches } from "@/lib/batch-store";

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
  const batches = await listAllBatches();

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
              <th className="px-4 py-3">Fee</th>
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
