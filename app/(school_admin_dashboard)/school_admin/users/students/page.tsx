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



  
export default function Page() {
   
    return (
        <div className="flex w-full h-full">
            
            
            <div className="w-full h-full overflow-auto">
            <div className="flex items-center justify-between">
                
                
                </div>
                    <div className="flex items-center justify-between flex-wrap mb-4 sm:hidden">
                        <h2 className="text-2xl font-bold ">Students</h2>
                        
                    </div>
                    <div className="hidden items-center justify-between flex-wrap mb-4 sm:flex">
                        <h2 className="text-2xl font-bold ">Students</h2>
                        <div className='flex-1'>
                            &nbsp;
                        </div>
                        
                    </div>
                    <DataTablePage />
            </div>
            
            

        </div>
    );
}






