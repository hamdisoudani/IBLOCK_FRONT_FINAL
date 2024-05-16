import { UserProject } from "@/lib/types/general.types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "./ui/card";
import Image from "next/image";
import projectImg from "@/public/image1/standard-block-colors.png";
import { CodeXml, Eye, Trash2, Users2 } from "lucide-react";
import { Button } from "./ui/button";
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
  } from "@/components/ui/alert-dialog"
import Link from "next/link";

type CardProjectUiProps = {
    project: UserProject,
    handleDeleteProject: (project: UserProject) => void,
    owned?: boolean
}
export default function DisplayUserProjects(props: CardProjectUiProps) {
    const { project, handleDeleteProject, owned } = props;

  return (
        <Card className="w-[270px] sm:w-[200px] h-full">
            <CardHeader className="p-2">
                <CardTitle className="flex flex-row items-center mt-0 justify-between text-md m-0">
                    <span className="flex-1 truncate">{project.projectName}</span>
                    <div className="flex items-center justify-end gap-1 py-1 px-1">
                        {project.members?.length}
                        <Users2 className="w-5 h-5" />
                    </div>
                </CardTitle>
                
                
            </CardHeader>
            <CardContent className="flex flex-col px-0 py-0">
                <div className="w-full h-[150px] flex flex-col">
                    <Image
                        src={projectImg}
                        loading="lazy"
                        height="0"
                        width="0"
                        className="h-full w-full object-cover group-hover/card:shadow-xl dark:invert-0"
                        alt="thumbnail"
                    />
                </div>
                <div className="flex justify-between place-items-end pt-2 gap-1 px-2">
                    <Button className="w-full hover:bg-transparent" variant={'ghost'} asChild>
                        <Link href={`/dashboard/project/${project._id}/manage`}>
                            <Eye className="w-5 h-5 text-primary" />
                        </Link>
                    </Button>
                    <Button className="w-full hover:bg-transparent" variant={'ghost'} asChild>
                        <Link href={`/dashboard/project/${project._id}`}>
                            <CodeXml className="w-5 h-5 text-primary" />
                        </Link>
                    </Button>
                    {owned && (
                        <Button className="w-full hover:bg-transparent" variant={'ghost'}>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Trash2 className='text-red-600 h-4 w-4' />
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            project and remove your data from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDeleteProject(project)}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
  );
}