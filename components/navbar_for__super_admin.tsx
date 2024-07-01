"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  UserIcon,
  HelpCircleIcon,
  LogOutIcon,
  CheckIcon,
} from "lucide-react";
import { ModeToggle } from "@/components/mode_toggle";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { siteConfig } from "@/configs/siteconfig";
import { TfiLayoutGrid4Alt } from "react-icons/tfi"
import {  FaSchool } from "react-icons/fa"
import { FaUsersGear } from "react-icons/fa6"
import { FaSchoolFlag } from "react-icons/fa6";
import Link from "next/link"
import LogOutComponent from "./logout";

type MenuItem = {
    name: string;
    path: string;
    icon: React.JSX.Element;
  };
  const MenuActionsSchool = (props:  {pathName: string}) => {
    const { pathName } = props;
    const menuItems: MenuItem[] = [
      {
        name: "users",
        path: "/super-admin/users",
        icon: (
          <FaUsersGear
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/super-admin/users" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "schools",
        path: "/super-admin/schools",
        icon: (
            <FaSchoolFlag  
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/super-admin/schools" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
     
      
      {
        name: "Logout",
        path: "/logout", 
        icon: (
          <div className={
            cn("flex justify-start hover:text-gray-700")
          } >
            <LogOutComponent classNames="ml-0 pl-0" />
          </div>
          
        ), 
      },
    ];
     
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
                <span>Home</span>
                </Link>
                <nav className="flex flex-col gap-2 mt-2">
                {
                  menuItems.map(item => {
                    return (
                        <Link className={
                          cn("flex items-center gap-2 mt-2 hover:text-gray-700", {
                            "flex items-center gap-2 mt-2 hover:text-gray-50 bg-gray-800 rounded-md p-2": item.path === pathName
                          })
                        } href={item.path}>
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
export const NavbarForSuperAdmin = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathName = usePathname();
    const menuItems: MenuItem[] = [
      {
        name: "Home",
        path: "/super-admin",
        icon: (
          <FaSchool
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/super-admin" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "users",
        path: "/super-admin/users",
        icon: (
          <FaUsersGear
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/super_admin/users" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "schools",
        path: "/super-admin/schools",
        icon: (
            <FaSchoolFlag  
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/super-admin/schools" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      
    ];
  
    return (
      <div className="flex w-full">
          <NavigationMenu className="w-full px-1">
              <Navbar
                  isMenuOpen={isMenuOpen}
                  onMenuOpenChange={setIsMenuOpen}
                  className="bg-background w-full mt-2 rounded-full"
              >
                  {/* Mobile View */}
                  <div className="flex sm:hidden lg:w-full md:w-[950px] w-[600px] px-0">
                    <div className="flex flex-1 w-[90px]">
                        <NavbarBrand className="font-bold">
                            {siteConfig.siteName} - Super Admin
                        </NavbarBrand>
                    </div>
                    <div className="flex items-end ml-auto space-x-3">
                        <MenuActionsSchool pathName={pathName} />
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden sm:flex sm:justify-center">
                      <NavbarContent justify="center" className="flex justify-between w-[92vw]">
                          {/* Left Section */}
                          <div className="flex flex-1 w-[90px]">
                              <NavbarBrand className="font-bold">
                                  {siteConfig.siteName}
                              </NavbarBrand>
                          </div>

                          {/* Middle Section */}
                          <div className="flex items-center justify-center w-full space-x-3">
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

                          {/* Right Section */}
                          <div className="flex items-center justify-end space-x-2">
                              <ModeToggle />
                              <LogOutComponent />
                          </div>
                      </NavbarContent>
                  </div>
              </Navbar>
          </NavigationMenu>
      </div>

    );
  }