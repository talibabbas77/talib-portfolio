import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about-page-content";
import { aboutCopy, siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About",
  description: aboutCopy.lead,
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: siteConfig.summary,
    url: `${siteConfig.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="relative z-10 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] sm:pt-24">
      <AboutPageContent />
    </div>
  );
}
