import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";

export async function DELETE(request: Request) {
  const { supabase, user, error } = await requireAdmin();
  if (!user) return NextResponse.json({ error }, { status: 401 });

  const body = await request.json().catch(() => null);
  const ids = Array.isArray(body?.ids)
    ? body.ids.map(String).filter(Boolean)
    : [];

  if (ids.length === 0) {
    return NextResponse.json(
      { error: "No submission IDs provided." },
      { status: 400 }
    );
  }

  const { error: dbError } = await supabase
    .from("contact_submissions")
    .delete()
    .in("id", ids);

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, deleted: ids.length });
}
