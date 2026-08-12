import Link from "next/link";
import { formatDistanceToNow } from "@/lib/admin/format";
import { getSubmissionStats, getSubmissions } from "@/lib/admin/queries";
import {
  AdminEmptyState,
  AdminStatCard,
  AdminTable,
  SetupNotice,
  StatusBadge,
} from "@/components/admin/admin-shell";
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
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Contact inbox</h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">
          Form submissions stored in Supabase. SMTP emails still send in parallel.
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
            <AdminStatCard label="Archived" value={stats.archived} tone="muted" />
            <AdminStatCard label="This week" value={stats.thisWeek} />
          </div>

          <AdminTable>
            <table className="min-w-[48rem] w-full text-left text-sm">
              <thead className="border-b border-border/60 bg-background/40">
                <tr>
                  <th className="px-4 py-3 font-bold sm:px-6">From</th>
                  <th className="px-4 py-3 font-bold sm:px-6">Subject</th>
                  <th className="px-4 py-3 font-bold sm:px-6">Status</th>
                  <th className="px-4 py-3 font-bold sm:px-6">Received</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((item) => (
                  <tr key={item.id} className="border-b border-border/40 hover:bg-background/40">
                    <td className="px-4 py-4 sm:px-6">
                      <Link href={`/admin/submissions/${item.id}`} className="font-bold hover:text-accent-brand">
                        {item.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{item.email}</p>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <Link href={`/admin/submissions/${item.id}`} className="font-semibold hover:text-accent-brand">
                        {item.subject}
                      </Link>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-4 text-xs text-muted-foreground sm:px-6">
                      {formatDistanceToNow(item.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {submissions.length === 0 ? (
              <div className="p-8">
                <AdminEmptyState title="No submissions yet" body="Contact form messages will appear here." />
              </div>
            ) : null}
          </AdminTable>
        </>
      )}
    </div>
  );
}
