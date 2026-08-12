import type { Metadata } from "next";
import { ContactPageGate } from "@/components/contact-page-gate";
import { siteConfig } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Verify contact access",
  robots: { index: false, follow: false },
  description: `Complete verification to contact ${siteConfig.name}.`,
};

export default function ContactVerifyPage() {
  return <ContactPageGate />;
}
