"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, BlocksIcon, BotIcon } from "lucide-react"
import { useEffect, useState } from "react";
import axiosInstance from "@/plugins/axios";
import { RecentUsersEntity, SuperAdminGlobalStatsType } from "@/lib/types/super_admin_dashboard/global_stats.types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "@/components/data-table/data-table";


export default function AdminDashboard() {
    const [globalStats, setGlobalStats] = useState<SuperAdminGlobalStatsType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [forbidden, setForbidden] = useState<boolean>(false);

    const columns: ColumnDef<RecentUsersEntity>[] = [
        {
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
          },
            accessorKey: 'name',
            id: 'name',
        },
        {
            header: 'Email',
            accessorKey: 'email',
            id: 'email',
        },
        {
            header: 'Role',
            accessorKey: 'role',
            id: 'role',
            cell: ({ getValue }) => {
                const value: any = getValue();
                return (
                    <span>{value}</span>
                );
            }
        },
        {
            header: 'Created At',
            accessorKey: 'createdAt',
            id: 'createdAt',
            cell: ({ getValue }) => {
                const dateValue = getValue(); // Get the value from getValue()
              
                // Check if the value is a string before creating a Date object
                const date = typeof dateValue === 'string' ? new Date(dateValue) : new Date(); 
              
                
                return typeof dateValue === 'string' 
                  ? new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date)
                  : 'Invalid Date'; // Handle cases where the date is not valid
              },
        },
      {
        header: "Action",
        accessorKey: '_id',
        id: '_id',
        cell: ({ getValue }) => {
            const value: any = getValue();
            return (
                <Button asChild>
                  <Link href={`/super-admin/users/${value}`}>View User</Link>
                </Button>
            );
        }
    },
    ]
    useEffect(() => {
        const getUsers = async () => {
            await axiosInstance.get('/super-admin/global_stats')
            .then((res) => {
                if(res.data){
                    setGlobalStats(res.data);
                }
            })
            .catch((err) => {
                setForbidden(true);
            })
            .finally(() => {
                setLoading(false);
            })
        };

        getUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    if (forbidden) {
        return <div>Forbidden</div>
    }
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Admin</CardTitle>
                <BotIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{globalStats?.totalAdmins}</div>
                
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total School</CardTitle>
                <BotIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{globalStats?.totalSchools}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total project</CardTitle>
                <BlocksIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{globalStats?.totalProjects}</div>
                </CardContent>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Meta project</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{globalStats?.totalMetaProjects}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total student</CardTitle>
                <BlocksIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{globalStats?.totalStudents}</div>
                
                </CardContent>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total teacher</CardTitle>
                <BlocksIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{globalStats?.totalTeachers}</div>
                
                </CardContent>
            </Card>
            </div>
            <div className="grid gap-6 w-full h-full"> 
                <Card className="border border-black dark:border overflow-x-auto overflow-y-hidden"> 
                    <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                    </CardHeader>
                    <CardContent className="p-1 h-full w-full"> 
                        <DataTable columns={columns} data={globalStats?.recentUsers!} />
                    </CardContent>
                </Card>
            </div>

        </main>
    )
}