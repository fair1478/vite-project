import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  Bars3BottomLeftIcon,
  Bars3Icon,
  Bars3BottomRightIcon,
  ListBulletIcon,
  NumberedListIcon,
} from "@heroicons/react/20/solid";
import centerAlign from "/center-align.png";
import {
  $isListNode,
  REMOVE_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));

      if ($isListNode(selection.anchor.getNode())) {
        const topLevelElement = selection.anchor
          .getNode()
          .getTopLevelElementOrThrow();
        setIsUnorderedList(
          $isListNode(topLevelElement) && topLevelElement.__tag === "ul"
        );
        setIsOrderedList(
          $isListNode(topLevelElement) && topLevelElement.__tag === "ol"
        );
      }
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const handleListCommand = (command) => {
    const checkType = (node) => {
      if (
        node.__tag === (command === INSERT_ORDERED_LIST_COMMAND ? "ol" : "ul")
      ) {
        return true;
      }
      return false;
    };

    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchorNode = selection.anchor.getNode();
        const focusNode = selection.focus.getNode();
        const isList =
          $isListNode(anchorNode.getTopLevelElementOrThrow()) ||
          $isListNode(focusNode.getTopLevelElementOrThrow());
        const isSameList =
          checkType(anchorNode.getTopLevelElementOrThrow()) ||
          checkType(focusNode.getTopLevelElementOrThrow());
        if (isList && isSameList) {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        } else {
          editor.dispatchCommand(command, undefined);
        }
      }
    });
  };

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        type="button"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <ArrowUturnLeftIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <ArrowUturnRightIcon className="h-4 w-4" />
      </button>
      <Divider />
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <BoldIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <ItalicIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <StrikethroughIcon className="h-4 w-4" />
      </button>
      <Divider />
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <Bars3BottomLeftIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className="toolbar-item spaced"
        aria-label="Center Align"
      >
        <img src={centerAlign} className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className="toolbar-item spaced"
        aria-label="Right Align"
      >
        <Bars3BottomRightIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className="toolbar-item"
        aria-label="Justify Align"
      >
        <Bars3Icon className="h-4 w-4" />
      </button>
      <Divider />
      <button
        type="button"
        onClick={() => {
          handleListCommand(INSERT_UNORDERED_LIST_COMMAND);
        }}
        className={"toolbar-item spaced " + (isUnorderedList ? "active" : "")}
        aria-label="Unordered List"
      >
        <ListBulletIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          handleListCommand(INSERT_ORDERED_LIST_COMMAND);
        }}
        className={"toolbar-item spaced " + (isOrderedList ? "active" : "")}
        aria-label="Ordered List"
      >
        <NumberedListIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Remove List"
      >
        <Bars3Icon className="h-4 w-4" />
      </button>
    </div>
  );
}
