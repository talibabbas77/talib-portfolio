"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { contactCopy, siteConfig, socialLinks } from "@/lib/site-content";
import { revealSection } from "@/lib/gsap";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phoneDisplay,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
  },
] as const;

export function HomeContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    revealSection(ref.current);
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative scroll-mt-[calc(5.5rem+env(safe-area-inset-top,0px))] py-16 sm:scroll-mt-28 sm:py-20 md:py-24"
      aria-labelledby="home-contact-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl space-y-3 sm:mb-10">
          <p
            data-reveal
            className="text-sm font-bold uppercase tracking-[0.18em] text-accent-brand"
          >
            {contactCopy.title}
          </p>
          <h2
            data-reveal
            id="home-contact-heading"
            className="text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {contactCopy.headline}
          </h2>
          <p data-reveal className="text-base font-medium text-muted-foreground md:text-lg">
            {contactCopy.lead}
          </p>
        </div>

        <div
          data-reveal
          className="glass-panel glass-panel-strong overflow-hidden rounded-2xl"
        >
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <aside className="border-b border-foreground/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-brand">
                Direct lines
              </p>
              <ul className="mt-6 space-y-5">
                {channels.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <item.icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-brand"
                      strokeWidth={1.75}
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        {item.label}
                      </p>
                      {"href" in item && item.href ? (
                        <a
                          href={item.href}
                          className="mt-1 block break-all text-sm font-bold text-foreground underline-offset-4 hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-bold text-foreground">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Also on
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-sm font-semibold leading-relaxed text-foreground/75">
                {siteConfig.availability}. Based in {siteConfig.location}, working
                with remote teams across SaaS, Shopify, CRM, and AI builds.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex text-sm font-bold text-accent-brand underline-offset-4 hover:underline"
              >
                Open full contact page
              </Link>
            </aside>

            <div className="p-6 sm:p-8 lg:p-10">
              <ContactForm idPrefix="home-contact" compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
