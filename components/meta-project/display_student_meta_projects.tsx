import { joinedMetaProjectsType, ownedMetaProjectsType } from "@/lib/types/general.types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { convertDateTime } from "@/composables/convert_date_time";
import { NoContentAvailable } from "../no_content_available"
import Link from "next/link";
type DisplayStudentJoinedMetaProjectsProps = {
    project: joinedMetaProjectsType,
    handleDeleteProject?: (project: joinedMetaProjectsType) => void,
    owned?: boolean
}


export default function DisplayStudentJoinedMetaProjects(props: DisplayStudentJoinedMetaProjectsProps) {
    const { project, handleDeleteProject, owned } = props;

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>{project.projectName}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Students</p>
            <p className="text-md font-bold">{project.members?.length}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
            <p className="text-md font-medium">{convertDateTime(project.createdAt)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Collaborative</p>
            <p className="text-md font-medium">{project.collaborative}</p>
          </div>
          {project.collaborative === "Yes" && (
            <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created By</p>
                <p className="text-md font-medium">{project.owner.name}</p>
            </div>
          )}
        </div>
        
        <Button asChild>
          <Link href={`/dashboard/project/${project._id}/manage`}>open project</Link>
        </Button>
      </CardContent>
    </Card>
  )
}