import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email ${siteConfig.email} or send a short project brief. ${siteConfig.availability}.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative z-10">
      <ContactSection />
    </div>
  );
}
