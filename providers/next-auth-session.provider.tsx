"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ShadCnToaster } from "react-hot-toast";

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
          
          {children}
          
        </div>
    <Toaster />
    <ShadCnToaster />
  </ThemeProvider>
  );
}