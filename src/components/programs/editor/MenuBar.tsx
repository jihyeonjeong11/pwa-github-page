import { useEditorState, type Editor } from "@tiptap/react";

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Code,
  Code2Icon,
  Pilcrow,
  Eraser,
  QuoteIcon,
  StrikethroughIcon,
  MoveHorizontal,
  Redo,
  Undo,
} from "lucide-react";

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div className="control-group">
      <div className="button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={editorState.isBold ? "is-active" : ""}
        >
          <Bold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={editorState.isItalic ? "is-active" : ""}
        >
          <Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={editorState.isStrike ? "is-active" : ""}
        >
          <StrikethroughIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={editorState.isCode ? "is-active" : ""}
        >
          <Code />
        </button>
        {/* <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button> */}
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          <Eraser />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : ""}
        >
          <Pilcrow />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          <Heading1 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          <Heading2 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          <Heading3 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? "is-active" : ""}
        >
          <Heading4 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? "is-active" : ""}
        >
          <Heading5 />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState.isHeading6 ? "is-active" : ""}
        >
          <Heading6 />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editorState.isBulletList ? "is-active" : ""}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editorState.isOrderedList ? "is-active" : ""}
        >
          <ListOrdered />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editorState.isCodeBlock ? "is-active" : ""}
        >
          <Code2Icon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        >
          <QuoteIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <MoveHorizontal />
        </button>
        {/* <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button> */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          <Undo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          <Redo />
        </button>
      </div>
    </div>
  );
}

export default MenuBar;
