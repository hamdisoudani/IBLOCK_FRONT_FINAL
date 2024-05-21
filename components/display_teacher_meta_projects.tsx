import { ownedMetaProjectsType } from "@/lib/types/general.types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
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
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { convertDateTime } from "@/composables/convert_date_time";
import { NoContentAvailable } from "./no_content_available"
import Link from "next/link";
import axiosInstance from "@/plugins/axios";
import { toast } from "./ui/use-toast";
type DisplayTeacherOwnerMetaProjectsProps = {
    project: ownedMetaProjectsType,
    handleDeleteMetaProject: (project: ownedMetaProjectsType) => void,
}

function CopyIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </svg>
    )
  }
export default function DisplayTeacherOwnerMetaProjects(props: DisplayTeacherOwnerMetaProjectsProps) {
    const { project } = props;
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
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Collaboration codes</p>
                <p className="text-md font-medium">{project.numberOfCollaborativeInvitationCodes}</p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Invitation Code</p>
            <div className="flex items-center gap-2">
              <Input className="flex-1" readOnly value={project.invitationCode} />
              <Button className="shrink-0" size="icon" variant="outline">
                <CopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"destructive"}>Delete Meta Project</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                metaproject and remove any realated data for this project, this includes students projects, invitation codes and students works.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button variant={"destructive"} onClick={() => props.handleDeleteMetaProject(project)}>Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardContent>
    </Card>
  )
}