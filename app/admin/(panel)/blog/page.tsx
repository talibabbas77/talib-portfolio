import Link from "next/link";
import { getAllBlogPostsAdmin } from "@/lib/cms/blog";
import { AdminTable, StatusBadge } from "@/components/admin/admin-shell";

export default async function AdminBlogPage() {
  let items: Awaited<ReturnType<typeof getAllBlogPostsAdmin>> = [];
  try {
    items = await getAllBlogPostsAdmin();
  } catch {
    items = [];
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold">Blog posts</h1>
          <p className="text-sm text-muted-foreground">Draft, publish, and edit posts.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[var(--accent-brand)] px-4 text-sm font-bold text-white dark:text-[#06110c]"
        >
          New post
        </Link>
      </div>

      <AdminTable>
        <table className="min-w-[36rem] w-full text-left text-sm">
          <thead className="border-b border-border/60 bg-background/40">
            <tr>
              <th className="px-4 py-3 font-bold">Title</th>
              <th className="px-4 py-3 font-bold">Status</th>
              <th className="px-4 py-3 font-bold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-border/40 hover:bg-background/40">
                <td className="px-4 py-4">
                  <Link href={`/admin/blog/${item.id}`} className="font-bold hover:text-accent-brand">
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">/{item.slug}</p>
                </td>
                <td className="px-4 py-4"><StatusBadge status={item.status} /></td>
                <td className="px-4 py-4 text-xs text-muted-foreground">{item.updated_at.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </div>
  );
}
