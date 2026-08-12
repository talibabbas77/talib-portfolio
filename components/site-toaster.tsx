"use client";

import { Toaster } from "sonner";

export function SiteToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: "glass-panel border border-border/60 font-sans",
        },
      }}
    />
  );
}
