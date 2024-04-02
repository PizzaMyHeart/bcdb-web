"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Article = {
  title: string
  comments: number
  date: string
}

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "date",
    header: "Date"
  }
]
