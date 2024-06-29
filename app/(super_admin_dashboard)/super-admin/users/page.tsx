"use client";
import { useEffect, useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import axiosInstance from '@/plugins/axios';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
// Correct import path, assuming your file structure
import { SuperAdminAllUsers } from '@/lib/types/super_admin_dashboard/all_users_information.type'; 

export default function Page() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Use the correct type for the users state
  const [users, setUsers] = useState<SuperAdminAllUsers[] | null>(null); 

  // Update the ColumnDef to use the correct type
  const userColumns: ColumnDef<SuperAdminAllUsers>[] = [
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
        );
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
    },
    {
      header: "Action",
      accessorKey: 'id',
      id: 'id',
      cell: ({ getValue }) => {
        const value = getValue();
        return (
          <Button asChild>
            <Link href={`/school-admin/users/${value}`}>View User</Link>
          </Button>
        );
      }
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get('/super-admin/users'); // Adjust the endpoint if needed
        setUsers(res.data); 
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full overflow-auto p-4"> 
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <div className="flex flex-col gap-4">
          {/* Render the DataTable */}
          <DataTable columns={userColumns} data={users || []} /> 
        </div>
      </div>
    </div>
  );
}