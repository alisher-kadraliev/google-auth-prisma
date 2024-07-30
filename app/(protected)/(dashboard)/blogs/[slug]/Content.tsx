"use client"
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
interface PostProps {
    content: string;
}
const ContentPage = ({ content }: PostProps) => {
    const editor = useEditor({
        content: JSON.parse(content),
        extensions: [StarterKit],
        immediatelyRender: false,
    })

    return (
        <>
            <EditorContent editor={editor} />
        </>
    )
}
export default ContentPage