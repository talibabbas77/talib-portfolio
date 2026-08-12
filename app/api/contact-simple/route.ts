import { NextRequest, NextResponse } from "next/server";
import { getMissingEmailEnvVars } from "@/lib/email/transporter";
import { sendContactEmails } from "@/lib/email/send-contact-emails";
import type { ContactFormPayload } from "@/lib/email/types";
import { getClientIp, verifyTurnstileToken } from "@/lib/turnstile/verify";

function isValidPayload(data: unknown): data is ContactFormPayload & {
  turnstileToken?: string;
} {
  if (!data || typeof data !== "object") return false;
  const payload = data as Record<string, unknown>;
  return (
    typeof payload.name === "string" &&
    typeof payload.email === "string" &&
    typeof payload.subject === "string" &&
    typeof payload.message === "string" &&
    payload.name.trim().length > 0 &&
    payload.email.trim().length > 0 &&
    payload.subject.trim().length > 0 &&
    payload.message.trim().length > 0
  );
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();

    if (!isValidPayload(formData)) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const verification = await verifyTurnstileToken(
      formData.turnstileToken,
      "contact_submit",
      getClientIp(request)
    );

    if (!verification.ok) {
      return NextResponse.json({ error: verification.reason }, { status: 403 });
    }

    const missingVars = getMissingEmailEnvVars();
    if (missingVars.length > 0) {
      console.error("Missing environment variables:", missingVars);
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    const payload: ContactFormPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    await sendContactEmails(payload);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
