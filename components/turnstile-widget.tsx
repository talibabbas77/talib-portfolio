"use client";

import Script from "next/script";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export type TurnstileWidgetRef = {
  reset: () => void;
};

type TurnstileWidgetProps = {
  action: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
  theme?: "light" | "dark" | "auto";
};

function getClientSiteKey() {
  return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
}

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, TurnstileWidgetProps>(
  function TurnstileWidget(
    { action, onVerify, onExpire, onError, className, theme = "auto" },
    ref
  ) {
    const siteKey = getClientSiteKey();
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | undefined>(undefined);
    const [mounted, setMounted] = useState(false);
    const [scriptReady, setScriptReady] = useState(false);

    const onVerifyRef = useRef(onVerify);
    const onExpireRef = useRef(onExpire);
    const onErrorRef = useRef(onError);

    useEffect(() => {
      onVerifyRef.current = onVerify;
    }, [onVerify]);

    useEffect(() => {
      onExpireRef.current = onExpire;
    }, [onExpire]);

    useEffect(() => {
      onErrorRef.current = onError;
    }, [onError]);

    useEffect(() => {
      setMounted(true);
      // Script may already be present from a previous mount / Soft navigation.
      if (window.turnstile) setScriptReady(true);
    }, []);

    const reset = useCallback(() => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }, []);

    useImperativeHandle(ref, () => ({ reset }), [reset]);

    const renderWidget = useCallback(() => {
      const container = containerRef.current;
      if (!container || !siteKey || !window.turnstile) return;

      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // Widget may already be gone after a fast remount.
        }
        widgetIdRef.current = undefined;
      }

      container.replaceChildren();

      widgetIdRef.current = window.turnstile.render(container, {
        sitekey: siteKey,
        action,
        callback: (token) => onVerifyRef.current(token),
        "expired-callback": () => onExpireRef.current?.(),
        "error-callback": () => onErrorRef.current?.(),
        theme,
      });
    }, [action, siteKey, theme]);

    useEffect(() => {
      if (!mounted || !scriptReady || !siteKey) return;

      // Do not call turnstile.ready() - Next.js Script loads api.js with async/defer,
      // and Cloudflare throws if ready() is used in that mode.
      const frame = window.requestAnimationFrame(() => {
        renderWidget();
      });

      return () => {
        window.cancelAnimationFrame(frame);
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
          widgetIdRef.current = undefined;
        }
      };
    }, [mounted, renderWidget, scriptReady, siteKey]);

    if (!siteKey) {
      return (
        <p className="text-sm font-medium text-destructive" role="alert">
          Turnstile site key is missing. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY or
          CLOUDFLARE_SITE_KEY, then restart the dev server.
        </p>
      );
    }

    if (!mounted) {
      return (
        <div
          className={cn("min-h-[65px]", className)}
          aria-hidden
          suppressHydrationWarning
        />
      );
    }

    return (
      <>
        <Script
          id={TURNSTILE_SCRIPT_ID}
          src={TURNSTILE_SCRIPT_SRC}
          strategy="afterInteractive"
          onReady={() => setScriptReady(true)}
          onLoad={() => setScriptReady(true)}
        />
        <div
          ref={containerRef}
          className={cn("min-h-[65px]", className)}
          aria-label="Cloudflare Turnstile verification"
          suppressHydrationWarning
        />
      </>
    );
  }
);
