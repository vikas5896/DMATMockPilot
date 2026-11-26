import Link from "next/link";
import { COMPARE, PLANS } from "@/content/site/plans";
import { LeadForm } from "@/components/site/LeadForm";
import { Faq, PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Plans – dMAT Preparation and Study in Germany",
  description:
    "Three ways to work with DMAT Mock Prep: dMAT mock tests, live dMAT classes with mock tests included, or the Complete Germany Plan with profile building, shortlisting, documents, APS, blocked account and visa guidance.",
  path: "/plans",
});

export default function PlansPage() {
  return (
    <>
      <PageHero
        eyebrow="Plans"
        title="From your first mock test to your German student visa."
        intro="Prepare for the dMAT on your own, learn it live with us, or let one team guide you through the whole journey to a Master’s in Germany. Built by people who sat the real dMAT."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {PLANS.map((p) => {
            const top = p.id === "complete";
            return (
              <div
                key={p.id}
                id={p.id}
                className={`relative flex flex-col rounded-2xl p-7 ${
                  top ? "border-2 border-brand bg-brand-soft/40 shadow-lg" : "border border-zinc-200 bg-white"
                }`}
              >
                {p.highlight && (
                  <p
                    className={`mb-3 self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                      top ? "bg-brand text-white" : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    {p.highlight}
                  </p>
                )}
                <h2 className="text-2xl font-bold">{p.name}</h2>
                <p className="mt-1 text-zinc-600">{p.tagline}</p>
                <p className="mt-5 text-4xl font-bold text-brand">{p.price}</p>
                <p className="text-sm text-zinc-500">{p.priceNote}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-[15px]">
                      <span className="mt-0.5 font-bold text-emerald-600" aria-hidden>
                        ✓
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 space-y-2">
                  <Link
                    href={p.cta.href}
                    className={`block rounded-md px-5 py-3 text-center font-semibold transition ${
                      top ? "bg-brand text-white hover:bg-brand-dark" : "border border-brand text-brand hover:bg-brand-soft"
                    }`}
                  >
                    {p.cta.label}
                  </Link>
                  {p.secondary && (
                    <Link href={p.secondary.href} className="block text-center text-sm text-brand underline">
                      {p.secondary.label}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="soft" title="Compare the plans">
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-700">
              <tr>
                <th className="px-4 py-3 font-semibold"> </th>
                <th className="px-4 py-3 font-semibold">Mock Tests</th>
                <th className="px-4 py-3 font-semibold">Live Classes</th>
                <th className="px-4 py-3 font-semibold text-brand">Complete Germany Plan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {COMPARE.map(([f, a, b, c]) => (
                <tr key={f}>
                  <td className="px-4 py-3 font-medium">{f}</td>
                  {[a, b, c].map((v, i) => (
                    <td key={i} className={`px-4 py-3 ${v === "–" ? "text-zinc-400" : i === 2 ? "font-semibold text-brand" : ""}`}>
                      {v === "Included" ? "✓ Included" : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="How the Complete Germany Plan works">
        <ol className="grid gap-5 md:grid-cols-4">
          {[
            ["Free profile check", "A short call about your degree, grades, goals and target intake."],
            ["Your plan", "We confirm what fits you and share the payment details. Seats per intake are limited."],
            ["dMAT and documents", "Live classes and mocks for the dMAT, while we build your profile and documents."],
            ["Applications to visa", "Shortlisting, applications, APS, blocked account and visa guidance until you fly."],
          ].map(([t, d], i) => (
            <li key={t} className="rounded-xl border border-zinc-200 p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-zinc-600">{d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="soft" title="Common questions">
        <Faq
          items={[
            {
              q: "Are the mock tests really included with live classes?",
              a: "Yes. Booking any paid live dMAT course unlocks the Full Pack (full mocks 2–10 and every section test) in your account at no extra cost. The short webinar does not include it.",
            },
            {
              q: "Can you guarantee an admission or a visa?",
              a: "No one can honestly guarantee that. Universities decide on admissions and the German embassy on visas. We help you prepare the strongest possible application and guide you through every step.",
            },
            {
              q: "Why are seats in the Complete Germany Plan limited?",
              a: "Every student gets personal attention for shortlisting, documents and visa preparation, so we take only a limited number of students per intake.",
            },
            {
              q: "Can I start with mock tests and upgrade later?",
              a: "Yes. Many students start with the free mock or a pack and move to live classes or the Complete Germany Plan later. Just contact us.",
            },
            {
              q: "Do I need the dMAT?",
              a: "APS India requires it from Master’s applicants in selected fields (such as engineering, commerce, economics, business and hospitality) for intakes from summer semester 2027, with some exemptions. Read our dMAT guide and the official APS India page.",
            },
          ]}
        />
      </Section>

      <Section
        id="profile-check"
        title="Book a free profile check"
        intro="Tell us about your degree and target intake. We will call or WhatsApp you for a short, free profile check and suggest the plan that fits you."
      >
        <div className="max-w-2xl">
          <LeadForm defaultInterest="consultancy" fixedInterest submitLabel="Book my free profile check" />
        </div>
      </Section>
    </>
  );
}
