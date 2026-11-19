import { BRAND } from "@/lib/brand";
import { ButtonLink, PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us",
  description: `${BRAND.name} helps Indian students prepare for the dMAT and plan their Master's in Germany.`,
  path: "/about",
});

const VALUES = [
  ["Realistic practice", "Practice should feel like the real exam: same layout, same timing, same pressure."],
  ["Honest guidance", "No promised admissions or visas. Clear information and a strong application instead."],
  ["Affordable for students", "Quality preparation should not cost as much as the exam itself."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We help Indian students take the next step to Germany."
        intro={`${BRAND.name} started with one problem: the dMAT is new, and students had almost no realistic way to practise for it. So we built one.`}
      />

      <Section>
        <div className="max-w-3xl space-y-5 text-[16px] leading-7 text-zinc-800">
          <p>
            Thousands of Indian graduates apply for Master&apos;s programmes in Germany every year. From the Summer Semester
            2027 intake, many of them also need the digital Master Test (dMAT) for their APS verification. It is a
            demanding, strictly timed exam, and most students meet its format for the first time on test day.
          </p>
          <p>
            We started with mock tests that look and work like the real exam, and live classes that teach the methods
            behind every task type. Next, we are building a complete guidance service for studying in Germany: from
            shortlisting universities to APS, applications, blocked account and visa.
          </p>
        </div>
      </Section>

      <Section tone="soft" title="What we stand for">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map(([h, p]) => (
            <div key={h} className="rounded-xl border border-zinc-200 bg-white p-6">
              <h3 className="font-semibold">{h}</h3>
              <p className="mt-1 text-zinc-600">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Independent">
        <p className="max-w-3xl text-zinc-700">
          {BRAND.name} is an independent preparation and guidance service. We are not affiliated with, or endorsed by,
          g.a.s.t. (the organisation that runs the dMAT), APS India, DAAD or any German university.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/mock-tests">Try a free mock</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
