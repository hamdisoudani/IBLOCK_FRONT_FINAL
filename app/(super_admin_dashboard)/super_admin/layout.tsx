"use client";
import { ProfileProvider } from "@/components/context/userprofile.context";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarForSuperAdmin } from "@/components/navbar_for__super_admin";

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
        <div className=" rounded-md">
          
            <ProfileProvider
            >
                <NavbarForSuperAdmin />
                <div className="m-3 rounded-md">
                
                {children}
                
                </div>
            </ProfileProvider>
          
        </div>
  </ThemeProvider>
    
  );
}