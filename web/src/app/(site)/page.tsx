import Link from "next/link";
import { formatRange } from "@/content/site/batches";
import { getPublicBatches } from "@/lib/batch-store";
import { Badge, ButtonLink, PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "DMAT Mock Prep – dMAT Mock Tests, Live Classes & Study in Germany",
  description:
    "DMAT Mock Prep helps you prepare for the dMAT (digital Master Test): free mock tests in the real exam format, live online classes and guidance for a Master's in Germany.",
  path: "/",
  absoluteTitle: true,
});

const PILLARS = [
  {
    title: "Mock tests",
    text: "Full dMAT mocks in the real exam layout with strict timers. Unlimited fresh Core Module practice and a step-by-step solution for every task.",
    href: "/mock-tests",
    cta: "Take a free mock",
    badge: "Free",
  },
  {
    title: "Live classes",
    text: "Small live online batches for the January and March sittings: rules, shortcuts, timed drills and weekly mock reviews.",
    href: "/live-classes",
    cta: "See batches",
    badge: "Registrations open",
  },
  {
    title: "Study in Germany",
    text: "From shortlisting universities to APS, applications, blocked account and visa. Our full consultancy service is launching soon.",
    href: "/study-in-germany",
    cta: "Join the waitlist",
    badge: "Coming soon",
  },
];

export default async function Home() {
  const upcoming = (await getPublicBatches()).filter((b) => b.status !== "full").slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow="DMAT Mock Prep · dMAT preparation and study in Germany"
        title="Your path to a Master's in Germany starts with the dMAT."
        intro="Practise with realistic mock tests, learn in live classes, and get guidance on every step of studying in Germany."
      >
        <ButtonLink href="/test/full" variant="light">
          Start a free dMAT mock
        </ButtonLink>
        <ButtonLink href="/live-classes" variant="outline-light">
          Explore live classes
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="group flex flex-col rounded-xl border border-zinc-200 p-6 transition hover:border-brand hover:shadow-sm"
            >
              <Badge tone={p.badge === "Coming soon" ? "amber" : p.badge === "Free" ? "green" : "brand"}>{p.badge}</Badge>
              <h2 className="mt-3 text-xl font-bold">{p.title}</h2>
              <p className="mt-2 flex-1 text-zinc-600">{p.text}</p>
              <p className="mt-5 font-semibold text-brand group-hover:underline">{p.cta} →</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="soft" title="Upcoming live classes" intro="Live online sessions in Indian evening and weekend slots, with recordings.">
        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((b) => (
            <Link
              key={b.slug}
              href={`/live-classes/${b.slug}`}
              className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-brand"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {b.kind === "webinar" ? "Free webinar" : b.forSitting}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-zinc-600">{formatRange(b.start, b.end)}</p>
              <p className="text-sm text-zinc-600">
                {b.days} · {b.time}
              </p>
              <p className="mt-4 text-sm font-semibold text-brand">View details →</p>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <ButtonLink href="/live-classes" variant="outline">
            All batches
          </ButtonLink>
        </div>
      </Section>

      <Section title="How we help you prepare">
        <ol className="grid gap-6 md:grid-cols-4">
          {[
            ["Take a free mock", "See where you stand in every section under real exam conditions."],
            ["Learn the methods", "Join a live batch, or practise on your own with worked solutions."],
            ["Practise and review", "Fresh mocks every week, with time per task and weak areas."],
            ["Apply with confidence", "Use your dMAT result in your application, with our guidance."],
          ].map(([h, p], i) => (
            <li key={h} className="rounded-xl border border-zinc-200 p-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{h}</h3>
              <p className="mt-1 text-sm text-zinc-600">{p}</p>
            </li>
          ))}
        </ol>
      </Section>

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Not sure if you need the dMAT?</h2>
            <p className="mt-1 text-white/85">Read our guide, or ask us. We reply to every enquiry.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/dmat-guide" variant="light">
              Read the dMAT guide
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Ask a question
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
