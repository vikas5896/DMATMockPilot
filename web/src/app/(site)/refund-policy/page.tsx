import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refund and Cancellation Policy",
  description: "Refunds and cancellations for DMAT Mock Prep test packs and classes.",
  path: "/refund-policy",
});

/** DRAFT. The owner must confirm these rules (refund window, conditions) before going live with payments. */
export default function RefundPolicyPage() {
  const { email, whatsapp } = BRAND.contact;
  return (
    <>
      <PageHero eyebrow="Legal" title="Refund and cancellation policy" intro="Simple and fair: here is how refunds work." />
      <Section>
        <div className="max-w-3xl space-y-8 text-[15px] leading-7 text-zinc-800">
          <div>
            <h2 className="text-xl font-bold">Test packs</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Test packs are digital products. They are delivered instantly: the tests unlock in your account as soon as
                the payment is confirmed.
              </li>
              <li>
                You can ask for a <strong>full refund within 7 days</strong> of your purchase as long as you have not
                started any test that the pack unlocked (tests 2–10).
              </li>
              <li>After you have started a test from the pack, or after 7 days, the purchase cannot be refunded.</li>
              <li>If you were charged twice or paid but the pack did not unlock, we refund the extra payment in full.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold">Live classes</h2>
            <p className="mt-2">
              The refund and cancellation terms of each batch are shown on its page and confirmed to you when you
              register. If we cancel or move a batch and you cannot join the new dates, you get a full refund.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">How to ask for a refund</h2>
            <p className="mt-2">
              Write to us
              {email && (
                <>
                  {" "}
                  at{" "}
                  <a href={`mailto:${email}`} className="text-brand underline">
                    {email}
                  </a>
                </>
              )}
              {whatsapp && <> or on WhatsApp ({whatsapp})</>} with the email address of your account and your payment ID.
              Approved refunds are sent back to the original payment method within 5–7 working days; your bank may take a
              few more days to show it. The pack is removed from your account when the refund is made.
            </p>
          </div>
          <p className="text-sm text-zinc-600">
            See also our{" "}
            <Link href="/terms" className="text-brand underline">
              terms and conditions
            </Link>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
