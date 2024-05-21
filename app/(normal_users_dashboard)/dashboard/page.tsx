"use client";
import { useProfileContext } from "@/components/context/userprofile.context";
import axiosInstance from "@/plugins/axios";

import classImg from "@/public/image1/class.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CiMenuKebab } from "react-icons/ci";
import { useTheme } from "next-themes";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import { ErrorMessage, Field, Formik } from "formik";
import { createProjectSchema } from "@/lib/schemas/create_project.schema";
import { InferType } from "yup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClassRequestSchema } from "@/lib/schemas/create_class_schema";
import { toast, useToast } from "@/components/ui/use-toast";
import { CardProjectUi } from "@/components/CardProjectUi";
import { UserProject, joinedMetaProjectsType, ownedMetaProjectsType } from "@/lib/types/general.types";
import JoinProjectModel from "@/components/dialog/join_project.model";
import DisplayUserProjects from "@/components/display_user_projects";
import WelcomeIllustration from "@/public/illustrations/welcome.svg"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NoContentAvailable } from "@/components/no_content_available";
import DisplayTeacherOwnerMetaProjects from "@/components/display_teacher_meta_projects";
import { createMetaProjectSchema } from "@/lib/schemas/create_meta_project.schema";
import DisplayStudentJoinedMetaProjects from "@/components/meta-project/display_student_meta_projects";
import { user } from "@nextui-org/react";
import { joinProjectShema } from "@/lib/schemas/manage_project/join_project.schema";
const JoinMPChildProject = () => {
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
    const handleSubmitNewClassRequest = async (
      formData: InferType<typeof joinProjectShema>,
      { resetForm }: { resetForm: any }
    ) => {
      await axiosInstance
        .post("/mp/join", {
          invitationCode: formData.invitationCode,
        })
        .then((res) => {
          toast({
            title: `${res.data.message}`,
          });
        })
        .catch((e) => {
          toast({
            variant: "destructive",
            title: `Error`,
            description: `${e.response.data.message}`,
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
            <DialogTitle>Join project</DialogTitle>
          </DialogHeader>
          <Formik
            initialValues={{
              invitationCode: "",
            }}
            validationSchema={joinProjectShema}
            onSubmit={handleSubmitNewClassRequest}
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
                  <Label htmlFor="invitationCode">
                    Invitation Code
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
                    value={values.invitationCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="invitationCode"
                    placeholder="Enter your invitation code"
                  />
                  <ErrorMessage
                    name="invitationCode"
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
                      Join
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
const JoinClass = () => {
  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={ "outline" }>
          <Plus className="h-8 w-8 text-white stroke-1" />
          <p className="text-xs text-white font-light ml-[18px] ">
            join class
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join class</DialogTitle>
          <DialogDescription>
            Anyone who has this code will be able to Join
            class.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              code
            </Label>
            <Input id="link" defaultValue="" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Join</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
const CreateProject = (props: {ownedProjects: UserProject[], setOwnedProjects: (ownedProjects: UserProject[]) => void}) => {
  const {ownedProjects, setOwnedProjects} = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createProjectError, setCreateProjectError] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: "",
  });
  const handleAddNewPersonalProject = async (
    formData: InferType<typeof createProjectSchema>,
    { resetForm }: { resetForm: any }
  ) => {
    await axiosInstance
      .post("/projects/add", {
        name: formData.projectName,
        description: formData.projectDescription,
      })
      .then((res) => {
        const Projects: UserProject[] = ownedProjects.concat(
          res.data.projectDetails
        );
        setOwnedProjects(Projects);
        useSuccessToast(`${res.data.message}`);
      })
      .catch((e) => {
        useErrorToast("There was an error performing this action.");
      })
      .finally(() => {
        setIsDialogOpen(false);
        resetForm();
      });
  };
  return(
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          onClick={() => setIsDialogOpen(true)}
        > 
          <Plus className="h-5 w-5 text-white stroke-1" />Create project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            projectName: "",
            projectDescription: "",
          }}
          validationSchema={createProjectSchema}
          onSubmit={handleAddNewPersonalProject}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">
                  Project name
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
                  value={values.projectName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="projectName"
                  placeholder="Enter your project name"
                />
                <ErrorMessage
                  name="projectName"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="projectDescription">
                  Project description
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
                  value={values.projectDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="projectDescription"
                  placeholder="Enter your porject description (optional)"
                />
                <ErrorMessage
                  name="projectDescription"
                  component="div"
                  className="text-red-600"
                />
              </div>

              <DialogFooter className="sm:justify-start  gap-2">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  <span
                    className={cn({
                      hidden: isSubmitting,
                    })}
                  >
                    Create Project
                  </span>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className={cn(
                      "inline w-4 h-4 me-3 text-white animate-spin",
                      {
                        hidden: !isSubmitting,
                      }
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
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                >
                  Close
                </Button>
              </DialogFooter>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const JoinClassAndSchool = () => {
  
  const [joinedProjects, setJoinedProjects] = useState<UserProject[]>([]);
 
  return(
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"default"}>
          <CiMenuKebab />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-current bg-black rounded-lg mr-3">
        <Dialog>
          <DialogTrigger className="w-full">
            <span className="w-full inline-flex items-center gap-1 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-300">
              <Plus className="h-6 w-6 text-black" />
              <p className="text-sm font-medium text-black">
                Join school
              </p>
            </span>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Type invitation code</DialogTitle>
              <DialogDescription>
                Anyone who has this code will be able to Join
                school.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                  code
                </Label>
                <Input id="link" defaultValue="" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Join</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        <JoinProjectModel setJoinedProjects={setJoinedProjects} />
      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}

type UserClassType = {
  createdAt: string;
  className: string;
  classOwner: string;
  updatedAt: string;
  _id: string;
};
const LoadingProjectSkeleton = () => {
  return (
    <div className="grid grid-cols-3">
      {Array(3)
        .fill("")
        .map(() => (
          <div className="col-span-1">
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] w-[250px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
const LoadingButtonsSkeleton = () => {
  return (
    <div className="grid grid-cols-2">
      {Array(2)
        .fill("")
        .map((item, index) => (
          <div className="col-span-1" key={index}>
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[12px] w-[30px] rounded-sm" />
            </div>
          </div>
        ))}
    </div>
  );
};
function ClassesCard(classUser: UserClassType) {
  return (
    <><div className="relative p-4">
    <h3 className="text-xl font-semibold">{classUser.className}</h3>
    <div className="relative mb-4 rounded-md max-w-full overflow-hidden bg-gray-300 w-auto md:h-[250px] h-[180px] lg:h-[120px] lg:w-[160px] lg:max-w-[300px] mt-2">
      <Image
        alt={`Image for ${classUser.className}`}
        src={classImg}
        className="object-cover w-full h-full "
      />
      <div className="absolute top-0 right-0 p-2 cursor-pointer rounded-md hover:bg-gray-200">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className=" text-black" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                your project and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => {}}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <p className="text-sm text-gray-600">{classUser.createdAt}</p>
      <p className="text-sm text-gray-600">{classUser.classOwner}</p>
    </div>
  </div>
  </>
    
  );
}
const Dashboard = () => {
  const { currentProfile, userInformation, isLoadingProfiles } = useProfileContext();
  const [loading, setLoading] = useState(true);
  const [ownedProjects, setOwnedProjects] = useState<UserProject[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<UserProject[]>([]);
  const [ownedMetaProjects, setOwnedMetaProjects] = useState<ownedMetaProjectsType[]>([]); // This will store the teacher owned metaprojects
  const [joinedMPChilProjects, setJoinedMpChildProjects] = useState<joinedMetaProjectsType[]>([]); // This will store the student joined metaprojects
  const [classes, setClasses] = useState<UserClassType[]>([]);
  
  
  const CreateMetaProject = (props: {ownedMetaProjects: ownedMetaProjectsType[], setOwnedMetaProjects: Dispatch<SetStateAction<ownedMetaProjectsType[]>>}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [createProjectError, setCreateProjectError] = useState<{
      error: boolean;
      message: string;
    }>({
      error: false,
      message: "",
    });
    const {toast} = useToast();
    const handleAddNewPersonalProject = async (
      formData: InferType<typeof createMetaProjectSchema>,
      { resetForm }: { resetForm: any }
    ) => {
      await axiosInstance
        .post("/mp", {
          projectName: formData.metaProjectName,
          projectDescription: formData.metaProjectDescription,
          collaborative: formData.collaborative,
        })
        .then((res) => {
          const modifiedData:ownedMetaProjectsType = res.data.metaProject;
          const projects: ownedMetaProjectsType[] = props.ownedMetaProjects.concat(modifiedData);
          props.setOwnedMetaProjects(projects);
          toast({
            title: "Success",
            description: `${res.data.message}`
          })
        })
        .catch((e) => {
          if(e.response.data.message)
            {
              if(Array.isArray(e.response.data.message))
              {
                toast({
                  variant: "destructive",
                  title: `Error`,
                  description: `${e.response.data.message[0]}`,
                  duration: 4000
                })
              } else {
                toast({
                  variant: "destructive",
                  title: `Error`,
                  description: `${e.response.data.message}`,
                  duration: 4000
                })
              }
            } else  {
              toast({
                variant: "destructive",
                title: `Error`,
                description: `There was an error performing this action.`,
                duration: 4000
              })
            }
            
        })
        .finally(() => {
          setIsDialogOpen(false);
          resetForm();
        });
    };
    return(
      <Dialog open={isDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"default"}
            onClick={() => setIsDialogOpen(true)}
          > 
            <Plus className="h-5 w-5 text-white stroke-1" />Create meta project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new meta project</DialogTitle>
          </DialogHeader>
          <Formik
            initialValues={{
              collaborative: false,
              metaProjectName: "",
              metaProjectDescription: "",
            }}
            validationSchema={createMetaProjectSchema}
            onSubmit={handleAddNewPersonalProject}
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
              setFieldValue,
              isValid,
              dirty,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaProjectName">
                    Meta project name
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
                    value={values.metaProjectName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="metaProjectName"
                    placeholder="Enter your project name"
                  />
                  <ErrorMessage
                    name="metaProjectName"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaProjectDescription">
                    Meta project description
                  </Label>
                  <Field
                    as="textarea"
                    type="text"
                    className={cn(
                      "border border-black dark:border-white w-full p-2 rounded",
                      {
                        "border-[2px] border-red-800 dark:border-red-800 bg-red-200":
                          createProjectError.error,
                      }
                    )}
                    value={values.metaProjectDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="metaProjectDescription"
                    placeholder="Enter your porject description (optional)"
                  />
                  <ErrorMessage
                    name="metaProjectDescription"
                    component="div"
                    className="text-red-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collaborative">
                    <Field 
                    type="checkbox"
                    name="collaborative"
                    render={({ field }: {field: any}) => (
                      <div className="items-top flex space-x-2 mt-2">
                          <Checkbox
                          {...field}
                          checked={values.collaborative}
                          onClick={(e: MouseEvent) => {
                            e.preventDefault();
                            setFieldValue("collaborative", !values.collaborative)
                          }}
                          type="checkbox"
                        />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms1"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Collaborative
                            </label>
                            <p className="text-sm text-muted-foreground">
                              If this field is checked means that this meta project will be collaborative, you can share collaborative codes with your students to join different groups.
                            </p>
                          </div>
                        </div>
                      
                    )}
                    />
                  </Label>
                </div>
                
  
                <DialogFooter className="sm:justify-start  gap-2">
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={!isValid || isSubmitting}
                  >
                    <span
                      className={cn({
                        hidden: isSubmitting,
                      })}
                    >
                      Create Project
                    </span>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className={cn(
                        "inline w-4 h-4 me-3 text-white animate-spin",
                        {
                          hidden: !isSubmitting,
                        }
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
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setIsDialogOpen(false);
                    }}
                  >
                    Close
                  </Button>
                </DialogFooter>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    )
  }

  const handleDeleteMetaProject = async (project: ownedMetaProjectsType) => {
    try {
      const response = await axiosInstance.delete(`/mp/${project._id}`)
      if(response.status ===200)
        {
          toast({
            title: "Success",
            description: `${project.projectName} has been deleted successfully`,
            variant: "default",
            duration: 5000
          });
          const metaprojects: ownedMetaProjectsType[] = ownedMetaProjects.filter((metaProject) => {
            return metaProject._id != project._id;
          });
          setOwnedMetaProjects(metaprojects);
        }
      else 
        toast({
          title: "An error occurred.",
          description: "Unable to delete meta project. Please try again later.",
          variant: "destructive",
          duration: 5000
        });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to delete meta project. Please try again later.",
        variant: "destructive",
        duration: 5000
      });
    }
  }
 

  useEffect(() => {
    const getUSerProjects = async () => {
      setLoading(true);
      await axiosInstance
        .get("/projects")
        .then((res) => {
          if (res.data.ownedProjects) setOwnedProjects(res.data.ownedProjects);
          if (res.data.joinedProjects) setJoinedProjects(res.data.joinedProjects);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getEnrolledClasses = async () => {
      setLoading(true);
      await axiosInstance
        .get("/class")
        .then((res) => {
          console.log("res", res.data.enrolledClasses);
          if (res.data.enrolledClasses) setClasses(res.data.enrolledClasses);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getClassCreationRequests = async () => {
      setLoading(true);
      await axiosInstance
        .get("/rcc")
        .then((res) => {
          console.log("res", res.data);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getMetaProjects = async () => {
      setLoading(true);
      await axiosInstance
        .get("/mp")
        .then((res) => {
          console.log("res", res.data.joinedMetaProjects)
          if(res.data.ownedMetaProjects) setOwnedMetaProjects(res.data.ownedMetaProjects);
          //if(res.data.joinedMetaProjects) setJoinedMpChildProjects(res.data.joinedMetaProjects);
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    const getJoinedJoinedProjectsForThisSchoolProfile = async () => {
      setLoading(true);
      await axiosInstance
        .get("/mp/joined-projects")
        .then((res) => {
          console.log("res", res.data )
          if (res.data) setJoinedMpChildProjects(res.data)
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    if(!isLoadingProfiles) {
      if (currentProfile?.type == "personal") {
        getUSerProjects();
      }
      if (currentProfile?.type == "school") {
        //getUSerProjects();
        //getEnrolledClasses();
        //getClassCreationRequests();
        if(userInformation?.role == "student") {
          getJoinedJoinedProjectsForThisSchoolProfile();
        }
        if(userInformation?.role == "teacher") {
          getMetaProjects();
        }
      }
    }
  }, [currentProfile]);

  

 

  const handleDeleteProject = async (project: UserProject) => {
    await axiosInstance
      .post("/projects/remove", {
        projectId: project._id,
      })
      .then((res) => {
        const Projects: UserProject[] = ownedProjects.filter(
          (personalProject) => {
            return personalProject._id !== project._id;
          }
        );
        setOwnedProjects(Projects);
        useSuccessToast(`${res.data.message}`);
      })
      .catch((e) => {
        useErrorToast("There was an error performing this action.");
      });
  };

  if(loading || isLoadingProfiles) return <LoadingButtonsSkeleton />;

  return (
    <>
      <div className="px-2">
        <div className="flex items-center mb-2">
          <div className="flex-1 sm:w-full">
            &nbsp;
          </div>
          <div className="flex  lg:justify-end md:flex space-x-1 sm:mt-0 mt-1">
            <div>
                <div className="space-x-1 flex items-center justify-end">
                  {currentProfile?.type == "personal" && (
                    <div className="flex flex-row gap-1">
                      <CreateProject ownedProjects={ownedProjects} setOwnedProjects={setOwnedProjects} />
                      <JoinClassAndSchool />
                    </div>
                    
                  )}
                   {currentProfile?.type == "school"  && userInformation?.role == "teacher"  && (
                      <div className="flex flex-row  gap-1">
                        <CreateMetaProject ownedMetaProjects={ownedMetaProjects} setOwnedMetaProjects={setOwnedMetaProjects}/>
                        
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 my-5 w-full max-w-2xl rounded p-1">
            <div className="col-span-8 w-full flex items-center">
                <h1 className="text-2xl font-bold">Welcome back, {userInformation?.name}</h1>
            </div>
            <div className="col-span-4 flex justify-end gap-2 w-full">
                <Image
                  src={WelcomeIllustration}
                  alt="Welcome illustration"
                  width={100}
                  height={100}
                  loading="lazy"
                  className="h-[100px] sm:w-1/2 w-full rounded-full object-cover"
                />
              </div>
        </div>     
        

        <div className="max-w-screen">
          {/* Render the student or teacher personal projects */}
          {currentProfile?.type == "personal" && (
            
            <Card className="m-0 mr-0 border-0 shadow-none bg-transparent">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-2xl">
                  Browse your projects
                </CardTitle>
                <CardDescription>
                  You can share your projects invitation codes with others to work on them together.
                </CardDescription>
              </CardHeader>
                
                  <ScrollArea className={cn(
                    "sm:h-80 h-[450px] w-full rounded-md px-0",
                    {
                      "border h-auto": ownedProjects.length == 0,
                    }
                  )} >
                  <CardContent className="flex flex-row flex-wrap sm:space-y-0 space-y-2 sm:px-4 sm:gap-3 px-1 sm:py-2 sm:justify-start justify-center">
                    {ownedProjects.length == 0
                      ? 
                      (
                        <div className="my-0 mx-auto flex items-center place-content-center place-items-center h-[300px]">
                          <NoContentAvailable title="No project found" description="Create new project by clicking create new project" />
                        </div>
                      )
                      : ownedProjects.map((project, index) => (
                          
                        <div key={project._id} className={
                          cn({
                            "sm:mt-0 mt-2": index == 0,
                            "sm:mb-0 mb-1": index == ownedProjects.length - 1,
                          })
                        }>  
                          <DisplayUserProjects
                            project={project}
                            owned
                            handleDeleteProject={handleDeleteProject}
                          />
                        </div>
                      ))}
                      </CardContent>
                  </ScrollArea>
                
                
            </Card>
          
          )}
          
          {/* Render the joined projects for the student or the teacher */}
          {
            currentProfile?.type == "personal" && (
              <section className="w-full py-5">
                <Card className="m-0 p-0 border-0 shadow-none bg-transparent">
                  <CardHeader className="py-2 px-3">
                    <CardTitle className="text-2xl">
                      Explore your teammates projects
                    </CardTitle>
                    <CardDescription>
                        Every joined project will be displayed here. You can work on them together.
                    </CardDescription>
                  </CardHeader>
                  <ScrollArea className={cn(
                    "sm:h-80 h-[450px] w-full rounded-md border-0 px-0",
                    {
                      "border h-auto": joinedProjects.length == 0,
                    }
                  )} >
                    <CardContent className="flex flex-row flex-wrap space-y-2 sm:space-y-0 sm:py-2 sm:px-4 sm:gap-3 px-1 sm:justify-start justify-center">
                    {joinedProjects.length == 0
                      ? 
                      (
                        <div className="my-0 mx-auto flex items-center place-content-center place-items-center h-[300px]">
                          <NoContentAvailable title="No project found" description="Joined projects will be displayed here" />
                        </div>
                      )
                      : joinedProjects.map((project, index) => (
                          
                        <div key={project._id} className={
                          cn({
                            "sm:mt-0 mt-2": index == 0,
                            "sm:mb-0 mb-1": index == ownedProjects.length - 1,
                          })}>  {/* Responsive column spans */}
                        <DisplayUserProjects
                          project={project}
                          handleDeleteProject={handleDeleteProject}
                        />
                      </div>
                      ))}
                    </CardContent>
                    </ScrollArea>
                </Card>
              </section>
            )
          }

          {/* Render the meta projects in school profile for teacher */}
          {currentProfile?.type == "school"  && userInformation?.role == "teacher"  && (
            <section className="w-full py-5">
            <Card className="m-0 mr-0 border-0 shadow-none bg-transparent">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-2xl">
                  Browse your meta projects
                </CardTitle>
                <CardDescription>
                  You can share your projects invitation codes with others to work on them together.
                </CardDescription>
              </CardHeader>
                
                  
              <CardContent className="flex flex-row flex-wrap sm:space-y-0 space-y-2 sm:px-4 sm:gap-3 px-1 sm:py-2 sm:justify-start justify-center">
                {ownedMetaProjects.length == 0
                  ? 
                  (
                    <div className="my-0 mx-auto flex items-center place-content-center place-items-center h-[300px]">
                      <NoContentAvailable title="No meta project found" description="All created meta projects will be displayed here" />
                    </div>
                  )
                  : ownedMetaProjects.map((project, index) => (
                      
                    <div key={project._id} className={
                      cn({
                        "sm:mt-0 mt-2": index == 0,
                        "sm:mb-0 mb-1": index == ownedProjects.length - 1,
                      })
                    }>  
                      <DisplayTeacherOwnerMetaProjects
                        project={project}
                        handleDeleteMetaProject={handleDeleteMetaProject}
                      />
                    </div>
                  ))}
                  </CardContent>
                
                
            </Card>
          </section>
          )}

          {/* Render the meta projects in school profile for student */}
          {currentProfile?.type == "school"  && userInformation?.role == "student"  && (
            
            
            <section className="w-full py-5">
              
            <Card className="m-0 mr-0 border-0 shadow-none bg-transparent">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-2xl flex justify-between">
                  Browse your joined meta projects
                  <div className="flex flex-row  gap-1">
              <JoinMPChildProject />
            </div>
                </CardTitle>
                <CardDescription>
                  Here are all joined meta projects.
                </CardDescription>
              </CardHeader>
                
                  
              <CardContent className="flex flex-row flex-wrap sm:space-y-0 space-y-2 sm:px-4 sm:gap-3 px-1 sm:py-2 sm:justify-start justify-center">
                {joinedMPChilProjects.length == 0
                  ? 
                  (
                    <div className="my-0 mx-auto flex items-center place-content-center place-items-center h-[300px]">
                      <NoContentAvailable title="No meta project found" description="All created meta projects will be displayed here" />
                    </div>
                  )
                  : joinedMPChilProjects.map((project, index) => (
                      
                    <div key={project._id} className={
                      cn({
                        "sm:mt-0 mt-2": index == 0,
                        "sm:mb-0 mb-1": index == joinedMPChilProjects.length - 1,
                      })
                    }>  
                      <DisplayStudentJoinedMetaProjects
                        project={project}
                      />
                    </div>
                  ))}
                  </CardContent>
                
                
            </Card>
          </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
