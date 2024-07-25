"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { DataTableColumnHeader } from "@/components/table/dataTableColumnHeader"

export type Blogs = {
    id: string;
    title: string;
    content: string;
    slug: string | null;
    published: boolean;
    authorId: string;
    likes: number | null;
    readingTime: number | null;
    image: string | null;
    imageAlt: string | null;
    status: "progress" | "completed";
    watched: number | null;
    createdAt: Date;
    updatedAt: Date;
}

export const columns: ColumnDef<Blogs>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: "published",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Published" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blogs = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`/blogs/${row.original.slug}`}>
                            <DropdownMenuItem >
                                View Details
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
