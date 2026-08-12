"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

type AdminLayoutShellProps = {
  email?: string | null;
  children: React.ReactNode;
};

export function AdminLayoutShell({ email, children }: AdminLayoutShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="@container/admin min-h-dvh bg-background">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 @[56rem]/admin:hidden">
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 text-foreground"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
        <p className="truncate text-sm font-bold">Admin</p>
        <div className="h-10 w-10" aria-hidden />
      </header>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 bg-black/50 @[56rem]/admin:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <AdminSidebar
        email={email}
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />

      <main className="min-w-0 px-4 py-6 sm:px-6 @[56rem]/admin:ml-64 @[56rem]/admin:px-8">
        {children}
      </main>
    </div>
  );
}
