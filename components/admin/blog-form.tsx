"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/admin/confirm-modal";
import { ImageField } from "@/components/admin/image-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { slugify } from "@/lib/admin/slugify";
import type { BlogPostRow } from "@/lib/cms/types";

type BlogFormProps = {
  initial?: Partial<BlogPostRow>;
  mode: "create" | "edit";
};

export function BlogForm({ initial, mode }: BlogFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    kicker: initial?.kicker ?? "",
    summary: initial?.summary ?? "",
    read_time: initial?.read_time ?? "5 min",
    published_at: initial?.published_at ?? "",
    tags: (initial?.tags ?? []).join(", "),
    featured: initial?.featured ?? false,
    status: initial?.status ?? "draft",
    cover_image_url: initial?.cover_image_url ?? "",
    content_html: initial?.content_html ?? "<p></p>",
  });

  const save = async (publish = false) => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        status: publish ? "published" : form.status,
        published_at: form.published_at || null,
      };

      const response = await fetch(
        mode === "create"
          ? "/api/admin/blog"
          : `/api/admin/blog/${initial?.id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");

      toast.success(publish ? "Post published." : "Post saved.");
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!initial?.id) return;
    setDeleting(true);
    try {
      const response = await fetch("/api/admin/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [initial.id] }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Delete failed.");
      toast.success("Post deleted.");
      setConfirmOpen(false);
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed.");
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {mode === "create" ? "New blog post" : "Edit blog post"}
          </h1>
          <p className="text-sm font-medium text-muted-foreground">
            Rich text, cover image upload, or image URL.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          Back to list
        </Link>
      </div>

      <div className="glass-panel space-y-5 rounded-xl p-4 sm:p-6">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                title: e.target.value,
                slug: prev.slug || slugify(e.target.value),
              }))
            }
            className={inputClass}
          />
        </Field>
        <Field label="Slug">
          <input
            value={form.slug}
            onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kicker">
            <input
              value={form.kicker}
              onChange={(e) => setForm((prev) => ({ ...prev, kicker: e.target.value }))}
              className={inputClass}
            />
          </Field>
          <Field label="Read time">
            <input
              value={form.read_time}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, read_time: e.target.value }))
              }
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Summary">
          <textarea
            value={form.summary}
            onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
            rows={3}
            className={inputClass}
          />
        </Field>
        <Field label="Tags (comma separated)">
          <input
            value={form.tags}
            onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
            className={inputClass}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Publish date">
            <input
              type="date"
              value={form.published_at ?? ""}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, published_at: e.target.value }))
              }
              className={inputClass}
            />
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as "draft" | "published",
                }))
              }
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm font-bold">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, featured: e.target.checked }))
            }
          />
          Featured post
        </label>
        <ImageField
          label="Cover image"
          value={form.cover_image_url}
          onChange={(cover_image_url) =>
            setForm((prev) => ({ ...prev, cover_image_url }))
          }
        />
        <Field label="Content">
          <RichTextEditor
            value={form.content_html}
            onChange={(content_html) =>
              setForm((prev) => ({ ...prev, content_html }))
            }
          />
        </Field>
        <div className="flex flex-wrap gap-3 border-t border-border/60 pt-4">
          <button
            type="button"
            disabled={saving || deleting}
            onClick={() => save(false)}
            className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-bold disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save draft"}
          </button>
          <button
            type="button"
            disabled={saving || deleting}
            onClick={() => save(true)}
            className="inline-flex h-11 items-center rounded-md bg-[var(--accent-brand)] px-5 text-sm font-bold text-white disabled:opacity-50 dark:text-[#06110c]"
          >
            {saving ? "Publishing..." : "Publish"}
          </button>
          {mode === "edit" ? (
            <button
              type="button"
              disabled={saving || deleting}
              onClick={() => setConfirmOpen(true)}
              className="inline-flex h-11 items-center rounded-md border border-destructive/30 px-5 text-sm font-bold text-destructive hover:bg-destructive/10 disabled:opacity-50 sm:ml-auto"
            >
              Delete post
            </button>
          ) : null}
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete this post?"
        description={`“${form.title || "Untitled post"}” will be permanently deleted. This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        onCancel={() => {
          if (!deleting) setConfirmOpen(false);
        }}
        onConfirm={remove}
      />
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm font-medium outline-none focus:border-accent-brand";
