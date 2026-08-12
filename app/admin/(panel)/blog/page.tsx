import Link from "next/link";
import { BlogTable } from "@/components/admin/blog-table";
import { getAllBlogPostsAdmin } from "@/lib/cms/blog";

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
          <p className="text-sm text-muted-foreground">
            Draft, publish, edit, and delete posts.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-[var(--accent-brand)] px-4 text-sm font-bold text-white dark:text-[#06110c]"
        >
          New post
        </Link>
      </div>

      <BlogTable items={items} />
    </div>
  );
}
