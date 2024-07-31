// components/Tiptap.tsx
"use client";

import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from './ui/button';
import Dropcursor from '@tiptap/extension-dropcursor'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import ListKeymap from '@tiptap/extension-list-keymap'
import { Bold, Italic, Underline } from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

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
]
const Tiptap: React.FC<{ onChange?: (content: any) => void; editable: boolean; initialContent?: any }> = ({ onChange, initialContent, editable }) => {
    const editor = useEditor({
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: "test-d p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] focus:border-none focus:ring-0 focus:outline-none focus:boder-0"
            }
        },

        extensions: extensions,
        content: initialContent,
        editable,
        onUpdate({ editor }) {
            if (onChange) {
                onChange(editor.getJSON());
            }
        },
    });
    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editable, editor]);

    if (!editor) {
        return null
    }
    return (
        <>
            {editor &&
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="bubble-menu">
                        <div className="control-group">
                            <div className="button-group absolute bg-white shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] p-2 bottom-[-90px!important] left-0">
                                <ToggleGroup variant="outline" className="flex items-start justify-start" type="multiple">
                                    <ToggleGroupItem value="bold" aria-label="Toggle bold"
                                        onClick={() => editor.chain().focus().toggleBold().run()}
                                        disabled={
                                            !editor.can()
                                                .chain()
                                                .focus()
                                                .toggleBold()
                                                .run()
                                        }>
                                        <Bold className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                                        <Italic className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="underline" aria-label="Toggle underline">
                                        <Underline className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>

                            </div>
                        </div>
                    </div>
                </BubbleMenu>}
            {editable &&
                <div className="button-group mb-10 border rounded-xl p-3 sticky top-0">
                    <Button type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={
                            !editor.can()
                                .chain()
                                .focus()
                                .toggleBold()
                                .run()
                        }
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </Button>
                </div>
            }
            <EditorContent editor={editor} />
        </>
    )
};

export default Tiptap;
