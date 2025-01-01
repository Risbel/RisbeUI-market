"use client";

import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import { extensions } from "@/app/components/editor/Editor";

const ProductJson = ({ content }: { content: string }) => {
  const editorContent = JSON.parse(content);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
    content: editorContent,
    editorProps: {
      attributes: {
        class: "focus:outline-none min-w-full min-h-[150px] prose prose-sm sm:prose-base space-y-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

export default ProductJson;
