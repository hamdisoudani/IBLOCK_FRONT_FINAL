"use client"

import * as React from "react"
import { Check, ChevronsUpDown, GraduationCap, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axiosInstance from "@/plugins/axios"
import { Skeleton } from "./ui/skeleton"
import { useErrorToast } from "@/hooks/useToast"
import { useProfileContext } from "./context/userprofile.context"
import { Badge } from "./ui/badge"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

type ProfileType = {
    _id: string, 
    profileName: string,
    createdAt: string,
    updatedAt: string,
    type: string
}

interface Profiles {
    selectedProfile: ProfileType,
    availableProfiles: ProfileType[]
}

export function UserProfiles() {
    const {currentProfile, setCurrentProfile, setIsLoading, setIsLoadingError} = useProfileContext()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [data, setData] = React.useState<Profiles>();
    const [loading, setLoading] = React.useState(true);
    const { data: session, update } = useSession();
    const currentPath = usePathname();
    const router = useRouter();
    React.useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
            // Contact the API endpoint
            const response = await axiosInstance.get('/profile');
            
            if (response.data) {
              setData(response.data);
              setCurrentProfile(response.data.selectedProfile)
            } else {
              setIsLoadingError(true)
            }
            } catch (error) {
              setIsLoadingError(true)
            } finally {
            setLoading(false);
            }
        };

        if(value != currentProfile?._id.toString()) {
          fetchDataFromApi();
        }
    }, [value]);

    const SwitchCurrentProfile = async (profile: ProfileType) => {
        setLoading(true);
        setIsLoading(true);
        await axiosInstance.post('/profile/switch', {
            profileId: profile._id
        }).then(async (res: any) => {
            if(res.data.accessToken) {
                await update({
                  ...session,
                  user: {
                    ...session?.user,
                    accessToken: res.data.accessToken,
                  },
                })

            }
            if(currentPath != "/dashboard") router.push("/dashboard"); // Redirect to dashboard
        }).catch(() => {
            useErrorToast("There was a problem processing your request")
        }).finally(() => {
            setValue(profile.profileName)
            setOpen(false)
            setIsLoading(false)
        })
    }
    
        if(loading) return (
            <>
                <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-52" />
                </div>
            </>
        )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="sm:w-[180px] w-[150px] flex items-center"
        >
          <span className="truncate flex-1 text-left">
            {data?.selectedProfile.profileName}
          </span>
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 z-[9999999] ">
        <Command>
          <CommandGroup heading="Current Active Profile"></CommandGroup>
          <CommandItem
                className=" mb-2"
                value={currentProfile?.profileName}
              >
                
                {currentProfile?.profileName}
                <CommandShortcut>
                {
                    currentProfile?.type == "school" ? (
                        <Badge variant="outline">School</Badge>


                    ) : (
                        <Badge variant="outline">Personal</Badge>

                    )
                }
                </CommandShortcut>
            </CommandItem>
          <CommandSeparator />
          <CommandGroup heading="Available Profiles" className="z-[9999]">
            {data?.availableProfiles.map((profile) => (
              <CommandItem
                key={profile._id}
                value={profile.profileName}
                onSelect={() => SwitchCurrentProfile(profile)}
              >
                
                {profile.profileName}
                <CommandShortcut>
                {
                    profile.type == "school" ? (
                        <Badge variant="outline" className="text-sm">School</Badge>


                    ) : (
                        <Badge variant="outline">Personal</Badge>

                    )
                }
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
