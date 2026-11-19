import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for using DMAT Mock Prep mock tests, packs and classes.",
  path: "/terms",
});

/** DRAFT. Have this reviewed before relying on it. */
export default function TermsPage() {
  const { email } = BRAND.contact;
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and conditions" intro={`The rules for using ${BRAND.name}.`} />
      <Section>
        <div className="max-w-3xl space-y-8 text-[15px] leading-7 text-zinc-800">
          <div>
            <h2 className="text-xl font-bold">Our service</h2>
            <p className="mt-2">
              {BRAND.name} offers practice tests in the format of the dMAT, live preparation classes and guidance for
              studying in Germany. We are an independent preparation provider and are not affiliated with the official
              test provider. Our mock tests are for practice; we do not guarantee any result in the real exam or any
              admission.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Your account</h2>
            <p className="mt-2">
              One account per person. Keep access to your email address safe, because we send your login codes there. Do
              not share your account or the test content with others; we may close accounts that do.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Prices, payment and delivery</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Prices are shown in Indian rupees (₹) on the Packs page and include all taxes that apply.</li>
              <li>
                Online payments are processed securely by Razorpay (UPI, cards, netbanking). You can also pay by bank
                transfer after requesting access.
              </li>
              <li>
                Packs are delivered digitally: they unlock in your account right after the payment is confirmed. Nothing
                is shipped. Each pack stays active for the period shown on it.
              </li>
              <li>Promo codes give the discount shown, cannot be combined, and may be limited in time or number of uses.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Refunds</h2>
            <p className="mt-2">
              See our{" "}
              <Link href="/refund-policy" className="text-brand underline">
                refund and cancellation policy
              </Link>
              .
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Content</h2>
            <p className="mt-2">
              All questions, explanations and materials on this website are our own work and may only be used for your
              personal preparation. Copying, reselling or publishing them is not allowed.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Changes and contact</h2>
            <p className="mt-2">
              We may update these terms; the version on this page applies. Questions?{" "}
              {email ? (
                <a href={`mailto:${email}`} className="text-brand underline">
                  {email}
                </a>
              ) : (
                <Link href="/contact" className="text-brand underline">
                  Contact us
                </Link>
              )}
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
