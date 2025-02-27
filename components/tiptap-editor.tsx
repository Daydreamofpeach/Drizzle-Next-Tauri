import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useCallback, useEffect, useState } from "react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  UnlinkIcon,
} from "lucide-react";
import "@/styles/tiptap-editor.css";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

// load all languages with "all" or common languages with "common"
import { common, createLowlight } from "lowlight";

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(common);

// This is only an example, all supported languages are already loaded above
// but you can also register only specific languages to reduce bundle-size
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export const TiptapEditor = ({
  html,
  name,
}: {
  html: string;
  name: string;
}) => {
  const [editorContent, setEditorContent] = useState(html);

  const editor = useEditor({
    extensions: [
      Image,
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({ lowlight }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link,
    ],
    content: html,
    immediatelyRender: false,
  });

  const setLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      // @ts-expect-error err
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.on("update", ({ editor }) => {
      const html = editor.getHTML(); // Get content as HTML
      console.log(html);
      setEditorContent(editor.getHTML());
    });
  }, [editor]);

  if (!editor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-gray-300 dark:border-gray-700 p-0">
      {/* Toolbar */}
      <div className="flex gap-2 border-b border-gray-300 dark:border-gray-700 pl-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <BoldIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <ItalicIcon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <Heading1Icon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <Heading2Icon />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <Heading3Icon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <AlignLeftIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <AlignCenterIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <AlignRightIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <ListIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <ListOrderedIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={
            editor.isActive("code")
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <CodeIcon />
        </button>
        <button
          type="button"
          onClick={addImage}
          className="bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
        >
          <ImageIcon />
        </button>
        <button
          type="button"
          onClick={setLink}
          className={
            editor.isActive("link")
              ? "bg-gray-200 text-black dark:bg-gray-900 dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
              : "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500"
          }
        >
          <LinkIcon />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive("link")}
          className={
            "bg-white text-black dark:bg-black dark:text-white disabled:text-gray-500 dark:disabled:text-gray-500 disabled:bg-white"
          }
        >
          <UnlinkIcon />
        </button>
      </div>

      <div className="p-3">
        <EditorContent editor={editor} />
      </div>

      <input type="hidden" name={name} value={editorContent} />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/a11y-dark.min.css"
      />
    </div>
  );
};
