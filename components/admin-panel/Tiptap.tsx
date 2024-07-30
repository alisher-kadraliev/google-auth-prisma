'use client'
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'


const Tiptap: React.FC<{ onChange: (content: any) => void; initialContent?: any }> = ({ onChange, initialContent }) => {
    const editor = useEditor({
        extensions: [Document, Paragraph, Text],
        content: initialContent,
        onUpdate({ editor }) {
            onChange(editor.getJSON());
        },
        immediatelyRender: false,

    });

    return <EditorContent editor={editor} />;
};


export default Tiptap
