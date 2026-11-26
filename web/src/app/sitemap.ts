import type { MetadataRoute } from "next";
import { getPublicBatches } from "@/lib/batch-store";
import { SITE_URL } from "@/lib/site";

const PAGES: [path: string, priority: number, freq: "daily" | "weekly" | "monthly" | "yearly"][] = [
  ["/", 1, "weekly"],
  ["/mock-tests", 0.9, "weekly"],
  ["/live-classes", 0.9, "daily"],
  ["/dmat-guide", 0.8, "monthly"],
  ["/study-in-germany", 0.7, "monthly"],
  ["/plans", 0.8, "monthly"],
  ["/about", 0.4, "yearly"],
  ["/contact", 0.5, "yearly"],
  ["/privacy", 0.2, "yearly"],
  ["/terms", 0.2, "yearly"],
  ["/refund-policy", 0.2, "yearly"],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const batches = await getPublicBatches();
  return [
    ...PAGES.map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path}`, priority, changeFrequency })),
    ...batches.map((b) => ({
      url: `${SITE_URL}/live-classes/${b.slug}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    })),
  ];
}
