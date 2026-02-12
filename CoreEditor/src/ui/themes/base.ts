/**
 * Base theme styles shared between light and dark themes.
 * Editor establishes rhythm and posture.
 */

import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { tags } from "@lezer/highlight";

/**
 * Base theme with shared styles.
 */
export const baseTheme = EditorView.baseTheme({
  "&": {
    height: "100%",
    fontSize: "15px",
  },

  ".cm-scroller": {
    overflow: "auto",
    fontFamily:
      'var(--editor-font-family, -apple-system, BlinkMacSystemFont, "SF Mono", Menlo, Monaco, monospace)',
    padding: "32px 24px 72px",
    boxSizing: "border-box",
  },

  ".cm-content": {
    maxWidth: "680px",
    margin: "0 auto",
    padding: "0 8px",
    minHeight: "100%",
    boxSizing: "border-box",
    lineHeight: "1.6", // ⬅ establishes preview-like rhythm
  },

  /* Subtle paragraph rhythm */
  ".cm-line": {
    paddingBottom: "0.4em", // ⬅ prevents density shock vs preview
  },

  ".cm-gutters": {
    backgroundColor: "transparent",
    border: "none",
    paddingRight: "8px",
  },

  ".cm-gutter.cm-lineNumbers .cm-gutterElement": {
    padding: "0 8px 0 16px",
    minWidth: "32px",
    textAlign: "right",
  },

  ".cm-activeLine": {
    backgroundColor: "rgba(0,0,0,0.015)",
  },

  ".cm-activeLineGutter": {
    backgroundColor: "transparent",
  },

  /**
   * Code blocks
   * Establish vertical posture without turning into cards.
   */

  ".cm-line:has(.tok-meta)": {
    backgroundColor: "var(--code-block-bg, rgba(0,0,0,0.03))",
    borderRadius: "4px",
    paddingTop: "6px", // ⬅ vertical footprint parity
    paddingBottom: "6px",
  },

  // Safari fallback
  ".cm-line.code-block": {
    backgroundColor: "var(--code-block-bg, rgba(0,0,0,0.03))",
    borderRadius: "4px",
    paddingTop: "6px",
    paddingBottom: "6px",
  },

  /**
   * Tooltips (unchanged – already good)
   */
  ".cm-tooltip": {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(50px) saturate(190%)",
    border: "0.5px solid rgba(0,0,0,0.08)",
    borderRadius: "10px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },

  ".cm-tooltip-autocomplete ul": {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
  },

  ".cm-tooltip-autocomplete ul li": {
    padding: "6px 12px",
    borderRadius: "6px",
    margin: "2px 4px",
  },

  ".cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "rgba(0,0,0,0.05)",
  },

  ".cm-formatting": {
    opacity: "0.55",
  },

  // Hashtag pill styling
  ".cm-hashtag": {
    fontFamily: '"SF Mono", Menlo, Monaco, monospace',
    backgroundColor: "var(--tag-bg, rgba(59, 130, 246, 0.1))",
    color: "var(--tag-color, #3b82f6)",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "0.9em",
    fontWeight: "500",
    border: "1px solid var(--tag-border, rgba(59, 130, 246, 0.2))",
    display: "inline-block",
    lineHeight: "1.4",
  },
});

/**
 * Markdown highlight styles.
 * Headings gain authority, quotes lose theatrics.
 */
export const markdownHighlightStyle = HighlightStyle.define([
  // Headings — small authority bump to reduce preview snap
  {
    tag: tags.heading1,
    fontSize: "1.65em",
    fontWeight: "700",
    lineHeight: "1.25",
  },
  {
    tag: tags.heading2,
    fontSize: "1.4em",
    fontWeight: "650",
    lineHeight: "1.3",
  },
  {
    tag: tags.heading3,
    fontSize: "1.2em",
    fontWeight: "600",
    lineHeight: "1.35",
  },
  { tag: tags.heading4, fontSize: "1.1em", fontWeight: "600" },
  { tag: tags.heading5, fontSize: "1.05em", fontWeight: "600" },
  { tag: tags.heading6, fontSize: "1.0em", fontWeight: "600" },

  // Emphasis
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strong, fontWeight: "700" },
  { tag: tags.strikethrough, textDecoration: "line-through", opacity: "0.7" },

  // Inline code — leave neutral in editor
  {
    tag: tags.monospace,
    fontFamily: '"SF Mono", Menlo, Monaco, monospace',
  },

  // Links — unchanged
  { tag: tags.link, textDecoration: "underline" },
  { tag: tags.url, opacity: "0.7" },

  // Quotes — remove italics to avoid preview snap
  {
    tag: tags.quote,
    fontStyle: "normal",
    opacity: "0.85",
  },

  // Highlights (unchanged)
  {
    tag: tags.special(tags.content),
    backgroundColor: "rgba(255, 230, 140, 0.35)",
    borderRadius: "3px",
    padding: "0 2px",
  },

  // Hashtags
  {
    tag: tags.meta,
    fontFamily: '"SF Mono", Menlo, Monaco, monospace',
  },
]);

/**
 * Combined markdown syntax highlighting extension.
 */
export const markdownHighlighting = syntaxHighlighting(markdownHighlightStyle);
