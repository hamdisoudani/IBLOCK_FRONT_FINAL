"use client";
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import "react-form-wizard-component/dist/style.css";
import Link from 'next/link';
import { DataTable } from '@/components/data-table/data-table';
import { ArrowUpDown, CirclePlusIcon } from 'lucide-react';
import axiosInstance from '@/plugins/axios';
import { ColumnDef } from '@tanstack/react-table';
import { MembersDetailsEntity, SchoolAdminAllUsers } from '@/lib/types/school_admin_all_users.types';



  
export default function DisplaySchoolUserInformations() { 
    const [loading, setLoading] = useState<boolean>(true);
    const [forbidden, setForbidden] = useState<boolean>(false);
    const [usersData, setUsersData] = useState<SchoolAdminAllUsers | null>(null);
    const columns: ColumnDef<MembersDetailsEntity>[] = [
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
            id: 'role'
        },
        {
          header: 'Created Projects',
          accessorKey: 'projectsCount',
          id: 'projectsCount',
          cell: ({ getValue, row }) => {
              const value: any = getValue();
              return (
                //   Based on user role, we can decide to show the projects count or not
                row.getValue('role') === 'teacher' ? (
                    <span>{value}</span>
                ) : (
                    <span>N/A</span>
                )
              );
          }
      },
      {
        header: "Action",
        accessorKey: '_id',
        id: '_id',
        cell: ({ getValue }) => {
            const value: any = getValue();
            return (
                <Button asChild>
                    <Link href={`/school-admin/users/${value}`}>View User
                    </Link>
                </Button>
            );
        }
    }
       
    ]
    useEffect(() => {
        const getUsers = async () => {
            await axiosInstance.get('/school-admin/users')
            .then((res) => {
                if(res.data){
                    console.log(res.data)
                    setUsersData(res.data)
                }
            }).catch((err) => {
                setForbidden(true)
            }).finally(() => {
                setLoading(false)
            })
        }
    
        getUsers();
      }, []);

    if (loading) {
        return <div>Loading...</div>
    }
    if (forbidden) {
        return <div>Forbidden</div>
    }
   
    return (
        <div className="flex w-full h-full">
            
            
            <div className="w-full h-full overflow-auto">
                
                    <div className="flex items-center justify-between flex-wrap mb-4 sm:hidden">
                        <h2 className="text-2xl font-bold ">Users</h2>
                        
                        
                    </div>
                    <div className="hidden items-center justify-between flex-wrap mb-4 sm:flex">
                        <h2 className="text-2xl font-bold ">Users</h2>
                        <div className='flex-1'>
                            &nbsp;
                        </div>
                        <div className='flex items-center'>
                            
                            
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                     <DataTable columns={columns} data={usersData?.users.membersDetails || []} /> 

                    </div>.
            </div>
            
            

        </div>
    );
}






