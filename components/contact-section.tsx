"use client";

import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import {
  contactCopy,
  siteConfig,
  socialLinks,
} from "@/lib/site-content";
import { revealSection } from "@/lib/gsap";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    revealSection(ref.current);
  }, []);

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
      href: undefined,
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative z-10 flex min-h-dvh items-center overflow-hidden py-24 pt-28 md:pt-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-12 max-w-2xl space-y-3">
          <p
            data-reveal
            className="text-sm font-medium uppercase tracking-[0.18em] text-accent-brand"
          >
            {contactCopy.title}
          </p>
          <h1
            data-reveal
            className="text-balance text-3xl font-bold tracking-tight md:text-5xl"
          >
            {contactCopy.headline}
          </h1>
          <p data-reveal className="text-lg text-muted-foreground">
            {contactCopy.lead}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div data-reveal className="space-y-8">
            <ul className="space-y-5">
              {channels.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <item.icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-accent-brand"
                    strokeWidth={1.75}
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div>
              <p className="mb-3 text-sm text-muted-foreground">Also on</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {siteConfig.availability}. Typical reply within 24 hours.
            </p>
          </div>

          <div
            data-reveal
            className="glass-panel border border-border/70 p-6 md:p-8"
          >
            <ContactForm idPrefix="page-contact" />
          </div>
        </div>
      </div>
    </section>
  );
}
