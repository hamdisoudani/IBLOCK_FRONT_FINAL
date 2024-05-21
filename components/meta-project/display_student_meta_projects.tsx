import { joinedMetaProjectsType } from "@/lib/types/general.types";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { convertDateTime } from "@/composables/convert_date_time";
import Link from "next/link";
type DisplayStudentJoinedMetaProjectsProps = {
    project: joinedMetaProjectsType,
    handleDeleteProject?: (project: joinedMetaProjectsType) => void,
    owned?: boolean
}


export default function DisplayStudentJoinedMetaProjects(props: DisplayStudentJoinedMetaProjectsProps) {
    const { project } = props;

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>{project.projectName}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created by</p>
            <p className="text-md font-bold">{project.owner.name}</p>
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
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined students</p>
                <p className="text-md font-medium">{project.numberOfMembers}</p>
            </div>
          )}
        </div>
<<<<<<< HEAD
        
        <Button asChild>
          <Link href={`/dashboard/project/${project._id}/manage`}>open project</Link>
=======
        <Button asChild>
          <Link href={`/dashboard/project/${project._id}`}>View project</Link>
>>>>>>> a0880d4580ee88d7c3cafab7239765ee1bc74650
        </Button>
      </CardContent>
    </Card>
  )
}