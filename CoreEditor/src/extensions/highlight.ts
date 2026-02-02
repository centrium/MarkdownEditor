import { tags } from "@lezer/highlight";
import { MarkdownConfig } from "@lezer/markdown";

// Delimiter definition (same pattern as other inline delimiter extensions)
const HighlightDelim = { resolve: "Highlight", mark: "HighlightMark" };

export const highlightExtension: MarkdownConfig = {
  defineNodes: [
    // The inline node for the highlighted content
    { name: "Highlight", style: tags.special(tags.content) },
    // The == markers themselves (optional to style differently)
    { name: "HighlightMark", style: tags.processingInstruction },
  ],

  parseInline: [
    {
      name: "Highlight",
      parse(cx, next, pos) {
        // Must start with exactly two '=' characters, but not '==='
        if (
          next !== 61 /* '=' */ ||
          cx.char(pos + 1) !== 61 ||
          cx.char(pos + 2) === 61
        ) {
          return -1;
        }

        // Register a delimiter pair, just like ~~strikethrough~~ does
        return cx.addDelimiter(HighlightDelim, pos, pos + 2, true, true);
      },
    },
  ],
};
