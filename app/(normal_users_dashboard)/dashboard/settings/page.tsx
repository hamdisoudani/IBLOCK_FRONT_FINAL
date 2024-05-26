"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function Component() {
  return (

    <main className="container mx-auto my-12 max-w-3xl px-4 md:px-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Your Information</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account details and preferences.</p>
        </div>
        <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="Enter a new password" type="password" />
                  </div>
                </form>
              </CardContent>
              <CardFooter >
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Account Deletion</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account.</p>
              </div>
              <Link className="text-sm font-medium text-red-600 hover:text-red-800" href="#">
                Delete Account
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Language Preferences</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose your preferred language.</p>
              </div>
              <Link className="text-sm font-medium text-gray-600 hover:text-gray-800" href="#">
                Change Language
              </Link>
            </div>
            
          </CardContent>
        </Card>
      </div>
    </main>
  
  )
}

