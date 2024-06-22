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
import { FaRobot, FaSchool } from "react-icons/fa"
import { FaUsersGear } from "react-icons/fa6"
import { LiaBookSolid, LiaChalkboardTeacherSolid } from "react-icons/lia"
import { BsFileTextFill } from "react-icons/bs"
import Link from "next/link"

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
        path: "/school_admin/users",
        icon: (
          <FaUsersGear
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/school_admin/users" ? "text-foreground" : "text-muted-foreground"
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
export const NavbarForSchoolAdmin = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathName = usePathname();
    const menuItems: MenuItem[] = [
      {
        name: "School Dashboard",
        path: "/school_admin",
        icon: (
          <FaSchool
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/school_admin" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "users",
        path: "/school_admin/users",
        icon: (
          <FaUsersGear
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/school_admin/users" ? "text-foreground" : "text-muted-foreground"
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
          className="bg-background w-full p-2 rounded-full"
        >
          {/* Mobile View */}
          <div className="flex sm:hidden lg:w-full md:w-[950px] w-[600px] px-0">
            <div className="flex flex-1 w-[90px]">
              <NavbarBrand className="font-bold">{siteConfig.siteName} - Super Admin</NavbarBrand>
            </div>
            <div className="flex items-end ml-auto space-x-3">
              <ModeToggle />
              <MenuActionsSchool pathName={pathName} />
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden sm:flex sm:justify-center">
            <NavbarContent justify="center" className="flex justify-between" style={{ width: "92vw" }}>
              <div className="flex flex-1 justify-between w-full">
                {/* Left Section */}
                <div className="flex flex-1 w-[90px]">
                  <NavbarBrand className="font-bold">{siteConfig.siteName}</NavbarBrand>
                </div>

                {/* Middle Section */}
                <div className="flex space-x-3 w-full items-center place-content-center">
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
              <div className="flex items-center  space-x-4">
                <ModeToggle />
                <div className="flex items-center space-x-2">
                  <Button className=" " variant="outline">
                    <LogOutIcon className="h-5 w-5" />
                    <span>Log Out</span>
                  </Button>
                </div>
              </div>
            </NavbarContent>
          </div>
        </Navbar>
      </NavigationMenu>
    </div>
  );
};
    