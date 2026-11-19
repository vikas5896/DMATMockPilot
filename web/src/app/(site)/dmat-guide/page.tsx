import { ButtonLink, PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "dMAT Guide – Exam Format, Rules and Preparation",
  description:
    "What the digital Master Test (dMAT) is, who needs it for APS India, the Core and Subject Module format, timing rules and how to prepare.",
  path: "/dmat-guide",
});

const FORMAT = [
  ["Core Module", "Figure Sequences", "20 tasks", "25 min", "Continue a series of 4×4 pictures: choose the 5th and 6th"],
  ["Core Module", "Mathematical Equations", "20 tasks", "25 min", "Find whole numbers 1–20 for the letters in each equation system"],
  ["Core Module", "Latin Squares", "20 tasks", "25 min", "Find the letter A–E for the marked field of a 5×5 square"],
  ["Break", "—", "—", "30 min", "Mandatory break between the modules"],
  ["Subject Module", "General Academic Module", "texts + questions", "90 min", "Academic texts with tables, figures and formulas; single-choice questions"],
];

export default function DmatGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="dMAT guide"
        title="The dMAT, explained."
        intro="Everything you need to know about the digital Master Test before you start preparing: what it is, who needs it, how it is built and how to prepare."
      >
        <ButtonLink href="/test/full" variant="light">
          Try a free mock
        </ButtonLink>
      </PageHero>

      <Section>
        <div className="max-w-3xl space-y-10 text-[16px] leading-7 text-zinc-800">
          <div>
            <h2 className="text-2xl font-bold">What is the dMAT?</h2>
            <p className="mt-3">
              The digital Master Test (dMAT) is a study aptitude test for international applicants to Master&apos;s
              programmes in Germany. It is developed and run by g.a.s.t., the organisation behind TestDaF and TestAS.
              It does not test memorised knowledge; it tests how well you think, calculate and apply knowledge to new
              academic problems.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Who needs it?</h2>
            <p className="mt-3">
              APS India has made the dMAT mandatory for selected Indian applicants to Master&apos;s programmes, starting
              with the Summer Semester 2027 intake. Whether you need it depends on the official APS India rules for
              your degree and situation, so check them on the APS India website before you register.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Exam format</h2>
            <p className="mt-3">
              The exam is taken on a computer at a test centre and takes about 3.5 hours including the break.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-zinc-100 text-left">
                    {["Module", "Section", "Tasks", "Time", "What you do"].map((h) => (
                      <th key={h} className="border border-zinc-200 px-3 py-2 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FORMAT.map((row) => (
                    <tr key={row[1] + row[0]}>
                      {row.map((c, i) => (
                        <td key={i} className="border border-zinc-200 px-3 py-2 align-top">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold">Rules that shape your strategy</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong>Strict timers.</strong> Each Core section has its own time limit. When it runs out, the section
                locks and unused minutes do not carry over.
              </li>
              <li>
                <strong>No notes, no calculator.</strong> Every calculation and pattern has to be solved in your head.
              </li>
              <li>
                <strong>No negative marking.</strong> A wrong answer costs nothing, so never leave a question blank.
              </li>
              <li>
                <strong>Scaled scores.</strong> Results are reported on a standardised scale for the Core Module and the
                Subject Module.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold">How to prepare</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6">
              <li>Take a full mock first to see where you stand in each section.</li>
              <li>Learn the rules behind each Core task type; they repeat in every exam.</li>
              <li>Practise under real time limits, without notes, from the start.</li>
              <li>Read academic texts from different fields and practise extracting numbers from tables and charts.</li>
              <li>Take a full mock every week in the last month and review every mistake.</li>
            </ol>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <p className="font-semibold">Always check the official sources</p>
            <p className="mt-1">
              Dates, fees, registration and eligibility rules can change. Confirm them on the official dMAT website
              (d-mat.de) and the APS India website before you register. This guide is independent information and is
              not affiliated with g.a.s.t. or APS India.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-bold">Ready to see where you stand?</h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/test/full" variant="light">
              Take a free mock
            </ButtonLink>
            <ButtonLink href="/live-classes" variant="outline-light">
              Join a live class
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
