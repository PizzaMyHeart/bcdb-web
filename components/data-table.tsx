import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';

//example data type
type Article = {
    title: string
    comments: number
    date: string,
    article_id: string
};


export default function Table(data: Article[]): JSX.Element {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Article>[]>(
    () => [
      {
        accessorKey: "comments",
        header: "Comments",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "Date",
        header: "date",
      }
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};


