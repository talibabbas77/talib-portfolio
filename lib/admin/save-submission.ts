import type { ContactFormPayload } from "@/lib/email/types";
import { createServiceClient, canPersistSubmissions } from "@/lib/supabase/admin";

export async function saveContactSubmission(
  payload: ContactFormPayload,
  source = "portfolio"
) {
  if (!canPersistSubmissions()) {
    return null;
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .insert({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      source,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save contact submission:", error.message);
    return null;
  }

  return data.id as string;
}
