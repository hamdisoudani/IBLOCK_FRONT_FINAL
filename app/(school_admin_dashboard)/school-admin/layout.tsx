"use client";

import {NavbarForSchoolAdmin} from "@/components/navbar_for_school_admin";
import { ProfileProvider } from "@/components/context/userprofile.context";
import { ThemeProvider } from "@/components/theme-provider";


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
            
                <NavbarForSchoolAdmin />
                <div className="m-3 rounded-md">
                
                {children}
                
                </div>
            </ProfileProvider>
          
        </div>
  </ThemeProvider>
    
  );
}