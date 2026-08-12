"use client";

import { useState } from "react";
import { toast } from "sonner";

type NewsletterSubscribeFormProps = {
  source?: string;
  className?: string;
};

export function NewsletterSubscribeForm({
  source = "footer",
  className = "",
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) {
      toast.error("Enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Subscription failed.");
      }
      setEmail("");
      toast.success("You are subscribed. Thanks for reading along.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not subscribe right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className={className}>
      <label htmlFor="newsletter-email" className="mb-3 block text-xs font-bold uppercase tracking-[0.18em] text-accent-brand">
        Newsletter
      </label>
      <p className="mb-3 text-sm font-medium text-foreground/75">
        Occasional notes on shipping Next.js, Shopify, and CRM work.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          disabled={loading}
          className="h-10 flex-1 rounded-md border border-border/70 bg-background/60 px-3 text-sm font-medium disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--accent-brand)] px-4 text-sm font-bold text-white disabled:opacity-60 dark:text-[#06110c]"
        >
          {loading ? "Joining..." : "Subscribe"}
        </button>
      </div>
    </form>
  );
}
