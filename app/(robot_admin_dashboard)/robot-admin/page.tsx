import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BlocksIcon, BotIcon } from "lucide-react"

export default function Page() {

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="mb-2 mt-2 flex justify-end">
                <Button variant={'default'} size={'default'} asChild>
                    <Link href="/robot-admin/robots">Manage Robots</Link>
                </Button>
                <Button variant={'secondary'} size={'default'} className="ml-2">Add Block</Button>
                <Button variant={'default'} size={'default'} asChild className="ml-2">
                    <Link href="robot-admin/my_device">My device</Link>
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Robots</CardTitle>
                <BotIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Robots</CardTitle>
                <BotIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">987</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+12.5% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Blocks</CardTitle>
                <BlocksIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">5,678</div>
                <p className="text-xs text-gray-500 dark:text-gray-400">+8.2% from last month</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Blocks</CardTitle>
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
                <CardTitle>Robots</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                        <TableCell className="font-medium">R001</TableCell>
                        <TableCell>Robot Alpha</TableCell>
                        <TableCell>
                            <Badge variant={'default'}>Active</Badge>
                        </TableCell>
                        <TableCell>2023-05-01 10:30 AM</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">R002</TableCell>
                        <TableCell>Robot Bravo</TableCell>
                        <TableCell>
                            <Badge variant={'destructive'}>Idle</Badge>
                        </TableCell>
                        <TableCell>2023-05-01 09:15 AM</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">R003</TableCell>
                        <TableCell>Robot Charlie</TableCell>
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
                <CardTitle>Blocks</CardTitle>
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
                        <TableCell className="font-medium">B001</TableCell>
                        <TableCell>Block Alpha</TableCell>
                        <TableCell>Obstacle</TableCell>
                        <TableCell>
                            <Badge variant={'default'}>Active</Badge>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">B002</TableCell>
                        <TableCell>Block Bravo</TableCell>
                        <TableCell>Checkpoint</TableCell>
                        <TableCell>
                            <Badge variant={'secondary'}>Idle</Badge>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell className="font-medium">B003</TableCell>
                        <TableCell>Block Charlie</TableCell>
                        <TableCell>Obstacle</TableCell>
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