"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  UserIcon,
  HelpCircleIcon,
  Home,
  Settings,
  HomeIcon,
  PackageIcon,
  PanelLeft,
  Package2,
  Package,
  LineChart,
} from "lucide-react";
import { ModeToggle } from "@/components/mode_toggle";
import { usePathname } from "next/navigation";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, User } from "@nextui-org/react";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { siteConfig } from "@/configs/siteconfig";
import Link from "next/link";
import Avatar from 'boring-avatars';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import LogOutComponent, { MobileLogOutComponent } from "./logout";
import { useProfileContext } from "./context/userprofile.context";
import { RiUserSharedFill } from "react-icons/ri";
import {AnimatedTooltip} from "@/components/ui/animated-tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "./ui/use-toast";

type NavbarForProjectProps = {
  invitationCode: string;
}

type MenuItem = {
    name: string;
    path: string;
    icon: React.JSX.Element;
};
  
const UserDropDownForPhone = () => {
    return (
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
  
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4   px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon"  className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs z-[9999]">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Home
                  </Link>
                  <Link href="#" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <UserIcon className="w-4 h-4 mr-2" />
                    My Account
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    My Projects
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Settings
                  </Link>
                  <Link href="dashboard/contactUs" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                    <HelpCircleIcon className="w-4 h-4 mr-2" />
                    Contact Us
                  </Link>
                  <DropdownMenuSeparator />
                  <div className="flex items-center">
                    <LogOutComponent />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            
            
          </header>
            </div>
    );
};
const UserDropDownForPC = () => {
  const {userInformation} = useProfileContext();
  return (
    <DropdownMenu>
      
      <DropdownMenuTrigger className="">
      <Avatar
        size={30}
        name={userInformation?.name}
        variant="marble"
        colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
      />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[9999] w-52 ">
        
        <DropdownMenuItem>
          <Link href="#" className="flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link  href="dashboard/settings"  className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="dashboard/contactUs" className="flex items-center">
            <HelpCircleIcon className="w-4 h-4 mr-2" />
            Contact Us
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
            <MobileLogOutComponent classNames="border-0"/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const NavbarForProject = (props: NavbarForProjectProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const pathName = usePathname();
    const menuItems: MenuItem[] = [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: (
          <HomeIcon
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "/dashboard" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      },
      {
        name: "My Project",
        path: "#",
        icon: (
          <PackageIcon
            className={`sm:w-5 sm:h-5 h-6 w-6 ${
              pathName === "dashboard" ? "text-foreground" : "text-muted-foreground"
            }`}
          />
        ),
      }
    ];
    const people = [
        {
          id: 1,
          name: "ahmed",
          designation: "teacher"
         },
        {
          id: 2,
          name: "mohamed",
          designation: "Student"
          },
        {
          id: 3,
          name: "Jane Smith",
          designation: "Student"
       }
    ];
    const handleCopyInvitationCode = () => {
      try {
          navigator.clipboard.writeText(props.invitationCode || "");
          toast({
              variant: "default",
              title: `Success`,
              className: "text-white bg-green-900",
              description: "The invitation code has been copied to the clipboard",
              
          });
      } catch (error) {
          toast({
              variant: "destructive",
              title: `Error`,
              description: "An error occurred while copying the invitation code to the clipboard",
            });
      }
  }
 const ShareCode=() => {
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <div className="flex flex-row">
                  <RiUserSharedFill  className="w-5 h-5" />
                  Shared code
                </div>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
              <AlertDialogTitle>Share code</AlertDialogTitle>
              <AlertDialogDescription>
              {props.invitationCode}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction asChild>
                <Button onClick={handleCopyInvitationCode}>Copy</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
const ShareCodeForPhone=() => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      
            <RiUserSharedFill  className="w-5 h-5" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share code</AlertDialogTitle>
          <AlertDialogDescription>
          {props.invitationCode}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={handleCopyInvitationCode}>Copy</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
  
    return (
      <div className="flex w-full">
        <NavigationMenu className="w-full">
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="w-full py-2 rounded-full -px-2 flex"
        >
          {/* Mobile View */}
          <div className="sm:hidden px-0 w-full">
            <NavbarContent className="w-full px-0 flex">
              {/* Left Section */}
              <div className="flex-1">
                <div className="flex flex-row items-center w-full">
                  <AnimatedTooltip items={people} />
                </div>
              </div>
              {/* Right Section */}
              <div className="flex items-center justify-end">
                <ShareCodeForPhone />
                <UserDropDownForPhone />
              </div>
            </NavbarContent>
          </div>
          {/* Desktop View */}
          <div className="hidden sm:flex">
            <NavbarContent justify="center" className="flex justify-between" style={{ width: "92vw" }}>
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
              <div className=" items-center justify-end space-x-2 hidden sm:flex">
                {/* Profile Popover */}
                <div className="mr-1">
                  <ShareCode />
                </div>
                <div className="sm:block hidden">
                  <div className="flex flex-row items-center justify-center mr-1 w-full">
                    <AnimatedTooltip items={people} />
                  </div>
                </div>
                <ModeToggle />
                <UserDropDownForPC />
              </div>
            </NavbarContent>
          </div>
        </Navbar>

        </NavigationMenu>
      </div>
    );
  }