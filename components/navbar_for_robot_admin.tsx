"use client"
import * as React from "react"
import Link from "next/link"
import {
  HomeIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"


import {
  LogOutIcon,
} from "lucide-react";

import { ModeToggle } from "@/components/mode_toggle";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { siteConfig } from "@/configs/siteconfig";
import { TfiLayoutGrid4Alt } from "react-icons/tfi"
import { FaRobot } from "react-icons/fa"
import { SiCodeblocks } from "react-icons/si"
import LogOutComponent from "./logout"

type MenuItem = {
    name: string;
    path: string;
    icon: React.JSX.Element;
  };
  
  const MenuActionsRobot = (props:  {pathName: string}) => {
    const { pathName } = props;
    const menuItems: MenuItem[] = [
      {
        name: "Dashboard",
        path: "/robot-admin",
        icon: (
          <HomeIcon
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/robot-admin" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "Devices",
        path: "/robot-admin/my_device",
        icon: (
          <FaRobot 
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/robot-admin/my_device" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "Blocks",
        path: "/robot-admin/my_blocks",
        icon: (
          <SiCodeblocks 
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/robot-admin/my_blocks" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
     
      {
        name: "Logout",
        path: "#",
        icon: (
          <LogOutIcon
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "#" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
    ];
     
    return (
      <div className="flex flex-col z-[9999]">
  
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4   px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" >
                  <TfiLayoutGrid4Alt className="h-5 w-5"  />
                  
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs z-[9999]">
                <nav className="flex flex-col gap-2 mt-2">
                {
                  menuItems.map(item => {
                    return (
                        <Link className={
                          cn("flex items-center gap-2 mt-2 hover:text-gray-700", {
                            "flex items-center gap-2 mt-2 hover:text-gray-50 bg-gray-800 rounded-md p-2": item.path === pathName
                          })
                        } href={item.path}
                        key={item.name}>
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    )
                  })
                    
                }
                </nav>
            </SheetContent>
            </Sheet>
            
            
          </header>
            </div>
    );
  };
   
export const NavbarForRobotAdmin = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathName = usePathname();
    
    const menuItems: MenuItem[] = [
      {
        name: "Dashboard",
        path: "/robot-admin",
        icon: (
          <HomeIcon
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/robot-admin" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "Devices",
        path: "/robot-admin/my_device",
        icon: (
          <FaRobot 
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/robot-admin/my_device" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "Blocks",
        path: "/robot-admin/my_blocks",
        icon: (
          <SiCodeblocks 
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/robot-admin/my_blocks" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
    ];

    
  
    return (
      <div className="flex w-full">
        <NavigationMenu className="w-full px-3">
              <Navbar
                isMenuOpen={isMenuOpen}
                onMenuOpenChange={setIsMenuOpen}
                className="bg-background w-full p-2 rounded-full"
              >
                {/* Mobile View */}
                <div className="sm:hidden flex lg:w-full md:w-[950px] w-[600px] px-0">
                  <NavbarContent className="w-full flex justify-between ">
                    {/* Left Section */}
                    {/* <div className="flex items-center left-0 flex-1">
                    <UserProfiles />
                    </div> */}
                    <div className="flex flex-1 w-[90px]">
                      <NavbarBrand className="font-bold">{siteConfig.siteName} - Robot Admin</NavbarBrand>
                    </div>
  
                    
                    {/* Right Section */}
                    <div className="flex items-center space-x-3">
                        <MenuActionsRobot pathName={pathName}/>
                    </div>
                  </NavbarContent>
                </div>
                {/* Desktop View */}
                <div className="hidden sm:flex sm:justify-center">
                  <NavbarContent justify="center" className="flex justify-between" style={{width: "92vw"}}>
                    <div className="flex flex-1 justify-between w-full">
                      {/* Left Section */}
                      <div className="flex flex-1 w-[90px]">
                        <NavbarBrand className="font-bold">{siteConfig.siteName}</NavbarBrand>
                      </div>
                        
                        {/* Middle Section */}
                        <div className="flex space-x-3 w-full items-center place-content-center">
                          {/* Menu Items */}
                          <div className="flex space-x-4 text-primary">
                            {menuItems.map((item, index) => (
                              <NavbarItem key={`${item}-${index}`} className="text-sm font-semibold gap-3">
                                <Link href={item.path}>
                                  <span
                                    className={`flex items-center gap-1 ${
                                      item.path === pathName ? "text-foreground" : "text-muted-foreground"
                                    }`}
                                  >
                                    {item.icon}
                                    {item.name}
                                  </span>
                                </Link>
                              </NavbarItem>
                            ))}
                          </div>
                        </div>
                      </div>
                        
                        {/* Right Section */}
                        <div className="flex items-center justify-end space-x-2">
                          {/* Profile Popover */}
                          {/* <div className="lg:block md:block hidden">
                          <UserProfiles />
                          </div> */}
                          <ModeToggle />
                          <div className="ml-auto flex items-center space-x-4">
                            <LogOutComponent />
                          </div>
                          
                        </div>
                      </NavbarContent>
                    </div>
                  </Navbar>
        </NavigationMenu>
      </div>
    );
  }