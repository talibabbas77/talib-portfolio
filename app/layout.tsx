import type { Metadata } from "next";
import { EB_Garamond, Ubuntu } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalBackground } from "@/components/conditional-background";
import { SiteChrome } from "@/components/site-chrome";
import { SiteToaster } from "@/components/site-toaster";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { siteConfig, socialLinks } from "@/lib/site-content";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = siteConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.name} | ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "MERN",
    "React",
    "TypeScript",
    "Shopify",
    "AI integrations",
    "Lahore",
    "Talib Abbas",
  ],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: `${siteConfig.name} Portfolio`,
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.summary,
    images: [
      {
        url: "/hero/texture.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.summary,
    images: ["/hero/texture.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: `${siteConfig.name} Portfolio`,
      description: siteConfig.summary,
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "PK",
      },
      url: siteUrl,
      sameAs: socialLinks.map((link) => link.href),
      knowsAbout: [
        "Next.js",
        "React",
        "Node.js",
        "TypeScript",
        "MongoDB",
        "Shopify",
        "OpenAI",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${ubuntu.variable} ${ebGaramond.variable}`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="talib-portfolio-theme"
        >
          <ConditionalBackground />
          <LenisProvider>
            <SiteChrome>{children}</SiteChrome>
          </LenisProvider>
          <SiteToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
