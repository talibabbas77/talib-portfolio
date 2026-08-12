import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/lib/cms/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    await subscribeNewsletter(email, String(body.source ?? "website"));
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not subscribe.",
      },
      { status: 500 }
    );
  }
}
