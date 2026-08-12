import { Mail, Settings } from "lucide-react";

export function AdminStatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?: "default" | "accent" | "muted";
}) {
  const toneClass =
    tone === "accent"
      ? "border-accent-brand/40 bg-accent-brand/10"
      : tone === "muted"
        ? "border-border/60 bg-background/40"
        : "border-border/60 bg-background/60";

  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-accent-brand/15 text-accent-brand border-accent-brand/30",
    read: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:text-blue-300",
    replied: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300",
    archived: "bg-muted text-muted-foreground border-border",
    draft: "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-300",
    published: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300",
    active: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:text-emerald-300",
    unsubscribed: "bg-muted text-muted-foreground border-border",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] ${styles[status] ?? styles.archived}`}
    >
      {status}
    </span>
  );
}

export function AdminTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto rounded-xl border border-border/60 sm:mx-0">
      {children}
    </div>
  );
}

export function AdminEmptyState({
  title,
  body,
  icon: Icon = Mail,
}: {
  title: string;
  body: string;
  icon?: typeof Mail;
}) {
  return (
    <div className="glass-panel rounded-xl p-10 text-center">
      <Icon className="mx-auto h-8 w-8 text-accent-brand" strokeWidth={1.75} />
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm font-medium text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

export function SetupNotice({ variant = "env" }: { variant?: "env" | "migration" }) {
  if (variant === "migration") {
    return (
      <div className="glass-panel rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <Settings className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <div>
            <h2 className="text-lg font-bold">Database setup required</h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              You are signed in, but the admin tables are not in Supabase yet. From the
              project root, run{" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-xs">pnpm db:setup</code>{" "}
              (needs <code className="rounded bg-background px-1.5 py-0.5 text-xs">SUPABASE_DB_PASSWORD</code>{" "}
              in <code className="rounded bg-background px-1.5 py-0.5 text-xs">.env.local</code>
              ), or run the SQL files in{" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-xs">supabase/migrations/</code>{" "}
              in the Supabase SQL Editor, then{" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-xs">pnpm seed:cms</code>.
            </p>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              After setup finishes, refresh this page. See{" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-xs">docs/ADMIN_SETUP.md</code>{" "}
              for details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <Settings className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div>
          <h2 className="text-lg font-bold">Supabase setup required</h2>
          <p className="mt-2 text-sm font-medium text-muted-foreground">
            Add your Supabase env vars to{" "}
            <code className="rounded bg-background px-1.5 py-0.5 text-xs">.env.local</code>
            , run <code className="rounded bg-background px-1.5 py-0.5 text-xs">pnpm db:setup</code>
            , and create an admin user in Supabase Auth. See{" "}
            <code className="rounded bg-background px-1.5 py-0.5 text-xs">
              docs/ADMIN_SETUP.md
            </code>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
