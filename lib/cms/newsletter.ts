import { createClient } from "@/lib/supabase/server";
import type { NewsletterSubscriberRow } from "@/lib/cms/types";

export async function subscribeNewsletter(email: string, source = "website") {
  const supabase = await createClient();
  const normalized = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .upsert(
      { email: normalized, status: "active", source },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function getNewsletterSubscribersAdmin() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as NewsletterSubscriberRow[];
}

export async function updateNewsletterStatus(
  id: string,
  status: NewsletterSubscriberRow["status"]
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}
