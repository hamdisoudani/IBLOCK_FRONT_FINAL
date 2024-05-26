"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CopyIcon, MoreHorizontal, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../ui/card";
import { Button } from '@/components/ui/button';
import { Checkbox } from "../ui/checkbox";
import { MembersEntity, MetaProject } from "@/lib/types/general.types";
import { convertDateTime } from "@/composables/convert_date_time";
import { Input } from "../ui/input";
import { NoContentAvailable } from "../no_content_available";
import DisplayMetaProjectCollaborationCodeInformations from "./mp_collaborative_code";
import { ErrorMessage, Field, Formik } from "formik";
import { InferType } from "yup";
import { toast, useToast } from "../ui/use-toast";
import { useState } from "react";
import { teacherCreateNewCollaborativeMetaProjectCodeSchema } from "@/lib/schemas/teacher_create_collaborative_code";
import axiosInstance from "@/plugins/axios";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Link from "next/link";
import { DataTable } from "../data-table/data-table";


const AddNewCollaborativeCodeComponent = (props: {metaProject: MetaProject, setMetaProject: (metaProject: MetaProject) => void}) => {
    const { toast } = useToast();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
      // Create new personal project
      const [createProjectError, setCreateProjectError] = useState<{
        error: boolean;
        message: string;
      }>({
        error: false,
        message: "",
      });
      const handleAddNewCollaborativeCode = async (
        formData: InferType<typeof teacherCreateNewCollaborativeMetaProjectCodeSchema>,
        { resetForm }: { resetForm: any }
      ) => {
        await axiosInstance
          .post("/mp/add-collaborative-code", {
            childProjectName: formData.childProjectName,
            childProjectDescription: formData.childProjectDescription,
            projectId: props.metaProject._id,
          })
          .then((res) => {
            const newMetaProject: MetaProject = { ...props.metaProject };
            newMetaProject.projectCodes?.push(res.data.code);
            props.setMetaProject(newMetaProject);
            toast({
              title: "Success",
              description: `${res.data.message}`,
              duration: 5000,
            });
          })
          .catch((e) => {
            toast({
              variant: "destructive",
              title: `Error`,
              description: `${e.response.data.message}`,
              duration: 5000,
            });
          })
          .finally(() => {
            setIsDialogOpen(false);
            resetForm();
          });
      };
    
    return(
      <div >
        <Dialog open={isDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-5 w-5 text-white stroke-1" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Collaborative Code</DialogTitle>
              <DialogDescription>The created project under this collaborative code will have this name and this description.</DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={{
                childProjectName: "",
                childProjectDescription: "",
              }}
              validationSchema={teacherCreateNewCollaborativeMetaProjectCodeSchema}
              onSubmit={handleAddNewCollaborativeCode}
              validateOnBlur
              validateOnChange
              validateOnMount
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                dirty,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="childProjectName">
                      Project Name
                    </Label>
                    <Field
                      type="text"
                      className={cn(
                        "border border-black dark:border-white w-full p-2 rounded",
                        {
                          "border-[2px] border-red-800 dark:border-red-800 bg-red-200":
                            createProjectError.error,
                        }
                      )}
                      value={values.childProjectName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="childProjectName"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="childProjectName"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childProjectDescription">
                      Project Description
                    </Label>
                    <Field
                      type="text"
                      as="textarea"
                      className={cn(
                        "border border-black dark:border-white w-full p-2 rounded",
                        {
                          "border-[2px] border-red-800 dark:border-red-800 bg-red-200":
                            createProjectError.error,
                        }
                      )}
                      value={values.childProjectDescription}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="childProjectDescription"
                      placeholder=""
                    />
                    <ErrorMessage
                      name="childProjectDescription"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
  
                  <DialogFooter className="flex justify-between sm:flex-wrap sm:justify-start md:flex-nowrap md:justify-center">
                    <Button
                      className="w-full mt-2 sm:mt-0 "
                      type="submit"
                      disabled={!isValid || isSubmitting}
                    >
                      <span
                        className={cn({ hidden: isSubmitting })}
                      >
                        create
                      </span>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className={cn(
                          "inline w-4 h-4 me-3 text-white animate-spin",
                          { hidden: !isSubmitting }
                        )}
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Button>
                    <Button
                      className="w-full "
                      type="button"
                      variant="secondary"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Close
                    </Button>
                  </DialogFooter>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
        
      </div>
    )
  
  }
export const DisplayMetaProjectInformationsAsOwner = (props: {metaProject: MetaProject, setMetaProject: (metaProject: MetaProject) => void}) => {
    const { metaProject } = props;
    const columns: ColumnDef<MembersEntity>[] = [
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
          header: metaProject.collaborative === 'Yes' ? 'Group' : 'Project',
          accessorKey: 'projects.projectName',
          id: 'projectName',
          cell: ({ getValue }) => {
              const value: any = getValue();
              return (
                  <span className="text-primary">{value}</span>
              );
          }
      },
      {
        header: "Action",
        accessorKey: 'projects._id',
        id: 'projectID',
        cell: ({ getValue }) => {
            const value: any = getValue();
            return (
                <Button asChild>
                  <Link href={`/dashboard/project/${value}`}>View project</Link>
                </Button>
            );
        }
    },
    ]
    const handleDeleteCollaborativeCode = async (codeId: string) => {
        await axiosInstance
          .delete(`/mp/collaborative-code/${codeId}`)
          .then((res) => {
            const newMetaProject: MetaProject = { ...props.metaProject };
            newMetaProject.projectCodes = newMetaProject.projectCodes?.filter(
              (code) => code._id !== codeId
            );
            props.setMetaProject(newMetaProject);
            toast({
              title: "Success",
              description: `${res.data.message}`,
              duration: 5000,
            });
          })
          .catch((e) => {
            toast({
              variant: "destructive",
              title: `Error`,
              description: `${e.response.data.message}`,
              duration: 5000,
            });
          });
    }
    
    return (
        <div className="m-2 space-y-2">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{metaProject.projectName}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Students</p>
                        <p className="text-md font-bold">{metaProject.members?.length}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
                        <p className="text-md font-medium">{convertDateTime(metaProject.createdAt)}</p>
                    </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Collaborative</p>
                        <p className="text-md font-medium">{metaProject.collaborative}</p>
                    </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Invitation Code</p>
                        <div className="flex items-center gap-2">
                        <Input className="flex-1" readOnly value={metaProject.invitationCode} />
                        <Button className="shrink-0" size="icon" variant="outline">
                            <CopyIcon className="h-4 w-4" />
                        </Button>
                        </div>
                    </div>
                    </div>
                </CardContent>
                </Card>
            <div className="flex flex-col px-2 border rounded-lg py-3 space-y-2">
                <h1 className="text-2xl">Joined Students</h1>
                <hr/>
                {/* Render table of users */}
                <div className="sm:px-2 sm:py-3">
                    {metaProject.members?.length === 0 ? (
                        <NoContentAvailable title="No student yet" description="All joined students will be displayed here" />
                    ) : (
                        <DataTable columns={columns} data={metaProject.members!}>
                          <Button asChild>
                            <Link href={`/dashboard/meta-project/${metaProject._id}/track`}>Track users</Link>
                            </Button>
                        </DataTable>
                    )}
                </div>
            </div>
            {/* Display collaborative codes if the meta project is collaborative meta project */}
            {metaProject.collaborative === 'Yes' && (
                <section className="w-full py-5">
                <Card className="m-0 mr-0 border-0 shadow-none bg-transparent">
                  <CardHeader className="py-2 px-3">
                    <CardTitle className="sm:text-2xl text-md flex">
                      <p className="text-2xl flex-1">Browse your collaboration codes</p>
                      <AddNewCollaborativeCodeComponent metaProject={metaProject} setMetaProject={props.setMetaProject} />
                    </CardTitle>
                    <CardDescription>
                      You can share your projects invitation codes with your students to work on specific activities.
                    </CardDescription>
                  </CardHeader>
                    
                      
                  <CardContent className="flex flex-row flex-wrap sm:space-y-0 space-y-2 sm:px-4 sm:gap-3 px-1 sm:py-2 sm:justify-start justify-center">
                    {metaProject.projectCodes!.length == 0
                      ? 
                      (
                        <div className="my-0 mx-auto flex items-center place-content-center place-items-center h-[300px]">
                          <NoContentAvailable title="No collaboration code found" description="All created collaboration codes will be displayed here" />
                        </div>
                      )
                      : metaProject.projectCodes!.map((code, index) => (
                          
                        <div key={code._id} className={
                          cn({
                            "sm:mt-0 mt-2": index == 0,
                            "sm:mb-0 mb-1": index == metaProject.projectCodes!.length - 1,
                          })
                        }>  
                          <DisplayMetaProjectCollaborationCodeInformations
                            mpCollaborativeCode={code}
                            handleDeleteCollaborativeCode={handleDeleteCollaborativeCode}
                          />
                        </div>
                      ))}
                      </CardContent>
                    
                    
                </Card>
              </section>
            )}
        </div>
    )
}