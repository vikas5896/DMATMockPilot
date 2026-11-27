import { BRAND } from "@/lib/brand";
import { PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How DMAT Mock Prep handles your personal data.",
  path: "/privacy",
});

/** DRAFT. Have this reviewed by a legal advisor (India's Digital Personal Data Protection Act, 2023). */
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
                <strong>Your account:</strong> your email address, name and phone number.
              </li>
              <li>
                <strong>Mock tests:</strong> your answers, scores and progress in the tests you take, so you can see your
                results and continue later.
              </li>
              <li>
                <strong>Purchases:</strong> the pack you bought, the amount, any promo code and the payment reference.
                Payments are processed by Razorpay; we never see or store your card, UPI or bank login details.
              </li>
              <li>
                <strong>Enquiry and registration forms:</strong> your name, email address, phone number, message, and the
                class or service you are interested in.
              </li>
              <li>
                <strong>Free profile evaluation:</strong> your degree details, scores, target course and intake, and the
                document you upload (your transcript or semester results). Only our team can see the document; we use it only
                to evaluate your profile and advise you, and we delete it when you ask us to.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Why we use it</h2>
            <p className="mt-2">
              To give you access to your tests and results, to process your purchases, to reply to your requests, and to
              contact you about the classes or services you asked about. We do not sell your data or share it with third
              parties for their own marketing.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Who processes it for us</h2>
            <p className="mt-2">
              Our website host and database provider, our email provider (to send login codes and messages), and Razorpay
              (to process payments). They may only use your data to provide their service to us.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Visitor statistics and advertising</h2>
            <p className="mt-2">
              We count visits with Vercel Web Analytics, which uses no cookies. We also use the Meta Pixel (Facebook and
              Instagram) on our public pages. It sets cookies and tells Meta when you view a page, sign up, send an
              enquiry or complete a purchase (with the amount), so we can measure our ads and show them to people likely
              to be interested. We do not send your name, email address, phone number or test answers to Meta. You can
              limit this in your browser, with an ad blocker, or in your Facebook and Instagram ad settings.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">How long we keep it</h2>
            <p className="mt-2">
              As long as your account exists, and payment records as long as the law requires. We delete your account
              data when you ask us to.
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
        </div>
      </Section>
    </>
  );
}
