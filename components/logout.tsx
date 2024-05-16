"use client";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast"
import { useSignOut } from "@/lib/actions/auth/useAuth"
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LogOutComponent(props: {classNames?: string}) {
    const router = useRouter();
    const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const {error, message} = await useSignOut();
          if(error) {
            useErrorToast(message);
            return;
          }
          useSuccessToast("Logged out successfully");
          router.push('/login')
        } catch (error) {
          useErrorToast("Error logging out");
        }
      }

    return (
        <form onSubmit={handleLogout}>
            <Button className={
                cn(
                    "flex items-center space-x-2 w-full hover:bg-transparent",
                    props.classNames
                )
            } variant="ghost" type="submit">
            <LogOutIcon className="h-5 w-5" />
            <span>Log Out</span>
            </Button>
        </form>
    )
}

export function MobileLogOutComponent(props: {classNames?: string}) {
  const router = useRouter();
  const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const {error, message} = await useSignOut();
        if(error) {
          useErrorToast(message);
          return;
        }
        useSuccessToast("Logged out successfully");
        router.push('/login')
      } catch (error) {
        useErrorToast("Error logging out");
      }
    }

  return (
      <form onSubmit={handleLogout}>
          <Button className={
              cn(
                  "flex h-auto space-x-2",
                  props.classNames
              )
          } variant={'ghost'} type="submit" size={'sm'}>
          <LogOutIcon className="h-5 w-5 flex-1" />
          <span>Log Out</span>
          </Button>
      </form>
  )
}