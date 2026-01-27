/**
 * Base CodeMirror extensions bundle.
 */

import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
} from "@codemirror/autocomplete";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentOnInput,
} from "@codemirror/language";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { Extension } from "@codemirror/state";
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  rectangularSelection,
} from "@codemirror/view";

import { mathCompletion } from "./calc";
import { htmlPasteExtension } from "./pasteHtml";
/**
 * Creates autocompletion with math expression support.
 */
export function createAutocompletion(): Extension {
  return autocompletion({
    override: [mathCompletion],
    defaultKeymap: true,
    icons: false,
    closeOnBlur: true,
    optionClass: () => "cm-completion-item",
  });
}

/**
 * Creates the standard editor extensions bundle.
 */
export function createBaseExtensions(): Extension[] {
  return [
    highlightActiveLineGutter(),
    highlightActiveLine(),
    history(),
    foldGutter(),
    drawSelection(),
    dropCursor(),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    rectangularSelection(),
    crosshairCursor(),
    highlightSelectionMatches(),
    htmlPasteExtension(),
    EditorView.lineWrapping,
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      indentWithTab,
    ]),
  ];
}
