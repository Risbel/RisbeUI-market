"use client";

import { EditorContent, type JSONContent, useEditor } from "@tiptap/react";
import { extensions } from "@/app/components/editor/Editor";

const ProductDescription = ({ content }: { content: JSONContent }) => {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: extensions,
    content: content,
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
