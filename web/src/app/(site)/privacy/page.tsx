import { BRAND } from "@/lib/brand";
import { PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How DMAT Mock Prep handles your personal data.",
  path: "/privacy",
});

/**
 * DRAFT. Have this reviewed by a legal advisor before launch (India's Digital Personal Data Protection Act, 2023),
 * and update it when accounts, payments or analytics are added.
 */
export default function PrivacyPage() {
  const email = BRAND.contact.email;
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" intro="How we handle your personal data." />
      <Section>
        <div className="max-w-3xl space-y-8 text-[15px] leading-7 text-zinc-800">
          <div>
            <h2 className="text-xl font-bold">What we collect</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Enquiry and registration forms:</strong> your name, email address, and optionally your phone
                number and message, plus the class or service you are interested in.
              </li>
              <li>
                <strong>Mock tests:</strong> your answers and progress are stored only in your own browser on your
                device. We do not receive them.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Why we use it</h2>
            <p className="mt-2">
              Only to reply to your request, to register you for the class or service you asked about, and to inform
              you about it. We do not sell your data or share it with third parties for their own marketing.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">How long we keep it</h2>
            <p className="mt-2">
              We keep your enquiry as long as needed to answer it and provide the service you asked for, and delete it
              when you ask us to.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Your rights</h2>
            <p className="mt-2">
              You can ask us at any time which data we hold about you, and ask us to correct or delete it
              {email ? (
                <>
                  {" "}
                  by writing to{" "}
                  <a href={`mailto:${email}`} className="text-brand underline">
                    {email}
                  </a>
                </>
              ) : (
                " through our contact page"
              )}
              .
            </p>
          </div>
          <p className="text-sm text-zinc-500">This policy will be updated when we add accounts and online payments.</p>
        </div>
      </Section>
    </>
  );
}
