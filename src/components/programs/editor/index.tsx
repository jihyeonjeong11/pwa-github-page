import { EditorContext, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import MenuBar from "./MenuBar";

const EditorPage = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: { class: "h-full  text-black" },
    },
  });

  const providerValue = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={providerValue}>
      <MenuBar editor={editor} />
      <EditorContent
        className="overflow-y-scroll h-[calc(100%-60px)] bg-white"
        editor={editor}
      />
    </EditorContext.Provider>
  );
};

export default EditorPage;
