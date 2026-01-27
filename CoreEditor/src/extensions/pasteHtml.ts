import { EditorSelection } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { htmlToMarkdown } from "../utils/htmlToMarkdown"; // adjust path

export function htmlPasteExtension() {
  return EditorView.domEventHandlers({
    paste(event, view) {
      const clipboard = event.clipboardData;
      if (!clipboard) return false;

      // If there's an image, do nothing — let your image pipeline handle it
      const hasImage = Array.from(clipboard.items).some((item) =>
        item.type.startsWith("image/"),
      );
      if (hasImage) return false;

      const html = clipboard.getData("text/html");
      if (!html) return false;

      event.preventDefault();

      const markdown = htmlToMarkdown(html);

      view.dispatch(
        view.state.changeByRange((range) => ({
          changes: {
            from: range.from,
            to: range.to,
            insert: markdown,
          },
          range: EditorSelection.cursor(range.from + markdown.length),
        })),
      );

      return true;
    },
  });
}
