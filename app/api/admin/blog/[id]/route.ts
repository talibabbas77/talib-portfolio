import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/slugify";
import { sanitizeHtml } from "@/lib/cms/sanitize";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase, user, error } = await requireAdmin();
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const { data, error: dbError } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 404 });
  }

  return NextResponse.json({ item: data });
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase, user, error } = await requireAdmin();
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const body = await request.json();
  const payload: Record<string, unknown> = {};

  if (body.title !== undefined) payload.title = String(body.title).trim();
  if (body.slug !== undefined) payload.slug = slugify(String(body.slug));
  if (body.kicker !== undefined) payload.kicker = String(body.kicker).trim();
  if (body.summary !== undefined) payload.summary = String(body.summary).trim();
  if (body.content_html !== undefined) {
    payload.content_html = sanitizeHtml(String(body.content_html));
  }
  if (body.published_at !== undefined) payload.published_at = body.published_at;
  if (body.read_time !== undefined) payload.read_time = String(body.read_time).trim();
  if (body.featured !== undefined) payload.featured = Boolean(body.featured);
  if (body.tags !== undefined) {
    payload.tags = Array.isArray(body.tags) ? body.tags.map(String) : [];
  }
  if (body.cover_image_url !== undefined) {
    payload.cover_image_url = body.cover_image_url || null;
  }
  if (body.status !== undefined) {
    payload.status = body.status === "published" ? "published" : "draft";
  }

  const { data, error: dbError } = await supabase
    .from("blog_posts")
    .update(payload)
    .eq("id", id)
    .select("*")
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ item: data });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const { supabase, user, error } = await requireAdmin();
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const { error: dbError } = await supabase.from("blog_posts").delete().eq("id", id);
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
