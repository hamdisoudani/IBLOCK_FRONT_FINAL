"use client";
import { ProfileProvider } from "@/components/context/userprofile.context";
import { ThemeProvider } from "@/components/theme-provider";
import {NavbarForRobotAdmin} from "@/components/navbar_for_robot_admin";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
        <div className="m-3 rounded-md">
          
            <ProfileProvider
            >
                <NavbarForRobotAdmin />
                <div className="m-3 rounded-md">
                
                {children}
                
                </div>
            </ProfileProvider>
          
        </div>
  </ThemeProvider>
    
  );
}