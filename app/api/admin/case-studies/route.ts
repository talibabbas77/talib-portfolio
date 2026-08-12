import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { slugify } from "@/lib/admin/slugify";
import { sanitizeHtml } from "@/lib/cms/sanitize";

export async function GET() {
  const { supabase, user, error } = await requireAdmin();
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const { data, error: dbError } = await supabase
    .from("case_studies")
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
    year: String(body.year ?? "").trim(),
    role: String(body.role ?? "").trim(),
    client_type: String(body.client_type ?? "").trim(),
    stack: Array.isArray(body.stack) ? body.stack.map(String) : [],
    live_url: body.live_url || null,
    github_url: body.github_url || null,
    image_url: String(body.image_url ?? "").trim(),
    image_alt: String(body.image_alt ?? "").trim(),
    featured: Boolean(body.featured),
    problem: String(body.problem ?? "").trim(),
    approach: Array.isArray(body.approach) ? body.approach.map(String) : [],
    outcomes: Array.isArray(body.outcomes) ? body.outcomes.map(String) : [],
    status: body.status === "published" ? "published" : "draft",
  };

  const { data, error: dbError } = await supabase
    .from("case_studies")
    .insert(payload)
    .select("*")
    .single();

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ item: data }, { status: 201 });
}
