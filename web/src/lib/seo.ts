import type { Metadata } from "next";
import { BRAND } from "./brand";
import { SITE_URL } from "./site";

/** Other ways people may type the brand; helps Google match searches like "dmat mock prep" or "dmatmockprep". */
export const BRAND_ALIASES = ["DMAT Mock Prep", "dMAT Mock Prep", "dmatmockprep", "dmatmockprep.com"];

/**
 * Social profiles (Instagram, YouTube, LinkedIn, Facebook…). Add the full URLs once they exist:
 * Google uses them to connect the brand's profiles to the website.
 */
export const SOCIAL_PROFILES: string[] = [];

/** Per-page metadata with a canonical address and matching link-preview texts. */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
}: {
  title: string;
  description: string;
  path: string;
  /** use the title as-is, without " | DMAT Mock Prep" */
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    // a page's openGraph replaces the site-wide one completely, so the preview image is repeated here
    openGraph: {
      title: absoluteTitle ? title : `${title} | ${BRAND.name}`,
      description,
      url: path,
      siteName: BRAND.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${BRAND.name}: dMAT mock tests and live classes` }],
    },
    twitter: { card: "summary_large_image", images: ["/opengraph-image"] },
  };
}

/** Who we are: shown to Google on every page so brand searches recognise the site. */
export function organizationJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND.name,
      alternateName: BRAND_ALIASES.filter((a) => a !== BRAND.name),
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/apple-icon`,
      description:
        "Independent preparation for the digital Master Test (dMAT): mock tests, live online classes and guidance for studying a Master's in Germany.",
      areaServed: "IN",
      ...(BRAND.contact.email ? { email: BRAND.contact.email } : {}),
      ...(BRAND.contact.phone ? { telephone: BRAND.contact.phone } : {}),
      ...(SOCIAL_PROFILES.length ? { sameAs: SOCIAL_PROFILES } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BRAND.name,
      alternateName: BRAND_ALIASES.filter((a) => a !== BRAND.name),
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
  ];
}
