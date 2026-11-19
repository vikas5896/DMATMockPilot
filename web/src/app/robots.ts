import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // exam screens have endless random-seed URLs; the admin panel and API are private
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/test/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
