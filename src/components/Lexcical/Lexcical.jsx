/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  $isTextNode,
  isHTMLElement,
  ParagraphNode,
  TextNode,
  $getRoot,
  $insertNodes,
} from "lexical";
import { $generateNodesFromDOM } from "@lexical/html";

import ToolbarPlugin from "./plugins/ToolbarPlugin";
import MyOnChangePlugin from "./plugins/MyOnChangePlugin";
import {
  parseAllowedColor,
  parseAllowedFontSize,
  parseTextAlign,
} from "./styleConfig.jsx";
import theme from "./Theme";
import { useEffect, useState } from "react";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

const removeStylesExportDOM = (editor, target) => {
  const output = target.exportDOM(editor);
  if (output && isHTMLElement(output.element)) {
    // Remove all inline styles and classes if the element is an HTMLElement
    // Children are checked as well since TextNode can be nested
    // in i, b, and strong tags.
    for (const el of [
      output.element,
      ...output.element.querySelectorAll('[style],[class],[dir="ltr"]'),
    ]) {
      el.removeAttribute("class");
      el.removeAttribute("style");
      if (el.getAttribute("dir") === "ltr") {
        el.removeAttribute("dir");
      }
    }
  }
  return output;
};

const exportMap = new Map([
  [ParagraphNode],
  [TextNode],
  [ListItemNode],
  [ListNode],
]);

const getExtraStyles = (element) => {
  // Parse styles from pasted input, but only if they match exactly the
  // sort of styles that would be produced by exportDOM
  let extraStyles = "";
  const fontSize = parseAllowedFontSize(element.style.fontSize);
  const backgroundColor = parseAllowedColor(element.style.backgroundColor);
  const color = parseAllowedColor(element.style.color);
  const textAlign = parseTextAlign(element.style.textAlign);
  if (fontSize !== "" && fontSize !== "15px") {
    extraStyles += `font-size: ${fontSize};`;
  }
  if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
    extraStyles += `background-color: ${backgroundColor};`;
  }
  if (color !== "" && color !== "rgb(0, 0, 0)") {
    extraStyles += `color: ${color};`;
  }
  if (textAlign !== "" && textAlign !== "left") {
    extraStyles += `text-align: ${textAlign};`;
  }
  console.log("extraStyles", extraStyles);
  return extraStyles;
};

const constructImportMap = () => {
  const importMap = {};

  // Wrap all TextNode importers with a function that also imports
  // the custom styles implemented by the playground
  for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
    importMap[tag] = (importNode) => {
      const importer = fn(importNode);
      if (!importer) {
        return null;
      }
      return {
        ...importer,
        conversion: (element) => {
          const output = importer.conversion(element);
          if (
            output === null ||
            output.forChild === undefined ||
            output.after !== undefined ||
            output.node !== null
          ) {
            return output;
          }
          const extraStyles = getExtraStyles(element);
          if (extraStyles) {
            const { forChild } = output;
            return {
              ...output,
              forChild: (child, parent) => {
                const textNode = forChild(child, parent);
                if ($isTextNode(textNode)) {
                  textNode.setStyle(textNode.getStyle() + extraStyles);
                }
                return textNode;
              },
            };
          }
          return output;
        },
      };
    };
  }

  return importMap;
};

export default function Editor({
  editAble,
  htmlValue,
  editorState,
  setEditorState,
}) {
  const editorConfig = {
    namespace: "React.js Demo",
    nodes: [ParagraphNode, TextNode, ListItemNode, ListNode],
    onError(error) {
      throw error;
    },
    html: {
      export: exportMap,
      import: constructImportMap(),
    },
    theme: theme,
    editable: editAble,
    editorState: (editor) => {
      if (htmlValue) {
        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlValue, "text/html");
        const nodes = $generateNodesFromDOM(editor, dom);
        $getRoot().clear();
        $getRoot().select();
        $insertNodes(nodes);
      } else {
        // If no htmlValue is provided, set the initial state to an empty paragraph
        const root = $getRoot();
        root.clear();
        const paragraphNode = new ParagraphNode();
        root.append(paragraphNode);
        paragraphNode.select();
      }
    },
  };

  useEffect(() => {}, [editorState]);
  const placeholder = editAble ? "กรอก..." : "";

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        className={`mx-auto ${
          editAble ? "border border-blue-gray-200" : ""
        } !min-w-full text-black relative leading-5 font-normal text-left !rounded-lg`}
      >
        {editAble && <ToolbarPlugin />}
        <div className={`${editAble ? "editor-inner" : "editor-inner-no-bg"}`}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <MyOnChangePlugin onChange={setEditorState} value={editorState} />
        </div>
      </div>
    </LexicalComposer>
  );
}
