import type { ContactSubmission, SubmissionStats } from "@/lib/admin/types";
import { createClient } from "@/lib/supabase/server";

export async function getSubmissions(limit = 50) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as ContactSubmission[];
}

export async function getSubmission(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as ContactSubmission;
}

export async function getSubmissionStats(): Promise<SubmissionStats> {
  const supabase = await createClient();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("status, created_at");

  if (error) throw error;

  const rows = data ?? [];
  const thisWeek = rows.filter(
    (row) => new Date(row.created_at) >= weekAgo
  ).length;

  return {
    total: rows.length,
    new: rows.filter((row) => row.status === "new").length,
    read: rows.filter((row) => row.status === "read").length,
    replied: rows.filter((row) => row.status === "replied").length,
    archived: rows.filter((row) => row.status === "archived").length,
    thisWeek,
  };
}

export async function updateSubmissionStatus(
  id: string,
  status: ContactSubmission["status"]
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_submissions")
    .update({ status })
    .eq("id", id);

  if (error) throw error;
}

export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
