"use client";

import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { contactCopy } from "@/lib/site-content";
import { GsapButton } from "@/components/ui/gsap-button";
import { cn } from "@/lib/utils";

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const EMPTY_FORM: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const inputClassName =
  "w-full rounded-md border border-border/70 bg-background/80 px-4 py-3 text-sm font-medium text-foreground outline-none transition-[border-color,box-shadow] placeholder:font-normal placeholder:text-muted-foreground focus:border-accent-brand focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-brand)_22%,transparent)]";

type ContactFormProps = {
  idPrefix?: string;
  className?: string;
  showHeading?: boolean;
  compact?: boolean;
};

export function ContactForm({
  idPrefix = "contact",
  className,
  showHeading = true,
  compact = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fieldId = (name: string) => `${idPrefix}-${name}`;

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
        setFormData(EMPTY_FORM);
        window.setTimeout(() => setIsSubmitted(false), 6000);
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

  if (isSubmitted) {
    return (
      <div
        className={cn(
          "flex flex-col items-start gap-3 rounded-md border border-accent-brand/30 bg-accent-brand/5 p-6 sm:p-8",
          className
        )}
      >
        <CheckCircle className="h-10 w-10 text-accent-brand" strokeWidth={1.75} />
        <p className="text-lg font-bold text-foreground">
          {contactCopy.successTitle}
        </p>
        <p className="text-sm font-medium text-muted-foreground">
          {contactCopy.successBody}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      {showHeading ? (
        <h2 className="mb-5 text-lg font-bold text-foreground sm:mb-6 sm:text-xl">
          {contactCopy.formTitle}
        </h2>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor={fieldId("name")}
              className="mb-2 block text-sm font-bold text-foreground"
            >
              Name
            </label>
            <input
              id={fieldId("name")}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className={inputClassName}
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor={fieldId("email")}
              className="mb-2 block text-sm font-bold text-foreground"
            >
              Email
            </label>
            <input
              id={fieldId("email")}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className={inputClassName}
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor={fieldId("subject")}
            className="mb-2 block text-sm font-bold text-foreground"
          >
            Subject
          </label>
          <input
            id={fieldId("subject")}
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={inputClassName}
            placeholder="Project, role, or product"
          />
        </div>

        <div>
          <label
            htmlFor={fieldId("message")}
            className="mb-2 block text-sm font-bold text-foreground"
          >
            Message
          </label>
          <textarea
            id={fieldId("message")}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={compact ? 4 : 5}
            className={cn(inputClassName, "min-h-[7.5rem] resize-y")}
            placeholder="Scope, timeline, and stack if you know it"
          />
        </div>

        {error ? (
          <p className="text-sm font-semibold text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-medium text-muted-foreground">
            All fields required. Reply within 24 hours on business days.
          </p>
          <GsapButton
            type="submit"
            variant="brand"
            size="lg"
            disabled={isSubmitting}
            className="w-full shrink-0 font-bold sm:w-auto sm:min-w-[11rem]"
            icon={
              isSubmitting ? undefined : (
                <Send className="h-4 w-4" strokeWidth={1.75} />
              )
            }
            iconPosition="left"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </GsapButton>
        </div>
      </form>
    </div>
  );
}
