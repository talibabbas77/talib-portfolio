import { notFound } from "next/navigation";
import { CaseStudyForm } from "@/components/admin/case-study-form";
import { createClient } from "@/lib/supabase/server";
import type { CaseStudyRow } from "@/lib/cms/types";

export default async function AdminCaseStudyEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase.from("case_studies").select("*").eq("id", id).single();
  if (error || !data) notFound();

  return <CaseStudyForm mode="edit" initial={data as CaseStudyRow} />;
}
