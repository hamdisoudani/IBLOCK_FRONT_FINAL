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
        <Dialog>
          <DialogTrigger asChild>
            <Button>View Joined Students</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Joined Students</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[300px] w-full">
              <div className="p-4">
                {project.members?.length === 0 ? (
                  <NoContentAvailable title="No student yet" description="All joined students will be displayed here" />
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {project.members?.map((member) => (
                      <div className="flex items-center gap-4" key={member._id}>
                          <Avatar>
                          <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                          <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                          </div>
                      </div>
                    ))}
                  </div>
                )}
              
              </div>
            </ScrollArea>
            <DialogFooter>
                <DialogClose asChild>
                    <Button>Close</Button> 
                </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button asChild>
          <Link href={`/dashboard/meta-project/${project._id}`}>View meta project</Link>
        </Button>
      </CardContent>
    </Card>
  )
}