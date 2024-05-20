"use client";

import { MetaProjectCollaborativeCodes, ownedMetaProjectsType } from "@/lib/types/general.types";
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

type DisplayMetaProjectCollaborationCodeInformationsProps = {
    mpCollaborativeCode: MetaProjectCollaborativeCodes
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
export default function DisplayMetaProjectCollaborationCodeInformations(props: DisplayMetaProjectCollaborationCodeInformationsProps) {
    const { mpCollaborativeCode } = props;

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>
            {mpCollaborativeCode.childProjectName}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Students</p>
            <p className="text-md font-bold">{mpCollaborativeCode.members?.length}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
            <p className="text-md font-medium">{convertDateTime(mpCollaborativeCode.createdAt)}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Invitation Code</p>
            <div className="flex items-center gap-2">
              <Input className="flex-1" readOnly value={mpCollaborativeCode.code} />
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
                {mpCollaborativeCode.members?.length === 0 ? (
                  <NoContentAvailable title="No student yet" description="All joined students will be displayed here" />
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {mpCollaborativeCode.members?.map((member) => (
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
      </CardContent>
    </Card>
  )
}