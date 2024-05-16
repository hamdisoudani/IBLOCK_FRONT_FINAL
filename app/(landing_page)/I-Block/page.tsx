"use client";
import Link from "next/link"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { FaRobot } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <FaLaptopCode  className="h-6 w-6" />
          <span className="sr-only">CodeBlocks</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Examples
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Learn to Code with Blocks
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  CodeBlocks is a platform that teaches coding through block-based programming using Blockly. Build
                  projects, control robots, and collaborate with others.
                </p>
              </div>
              <Link
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/register"
              >
                Start Learning
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800" id="features">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Learn with Blocks, Build with Code</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  CodeBlocks combines the power of block-based programming with real code, allowing you to learn and
                  build at your own pace.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm gap-8 pt-12 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <FaRobot  className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <h3 className="text-xl font-bold">Control Robots</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Use CodeBlocks to control robots and bring your projects to life.
                </p>
              </div>
              <div className="grid gap-1">
                <CiUser  className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <h3 className="text-xl font-bold">Collaborate</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Work on projects with others and learn from the community.
                </p>
              </div>
              <div className="grid gap-1">
                <FaLaptopCode  className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <h3 className="text-xl font-bold">Learn to Code</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Transition from blocks to real code at your own pace.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="examples">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Example Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See What You Can Build</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out these amazing projects built by CodeBlocks users.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm gap-8 pt-12 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row">
                  <CardTitle>Maze Runner</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Maze Runner"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="200"
                    src="/placeholder.svg"
                    width="300"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row">
                  <CardTitle>Music Maker</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Music Maker"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="200"
                    src="/placeholder.svg"
                    width="300"
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row">
                  <CardTitle>Space Explorer</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    alt="Space Explorer"
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                    height="200"
                    src="/placeholder.svg"
                    width="300"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 CodeBlocks. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}




