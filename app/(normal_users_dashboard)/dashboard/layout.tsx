"use client";

import { NavbarForNormalUsers } from "@/components/navbar_for_logged_users";
import { ProfileProvider } from "@/components/context/userprofile.context";


export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ProfileProvider
    >
      <NavbarForNormalUsers />
      <div className="">
        {children}
      </div>
    </ProfileProvider>
    
  );
}