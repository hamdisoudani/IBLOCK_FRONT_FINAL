"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"

import { useProfileContext } from "@/components/context/userprofile.context"
import Avatar from "boring-avatars"
import { Button } from "@/components/ui/button";
import Link from "next/link";

   


export default function Profile() {
    const { userInformation } = useProfileContext();
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container mx-auto px-4 md:px-6 xl:px-0">
      <div className="grid gap-4 sm:px-10">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Avatar
              size={100}
              name={userInformation?.userId}
              variant="marble"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold">{userInformation?.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">{userInformation?.email}</p>
            </div>
            <Button className="ml-auto">
              <Link href="/dashboard/settings">Edit</Link></Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-gray-100 p-4 md:p-8 dark:bg-gray-800">
              <div className="text-3xl md:text-5xl font-bold">12</div>
              <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">Projects Created</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-gray-100 p-4 md:p-8 dark:bg-gray-800">
              <div className="text-3xl md:text-5xl font-bold">8</div>
              <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">Projects Joined</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border bg-gray-100 p-4 md:p-8 dark:bg-gray-800">
              <div className="text-3xl md:text-5xl font-bold">3</div>
              <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400">Schools Joined</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  )
}