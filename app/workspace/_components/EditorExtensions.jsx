import { chatSession } from "@/config/AiModel";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  Italic,
  List,
  Sparkle,
  Sparkles,
  Strikethrough,
  Underline,
} from "lucide-react";
import React from "react";
import { toast } from "sonner"



export default function EditorExtensions({ editor, fileId }) {
const user = useUser();
const saveNotes = useMutation(api.notes.AddNotes);
const SearchAi = useAction(api.myActions.search);
const AiClick = async () => {
  toast("Fetching your answer....")
  const selectedText = editor.state.doc.textBetween(
    editor.state.selection.from,
    editor.state.selection.to,
    ' '
  );
  console.log(selectedText);
  const res = await SearchAi({ query: selectedText, fileId });
  let unformatted = JSON.parse(res);
  let unFormattedAnswer = "";
  unformatted &&
    unformatted.forEach(
      (item) => (unFormattedAnswer = unFormattedAnswer + item.pageContent)
    );

  console.log("Unstructured Response" + unFormattedAnswer);

  const PROMPT =
    "For the given question: " +
    selectedText +
    "and with the given content as answer, please give me appropriate answer in HTML format. The answer content is " +
    unFormattedAnswer;

  const AIGeneratedAnswer = await chatSession.sendMessage(PROMPT);

  console.log(AIGeneratedAnswer.response.text());
  let finalResult = AIGeneratedAnswer.response.text().replace('```', '').replace("html", "").replace('```', "");

  const bodyMatch = finalResult.match(/<body[^>]*>([\s\S]*?)<\/body>/);
  let bodyContent = bodyMatch ? bodyMatch[1].trim() : ''; // Extracting content inside <body>

  console.log("Extracted Body Content:", bodyContent);
  const text = editor.getHTML();
  editor.commands.setContent(text + '<p><strong>Result:</strong>' + bodyContent + '</p>');
const creator = user?.user?.primaryEmailAddress?.emailAddress
    saveNotes({
      fileId: fileId,
      notes: editor.getHTML(),
      createdBy: creator
    })

};


  return (
    <div className="flex flex-row justify-start items-center p-4 gap-1 border-b-slate-200 border-b">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          "px-2 py-1 border border-transparent text-2xl",
          editor?.isActive("heading", { level: 1 })
            ? "is-active  bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "px-2 py-1 border border-transparent text-xl",
          editor?.isActive("heading", { level: 2 })
            ? "is-active  bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          "px-2 py-1 border border-transparent text-lg",
          editor?.isActive("heading", { level: 3 })
            ? "is-active  bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        H3
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive({ textAlign: "left" })
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <AlignLeft />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive({ textAlign: "center" })
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <AlignCenter />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive({ textAlign: "right" })
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <AlignRight />
      </button>
      <button
        onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive({ textAlign: "justify" })
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <AlignJustify />
      </button>

      <button
        onClick={() =>
          editor.chain().focus().toggleHighlight({ color: "#fff596" }).run()
        }
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive("highlight", { color: "#fff596" })
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <Highlighter />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive("bold")
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
        // className={editor.isActive("bold") ? "is-active bg-slate-200  rounded-md" : ""}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive("italic")
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive("underline")
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <Underline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive("strike")
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <Strikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive("codeBlock")
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <Code />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "p-1 border border-transparent",
          editor?.isActive("bulletList")
            ? "is-active bg-slate-100 border border-slate-200 rounded-md"
            : ""
        )}
      >
        <List />
      </button>
      <button
        onClick={() => AiClick()}
        className={cn("p-1 border border-transparent hover:text-blue-500")}
      >
        <Sparkles />
      </button>
    </div>
  );
}
