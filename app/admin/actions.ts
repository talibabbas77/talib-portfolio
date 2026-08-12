"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateSubmissionStatus } from "@/lib/admin/queries";
import type { SubmissionStatus } from "@/lib/admin/types";
import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateStatusAction(id: string, status: SubmissionStatus) {
  await updateSubmissionStatus(id, status);
  revalidatePath("/admin");
  revalidatePath(`/admin/submissions/${id}`);
}
