"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ImageField } from "@/components/admin/image-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { slugify } from "@/lib/admin/slugify";
import type { CaseStudyRow } from "@/lib/cms/types";

type CaseStudyFormProps = {
  initial?: Partial<CaseStudyRow>;
  mode: "create" | "edit";
};

export function CaseStudyForm({ initial, mode }: CaseStudyFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    kicker: initial?.kicker ?? "",
    summary: initial?.summary ?? "",
    year: initial?.year ?? "",
    role: initial?.role ?? "",
    client_type: initial?.client_type ?? "",
    stack: (initial?.stack ?? []).join(", "),
    live_url: initial?.live_url ?? "",
    github_url: initial?.github_url ?? "",
    image_url: initial?.image_url ?? "",
    image_alt: initial?.image_alt ?? "",
    problem: initial?.problem ?? "",
    approach: (initial?.approach ?? []).join("\n"),
    outcomes: (initial?.outcomes ?? []).join("\n"),
    featured: initial?.featured ?? false,
    status: initial?.status ?? "draft",
    content_html: initial?.content_html ?? "<p></p>",
  });

  const save = async (publish = false) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        stack: form.stack.split(",").map((v) => v.trim()).filter(Boolean),
        approach: form.approach.split("\n").map((v) => v.trim()).filter(Boolean),
        outcomes: form.outcomes.split("\n").map((v) => v.trim()).filter(Boolean),
        live_url: form.live_url || null,
        github_url: form.github_url || null,
        status: publish ? "published" : form.status,
      };

      const response = await fetch(
        mode === "create"
          ? "/api/admin/case-studies"
          : `/api/admin/case-studies/${initial?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");

      toast.success(publish ? "Case study published." : "Case study saved.");
      router.push("/admin/case-studies");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "create" ? "New case study" : "Edit case study"}
          </h1>
        </div>
        <Link href="/admin/case-studies" className="text-sm font-bold text-muted-foreground">
          Back to list
        </Link>
      </div>

      <div className="glass-panel space-y-5 rounded-xl p-4 sm:p-6">
        <InputBlock label="Title" value={form.title} onChange={(title) => setForm((p) => ({ ...p, title, slug: p.slug || slugify(title) }))} />
        <InputBlock label="Slug" value={form.slug} onChange={(slug) => setForm((p) => ({ ...p, slug }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputBlock label="Kicker" value={form.kicker} onChange={(kicker) => setForm((p) => ({ ...p, kicker }))} />
          <InputBlock label="Year" value={form.year} onChange={(year) => setForm((p) => ({ ...p, year }))} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputBlock label="Role" value={form.role} onChange={(role) => setForm((p) => ({ ...p, role }))} />
          <InputBlock label="Client type" value={form.client_type} onChange={(client_type) => setForm((p) => ({ ...p, client_type }))} />
        </div>
        <TextareaBlock label="Summary" value={form.summary} onChange={(summary) => setForm((p) => ({ ...p, summary }))} />
        <InputBlock label="Stack (comma separated)" value={form.stack} onChange={(stack) => setForm((p) => ({ ...p, stack }))} />
        <div className="grid gap-4 sm:grid-cols-2">
          <InputBlock label="Live URL" value={form.live_url} onChange={(live_url) => setForm((p) => ({ ...p, live_url }))} />
          <InputBlock label="GitHub URL" value={form.github_url} onChange={(github_url) => setForm((p) => ({ ...p, github_url }))} />
        </div>
        <ImageField
          label="Cover image"
          value={form.image_url}
          onChange={(image_url) => setForm((p) => ({ ...p, image_url }))}
          showAlt
          alt={form.image_alt}
          onAltChange={(image_alt) => setForm((p) => ({ ...p, image_alt }))}
        />
        <TextareaBlock label="Problem" value={form.problem} onChange={(problem) => setForm((p) => ({ ...p, problem }))} />
        <TextareaBlock label="Approach (one line per bullet)" value={form.approach} onChange={(approach) => setForm((p) => ({ ...p, approach }))} rows={5} />
        <TextareaBlock label="Outcomes (one line per bullet)" value={form.outcomes} onChange={(outcomes) => setForm((p) => ({ ...p, outcomes }))} rows={4} />
        <div>
          <label className="mb-2 block text-sm font-bold">Story</label>
          <RichTextEditor value={form.content_html} onChange={(content_html) => setForm((p) => ({ ...p, content_html }))} />
        </div>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm((p) => ({ ...p, featured: e.target.checked }))} />
          Featured case study
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="button" disabled={saving} onClick={() => save(false)} className="h-11 rounded-md border px-5 text-sm font-bold">Save draft</button>
          <button type="button" disabled={saving} onClick={() => save(true)} className="h-11 rounded-md bg-[var(--accent-brand)] px-5 text-sm font-bold text-white dark:text-[#06110c]">Publish</button>
        </div>
      </div>
    </div>
  );
}

function InputBlock({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm" />
    </div>
  );
}

function TextareaBlock({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm" />
    </div>
  );
}
