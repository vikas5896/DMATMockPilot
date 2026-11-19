import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { JsonLd } from "@/components/site/JsonLd";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { PromoCatcher } from "@/components/site/PromoCatcher";
import { organizationJsonLd } from "@/lib/seo";

/** Public website pages share the header and footer. The exam screens (/test/…) stay full-screen without them. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <JsonLd data={organizationJsonLd()} />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <WhatsAppButton />
      <PromoCatcher />
    </div>
  );
}
