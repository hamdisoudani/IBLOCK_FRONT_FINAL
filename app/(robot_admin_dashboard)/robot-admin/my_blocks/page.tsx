"use client";
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import DataTablePage from '@/components/data-table/data-table';
import { CiCirclePlus } from 'react-icons/ci';
import axiosInstance from '@/plugins/axios';
import { DataTable } from '@/components/data-robot-table/data-robot-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
  } from "@/components/ui/dropdown-menu"
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@radix-ui/react-checkbox';
import "to-color-string";

interface Blocks {
    _id:      string;
    name:     string;
    owner:    Owner;
    category: Category | null;
    createdAt: string;
    updatedAt: string;
}

interface Category {
    name: string;
}

interface Owner {
    _id:   string;
    email: string;
    name:  string;
    role:  string;
}
export default function MyBlocksComponent() {
    const [blocksData, setBlocksData] = useState<Blocks[]>([]);
    const [fetching, setFetching] = useState(true);
    const columns: ColumnDef<Blocks>[] = [
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
                Block type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
            accessorKey: 'name',
            id: 'name',
        },
        {
            header: 'Owner',
            accessorKey: 'owner.name',
            id: 'owner',
        },
        {
            header: 'Created At',
            accessorKey: 'createdAt',
            id: 'created_at',
            cell: ({ getValue }) => {
                const value: any = getValue();
                return value.split('T')[0];

            }
        },
        {
            header: 'Updated At',
            accessorKey: 'updatedAt',
            id: 'updated_at',
            cell: ({ getValue }) => {
                const value: any = getValue();
                return value.split('T')[0];
            }
        },
        {
            header: 'category',
            accessorKey: 'category',
            id: 'category',
            cell: ({ getValue }) => {
                const value: any = getValue();
                return (
                    <span className={`text-[${value.toColorString()}]`}>{value}</span>
                );
            }
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
    useEffect(() => {
        const getBlocksData = async () => { 
            await axiosInstance.get('/blocks').then((response) => {
                console.log(response.data.blocks)
                setBlocksData(response.data.blocks);
            }).catch((error) => {
                console.log(error);
            }).finally(() => {  
                setFetching(false);
            });
        }
        getBlocksData();
    }, [])
    return (
        <div className="flex w-full h-full">
            
            
            <div className="w-full h-full overflow-auto">
                    <div className="flex items-center justify-between flex-wrap mb-4 sm:hidden">
                        
                    <Button variant="outline">
                        <Link href="/robot-admin/my_blocks/create_block" className='flex'>
                        <CiCirclePlus  className="h-5 w-5 mr-2" />   
                        <span>Add block</span>
                        </Link>
                    </Button>
                    </div>
                    <div className="hidden items-center justify-between flex-wrap mb-4 sm:flex">
                        <div className='flex-1'>
                            &nbsp;
                        </div>
                        <div className='flex items-center'>
                        
                        <Button variant="outline">
                            <Link href="/robot-admin/my_blocks/create_block" className='flex'>
                            <CiCirclePlus  className="h-5 w-5 mr-2" />   
                            <span>Add block</span>
                            </Link>
                        </Button>
                        </div>
                    </div>
                    <DataTable columns={columns} data={blocksData} />
            </div>
            
            

        </div>
    );
}






