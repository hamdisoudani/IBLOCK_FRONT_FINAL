"use client";
import { ProfileProvider } from "@/components/context/userprofile.context";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarForNotLoggedUsers } from "@/components/navbar_for_not_logged_users";

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
                <NavbarForNotLoggedUsers />
                <div className="m-3 rounded-md">
                
                {children}
                
                </div>
            </ProfileProvider>
          
        </div>
  </ThemeProvider>
    
  );
}