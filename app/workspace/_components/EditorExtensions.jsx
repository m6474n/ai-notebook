import { cn } from "@/lib/utils";

import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Highlighter, Italic, List, Strikethrough, Underline } from "lucide-react";
import React from "react";

export default function EditorExtensions({ editor }) {
  return (
    <div className="flex flex-row justify-start items-center p-4 gap-1 border-b-slate-200 border-b">
        <div className="control-group">
        <div className="button-group flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn("px-2 py-1 border border-transparent text-2xl",editor?.isActive('heading', { level: 1 }) ? 'is-active  bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn("px-2 py-1 border border-transparent text-xl",editor?.isActive('heading', { level: 2 }) ? 'is-active  bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn("px-2 py-1 border border-transparent text-lg",editor?.isActive('heading', { level: 3 }) ? 'is-active  bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            H3
          </button>
        </div>
      </div>
      <div className="control-group">
        <div className="button-group flex gap-1" >
        <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={cn("p-2 border border-transparent",editor?.isActive({ textAlign: 'left' }) ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            <AlignLeft/>
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('center').run()}
            className={cn("p-2 border border-transparent",editor?.isActive({ textAlign: 'center' }) ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            <AlignCenter/>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={cn("p-2 border border-transparent",editor?.isActive({ textAlign: 'right' }) ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            <AlignRight/>
          </button>
          <button
            onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
            className={cn("p-2 border border-transparent",editor?.isActive({ textAlign: 'justify' }) ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            <AlignJustify/>
          </button>
        </div>
      </div>
      <div className="control-group">
        <div className="button-group ">
        <button
            onClick={() => editor.chain().focus().toggleHighlight({ color: '#fff596' }).run()}
            className={cn("p-2 border border-transparent",editor?.isActive('highlight', { color: '#fff596' }) ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
           <Highlighter/>
          </button>
        </div>

      </div>
      <div className="control-group">
        <div className="button-group flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn("p-2 border border-transparent",editor?.isActive("bold") ? "is-active bg-slate-100 border border-slate-200 rounded-md" : "")}
            // className={editor.isActive("bold") ? "is-active bg-slate-200  rounded-md" : ""}
          >
            <Bold />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn("p-2 border border-transparent",editor?.isActive('italic') ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            <Italic/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={cn("p-2 border border-transparent",editor?.isActive('underline') ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            <Underline/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={cn("p-2 border border-transparent",editor?.isActive('strike') ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
           <Strikethrough/>
          </button>
        </div>
      </div>
      <div className="control-group">
        <div className="button-group">
        <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cn("p-2 border border-transparent",editor?.isActive('codeBlock') ? 'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
          
            <Code/>
          </button>
    </div>
    </div>
    <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn("p-2 border border-transparent",editor?.isActive('bulletList') ?'is-active bg-slate-100 border border-slate-200 rounded-md' : '')}
          >
            <List/>
          </button>
    </div>
    </div>
    </div>
  );
}
