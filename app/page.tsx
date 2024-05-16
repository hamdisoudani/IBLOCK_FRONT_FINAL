import { CardContent, Card, CardTitle, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { CheckIcon } from "lucide-react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export default function Home() {
  return (
    <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid max-w-5xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Collaborative Learning
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Learn to Code Together
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I-Block is a collaborative e-learning platform that empowers teachers, students, and schools to learn
                programming through block-based coding and interactive projects.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="w-full" variant={'default'}>
                  <Link
                    href="/register"
                  >
                    Create account
                  </Link>
                </Button>
                <Button className="w-full" variant={'secondary'}>
                  <Link
                    href="/login"
                  >
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid max-w-5xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Empower Your Learning Journey
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I-Block offers a range of features to make your learning experience more engaging and collaborative.
              </p>
              <ul className="grid gap-4">
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Block-based Coding</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Learn programming through intuitive, drag-and-drop coding blocks, no coding experience required.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Collaborative Projects</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Work together with your peers and teachers on interactive projects, sharing ideas and learning
                      from each other.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold">Robotics Integration</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Control and program robots using your block-based code, bringing your projects to life.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid max-w-5xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Hear from teachers, students, and schools who have benefited from using I-Block.
              </p>
            </div>
            <div className="grid gap-6">
              <Card className="p-2">
                <CardContent className="space-y-4">
                  <q className="text-lg font-semibold leading-snug">
                    I-Block has transformed the way we teach programming in our school. The collaborative nature of the
                    platform has made learning so much more engaging and effective.
                  </q>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Jane Doe</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science Teacher</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-2">
                <CardContent className="space-y-4">
                  <q className="text-lg font-semibold leading-snug">
                    I was struggling with programming until I started using I-Block. The block-based coding and
                    collaborative projects have made learning so much more fun and rewarding.
                  </q>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">High School Student</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid max-w-5xl items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Affordable Pricing for All
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                I-Block offers flexible pricing plans to fit the needs of teachers, students, and schools.
              </p>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student</CardTitle>
                  <CardDescription>For individual learners</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">$0</div>
                  <p className="text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Access to all learning materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Collaborative project workspace
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Basic support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">Sign Up</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Teacher</CardTitle>
                  <CardDescription>For educators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">$9</div>
                  <p className="text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Access to all learning materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Collaborative project workspace
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Advanced reporting and analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Priority support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">Sign Up</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>School</CardTitle>
                  <CardDescription>For educational institutions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-4xl font-bold">$99</div>
                  <p className="text-gray-500 dark:text-gray-400">per month</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Access to all learning materials
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Collaborative project workspace
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Advanced reporting and analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Dedicated account manager
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-gray-900 dark:text-gray-50" />
                      Enterprise-level support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" />
      </main>
  );
}
