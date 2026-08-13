/** Plain string helpers for static seed content. No server-only sanitizer deps. */

export function htmlToPlainParagraphs(html: string) {
  const text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .trim();
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}

export function paragraphsToHtml(paragraphs: string[]) {
  return paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("");
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
