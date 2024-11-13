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

import EditorExtensions from "./EditorExtensions";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { chatSession } from "@/config/AiModel";
const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);
const TextEditor = ({ fileId }) => {
  const SearchAi = useAction(api.myActions.search);
  const onAiClick = async () => {
    // const selectedText = editor.state.doc.tex tBetween(
    //   editor.state.selection.from,
    //   editor.state.selection.to,
    //   ' '
    // );
    console.log(fileId);
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
    const finalResult = AIGeneratedAnswer.response.text().replace('```',"").replace("html","").replace('```',"");
    // Filter the answer from result
    // const match = finalResult.match(/<p>(.*?)<\/p>/);
    // let finalAns = "";
    // if (match && match[1]) {
    //   finalAns = match[1];
    //   console.log(finalAns); // This will log the text between <p></p> tags
    // } else {
    //   console.log("No <p> tags found");
    // }
// Write answer on screen
    const text = editor.getHTML();
    editor.commands.setContent(text+'<p><strong>Answer:</strong>'+finalResult +'</p>')
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

  return (
    <div>
      <EditorExtensions editor={editor} selectedText={selectedText} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
