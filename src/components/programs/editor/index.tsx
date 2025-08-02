// src/Tiptap.tsx
import { EditorProvider } from '@tiptap/react';
import { FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';

// define your extension array
const extensions = [StarterKit];

const content = '<p>Hello TipTap editor!</p>';

const Editor = () => {
  return (
    <EditorProvider extensions={extensions} content={content}>
      <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
      {/* <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu> */}
    </EditorProvider>
  );
};

export default Editor;
