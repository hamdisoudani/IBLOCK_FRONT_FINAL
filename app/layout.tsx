import * as React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ShadCnToaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
              {children}
          </SessionProvider>
          <Toaster />
          <ShadCnToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
