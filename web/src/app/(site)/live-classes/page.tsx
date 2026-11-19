import type { Metadata } from "next";
import { getPublicBatches } from "@/lib/batch-store";
import { BatchCard } from "@/components/site/BatchCard";
import { LeadForm } from "@/components/site/LeadForm";
import { Faq, PageHero, Section } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Live dMAT classes",
  description: "Live online dMAT preparation batches for the January and March sittings, with recordings and weekly mock reviews.",
};

const FORMAT = [
  ["Live and online", "Interactive sessions on video call in Indian evening and weekend slots. Ask questions as we go."],
  ["Recordings", "Missed a class? Every session is recorded and available to registered students."],
  ["Weekly mocks with review", "Take a full mock on our platform, then go through the hardest tasks together."],
  ["Small batches", "Limited seats so that everyone gets their questions answered."],
];

export default async function LiveClassesPage() {
  const batches = await getPublicBatches();
  return (
    <>
      <PageHero
        eyebrow="Live classes"
        title="Learn the dMAT live, with a plan that fits your exam date."
        intro="Structured online batches for the upcoming dMAT sittings. Learn the rules and shortcuts for every section, practise under time pressure and review your mocks together."
      />

      <Section title="Upcoming batches" intro="Register to reserve your seat. We will contact you with the joining details and fee.">
        <div className="grid gap-6 md:grid-cols-2">
          {batches.map((b) => (
            <BatchCard key={b.slug} b={b} />
          ))}
        </div>
      </Section>

      <Section tone="soft" title="How the classes work">
        <div className="grid gap-6 md:grid-cols-4">
          {FORMAT.map(([h, p]) => (
            <div key={h} className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="font-semibold">{h}</h3>
              <p className="mt-1 text-sm text-zinc-600">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Frequently asked questions">
        <Faq
          items={[
            {
              q: "Which batch should I choose?",
              a: "Pick the batch for your exam sitting. If you are taking the dMAT in January, the Core Module Crash Course fits; for March, choose the Complete dMAT Preparation. Not sure? Join the free webinar or send us a message.",
            },
            {
              q: "What do I need to join?",
              a: "A laptop or desktop with a stable internet connection. A phone works for watching, but the mock tests are designed for a computer screen, like the real exam.",
            },
            {
              q: "What if I miss a session?",
              a: "Every session is recorded, so you can catch up before the next one.",
            },
            {
              q: "How do I pay?",
              a: "After you register, we contact you with the fee and payment options. Online payment on the website is coming soon.",
            },
          ]}
        />
      </Section>

      <Section tone="soft" title="Not sure yet? Ask us" intro="Tell us your exam date and background, and we will suggest the right batch.">
        <div className="max-w-2xl">
          <LeadForm defaultInterest="live-classes" submitLabel="Send my question" />
        </div>
      </Section>
    </>
  );
}
