"use client";

import { Button } from "@/components/ui/button";
import { Color } from "@tiptap/extension-color";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import {
  ArrowDown,
  Bold,
  Code2Icon,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrderedIcon,
  LucideHighlighter,
  QuoteIcon,
  AlignCenter,
  StepBack,
  StrikethroughIcon,
  Undo,
  AlignLeft,
  ParkingSquare,
  ALargeSmallIcon,
} from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="space-x-2"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant={editor.isActive("paragraph") ? "default" : "secondary"}
      >
        P
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "secondary"}
      >
        <Heading1 className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "secondary"}
      >
        <Heading2 className="size-4" />{" "}
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={editor.isActive("heading", { level: 3 }) ? "default" : "secondary"}
      >
        <Heading3 className="size-4" />
      </Button>

      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        variant={editor.isActive("bold") ? "default" : "secondary"}
      >
        <Bold className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        variant={editor.isActive("italic") ? "default" : "secondary"}
      >
        <Italic className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        variant={editor.isActive("strike") ? "default" : "secondary"}
      >
        <StrikethroughIcon className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        variant={editor.isActive("code") ? "default" : "secondary"}
      >
        <Code2Icon className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        variant={editor.isActive("code") ? "default" : "secondary"}
      >
        <LucideHighlighter className="size-4" />
      </Button>

      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant={editor.isActive("bulletList") ? "default" : "secondary"}
      >
        <List className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant={editor.isActive("orderedList") ? "default" : "secondary"}
      >
        <ListOrderedIcon className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant={editor.isActive("codeBlock") ? "default" : "secondary"}
      >
        <Code2Icon className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant={editor.isActive("blockquote") ? "default" : "secondary"}
      >
        <QuoteIcon className="size-4" />
      </Button>

      <Button variant="outline" type="button" onClick={() => editor.chain().focus().setHardBreak().run()}>
        Break <ArrowDown className="size-4" />
      </Button>

      <Button
        type="button"
        size="sm"
        variant="outline"
        className="space-x-2"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="size-4" />
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="space-x-2"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="size-4" />
      </Button>
      <Input
        type="color"
        className={cn("max-w-16")}
        onChange={(event) => editor.chain().focus().setColor(event.target.value).run()}
        value={editor.getAttributes("textStyle").color}
        data-testid="setColor"
      />
      <Button
        type="button"
        size="sm"
        onClick={() => editor.chain().focus().setColor("#4332ff").run()}
        className={cn(editor.isActive("textStyle", { color: "#4332ff" }) ? "bg-blue-600" : "bg-blue-600/40")}
        data-testid="setBlue"
      >
        Blue
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().setColor("#000000").run()}
        className={cn(
          editor.isActive("textStyle", { color: "#000000" }) ? "bg-black text-white" : "bg-black/40 text-secondary"
        )}
        data-testid="setBlack"
      >
        Black
      </Button>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,
  TextStyle,
  Color,
  TaskList.configure({
    HTMLAttributes: {
      class: "not-prose pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "flex items-start my-4",
    },
    nested: true,
  }),
];
const TipTapEditor = () => {
  const editor = useEditor({
    extensions: extensions,
    content: "<p> Hello World. </p>",
    editorProps: {
      attributes: {
        class: "focus:outline-none min-w-full min-h-[150px] prose prose-sm sm:prose-base",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="rounded-lg border p-2 min-h-[150px] mt-2" />
    </div>
  );
};

export default TipTapEditor;
