import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { listPacks } from "@/lib/access";
import { requireAdmin } from "@/lib/auth";
import { listPromosWithStats } from "@/lib/promo";
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

async function PromoCodes({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const [promos, packs] = await Promise.all([listPromosWithStats(), listPacks()]);
  const packList = packs.map((p) => ({ slug: p.slug, name: p.name, priceInr: p.priceInr }));
  const total = promos.reduce((a, p) => ({ sales: a.sales + p.sales, revenue: a.revenue + p.revenueInr }), { sales: 0, revenue: 0 });
  return (
    <AdminShell email={email} active="/admin/promo-codes" title="Promo codes">
      {sp.saved && <p className="mb-4 rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800">Saved {String(sp.saved)}.</p>}
      {sp.deleted && <p className="mb-4 rounded-md bg-zinc-100 px-4 py-2 text-sm text-zinc-700">Deleted {String(sp.deleted)}.</p>}
      <div className="mb-6 max-w-3xl space-y-2 text-sm text-zinc-600">
        <p>
          Give each influencer their own code. Their followers type it on the Packs page, or simply open the influencer
          link: the code is then applied automatically, even if they sign up first.
        </p>
        <p>
          <strong>Automatic offer:</strong> tick &quot;Apply automatically to everyone&quot; on one code (e.g. PREP20) and every
          visitor sees that discount without typing anything. If they enter another valid code with a bigger discount
          (e.g. an influencer&apos;s 50 %), it replaces the automatic one.
        </p>
        <p>
          <strong>Requests</strong> = students who asked for a pack with the code. <strong>Sales</strong> = packs you
          granted with the code (it is filled in for you when you grant from a request). Max sales counts sales only.
        </p>
        {promos.length > 0 && (
          <p className="font-medium text-zinc-800">
            All codes: {total.sales} sales · ₹{total.revenue.toLocaleString("en-IN")}
          </p>
        )}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <PromoForm packs={packList} siteUrl={SITE_URL} />
        {[...promos].reverse().sort((a, b) => Number(b.autoApply) - Number(a.autoApply)).map((p) => (
          <PromoForm
            key={p.code}
            packs={packList}
            siteUrl={SITE_URL}
            stats={{ requests: p.requests, sales: p.sales, revenueInr: p.revenueInr }}
            initial={{
              code: p.code,
              percentOff: p.percentOff,
              label: p.label,
              packSlugs: p.packSlugs as string[],
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
