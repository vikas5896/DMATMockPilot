import { connection } from "next/server";
import { Fragment, Suspense } from "react";
import { getPack, listPacks } from "@/lib/access";
import { PLAN_PACK } from "@/lib/pricing";
import { autoPromo } from "@/lib/promo";

/**
 * Text with live pack prices, so marketing copy always matches /packs.
 * Tokens: {section-pack} → price with the automatic offer (e.g. "₹479 ₹599̶"), {full-pack:base} → the regular price,
 * {packs-from} → the lowest price anyone pays for a pack today. Prices come from Admin → Packs and Promo codes.
 */
export function PriceText({ text }: { text: string }) {
  const parts = text.split(/(\{[a-z0-9-]+(?::base)?\})/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\{([a-z0-9-]+)(:base)?\}$/);
        if (!m) return <Fragment key={i}>{p}</Fragment>;
        return (
          <Suspense key={i} fallback={<span className="inline-block h-[0.9em] w-12 animate-pulse rounded bg-zinc-200 align-middle" />}>
            <LivePrice slug={m[1]} base={!!m[2]} />
          </Suspense>
        );
      })}
    </>
  );
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

async function offerPrice(slug: string, price: number): Promise<number> {
  const o = await autoPromo({ kind: "pack", slug }).catch(() => null);
  return o?.finalPriceInr ?? price;
}

async function LivePrice({ slug, base }: { slug: string; base: boolean }) {
  await connection(); // automatic offers can start, expire or run out at any time
  if (slug === "packs-from") {
    const packs = (await listPacks({ publishedOnly: true })).filter((p) => p.slug !== PLAN_PACK && p.priceInr != null);
    if (!packs.length) return null;
    const prices = await Promise.all(packs.map((p) => offerPrice(p.slug, p.priceInr!)));
    return <>{rupees(Math.min(...prices))}</>;
  }
  const pack = await getPack(slug);
  if (pack?.priceInr == null) return null;
  if (base) return <>{rupees(pack.priceInr)}</>;
  const now = await offerPrice(slug, pack.priceInr);
  if (now >= pack.priceInr) return <>{rupees(pack.priceInr)}</>;
  return (
    <span className="whitespace-nowrap">
      {rupees(now)}{" "}
      <s className="font-normal opacity-60" aria-label={`was ${rupees(pack.priceInr)}`}>
        {rupees(pack.priceInr)}
      </s>
    </span>
  );
}
