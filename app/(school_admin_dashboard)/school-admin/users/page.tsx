"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "react-form-wizard-component/dist/style.css";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import DataTablePage from '@/components/data-table/data-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FaSchool } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { LiaBookSolid } from "react-icons/lia";
import { BsFileTextFill } from "react-icons/bs";
import { CirclePlusIcon } from 'lucide-react';

const CreateUser = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="outline">
                <CirclePlusIcon className="w-5 h-5 mr-2" />
                Create User
                </Button>
            </SheetTrigger>


            <SheetContent>
                <ScrollArea className='h-full'>
                    <SheetHeader>
                        <SheetTitle>Create User</SheetTitle>
                        <SheetDescription>
                        Enter the user details to create a new account.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="mx-auto max-w-md space-y-6">
                    <form className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter your full name" required />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="Enter your email" required type="email" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="Enter a password" required type="password" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" placeholder="Confirm your password" required type="password" />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="student" >
                            <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="teacher">Teacher</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        
                    </form>
                    </div>
                    <SheetFooter className='mt-1 flex justify-start items-start pr-4'>
                        <SheetClose asChild>
                            <Button type="submit">Create User</Button>
                        </SheetClose>
                    </SheetFooter>
                </ScrollArea>
            </SheetContent>

        </Sheet>
    )
}

  
export default function Page() {
   
    return (
        <div className="flex w-full h-full">
            
            
            <div className="w-full h-full overflow-auto">
                
                    <div className="flex items-center justify-between flex-wrap mb-4 sm:hidden">
                        <h2 className="text-2xl font-bold ">Users</h2>
                        
                        <CreateUser />
                    </div>
                    <div className="hidden items-center justify-between flex-wrap mb-4 sm:flex">
                        <h2 className="text-2xl font-bold ">Users</h2>
                        <div className='flex-1'>
                            &nbsp;
                        </div>
                        <div className='flex items-center'>
                            <CreateUser />
                            
                        </div>
                    </div>
                    <DataTablePage />
            </div>
            
            

        </div>
    );
}






