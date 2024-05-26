"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { CiMail } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";
export default function Component() {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-12 md:py-24">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Get in Touch</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Have a question or want to work together? Fill out the form below or reach out to us directly.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Contact Information</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CiMail  className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">info@acme.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <IoPhonePortraitOutline className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-500 dark:text-gray-400">(123) 456-7890</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Office Location</h3>
              <div className="text-gray-500 dark:text-gray-400">
                123 Main St.
                <br />
                Anytown, USA 12345
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}




