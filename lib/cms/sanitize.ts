import sanitizeHtmlLib from "sanitize-html";

const SANITIZE_OPTIONS: sanitizeHtmlLib.IOptions = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "h2",
    "h3",
    "h4",
    "ul",
    "ol",
    "li",
    "a",
    "blockquote",
    "code",
    "pre",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "title", "width", "height"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtmlLib.simpleTransform("a", { rel: "noopener noreferrer" }),
  },
};

export function sanitizeHtml(html: string) {
  if (!html) return "";
  return sanitizeHtmlLib(html, SANITIZE_OPTIONS);
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

export function htmlToPlainParagraphs(html: string) {
  const text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .trim();
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}
