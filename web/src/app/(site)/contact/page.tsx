import { Suspense } from "react";
import { BRAND, telHref, waHref, WHATSAPP_GREETING } from "@/lib/brand";
import { ContactForm } from "@/components/site/ContactForm";
import { LeadForm } from "@/components/site/LeadForm";
import { PageHero, Section } from "@/components/site/ui";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Questions about the dMAT, live classes or studying in Germany? Send DMAT Mock Prep a message.",
  path: "/contact",
});

export default function ContactPage() {
  const { email, phone, whatsapp, city } = BRAND.contact;
  const details = [
    email && { label: "Email", value: email, href: `mailto:${email}` },
    phone && { label: "Phone", value: phone, href: telHref(phone) },
    whatsapp && { label: "WhatsApp", value: whatsapp, href: waHref(whatsapp, WHATSAPP_GREETING) },
    city && { label: "Office", value: city },
  ].filter(Boolean) as { label: string; value: string; href?: string }[];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us."
        intro="Questions about the dMAT, our live classes or studying in Germany? Send a message and we will get back to you."
      />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <Suspense fallback={<LeadForm submitLabel="Send message" />}>
            <ContactForm />
          </Suspense>
          <aside className="space-y-6">
            {details.length > 0 && (
              <dl className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
                {details.map((d) => (
                  <div key={d.label}>
                    <dt className="text-sm text-zinc-500">{d.label}</dt>
                    <dd className="font-medium">
                      {d.href ? (
                        <a href={d.href} className="hover:text-brand">
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            <div className="rounded-xl border border-zinc-200 p-6">
              <h2 className="font-semibold">What to include</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-600">
                <li>Your degree and university in India</li>
                <li>The intake you are aiming for (e.g. Winter Semester 2027)</li>
                <li>Your dMAT date, if you already have one</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
