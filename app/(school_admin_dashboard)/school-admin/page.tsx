import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BlocksIcon, BotIcon, CirclePlusIcon } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"


export default function Page() {

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <BotIcon className="w-4 h-4 text-gray-500 dark:text-gray-400 " />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <BotIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">987</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+12.5% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Project</CardTitle>
                <BlocksIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">5,678</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+8.2% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Project</CardTitle>
                <BlocksIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">4,321</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+3.7% from last month</p>
                </CardContent>
            </Card>
            </div>
            <div className="grid gap-6">
            <Card>
                <CardHeader>
                <CardTitle>Project</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Update</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">P001</TableCell>
                        <TableCell>Project 1</TableCell>
                        <TableCell>
                            <Badge variant={'default'}>Active</Badge>
                        </TableCell>
                        <TableCell>2023-05-01 10:30 AM</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">P002</TableCell>
                        <TableCell>Project 2</TableCell>
                        <TableCell>
                            <Badge variant={'destructive'}>Idle</Badge>
                        </TableCell>
                        <TableCell>2023-05-01 09:15 AM</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">P003</TableCell>
                        <TableCell>Project 3</TableCell>
                        <TableCell>
                            <Badge variant={'outline'}>Offline</Badge>
                        </TableCell>
                        <TableCell>2023-04-30 03:45 PM</TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle>Users</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">U001</TableCell>
                        <TableCell>Ahmed</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>
                            <Badge variant={'default'}>Active</Badge>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">U002</TableCell>
                        <TableCell>Mohamed</TableCell>
                        <TableCell>Teacher</TableCell>
                        <TableCell>
                            <Badge variant={'secondary'}>Idle</Badge>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">U003</TableCell>
                        <TableCell>Ali</TableCell>
                        <TableCell>Student</TableCell>
                        <TableCell>
                            <Badge variant={'destructive'}>Offline</Badge>
                        </TableCell>
                        </TableRow>
                    </TableBody>
                    </Table>
                </div>
                </CardContent>
            </Card>
            </div>
        </main>
    )
}