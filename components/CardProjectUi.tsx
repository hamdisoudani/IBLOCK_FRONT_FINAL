import projectImg from "@/public/image1/standard-block-colors.png";
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
import Image from "next/image";
import { UserProject } from "@/lib/types/general.types";
import { CardBody, CardContainer, CardItem } from "./ui/3d_card";
import Link from "next/link";
import { Trash2 } from "lucide-react";



type CardProjectUiProps = {
    project: UserProject,
    handleDeleteProject: (project: UserProject) => void,
    owned?: boolean
}

  export const CardProjectUi = (props: CardProjectUiProps) => {
    const { project, handleDeleteProject, owned } = props;
    return (<CardContainer className="inter-var pb-0 pt-0 py-0">
      <CardBody className="pt-0 pb-0 py-0 w-80 h-auto bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-4 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {project.projectName}
        </CardItem>
        
        <CardItem translateZ="100" className="w-full h-[20%] mt-4">
          <Image
            src={projectImg}
            loading="lazy"
            height="1000"
            width="1000"
            className="h-60 w-90 object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6 md:mt-4 sm:mt-2">
          <CardItem
            translateZ={20}
            as={Link}
            href={`/dashboard/project/${project._id}`}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white border border-secondary hover:border-primary"
          >
            Open project
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href={`/dashboard/project/${project._id}/manage`}
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white border border-secondary hover:border-primary"
          >
            View project
          </CardItem>                                                     
                </div>
                {owned && (
                    <div className="absolute top-0 right-0 p-2 cursor-pointer rounded-md hover:bg-gray-200">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Trash2 className='text-primary h-4 w-4' />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
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
                    </div>
                )}
            </CardBody>
        </CardContainer>);
  };