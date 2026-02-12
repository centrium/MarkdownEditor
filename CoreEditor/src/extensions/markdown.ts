/**
 * Markdown language support for CodeMirror 6.
 */

import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { Extension } from "@codemirror/state";
import { GFM } from "@lezer/markdown";
import { hashtagExtension } from "./hashtag";
import { highlightExtension } from "./highlight";

/**
 * Creates the Markdown language extension with GFM support.
 */
export function createMarkdownLanguage(): Extension {
  return markdown({
    codeLanguages: languages,
    extensions: [GFM, highlightExtension, hashtagExtension],
  });
}
