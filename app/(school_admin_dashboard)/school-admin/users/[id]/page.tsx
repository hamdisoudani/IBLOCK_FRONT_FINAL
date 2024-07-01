"use client";
import axiosInstance from "@/plugins/axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatedMetaProjects, GetUserProjectsEntity, SchoolAdminAllUsersInformation, UserInfromation } from "@/lib/types/school_admin_all_users_information.types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { DataTableProject } from "@/components/data-project-table/data-project-table";
export default function DisplaySchoolUserInformations() {
  const params = useParams();
  const [userInformation, setUserInformation] = useState<UserInfromation | null>(null);
  const [userProjects, setUserProjects] = useState<GetUserProjectsEntity[] | null>(null);
  const [createdMetaProjects, setcreatedMetaProjects] = useState<CreatedMetaProjects[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const joinedProjectColumns: ColumnDef<GetUserProjectsEntity>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: 'projectName',
      id: 'projectName',
    },
    {
      header: 'Description',
      accessorKey: 'projectDescription',
      id: 'projectDescription',
    },
    {
      header: 'Type',
      accessorKey: 'projectType',
      id: 'projectType',
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
  ];

  const createdProjectColumns: ColumnDef<CreatedMetaProjects>[] = [
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Project Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: 'projectName',
      id: 'projectName',
    },
    {
      header: 'Description',
      accessorKey: 'projectDescription',
      id: 'projectDescription',
    },
    {
      header: 'Collaborative',
      accessorKey: 'collaborative',
      id: 'collaborative',
      cell: ({ getValue }) => {
        const value = getValue();
        return value ? "Yes" : "No";
      },
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
  ];

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const res = await axiosInstance.get(`/school-admin/user/${params.id}`);
        const data: SchoolAdminAllUsersInformation = res.data; 
        console.log(data);
        setUserInformation(data.userInformation.userInfromation);
        setUserProjects(data.userInformation.getUserProjects || []);
        setcreatedMetaProjects(data.userInformation.createdMetaProjects || []); 
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUserInformation();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='flex flex-col gap-4 p-4'> 
      {/* User Information Card - unchanged */}
      <Card className="border border-black dark:border">
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          {userInformation && (
            <div>
              <p><strong>Name:</strong> {userInformation.name}</p>
              <p><strong>Email:</strong> {userInformation.email}</p>
              <p><strong>Role:</strong> {userInformation.role}</p>
              <p><strong>Created At:</strong> {userInformation.createdAt}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conditional Project Table Rendering */}
      {userInformation && userInformation.role === "student" && (
        <Card className="border border-black dark:border">
          <CardHeader>
            <CardTitle>Joined Projects</CardTitle> 
          </CardHeader>
          <CardContent>
            <DataTableProject columns={joinedProjectColumns} data={userProjects || []} />
          </CardContent>
        </Card>
      )}

      {userInformation && userInformation.role === "teacher" && (
        <Card className="border border-black dark:border">
          <CardHeader>
            <CardTitle>Created Projects</CardTitle> 
          </CardHeader>
          <CardContent>
            <DataTableProject columns={createdProjectColumns} data={createdMetaProjects || []} />
          </CardContent>
        </Card>
      )}
    </div> 
  );
}