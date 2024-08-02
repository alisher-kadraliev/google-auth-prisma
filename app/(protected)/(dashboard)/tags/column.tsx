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
import DropActions from "./components/drop-actions"


export type Tag = {
    id: string;
    title: string;
    slug: string | null;
    image: string | null;
    imageAlt: string | null;
}

export const columns: ColumnDef<Tag>[] = [

    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
    },
    {
        accessorKey: "slug",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="slug" />
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const blogs = row.original

            return (
                <DropActions row={row} />
            )
        },
    },
]
