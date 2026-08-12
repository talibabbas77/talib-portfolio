import { notFound } from "next/navigation";
import { BlogForm } from "@/components/admin/blog-form";
import { createClient } from "@/lib/supabase/server";
import type { BlogPostRow } from "@/lib/cms/types";

export default async function AdminBlogEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error || !data) notFound();

  return <BlogForm mode="edit" initial={data as BlogPostRow} />;
}
