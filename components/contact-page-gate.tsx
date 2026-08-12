"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { siteConfig } from "@/lib/site-content";

export function ContactPageGate() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const year = new Date().getFullYear();

  const handleVerify = useCallback(
    async (token: string) => {
      setVerifying(true);
      setError(null);

      try {
        const response = await fetch("/api/turnstile/verify-gate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Verification failed.");
        }

        router.replace("/contact");
        router.refresh();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Verification failed. Try again."
        );
        setVerifying(false);
      }
    },
    [router]
  );

  return (
    <div className="relative z-10 flex min-h-dvh flex-col bg-[#121212] text-[#e5e7eb]">
      <header className="safe-top px-4 py-4 sm:px-8 sm:py-5">
        <Link
          href="/"
          className="text-sm font-semibold text-[#9ca3af] transition-colors hover:text-white"
        >
          {siteConfig.name}
        </Link>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="w-full max-w-[360px]">
          <TurnstileWidget
          action="contact_page"
          theme="light"
          onVerify={handleVerify}
          onExpire={() => setVerifying(false)}
          onError={() => {
            setVerifying(false);
            setError("Verification failed to load. Refresh and try again.");
          }}
        />
        </div>

        {verifying ? (
          <p className="mt-4 text-sm text-[#9ca3af]">Verifying...</p>
        ) : null}

        {error ? (
          <p className="mt-4 max-w-sm text-center text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      <footer className="safe-bottom px-4 pb-[max(2rem,env(safe-area-inset-bottom))] text-center text-[11px] leading-relaxed text-[#6b7280] sm:px-6 sm:pb-10">
        <p>Performance and security by Cloudflare Turnstile</p>
        <p className="mt-2">
          © {year} {siteConfig.name}
        </p>
        <p className="mt-2">
          <Link href="/" className="underline-offset-4 hover:text-[#9ca3af] hover:underline">
            Back to site
          </Link>
        </p>
      </footer>
    </div>
  );
}
