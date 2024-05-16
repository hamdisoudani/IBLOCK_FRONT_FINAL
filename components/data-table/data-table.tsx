"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"
import {
    Column,
    ColumnDef,
    ColumnFiltersState,
    RowData,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
    getExpandedRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getGroupedRowModel,
    SortingState,
    VisibilityState,
  } from '@tanstack/react-table'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
  } from "@/components/ui/dropdown-menu"
  import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../ui/checkbox";

type Robot = {
    name: string;
    model: string;
    status: string;
    lastConnection: string;
    isAvailable: boolean;
}
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

function DataTable<TData, TValue>({
    columns,
    data,
  }: DataTableProps<TData, TValue>) {
    
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
      []
    )
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})


    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable({
      columns: columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getFacetedMinMaxValues: getFacetedMinMaxValues(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      getFilteredRowModel: getFilteredRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
      state: {
        sorting, columnFilters,columnVisibility,
      },
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
  })
   
    return (
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter by name..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
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
    )
}



export default function DataTablePage() {
    

    const columns: ColumnDef<Robot>[] = [
        {
          id: "actions",
          cell: ({ row }) => {
            const robot = row.original
      
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
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(robot.name)}
                  >
                    Copy Robot name
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>View customer</DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
        {
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
            accessorKey: 'name',
            id: 'name',
        },
        {
            header: 'Model',
            accessorKey: 'model',
            id: 'model',
        },
        {
            header: 'Status',
            accessorKey: 'status',
            id: 'status',
        },
        {
            header: 'Last Connection',
            accessorKey: 'lastConnection',
            id: 'lastConnection',
        },
        {
            header: 'Available',
            accessorKey: 'isAvailable',
            id: 'isAvailable',
        },
        {
          id: "select",
          header: ({ table }) => (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ),
          enableSorting: false,
          enableHiding: false,
        },
    ]

    const availableData: Robot[] = [
        {
            name: 'Robot 1',
            model: 'Model 1',
            status: 'Active',
            lastConnection: '2021-08-01',
            isAvailable: true,
        },
        {
            name: 'Robot 2',
            model: 'Model 2',
            status: 'Inactive',
            lastConnection: '2021-08-02',
            isAvailable: false,
        },
        {
            name: 'Robot 3',
            model: 'Model 3',
            status: 'Active',
            lastConnection: '2021-08-03',
            isAvailable: true,
        },
        {
            name: 'Robot 4',
            model: 'Model 4',
            status: 'Inactive',
            lastConnection: '2021-08-04',
            isAvailable: false,
        },
        {
          name: 'Robot 4',
          model: 'Model 4',
          status: 'Inactive',
          lastConnection: '2021-08-04',
          isAvailable: false,
        },
        {
          name: 'Robot 4',
          model: 'Model 4',
          status: 'Inactive',
          lastConnection: '2021-08-04',
          isAvailable: false,
        },
        {
        name: 'Robot 4',
        model: 'Model 4',
        status: 'Inactive',
        lastConnection: '2021-08-04',
        isAvailable: false,
        },
        {
          name: 'Robot 4',
          model: 'Model 4',
          status: 'Inactive',
          lastConnection: '2021-08-04',
          isAvailable: false,
        },
        {
        name: 'Robot 4',
        model: 'Model 4',
        status: 'Inactive',
        lastConnection: '2021-08-04',
        isAvailable: false,
        },
        {
          name: 'Robot 4',
          model: 'Model 4',
          status: 'Inactive',
          lastConnection: '2021-08-04',
          isAvailable: false,
        },
        {
        name: 'Robot 4',
        model: 'Model 4',
        status: 'Inactive',
        lastConnection: '2021-08-04',
        isAvailable: false,
        },
        {
          name: 'Robot 4',
          model: 'Model 4',
          status: 'Inactive',
          lastConnection: '2021-08-04',
          isAvailable: false,
        },
  ]

    

    return (
        <DataTable columns={columns} data={availableData} />
    )
}