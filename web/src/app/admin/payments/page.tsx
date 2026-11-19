import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { getDb } from "@/db";
import { payments, students } from "@/db/schema";
import { listPacks } from "@/lib/access";
import { requireAdmin } from "@/lib/auth";
import { paymentsEnabled, razorpayKeyId } from "@/lib/payments";

export const metadata = { title: "Payments" };
type SP = Promise<{ [k: string]: string | string[] | undefined }>;

const STYLE: Record<string, string> = {
  paid: "bg-emerald-50 text-emerald-700",
  created: "bg-zinc-100 text-zinc-600",
  failed: "bg-red-50 text-red-700",
};
const LABEL: Record<string, string> = { paid: "paid", created: "not completed", failed: "failed" };

export default function PaymentsPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <Payments searchParams={searchParams} />
    </Suspense>
  );
}

async function Payments({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const filter = sp.status === "all" ? "all" : "paid";
  const db = await getDb();
  const [rows, packList] = await Promise.all([
    db
      .select({ p: payments, s: students })
      .from(payments)
      .innerJoin(students, eq(students.id, payments.studentId))
      .orderBy(desc(payments.createdAt))
      .limit(1000),
    listPacks(),
  ]);
  const shown = filter === "all" ? rows : rows.filter(({ p }) => p.status === "paid");
  const paid = rows.filter(({ p }) => p.status === "paid");
  const revenue = paid.reduce((a, { p }) => a + p.amountInr, 0);
  const packName = (slug: string) => packList.find((p) => p.slug === slug)?.name ?? slug;
  const fmt = (d: Date) =>
    d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const mode = razorpayKeyId().startsWith("rzp_live_") ? "live" : razorpayKeyId() ? "test" : null;

  return (
    <AdminShell email={email} active="/admin/payments" title="Online payments">
      <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
        {!paymentsEnabled() ? (
          <span className="rounded-md bg-amber-50 px-3 py-1.5 text-amber-800">
            Razorpay is not set up: students see Request access only.
          </span>
        ) : (
          <span className={`rounded-md px-3 py-1.5 ${mode === "live" ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
            Razorpay {mode === "live" ? "LIVE: real payments" : "TEST mode: no real money"}
          </span>
        )}
        <span className="text-zinc-700">
          <strong>{paid.length}</strong> paid · <strong>₹{revenue.toLocaleString("en-IN")}</strong>
        </span>
        <span className="ml-auto flex gap-2">
          {(["paid", "all"] as const).map((f) => (
            <Link
              key={f}
              href={f === "paid" ? "/admin/payments" : "/admin/payments?status=all"}
              className={`rounded-full px-3 py-1 ${filter === f ? "bg-brand text-white" : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:ring-brand"}`}
            >
              {f === "paid" ? "Paid" : "All attempts"}
            </Link>
          ))}
        </span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Pack</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Razorpay</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 align-top">
            {shown.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-zinc-500">
                  No payments yet.
                </td>
              </tr>
            )}
            {shown.map(({ p, s }) => (
              <tr key={p.id}>
                <td className="whitespace-nowrap px-4 py-3 text-zinc-600">{fmt(p.paidAt ?? p.createdAt)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/students/${s.id}`} className="font-medium hover:text-brand">
                    {s.name ?? s.email}
                  </Link>
                  <p className="text-xs text-zinc-500">{s.phone}</p>
                </td>
                <td className="px-4 py-3">{packName(p.packSlug)}</td>
                <td className="whitespace-nowrap px-4 py-3">
                  ₹{p.amountInr.toLocaleString("en-IN")}
                  {p.promoCode && (
                    <span className="mt-0.5 block w-fit rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-800">
                      code {p.promoCode}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${STYLE[p.status] ?? ""}`}>
                    {LABEL[p.status] ?? p.status}
                  </span>
                  {p.error && <p className="mt-1 max-w-xs text-xs text-zinc-500">{p.error}</p>}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-600">
                  {p.paymentId && <p>{p.paymentId}</p>}
                  <p className="text-zinc-400">{p.orderId}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-zinc-500">
        Paid packs unlock automatically and appear on the student&apos;s page. Refunds are made in the Razorpay dashboard;
        then revoke the pack on the student&apos;s page.
      </p>
    </AdminShell>
  );
}
