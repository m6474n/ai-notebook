"use client";

import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Underline from "@tiptap/extension-underline";
import { all, createLowlight } from "lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import Strike from "@tiptap/extension-strike";
import { TextSelection } from "prosemirror-state";
import { toast } from "sonner"


import EditorExtensions from "./EditorExtensions";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { chatSession } from "@/config/AiModel";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
const TextEditor = ({ fileId }) => {
  const SearchAi = useAction(api.myActions.search);
  const saveNotes = useMutation(api.notes.AddNotes);
  const notes = useQuery(api.notes.GetNotes,{fileId:fileId});
  const user = useUser()
  console.log(notes)

  const onAiClick = async () => {
    toast("Fetching your answer....")
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
    const finalResult = AIGeneratedAnswer.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");

    const bodyMatch = finalResult.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    let bodyContent = bodyMatch ? bodyMatch[1].trim() : ""; // Extracting content inside <body>

    console.log("Extracted Body Content:", bodyContent);
    const text = editor.getHTML();
    editor.commands.setContent(
      text + "<p><strong>Result:</strong>" + bodyContent + "</p>"
    );
    console.log("user is : "+user.user.primaryEmailAddress?.emailAddress);
    const creator = user.user.primaryEmailAddress?.emailAddress;
    saveNotes({fileId:fileId, createdBy:creator,notes:editor.getHTML()})
  };
  let selectedText = "";
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Strike,
      Heading,
      Underline,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      BulletList.configure({
        keepMarks: true,
      }),
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Type Anything...",
      }),
      Highlight.configure({ multicolor: true }),
    ],
    onUpdate({ editor }) {
      const doc = editor.state.doc;
      // console.log(doc.textContent[doc.textContent.length -1])

      const lastChar = doc.textContent[doc.textContent.length - 1];

      if (lastChar === "?") {
        const selection = doc.textBetween(0, doc.textContent.length); // Select everything from start to the end

        selectedText = selection;

        onAiClick();
      }
    },

    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-5",
      },
    },
  });




useEffect(()=>{
  editor&&editor.commands.setContent(notes);
},[editor&&notes])

  return (
    <div>
      <EditorExtensions
        editor={editor}
        selectedText={selectedText}
        fileId={fileId}
      />
      <div className="overflow-scroll h-[86vh]">
        <EditorContent editor={editor} />
      </div>{" "}
    </div>
  );
};

export default TextEditor;
