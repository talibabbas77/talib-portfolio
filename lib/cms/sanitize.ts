import sanitizeHtmlLib from "sanitize-html";

export { paragraphsToHtml, htmlToPlainParagraphs } from "@/lib/content/html-utils";

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
