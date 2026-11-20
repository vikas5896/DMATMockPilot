import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { listPacks } from "@/lib/access";
import { requireAdmin } from "@/lib/auth";
import { listAllBatches } from "@/lib/batch-store";
import { listPromosWithStats, promoCoverage } from "@/lib/promo";
import { SITE_URL } from "@/lib/site";
import { PromoForm } from "./PromoForm";

export const metadata = { title: "Promo codes" };
type SP = Promise<{ [k: string]: string | string[] | undefined }>;

export default function PromoCodesPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <PromoCodes searchParams={searchParams} />
    </Suspense>
  );
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

async function PromoCodes({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const [promos, packs, batches, coverage] = await Promise.all([listPromosWithStats(), listPacks(), listAllBatches(), promoCoverage()]);
  const packList = packs.map((p) => ({ slug: p.slug, name: p.name, priceInr: p.priceInr }));
  const classList = batches.filter((b) => b.priceInr && b.priceInr > 0).map((b) => ({ slug: b.slug, name: b.title, priceInr: b.priceInr! }));
  const total = promos.reduce((a, p) => ({ sales: a.sales + p.sales, revenue: a.revenue + p.revenueInr }), { sales: 0, revenue: 0 });
  return (
    <AdminShell email={email} active="/admin/promo-codes" title="Promo codes">
      {sp.saved && <p className="mb-4 rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800">Saved {String(sp.saved)}.</p>}
      {sp.deleted && <p className="mb-4 rounded-md bg-zinc-100 px-4 py-2 text-sm text-zinc-700">Deleted {String(sp.deleted)}.</p>}

      {/* overview: where codes can be used */}
      <section className="mb-8">
        <h2 className="mb-2 text-lg font-bold">Where codes apply</h2>
        <p className="mb-3 max-w-3xl text-sm text-zinc-600">
          Every pack and every live class with an online price. Change where a code works under &quot;Valid for&quot; in the
          code below. Free classes (no online price) do not use codes.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-4 py-3">Pack / live class</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Automatic offer</th>
                <th className="px-4 py-3">Other codes that work here</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 align-top">
              {coverage.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-zinc-500">
                    Nothing with a price yet.
                  </td>
                </tr>
              )}
              {coverage.map((r) => (
                <tr key={`${r.item.kind}:${r.item.slug}`}>
                  <td className="px-4 py-3">
                    <span className={`mr-2 rounded px-1.5 py-0.5 text-[11px] font-semibold uppercase ${r.item.kind === "pack" ? "bg-brand-soft text-brand" : "bg-sky-50 text-sky-800"}`}>
                      {r.item.kind === "pack" ? "Pack" : "Class"}
                    </span>
                    <span className="font-medium">{r.name}</span>
                    {!r.onSale && <span className="ml-2 text-xs text-zinc-400">(not on sale)</span>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">{rupees(r.priceInr)}</td>
                  <td className="px-4 py-3">
                    {r.autoCode ? (
                      <span className="text-emerald-800">
                        <strong>{r.autoCode.code}</strong> {r.autoCode.percentOff}% → {rupees(r.autoCode.finalPriceInr)}
                      </span>
                    ) : (
                      <span className="text-zinc-400">none</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {r.codes.length === 0 ? (
                      <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">No codes apply</span>
                    ) : (
                      <span className="flex flex-wrap gap-1">
                        {r.codes.map((c) => (
                          <span
                            key={c.code}
                            title={c.active ? "active" : "paused"}
                            className={`rounded px-2 py-0.5 text-xs font-semibold ${c.active ? "bg-emerald-50 text-emerald-800" : "bg-zinc-100 text-zinc-400 line-through"}`}
                          >
                            {c.code} {c.percentOff}%
                          </span>
                        ))}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mb-6 max-w-3xl space-y-2 text-sm text-zinc-600">
        <p>
          Give each influencer their own code. Their followers type it on the Packs page or a class page, or simply open
          the influencer link: the code is then applied automatically, even if they sign up first.
        </p>
        <p>
          <strong>Automatic offer:</strong> tick &quot;Apply automatically to everyone&quot; on one code (e.g. PREP20) and every
          visitor sees that discount without typing anything. If they enter another valid code with a bigger discount
          (e.g. an influencer&apos;s 50 %), it replaces the automatic one.
        </p>
        <p>
          <strong>Requests</strong> = students who asked for a pack with the code. <strong>Sales</strong> = packs granted and
          class seats paid with the code. Max sales counts sales only.
        </p>
        {promos.length > 0 && (
          <p className="font-medium text-zinc-800">
            All codes: {total.sales} sales · {rupees(total.revenue)}
          </p>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <PromoForm packs={packList} classes={classList} siteUrl={SITE_URL} />
        {[...promos]
          .reverse()
          .sort((a, b) => Number(b.autoApply) - Number(a.autoApply))
          .map((p) => (
            <PromoForm
              key={p.code}
              packs={packList}
              classes={classList}
              siteUrl={SITE_URL}
              stats={{ requests: p.requests, sales: p.sales, revenueInr: p.revenueInr }}
              initial={{
                code: p.code,
                percentOff: p.percentOff,
                label: p.label,
                packSlugs: p.packSlugs as string[],
                classSlugs: (p.classSlugs as string[]) ?? [],
                appliesToAll: p.appliesToAll,
                active: p.active,
                maxUses: p.maxUses,
                expiresOn: p.expiresOn,
                autoApply: p.autoApply,
              }}
            />
          ))}
      </div>
    </AdminShell>
  );
}
