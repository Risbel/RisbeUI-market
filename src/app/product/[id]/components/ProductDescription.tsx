"use client";

import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import { extensions } from "@/app/components/editor/Editor";

const ProductDescription = ({ content }: { content: string }) => {
  const editorContent = JSON.parse(content);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
    content: editorContent,
    editorProps: {
      attributes: {
        class: "w-full",
      },
    },
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
};

export default ProductDescription;
