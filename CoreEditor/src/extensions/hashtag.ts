import { tags } from "@lezer/highlight";
import { MarkdownConfig } from "@lezer/markdown";

/**
 * Hashtag extension for inline #tags
 * Recognizes patterns like #tag1, #my-tag, #tag_name
 */
export const hashtagExtension: MarkdownConfig = {
  defineNodes: [
    // The inline node for the hashtag content
    { name: "Hashtag", style: tags.meta },
    // The # marker itself
    { name: "HashtagMark", style: tags.processingInstruction },
  ],

  parseInline: [
    {
      name: "Hashtag",
      parse(cx, next, pos) {
        // Must start with '#' but not '##' (which is a heading)
        if (next !== 35 /* '#' */ || cx.char(pos + 1) === 35) {
          return -1;
        }

        // Must not be preceded by alphanumeric (to avoid matching mid-word)
        if (pos > 0) {
          const prevChar = cx.char(pos - 1);
          if (
            (prevChar >= 48 && prevChar <= 57) || // 0-9
            (prevChar >= 65 && prevChar <= 90) || // A-Z
            (prevChar >= 97 && prevChar <= 122) || // a-z
            prevChar === 95 // _
          ) {
            return -1;
          }
        }

        // Scan forward to find the end of the tag
        let end = pos + 1;
        while (end < cx.end) {
          const char = cx.char(end);
          // Allow alphanumeric, hyphen, and underscore
          if (
            (char >= 48 && char <= 57) || // 0-9
            (char >= 65 && char <= 90) || // A-Z
            (char >= 97 && char <= 122) || // a-z
            char === 45 || // -
            char === 95 // _
          ) {
            end++;
          } else {
            break;
          }
        }

        // Must have at least one character after the #
        if (end === pos + 1) {
          return -1;
        }

        // Create the hashtag node with the mark
        return cx.addElement(
          cx.elt("Hashtag", pos, end, [cx.elt("HashtagMark", pos, pos + 1)]),
        );
      },
    },
  ],
};
