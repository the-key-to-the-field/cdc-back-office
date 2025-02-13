"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { ListItem } from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import { useState } from "react";

import PreviewModal from "../PreviewModal";
import Toolbar from "../toolbar/Toolbar";

export default function TipTapEditor({
  onContentChange,
  content,
}: {
  onContentChange: (content: string) => void;
  content: string;
}) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState("");

  const handleContentChange = (content: string) => {
    onContentChange(content);
  };
  const editor = useEditor({
    content: content,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize,
      ListItem.configure({
        HTMLAttributes: {
          class: "list-item",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-4",
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: "border-l-4 border-gray-300 pl-4 my-4",
        },
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none p-4",
      },
    },
    onUpdate: ({ editor }) => {
      handleContentChange(editor.getHTML());
    },
  });

  const handlePreview = () => {
    if (editor) {
      setPreviewContent(editor.getHTML());
      setIsPreviewOpen(true);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg">
      <Toolbar editor={editor} onPreviewClick={handlePreview} />
      <EditorContent
        className="px-4 py-3 min-h-[300px] [&_.is-editor-empty]:before:content-[attr(data-placeholder)] [&_.is-editor-empty]:before:text-gray-400 [&_.is-editor-empty]:before:float-left [&_.is-editor-empty]:before:pointer-events-none [&_h1]:text-4xl [&_h1]:font-bold [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:text-2xl [&_h3]:font-bold [&_h4]:text-xl [&_h4]:font-bold [&_h5]:text-lg [&_h5]:font-bold [&_h6]:font-bold"
        editor={editor}
      />
      <PreviewModal
        content={previewContent}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
}
