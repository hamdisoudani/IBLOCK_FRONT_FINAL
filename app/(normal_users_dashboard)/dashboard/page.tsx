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
import { useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { CardProjectUi } from "@/components/CardProjectUi";
import { UserProject } from "@/lib/types/general.types";
import JoinProjectModel from "@/components/dialog/join_project.model";
import DisplayUserProjects from "@/components/display_user_projects";
import WelcomeIllustration from "@/public/illustrations/welcome.svg"
import { Badge } from "@/components/ui/badge";

type ProfileType = {
  _id: string;
  profileName: string;
  createdAt: string;
  updatedAt: string;
  type: string;
};

interface Profiles {
  selectedProfile: ProfileType;
  availableProfiles: ProfileType[];
}

type UserClass = {
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
function ClassesCard(classUser: UserClass) {
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
  const { currentProfile, userInformation } = useProfileContext();
  const [loading, setLoading] = useState(true);
  const [ownedProjects, setOwnedProjects] = useState<UserProject[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<UserProject[]>([]);
  const [classes, setClasses] = useState<UserClass[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Create new personal project
  const [createProjectError, setCreateProjectError] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: "",
  });

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

    if (currentProfile?.type == "personal") {
      getUSerProjects();
    }
    if (currentProfile?.type == "school") {
      getUSerProjects();
      getEnrolledClasses();
      getClassCreationRequests();
    }
  }, [currentProfile]);

  const handleCardClick = () => {
    // Handle card click logic
  };

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
  const handleSubmitNewClassRequest = async (
    formData: InferType<typeof createClassRequestSchema>,
    { resetForm }: { resetForm: any }
  ) => {
    await axiosInstance
      .post("/rcc/create", {
        className: formData.className,
      })
      .then((res) => {
        console.log("res", res.data);
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

  if(loading) return <LoadingButtonsSkeleton />;

  return (
    <>
      <div className="px-2">
        <div className="flex items-center mb-2">
          <div className="flex-1 sm:w-full">
            <h1 className="text-bold dark:white font-bold text-2xl">
              Dashboard
            </h1>
          </div>
          <div className="flex lg:justify-end md:flex space-x-2 sm:mt-0 mt-1">
            <div>
                <div className="space-x-2 flex items-center justify-end">
                  {currentProfile?.type == "personal" && (
                    <Dialog open={isDialogOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant={"default"}
                          onClick={() => setIsDialogOpen(true)}
                        >
                          <Plus className="h-5 w-5 text-white stroke-1" />
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

                              <DialogFooter className="sm:justify-start space-y-2 gap-2">
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
                  )}

                  {currentProfile?.type == "personal" && (
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
                  )}

                  {currentProfile?.type == "school" && (
                    <div className="space-x-1">
                      <Dialog open={isDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant={"default"}
                            onClick={() => setIsDialogOpen(true)}
                          >
                            <Plus className="h-8 w-8 text-white stroke-1" />
                            <p className="text-xs font-light">Create Class</p>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Create Class</DialogTitle>
                          </DialogHeader>
                          <Formik
                            initialValues={{
                              className: "",
                            }}
                            validationSchema={createClassRequestSchema}
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
                                  <Label htmlFor="className">
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
                                    value={values.className}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="className"
                                    placeholder="Enter your project name"
                                  />
                                  <ErrorMessage
                                    name="className"
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={"default"}>
                            <Plus className="h-8 w-8 text-white stroke-1" />
                            <p className="text-xs text-white font-light">
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
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row flex-wrap my-5">
          <div className="flex-1">
            <div className="flex flex-row items-center gap-2">
              
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {userInformation?.name}</h1>
              </div>
              <div className="flex items-center gap-2 w-1/2">
                <Image
                  src={WelcomeIllustration}
                  alt="Welcome illustration"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>     
        

        <div className="max-w-screen">
        <section className="w-full py-5">
            <Card className="m-0 mr-0">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-2xl">
                Recent created projects
                </CardTitle>
                <CardDescription>
                Check out the latest projects you've created. You can also manage them.
                </CardDescription>
              </CardHeader>
                <CardContent className="flex flex-row flex-wrap gap-2 px-4 sm:gap-3">
                {ownedProjects.length == 0
                  ? "Empty for now"
                  : ownedProjects.map((project) => (
                      
                    <div key={project._id}>  {/* Responsive column spans */}
                    <DisplayUserProjects
                      project={project}
                      owned
                      handleDeleteProject={handleDeleteProject}
                    />
                  </div>
                  ))}
                </CardContent>
            </Card>
          </section>
          <section className="w-full py-5">
            <Card className="m-0 p-0">
              <CardHeader className="py-2 px-3">
                <CardTitle className="text-2xl">
                  Recent joined projects
                </CardTitle>
                <CardDescription>
                    Check out the latest projects you've joined.
                </CardDescription>
              </CardHeader>
                <CardContent className="flex flex-row flex-wrap gap-2 px-4 sm:gap-3">
                {joinedProjects.length == 0
                  ? "Empty for now"
                  : joinedProjects.map((project) => (
                      
                    <div key={project._id}>  {/* Responsive column spans */}
                    <DisplayUserProjects
                      project={project}
                      handleDeleteProject={handleDeleteProject}
                    />
                  </div>
                  ))}
                </CardContent>
            </Card>
          </section>
          {currentProfile?.type == "school" && (
            <section className="w-full py-12">
              <div className="container grid gap-6 md:gap-8 px-4 md:px-6 max-w-xl mx-auto lg:max-w-none">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                  <div className="grid gap-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                      Classes
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out our latest classes and see what we've been
                      working on.
                    </p>
                  </div>
                </div>
                <div className="space-y-2 h-[500px] lg:space-x-3 lg:flex block xl:flex ">
                  <div className="border-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classes.map((classUser) => (
                      <Card
                        key={classUser._id}
                        className="border-black rounded-lg col-span-1 space-x-2 mx-1 gap-2 z-50 lg:h-[240px] lg:w-[200px] md:h-[350px] md:w-[350px]"
                        onClick={handleCardClick}
                      >
                        {ClassesCard(classUser)}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
