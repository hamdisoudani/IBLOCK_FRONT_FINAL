"use client";

import { NavbarForNormalUsers } from "@/components/navbar_for_logged_users";
import { ProfileProvider } from "@/components/context/userprofile.context";
import { usePathname } from "next/navigation";



export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    
    <ProfileProvider
    >
      {!pathname.match(/^\/dashboard\/project\/[^\/]+$/) ? (
      <NavbarForNormalUsers />
      ): 
      null}
      <div className="">
        {children}
      </div>
    </ProfileProvider>
    
  );
}