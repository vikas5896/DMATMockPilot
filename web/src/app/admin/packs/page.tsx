import { Suspense } from "react";
import { AdminShell, Loading } from "@/components/admin/AdminShell";
import { listPacks } from "@/lib/access";
import { requireAdmin } from "@/lib/auth";
import { PackForm } from "./PackForm";

export const metadata = { title: "Packs" };
type SP = Promise<{ [k: string]: string | string[] | undefined }>;

export default function PacksAdminPage({ searchParams }: { searchParams: SP }) {
  return (
    <Suspense fallback={<Loading />}>
      <Packs searchParams={searchParams} />
    </Suspense>
  );
}

async function Packs({ searchParams }: { searchParams: SP }) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const list = await listPacks();
  return (
    <AdminShell email={email} active="/admin/packs" title="Packs">
      {sp.saved && <p className="mb-4 rounded-md bg-emerald-50 px-4 py-2 text-sm text-emerald-800">Saved. The Packs page shows the change now.</p>}
      <p className="mb-6 max-w-3xl text-sm text-zinc-600">
        A pack unlocks tests 2–10 of the ticked test types. Prices appear on the public Packs page and in the request
        messages. Students already holding a pack keep it if you change it.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {list.map((p) => (
          <PackForm
            key={p.slug}
            initial={{
              slug: p.slug,
              name: p.name,
              description: p.description,
              priceInr: p.priceInr,
              validityDays: p.validityDays,
              kinds: p.kinds as string[],
              published: p.published,
              sort: p.sort,
            }}
          />
        ))}
        <PackForm />
      </div>
    </AdminShell>
  );
}
