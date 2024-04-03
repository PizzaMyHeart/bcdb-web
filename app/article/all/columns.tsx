"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { DataTableColumnHeader } from "@/components/column-header"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Article = {
  title: string
  comments: number
  date: string,
  article_id: string
}

export const columns: ColumnDef<Article>[] = [
    {
        accessorKey: "comments",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Comments" />
          ),
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Date" />
          ),
    },
    {
        accessorKey: "article_id",
        header: "",
        cell: (({row}) => {
            const article_id = row.getValue("article_id");
            return (
                <a href={`/article/${article_id}`}><ExternalLink/></a>
            )
        })
    }
    
]
