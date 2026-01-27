import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  emDelimiter: "_",
  strongDelimiter: "**",
  linkStyle: "inlined",
});

/**
 * Convert pasted HTML into clean, predictable Markdown.
 * This is intentionally lossy.
 */
export function htmlToMarkdown(html: string): string {
  return turndown.turndown(html);
}
