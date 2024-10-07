'use client';

import { cn } from '@/lib/utils';
import { Article } from '@/types';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { Suspense, useMemo, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function ArticleTable({ data }: { data: Article[] }) {
  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns = useMemo<ColumnDef<Article>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: '_id',
        isHidden: true,
      },
      {
        header: 'Title',
        accessorKey: 'title',
        cell: ({ row }) => (
          <div className="flex flex-col space-y-1.5">
            <p className="font-medium">{row.original.title}</p>
            <p className="text-sm text-gray-500">{row.original.publisher}</p>
          </div>
        ),
      },
      {
        header: 'Author',
        accessorKey: 'author',
      },
      {
        header: 'Journal',
        accessorKey: 'journal',
      },
      {
        header: 'Year',
        accessorKey: 'year',
      },
      {
        header: 'Source',
        accessorKey: 'doi',
      },
      {
        header: 'Rating',
        accessorKey: 'rating',
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row._id,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    initialState: {
      columnVisibility: {
        id: false,
      },
    },
  });

  return (
    <>
      <div className="flex justify-center items-start bg-[#8D8D8D] p-8">
        <div className="bg-gray-100 p-8 rounded shadow-md w-full">
          <h2 className=" text-2xl text-black mb-4 w-full text-start border-b border-black pb-2">
            Articles
          </h2>
          <div className="flex flex-row justify-between gap-4">
            <Input
              placeholder="Search title..."
              value={table.getColumn('author')?.getFilterValue() as string}
              onChange={(event) =>
                table.getColumn('author')?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
            <Button>Search</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-8">
        <Suspense>
          <div className="w-full">
            <div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id} className="text-nowrap">
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          className="cursor-pointer"
                          data-state={row.getIsSelected() && 'selected'}
                          onClick={() => {
                            row.toggleSelected();
                            if (row.getIsSelected()) {
                              router.push('/articles', { scroll: false });
                            } else {
                              router.push(`/articles/${row.original._id}`, {
                                scroll: false,
                              });
                            }
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div
                className={cn(
                  'flex items-center justify-end space-x-2 py-4',
                  table.getPageCount() < 2 && 'hidden',
                )}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
}