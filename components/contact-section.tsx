"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import {
  contactCopy,
  siteConfig,
  socialLinks,
} from "@/lib/site-content";
import { revealSection } from "@/lib/gsap";
import { GsapButton } from "@/components/ui/gsap-button";

export function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    revealSection(ref.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/contact-simple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        window.setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Could not send the message.");
      }
    } catch {
      setError("Could not send the message. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
            className="border border-border/70 bg-background/55 p-6 backdrop-blur-sm md:p-8"
          >
            <h2 className="mb-6 text-xl font-semibold">{contactCopy.formTitle}</h2>

            {isSubmitted ? (
              <div className="flex flex-col items-start gap-3 py-8">
                <CheckCircle className="h-10 w-10 text-accent-brand" />
                <p className="text-lg font-semibold">{contactCopy.successTitle}</p>
                <p className="text-muted-foreground">{contactCopy.successBody}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:border-accent-brand focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-brand)_25%,transparent)]"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:border-accent-brand focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-brand)_25%,transparent)]"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:border-accent-brand focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-brand)_25%,transparent)]"
                    placeholder="Project or role"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:border-accent-brand focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-brand)_25%,transparent)]"
                    placeholder="Scope, timeline, and stack if you know it"
                  />
                </div>

                {error ? (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                ) : null}

                <GsapButton
                  type="submit"
                  variant="brand"
                  size="lg"
                  fullWidth
                  disabled={isSubmitting}
                  icon={
                    isSubmitting ? undefined : (
                      <Send className="h-4 w-4" strokeWidth={1.75} />
                    )
                  }
                  iconPosition="left"
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                </GsapButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
