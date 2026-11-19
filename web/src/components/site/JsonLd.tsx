/**
 * Structured data (schema.org JSON-LD) for search engines.
 * It tells Google in a machine-readable way what a page is: our organisation, a course, a FAQ …
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  // escape "<" so text can never close the script tag
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
