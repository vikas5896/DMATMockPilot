import { Suspense } from "react";
import { PackCard } from "@/components/site/PackCard";
import { Faq, PageHero, Section } from "@/components/site/ui";
import { activeGrants, listPacks, openRequests } from "@/lib/access";
import { currentStudent } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "dMAT Mock Test Packs – Prices",
  description: "Unlock more full dMAT mocks and section tests. Request a pack, we contact you with payment details, and your tests unlock right after payment.",
  path: "/packs",
});

const STEPS = [
  ["Request a pack", "Choose a pack and click Request access (free account needed)."],
  ["We contact you", "On WhatsApp or by phone, usually within a few hours, with the payment details."],
  ["Pay by UPI or bank transfer", "Pay the amount we share with you; we confirm the payment."],
  ["Tests unlock", "Your tests open in My tests right away. We email you when they are ready."],
];

export default function PacksPage() {
  return (
    <>
      <PageHero
        eyebrow="Packs"
        title="Unlock more dMAT mock tests."
        intro="Every account gets Full Mock 1 and one test per section for free. Packs unlock tests 2–10, with scores and step-by-step solutions for every task."
      />
      <Section>
        <Suspense fallback={<p className="text-zinc-500">Loading packs…</p>}>
          <PackList />
        </Suspense>
      </Section>
      <Section tone="soft" title="How it works">
        <ol className="grid gap-6 md:grid-cols-4">
          {STEPS.map(([h, p], i) => (
            <li key={h} className="rounded-xl border border-zinc-200 bg-white p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{h}</h3>
              <p className="mt-1 text-sm text-zinc-600">{p}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Questions">
        <Faq
          items={[
            {
              q: "Why can't I pay online?",
              a: "Online payment is coming soon. Until then we confirm every pack personally, which also lets us answer your questions about the dMAT and your preparation.",
            },
            {
              q: "How long do I keep access?",
              a: "Each pack shows its access period. Your free tests and results stay in your account in any case.",
            },
            {
              q: "Do live-class students get the tests?",
              a: "Yes. Students in our live batches get the tests included; we unlock them for you when you join.",
            },
          ]}
        />
      </Section>
    </>
  );
}

async function PackList() {
  const [list, me] = await Promise.all([listPacks({ publishedOnly: true }), currentStudent()]);
  const signedIn = !!(me?.name && me.phone);
  const [open, active] = signedIn ? await Promise.all([openRequests(me!.id), activeGrants(me!.id)]) : [[], []];
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric" });
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {list.map((p, i) => {
        const g = active.find((x) => x.packSlug === p.slug);
        return (
          <PackCard
            key={p.slug}
            pack={p}
            signedIn={signedIn}
            requested={open.some((r) => r.packSlug === p.slug)}
            owned={g ? fmt(g.expiresAt) : undefined}
            from="/packs"
            highlight={i === list.length - 1}
          />
        );
      })}
    </div>
  );
}
