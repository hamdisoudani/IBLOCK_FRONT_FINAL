"use client";
import Link from "next/link";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ManageProjectDefaultPageSkeleton from "@/components/skeleton/manage_project_default_page";
import { useParams } from "next/navigation";
import axiosInstance from "@/plugins/axios";
import { useProfileContext } from "@/components/context/userprofile.context";
import ProjectNotFound from "@/components/errors/project_not_found";
import { ErrorMessage, Field, Formik } from "formik";
import { updateProjectGeneralInformation } from "@/lib/schemas/manage_project/update_general_info.schema";
import { InferType } from "yup";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useToast } from "@/components/ui/use-toast";



enum ProjectType {
    "pernonal",
    "team"
}
type ProjectDetailsType = {
    createdAt: string,
    invitationCode: string,
    projectDescription: string,
    projectName: string,
    projectType: ProjectType,
    updatedAt: string,
    _id: string
}

type projectManagementForTheOwnerOfTheProjectProps = {
    projectDetails: ProjectDetailsType | undefined ,
    handleCopyInvitationCode: () => void,
    setProjectDetails: React.Dispatch<React.SetStateAction<ProjectDetailsType | undefined>>
}
const ProjectManagementForTheOwnerOfTheProject = (props: projectManagementForTheOwnerOfTheProjectProps) => {
    const { projectDetails, handleCopyInvitationCode, setProjectDetails } = props;
    const params = useParams();
    const { toast } = useToast();

    // Function that handles the form submission
    const handleUpdateProjectGeneralInformation = async (
        formData: InferType<typeof updateProjectGeneralInformation>,
        { resetForm }: { resetForm: any }
      ) => {
        await axiosInstance
          .post(`/projects/${params.id}/general/update`, {
            projectName: formData.projectName,
            projectDescription: formData.projectDescription,
            projectId: params.id,
          })
          .then((res) => {
            try {
                if(!res.data.message) throw new Error("An error occurred while updating the project information");
                if(!res.data.projectDetails) throw new Error("An error occurred while updating the project information");
                setProjectDetails(res.data.projectDetails);
                toast({
                    variant: "default",
                    title: `Success`,
                    className: "text-white bg-green-900",
                    description: `${res.data.message}`,
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: `Error`,
                    description: "An error occurred while updating the project information",
                });
            }
          })
          .catch((e) => {
            if(typeof e.response.data.message != "undefined") {
                toast({
                variant: "destructive",
                title: `Error`,
                description: `${e.response.data.message[0]}`,
                });
            }
            toast({
                variant: "destructive",
                title: `Error`,
                description: "An error occurred while updating the project information",
            });
          })
    };
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
            <h1 className="text-3xl font-semibold">Manage</h1>
            </div>
            <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
            <nav className="h-full bg-secondary rounded-md" x-chunk="dashboard-04-chunk-0">
                <div className="sm:grid sm:gap-1 text-sm text-muted-foreground flex flex-wrap px-1 py-1 w-full">
                <Button asChild disabled variant={'default'} className="sm:rounded-b-none w-auto">
                    <Link className="font-semibold text-primary" href="#">
                        General
                    </Link>
                </Button>
                <Button asChild variant={'secondary'} className="sm:rounded-none">
                    <Link className="font-semibold text-primary" href="#">
                        Manage members
                    </Link>
                </Button>
                <Button asChild variant={'secondary'} className="sm:rounded-b-none">
                    <Link className="font-semibold text-primary" href="#">
                        Settings
                    </Link>
                </Button>
                </div>
            </nav>
            <div className="grid gap-6">
                <Card x-chunk="Edit project">
                    <CardHeader>
                        <CardTitle className="text-lg">Edit the project information</CardTitle>
                        <CardDescription>You can use this form to change your project information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Formik
                                initialValues={{
                                    projectName: projectDetails?.projectName || "",
                                    projectDescription: projectDetails?.projectDescription || "",
                                }}
                                validationSchema={updateProjectGeneralInformation}
                                onSubmit={handleUpdateProjectGeneralInformation}
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
                                            "border-[2px] border-red-800 dark:border-red-800":
                                                errors.projectName && touched.projectName,
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
                                            as="textarea"
                                        type="text"
                                        className={cn(
                                            "border border-black dark:border-white w-full p-2 rounded",
                                            {
                                            "border-[2px] border-red-800 dark:border-red-800":
                                                errors.projectDescription && touched.projectDescription,
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
                                        <CardFooter className="border-t px-6 py-4">
                                        <Button className="w-full" type="submit" disabled={!isValid || isSubmitting || (projectDetails?.projectName == values.projectName && projectDetails.projectDescription == values.projectDescription)}>
                                            <span className={
                                                cn(
                                                    {
                                                        'hidden': isSubmitting
                                                    }
                                                )
                                            }>Save</span>
                                            <svg aria-hidden="true" role="status" className={
                                                cn(
                                                    "inline w-4 h-4 me-3 text-white animate-spin",
                                                    {
                                                        'hidden': !isSubmitting
                                                    }
                                                )
                                            } viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                            </svg>                                              
                        
                                        </Button>
                                        </CardFooter>
                                    </form>
                                )}
                        </Formik>
                    </CardContent>
                    
                </Card>
                {projectDetails?.invitationCode && (
                    <Card x-chunk="Project Share Details">
                    <CardHeader>
                        <CardTitle className="text-lg">Share with friends</CardTitle>
                    </CardHeader>
                    <CardContent className="w-full">
                        <div className="flex w-full">
                            <div className="text-lg flex-1">
                                {projectDetails?.invitationCode}
                            </div>
                            <div className="">
                                <Button variant="secondary" onClick={() => handleCopyInvitationCode()}>Copy</Button>
                            </div>
                        </div>
                    </CardContent>
                    
                </Card>
                )}
            </div>
            </div>
        </main>
    )
}
export default function ManageProjectDefaultPage() {
    const {currentProfile} = useProfileContext();
    const [isDatataLoading, setIsDatataLoading] = useState(true);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [role, setRole] = useState<"member" | "owner">("member"); // Default role is member
    const [projectDetails, setProjectDetails] = useState<ProjectDetailsType>();
    const params = useParams();
    const { toast } = useToast();

    

    // Handle copy the inviation code to clipboard
    const handleCopyInvitationCode = () => {
        try {
            navigator.clipboard.writeText(projectDetails?.invitationCode || "");
            toast({
                variant: "default",
                title: `Success`,
                className: "text-white bg-green-900",
                description: "The invitation code has been copied to the clipboard",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: `Error`,
                description: "An error occurred while copying the invitation code to the clipboard",
              });
        }
    }

    useEffect(() => {
        const {id} = params;
        // Function to fetch project data
        const fetchProjectData = async () => {
            setIsDatataLoading(true);
            setPermissionDenied(false);
            // Fetch project data
            await axiosInstance.get(`/projects/${id}/general`).then((res) => {
                if(!res.data.projectDetails || !res.data.role) {
                    setPermissionDenied(true);
                    return;
                }
                setProjectDetails(res.data.projectDetails);
                setRole(res.data.role);
            }).catch((e) => {
                setPermissionDenied(true);
            });
            // Fetch project members
            // Fetch project settings
        }
        if(currentProfile) fetchProjectData().then(() => setIsDatataLoading(false));
    }, [currentProfile]);

    if(isDatataLoading) return (<ManageProjectDefaultPageSkeleton />);
    if(permissionDenied || !role) return (<ProjectNotFound />);

    if(role == "owner") return (<ProjectManagementForTheOwnerOfTheProject projectDetails={projectDetails} handleCopyInvitationCode={handleCopyInvitationCode} setProjectDetails={setProjectDetails} /> );
    return (
        <div>
            viewing this as member
        </div>
    );
}