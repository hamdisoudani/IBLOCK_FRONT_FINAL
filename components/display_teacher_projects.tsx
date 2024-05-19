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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
type CardProjectUiProps = {
    project: UserProject,
    handleDeleteProject: (project: UserProject) => void,
    owned?: boolean
}
const projectData = [
    {
      codeProjet: "Projet 1",
      membres: ["1", "2", "3", "4", "5"],
      utilisateurs: 12,
    },
    {
      codeProjet: "Projet 3",
      membres: ["1", "2", "3", "4", "5"],
      utilisateurs: 8,
    },
    {
      codeProjet: "Projet 4",
      membres: ["1", "2", "3", "4", "5", "6"],
      utilisateurs: 36,
    },
    {
      codeProjet: "Projet 5",
      membres: ["1", "2", "3", "4", "5"],
      utilisateurs: 4,
    },
  ];
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Edit Profile</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                            <div className="mx-auto max-w-2xl py-12">
                            <div className="border rounded-lg overflow-hidden">
                            <table className="w-full table-auto">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                                <tr>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Code projet</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Membres</th>
                                <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400 text-sm">Utilisateurs</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {projectData.map((project, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">{project.codeProjet}</td>
                                    <td className="px-4 py-3">
                                    <Select>
                                        <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sélectionner" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {project.membres.map((membre) => (
                                            <SelectItem key={membre} value={membre}>{membre}</SelectItem>
                                        ))}
                                        </SelectContent>
                                    </Select>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{project.utilisateurs}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                            </div>
                            </div>
                            </div>
                            <DialogFooter>
                            <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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