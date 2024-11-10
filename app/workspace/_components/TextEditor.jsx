'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import ListItem from '@tiptap/extension-list-item'
import BulletList from '@tiptap/extension-bullet-list'
import Underline from '@tiptap/extension-underline'
import { all, createLowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import Strike from '@tiptap/extension-strike'




import EditorExtensions from './EditorExtensions'
const lowlight = createLowlight(all)


lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)
const TextEditor = () => {
  const editor = useEditor({  
    extensions: [StarterKit,
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

      }), ListItem,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
        Placeholder.configure({
            placeholder:"Type Anything..."
        }),
        Highlight.configure({ multicolor: true })
    ],
   
    editorProps:{
        attributes:{
            class:'focus:outline-none h-screen p-5'
        }
    }
  })

  return (
    <div>
        <EditorExtensions editor={editor}/>
        <EditorContent editor={editor} />
    </div>
  )
}

export default TextEditor
