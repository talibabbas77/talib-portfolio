import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/slugify";
import { sanitizeHtml } from "@/lib/cms/sanitize";

export async function GET() {
  const { supabase, user, error } = await requireAdmin();
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const { data, error: dbError } = await supabase
    .from("blog_posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function POST(request: Request) {
  const { supabase, user, error } = await requireAdmin();
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const body = await request.json();
  const slug = slugify(body.slug || body.title || "");
  if (!slug || !body.title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const payload = {
    slug,
    title: String(body.title).trim(),
    kicker: String(body.kicker ?? "").trim(),
    summary: String(body.summary ?? "").trim(),
    content_html: sanitizeHtml(String(body.content_html ?? "")),
    published_at: body.published_at || null,
    read_time: String(body.read_time ?? "5 min").trim(),
    featured: Boolean(body.featured),
    tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
    cover_image_url: body.cover_image_url || null,
    status: body.status === "published" ? "published" : "draft",
  };

  const { data, error: dbError } = await supabase
    .from("blog_posts")
    .insert(payload)
    .select("*")
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
