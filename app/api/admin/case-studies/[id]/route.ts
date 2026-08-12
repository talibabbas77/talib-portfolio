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
    .from("case_studies")
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

  const fields = [
    "title",
    "kicker",
    "summary",
    "year",
    "role",
    "client_type",
    "live_url",
    "github_url",
    "image_url",
    "image_alt",
    "problem",
  ] as const;

  for (const field of fields) {
    if (body[field] !== undefined) {
      payload[field] =
        body[field] === null ? null : String(body[field]).trim();
    }
  }

  if (body.slug !== undefined) payload.slug = slugify(String(body.slug));
  if (body.content_html !== undefined) {
    payload.content_html = sanitizeHtml(String(body.content_html));
  }
  if (body.featured !== undefined) payload.featured = Boolean(body.featured);
  if (body.stack !== undefined) {
    payload.stack = Array.isArray(body.stack) ? body.stack.map(String) : [];
  }
  if (body.approach !== undefined) {
    payload.approach = Array.isArray(body.approach)
      ? body.approach.map(String)
      : [];
  }
  if (body.outcomes !== undefined) {
    payload.outcomes = Array.isArray(body.outcomes)
      ? body.outcomes.map(String)
      : [];
  }
  if (body.status !== undefined) {
    payload.status = body.status === "published" ? "published" : "draft";
  }

  const { data, error: dbError } = await supabase
    .from("case_studies")
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

  const { error: dbError } = await supabase
    .from("case_studies")
    .delete()
    .eq("id", id);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
