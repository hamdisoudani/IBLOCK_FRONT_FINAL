"use client";
import { Button } from '@/components/ui/button';
import React from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import DataTablePage from '@/components/data-table/data-table';
import { CiCirclePlus } from 'react-icons/ci';


const AddDeviceComponent = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                <CiCirclePlus  className="h-5 w-5 mr-2" />  Add device</Button>
            </SheetTrigger>


            <SheetContent>
                <ScrollArea className='h-full'>
                    <SheetHeader>
                        <SheetTitle>Add device</SheetTitle>
                        <SheetDescription>
                            Enter the details of your new device.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-4 pr-4">
                        <div className="grid gap-2">
                            <Label htmlFor="device-id">Device ID</Label>
                            <Input id="device-id" placeholder="Enter device ID" />
                        </div>
                        <div className="grid gap-2 mt-3">
                            <Label htmlFor="device-version">Device Version</Label>
                            <Input
                                defaultValue="0.0.0"
                                id="device-version"
                                placeholder="Enter device version (e.g., 0.0.0)"
                                step="0.0.1"
                                type="number"
                            />
                        </div>
                        <div className="grid gap-2 mt-3">
                            <Label htmlFor="device-name">Device Name</Label>
                            <Input id="device-name" placeholder="Enter device name" />
                        </div>
                        <div className="grid gap-2 mt-3">
                            <Label htmlFor="device-description">Device Description</Label>
                            <Textarea id="device-description" placeholder="Enter device description" />
                        </div>
                        <div className='mt-5'>
                            <Label className="font-semibold">Connection methods options:</Label>
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="serial" />
                                    <Label className="text-sm font-normal" htmlFor="serial">
                                        Serial Port
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="bluetooth" />
                                    <Label className="text-sm font-normal" htmlFor="bluetooth">
                                        Bluetooth
                                    </Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox id="wifi" />
                                    <Label className="text-sm font-normal" htmlFor="wifi">
                                        Wi-Fi
                                    </Label>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <Label className="font-semibold">Allow connection via Live Mode:</Label>
                                <div className="grid gap-2">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="serial" />
                                        <Label className="text-sm font-normal" htmlFor="serial">
                                            Serial Port
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="bluetooth" />
                                        <Label className="text-sm font-normal" htmlFor="bluetooth">
                                            Bluetooth
                                        </Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="wifi" />
                                        <Label className="text-sm font-normal" htmlFor="wifi">
                                            Wi-Fi
                                        </Label>
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <Label className="font-semibold">Allow connection via Upload Mode:</Label>
                                    <div className="grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="serial" />
                                            <Label className="text-sm font-normal" htmlFor="serial">
                                                Serial Port
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="bluetooth" />
                                            <Label className="text-sm font-normal" htmlFor="bluetooth">
                                                Bluetooth
                                            </Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Checkbox id="wifi" />
                                            <Label className="text-sm font-normal" htmlFor="wifi">
                                                Wi-Fi
                                            </Label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <SheetFooter className='mt-1 flex justify-start items-start pr-4'>
                        <SheetClose asChild>
                            <Button type="submit">Add device</Button>
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
                        
                        <AddDeviceComponent />
                    </div>
                    <div className="hidden items-center justify-between flex-wrap mb-4 sm:flex">
                        <div className='flex-1'>
                            &nbsp;
                        </div>
                        <div className='flex items-center'>
                            <AddDeviceComponent />
                            
                        </div>
                    </div>
                    <DataTablePage />
            </div>
            
            

        </div>
    );
}






