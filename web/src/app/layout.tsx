import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteAnalytics } from "@/components/SiteAnalytics";
import "katex/dist/katex.min.css";
import "./globals.css";
import { BRAND } from "@/lib/brand";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND.name} – ${BRAND.tagline}`, template: `%s | ${BRAND.name}` },
  description:
    "dMAT mock tests in the real exam format, live online classes, and guidance for studying a Master's in Germany.",
  openGraph: { type: "website", siteName: BRAND.name, locale: "en_IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
