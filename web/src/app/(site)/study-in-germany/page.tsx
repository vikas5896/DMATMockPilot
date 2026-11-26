import Link from "next/link";
import { JOURNEY, SERVICES } from "@/content/site/germany";
import { LeadForm } from "@/components/site/LeadForm";
import { Badge, Faq, PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Study in Germany – Master's Guidance for Indian Students",
  description:
    "Guidance for Indian students applying for a Master's in Germany: university shortlisting, APS, dMAT, applications, blocked account and student visa.",
  path: "/study-in-germany",
});

export default function StudyInGermanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Study in Germany"
        title="From your first shortlist to your first day at a German university."
        intro="One team for your whole Master's journey: dMAT preparation, profile building, university shortlisting, documents, APS, blocked account and visa guidance, from people who have been through it."
      />

      <Section title="Our services">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const card = (
              <>
                <Badge tone={s.badge ? "brand" : s.status === "available" ? "green" : "amber"}>
                  {s.badge ?? (s.status === "available" ? "Available now" : "Coming soon")}
                </Badge>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{s.text}</p>
              </>
            );
            return s.href ? (
              <Link
                key={s.title}
                href={s.href}
                className="rounded-xl border-2 border-brand p-5 transition hover:bg-brand-soft"
              >
                {card}
                <p className="mt-3 text-sm font-semibold text-brand">Get started →</p>
              </Link>
            ) : (
              <div key={s.title} className="rounded-xl border border-zinc-200 p-5">
                {card}
              </div>
            );
          })}
        </div>
      </Section>

      <Section tone="soft" title="The journey to a German Master's" intro="The typical steps for an Indian applicant. Requirements differ by university and programme, so always check the official pages too.">
        <ol className="relative space-y-6 border-l-2 border-brand/30 pl-8">
          {JOURNEY.map((j, i) => (
            <li key={j.step} className="relative">
              <span className="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="font-semibold">{j.step}</h3>
              <p className="mt-0.5 text-zinc-600">{j.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Common questions">
        <Faq
          items={[
            {
              q: "How do I get started?",
              a: "Book a free profile evaluation below. We review your degree, grades, experience and goals at no cost. We take only a limited number of students each intake, so if we are confident we can help you, we invite you to join the Complete Germany Plan.",
            },
            {
              q: "Do I need the dMAT for every Master's programme?",
              a: "No. APS India requires it from selected Master's applicants; which applicants depends on the official rules. Read our dMAT guide and check the APS India and d-mat.de websites.",
            },
            {
              q: "Can you guarantee an admission or a visa?",
              a: "No one can honestly guarantee that. Admission decisions are made by universities and visa decisions by the German embassy. We help you prepare the strongest possible application.",
            },
          ]}
        />
      </Section>

      <Section
        tone="soft"
        id="profile-evaluation"
        title="Book your free profile evaluation"
        intro="Tell us about your degree and target intake. We will call or WhatsApp you for a free profile evaluation. We take only a limited number of students each intake: if your profile is a good fit, we invite you to join the Complete Germany Plan."
      >
        <div className="max-w-2xl">
          <p className="mb-6">
            <Link href="/plans" className="font-semibold text-brand underline">
              Compare our plans
            </Link>{" "}
            · Complete Germany Plan ₹14,999
          </p>
          <LeadForm defaultInterest="consultancy" fixedInterest submitLabel="Book my free profile evaluation" />
        </div>
      </Section>
    </>
  );
}
