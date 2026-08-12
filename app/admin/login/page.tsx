import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/login-form";
import { SetupNotice } from "@/components/admin/admin-shell";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-content";

export default function AdminLoginPage() {
  const configured = isSupabaseConfigured();

  return (
    <div className="safe-top flex min-h-dvh items-center justify-center px-4 py-12 pb-[max(3rem,env(safe-area-inset-bottom))]">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-brand">
            Admin access
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {siteConfig.name}
          </h1>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            Sign in to review contact form submissions.
          </p>
        </div>

        {!configured ? (
          <SetupNotice />
        ) : (
          <div className="glass-panel glass-panel-strong rounded-xl p-6 sm:p-8">
            <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
              <AdminLoginForm />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
