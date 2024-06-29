"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useEffect, useState } from "react";
import axiosInstance from "@/plugins/axios";
import { ProjectsDetailsEntity, SchoolAdminStatstype } from "@/lib/types/school_admin_stats.types";
import ProjectNotFound from "@/components/errors/project_not_found";
import { FaUsers } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { PiCodeBlockFill } from "react-icons/pi";
import { Badge } from "@/components/ui/badge"

export default function Page() {
    const [schoolStats, setSchoolStats] = useState<SchoolAdminStatstype | null>(null)
    const [forbidden, setForbidden] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [projects, setProjects] = useState<ProjectsDetailsEntity | null>(null)
    useEffect(() => {
        const getSchoolStats = async () => {
            await axiosInstance.get('/school-admin/stats')
            .then((res) => {
                if(res.data){
                    console.log(res.data)
                    setSchoolStats(res.data)
                }
            }).catch((err) => {
                setForbidden(true)
            }).finally(() => {
                setLoading(false)
            })
        };
        

        getSchoolStats();
        
    }, []);
    if(loading) return <div>Loading...</div>
    if(forbidden) return <ProjectNotFound />
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border border-black dark:border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <FaUsers className="w-4 h-4 text-gray-500 dark:text-gray-400 " />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{schoolStats?.stats.totalMembers}</div>
                
                </CardContent>
            </Card>
            <Card className="border border-black dark:border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Teacher</CardTitle>
                <FaChalkboardTeacher className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{schoolStats?.stats.teachersCount}</div>
                
                </CardContent>
            </Card>
            <Card className="border border-black dark:border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Student</CardTitle>
                <PiStudent className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{schoolStats?.stats.studentsCount}</div>
                
                </CardContent>
            </Card>
            <Card className="border border-black dark:border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Project</CardTitle>
                <PiCodeBlockFill className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{schoolStats?.stats.metaProjectsCount}</div>
                </CardContent>
            </Card>
            </div>
            <div className="grid gap-6">
            <Card className="border border-black dark:border overflow-x-auto">
            <CardHeader>
                <CardTitle>Last 5 Projects</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Email of the owner</TableHead>
                        
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {schoolStats?.stats.metaProjectsDetails?.map((project, index) => (
                        <TableRow key={index} className="border-b dark:border-gray-200 border-gray-700">
                        <TableCell className="font-medium">{project.projectName}</TableCell>
                        <TableCell>{project.createdByDetails?.map((owner, index) => (
                            <span key={index}>{owner.name}</span>
                        ))}</TableCell>
                        <TableCell>{project.createdByDetails?.map((owner, index) => (
                            <span key={index}>{owner.email}</span>
                        ))}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </div>
            </CardContent>
            </Card>
            <Card className="border border-black dark:border overflow-x-auto">
                <CardHeader>
                <CardTitle>Last 5 Users</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-b dark:border-gray-200 border-gray-700">
                    {schoolStats?.stats.last5Users?.map((user, index) => (
                        <TableRow key={index} className="border-b dark:border-gray-200 border-gray-700">
                        <TableCell className="font-medium ">{user.name}</TableCell>
                        <TableCell className="font-medium">{user.role == "teacher" ? (
                            <Badge variant={"default"}>Teacher</Badge>
                        ) : (
                            <Badge variant={"destructive"}>Student</Badge>
                        
                        ) }</TableCell>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableCell>
                    </TableCell>

                    </Table>
                </div>
                </CardContent>
            </Card>
            </div>
        </main>
    )
}