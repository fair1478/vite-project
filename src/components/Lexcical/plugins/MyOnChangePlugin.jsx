import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";

export default function MyOnChangePlugin({ onChange, value }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (!!onChange) {
      return editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor);
          onChange(htmlString);
        });
      });
    } else {
      editor.setEditable(false);
    }
  }, [editor, onChange]);

  const updateHTML = (editor, value) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(value, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    $getRoot().clear();
    $getRoot().select();
    $insertNodes(nodes);
  };

  useEffect(() => {
    if (editor && !onChange) {
      editor.update(() => {
        updateHTML(editor, value);
      });
    }
  }, [value, editor, onChange]);

  return null;
}
