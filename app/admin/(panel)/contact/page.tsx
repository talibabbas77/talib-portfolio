import {
  AdminEmptyState,
  AdminStatCard,
  SetupNotice,
} from "@/components/admin/admin-shell";
import { ContactTable } from "@/components/admin/contact-table";
import { getSubmissionStats, getSubmissions } from "@/lib/admin/queries";
import { canPersistSubmissions } from "@/lib/supabase/admin";

export default async function AdminContactPage() {
  let stats = {
    total: 0,
    new: 0,
    read: 0,
    replied: 0,
    archived: 0,
    thisWeek: 0,
  };
  let submissions: Awaited<ReturnType<typeof getSubmissions>> = [];
  let loadError: string | null = null;

  try {
    [stats, submissions] = await Promise.all([
      getSubmissionStats(),
      getSubmissions(),
    ]);
  } catch (error) {
    loadError =
      error instanceof Error ? error.message : "Could not load submissions.";
  }

  return (
    <div className="space-y-8">
      {!canPersistSubmissions() ? <SetupNotice /> : null}

      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Contact inbox
        </h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          Form submissions stored in Supabase. Open, delete, or bulk-delete
          messages here.
        </p>
      </div>

      {loadError ? (
        <AdminEmptyState title="Database not ready" body={loadError} />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            <AdminStatCard label="Total" value={stats.total} />
            <AdminStatCard label="New" value={stats.new} tone="accent" />
            <AdminStatCard label="Read" value={stats.read} />
            <AdminStatCard label="Replied" value={stats.replied} />
            <AdminStatCard
              label="Archived"
              value={stats.archived}
              tone="muted"
            />
            <AdminStatCard label="This week" value={stats.thisWeek} />
          </div>

          <ContactTable items={submissions} />
        </>
      )}
    </div>
  );
}
