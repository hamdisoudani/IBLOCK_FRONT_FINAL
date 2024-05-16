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
const MenuActions = () => {
    
   
    return (
      <div className="flex flex-col">
  
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4   px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" >
                  <TfiLayoutGrid4Alt className="h-5 w-5"  />
                  
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
              <Link className="flex items-center gap-2 font-bold" href="/school_admin">
                <FaSchool className="w-6 h-6" />  
                <span>School Dashboard</span>
                </Link>
                <nav className="flex flex-col gap-2 mt-2">
                <Link className="flex items-center gap-2 mt-2 hover:text-gray-50 bg-gray-800 rounded-md p-2 " href="/school_admin/users/students">
                    <FaUsersGear className="w-5 h-5"/>
                    <span>Students</span>
                </Link>
                <Link className="flex items-center gap-2 mt-2 hover:text-gray-700" href="/school_admin/users/teachers">
                    <LiaChalkboardTeacherSolid className="w-5 h-5"/>
                    <span>Teachers</span>
                </Link>
                <Link className="flex items-center gap-2 mt-2 hover:text-gray-700" href="/school_admin/users/classes">
                    <LiaBookSolid  className="w-5 h-5" />
                    <span>Classes</span>
                </Link>
                <Link className="flex items-center gap-2 mt-2 hover:text-gray-700" href="#">
                    <BsFileTextFill className="w-5 h-5" />
                    <span>Reports</span>
                </Link>
                </nav>
            </SheetContent>
            </Sheet>
            
            
          </header>
            </div>
    );
};


  
export default function Page() {
   
    return (
        <div className="flex w-full h-full">
            
            
            <div className="w-full h-full overflow-auto">
            <div className="flex items-center justify-between">
                
                
                </div>
                    <div className="flex items-center justify-between flex-wrap mb-4 sm:hidden">
                        <h2 className="text-2xl font-bold ">Students</h2>
                        <MenuActions />
                    </div>
                    <div className="hidden items-center justify-between flex-wrap mb-4 sm:flex">
                        <h2 className="text-2xl font-bold ">Students</h2>
                        <div className='flex-1'>
                            &nbsp;
                        </div>
                        <div className='flex items-center'>
                            <MenuActions />
                        </div>
                    </div>
                    <DataTablePage />
            </div>
            
            

        </div>
    );
}






