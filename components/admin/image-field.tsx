"use client";

import { useRef, useState } from "react";
import { ImageIcon, Link2, Upload } from "lucide-react";
import { toast } from "sonner";

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  alt?: string;
  onAltChange?: (value: string) => void;
  showAlt?: boolean;
};

export function ImageField({
  label,
  value,
  onChange,
  alt,
  onAltChange,
  showAlt = false,
}: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlDraft, setUrlDraft] = useState("");
  const [uploading, setUploading] = useState(false);

  const applyUrl = () => {
    const next = urlDraft.trim();
    if (!next) {
      toast.error("Enter an image URL first.");
      return;
    }
    onChange(next);
    setUrlDraft("");
    toast.success("Image URL applied.");
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      onChange(data.url);
      toast.success("Image uploaded.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not upload image."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold">{label}</label>

      {value ? (
        <div className="overflow-hidden rounded-lg border border-border/60 bg-background/40">
          <div className="relative aspect-[16/9] w-full bg-muted/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt={alt || "Preview"}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border/60 px-3 py-2">
            <p className="truncate text-xs font-medium text-muted-foreground">
              {value}
            </p>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs font-bold text-destructive"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-border/70 bg-background/30 text-muted-foreground">
          <div className="text-center">
            <ImageIcon className="mx-auto h-8 w-8 opacity-60" />
            <p className="mt-2 text-sm font-medium">No image selected</p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadFile(file);
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border px-4 text-sm font-bold disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload file"}
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="url"
          value={urlDraft}
          onChange={(e) => setUrlDraft(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="h-10 flex-1 rounded-md border border-border bg-background px-3 text-sm"
        />
        <button
          type="button"
          onClick={applyUrl}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-bold text-background"
        >
          <Link2 className="h-4 w-4" />
          Use URL
        </button>
      </div>

      {showAlt && onAltChange ? (
        <input
          type="text"
          value={alt ?? ""}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Describe the image for accessibility"
          className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm"
        />
      ) : null}
    </div>
  );
}
