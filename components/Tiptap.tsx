"use client";

import React, { useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from './ui/button';
import { Color } from '@tiptap/extension-color'
import { Bold, Italic, Underline, List } from "lucide-react"
import Image from '@tiptap/extension-image'
import TextStyle from '@tiptap/extension-text-style'
import ListItem from '@tiptap/extension-list-item'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Heading1, FileImage, Strikethrough, AlignLeft, AlignRight, AlignCenter, AlignJustify, Table } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'

const limit = 600

const extensions = [
    CharacterCount.configure({
        limit,
    }),
    Placeholder.configure({
        placeholder: () => {
            return 'Can you add some further context?'
        },
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure(),
    Image,
    Highlight,
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
                class: `prose p-9 focus:border-none focus:ring-0 focus:outline-none focus:boder-0 ${editable && "shadow-[0_8px_30px_rgb(0,0,0,0.12)] test-d "} `
            }
        },

        extensions: extensions,
        content: initialContent || "start typing here...",
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

    const addImage = () => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }
    const percentage = editor
        ? Math.round((100 / limit) * editor.storage.characterCount.characters())
        : 0


    return (
        <>
            {editor &&
                <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                    <div className="bubble-menu">
                        <div className="control-group">
                            <div className="button-group absolute bg-white shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] p-2 bottom-[-100px!important] left-0">
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
                                    <ToggleGroupItem onClick={() => editor.chain().focus().toggleItalic().run()}
                                        disabled={
                                            !editor.can()
                                                .chain()
                                                .focus()
                                                .toggleItalic()
                                                .run()
                                        }
                                        className={editor.isActive('italic') ? 'is-active' : ''} value="italic" aria-label="Toggle italic">
                                        <Italic className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem onClick={() => editor.chain().focus().toggleStrike().run()}
                                        disabled={
                                            !editor.can()
                                                .chain()
                                                .focus()
                                                .toggleStrike()
                                                .run()
                                        }
                                        className={editor.isActive('strike') ? 'is-active' : ''} value="strike" aria-label="strike">
                                        <Strikethrough className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''} value="alignl" aria-label="alignl">
                                        <AlignLeft className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''} value="alignc" aria-label="alignc">
                                        <AlignCenter className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''} value="alignr" aria-label="alignr">
                                        <AlignRight className="h-4 w-4" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''} value="highlight" aria-label="highlight">
                                        <AlignRight className="h-4 w-4" />
                                    </ToggleGroupItem>
                                </ToggleGroup>

                            </div>
                        </div>
                    </div>
                </BubbleMenu>}
            {editable &&

                <div className="button-group mb-10 rounded-xl p-3 sticky top-0">

                    <ToggleGroup variant="outline" className="flex" type="multiple">
                        <Popover>
                            <PopoverTrigger>
                                <Button type='button' variant="outline"><Heading1 /></Button>
                            </PopoverTrigger>
                            <PopoverContent className='flex gap-4'>
                                <ToggleGroupItem value="h1" aria-label="h1s"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                                    disabled={
                                        !editor.can()
                                            .chain()
                                            .focus()
                                            .toggleBold()
                                            .run()
                                    }>
                                    H1
                                </ToggleGroupItem>
                                <ToggleGroupItem value="h2" aria-label="h2s"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                                    disabled={
                                        !editor.can()
                                            .chain()
                                            .focus()
                                            .toggleBold()
                                            .run()
                                    }>
                                    H2
                                </ToggleGroupItem>
                                <ToggleGroupItem value="h3" aria-label="h3s"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                                    disabled={
                                        !editor.can()
                                            .chain()
                                            .focus()
                                            .toggleBold()
                                            .run()
                                    }>
                                    H3
                                </ToggleGroupItem>
                                <ToggleGroupItem value="h4" aria-label="h4s"
                                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                                    disabled={
                                        !editor.can()
                                            .chain()
                                            .focus()
                                            .toggleBold()
                                            .run()
                                    }>
                                    H4
                                </ToggleGroupItem>
                            </PopoverContent>
                        </Popover>

                        <Button variant={"outline"} type="button"
                            onClick={addImage}
                        >
                            <FileImage />
                        </Button>
                        <ToggleGroupItem onClick={() => editor.chain().focus().toggleBulletList().run()}
                            className={editor.isActive('bulletList') ? 'is-active' : ''}
                            value="bullet" aria-label="">
                            <List className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            className={editor.isActive('orderedList') ? 'is-active' : ''}
                            value="numb" aria-label="">
                            <AlignJustify className="h-4 w-4" />
                        </ToggleGroupItem>

                    </ToggleGroup>


                </div>
            }
            <EditorContent editor={editor} />

            <div className="button-group mb-10 rounded-xl p-3 sticky top-0">
                <div className={`character-count ${editor.storage.characterCount.characters() === limit ? 'character-count--warning' : ''}`}>
                    <svg
                        height="20"
                        width="20"
                        viewBox="0 0 20 20"
                    >
                        <circle
                            r="10"
                            cx="10"
                            cy="10"
                            fill="#e9ecef"
                        />
                        <circle
                            r="5"
                            cx="10"
                            cy="10"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="10"
                            strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                            transform="rotate(-90) translate(-20)"
                        />
                        <circle
                            r="6"
                            cx="10"
                            cy="10"
                            fill="white"
                        />
                    </svg>

                    {editor.storage.characterCount.characters()} / {limit} characters <div className='text-muted-foreground'>for medium post ideal (600-1200) characters</div>
                </div>
            </div>
        </>
    )
};

export default Tiptap;
