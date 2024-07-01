"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useProfileContext } from "@/components/context/userprofile.context";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorMessage, Field, Formik } from "formik";
import { cn } from "@/lib/utils";
import { normalUserUpdateName } from "@/lib/schemas/update_name.schema";
import { toast } from "sonner";
import { InferType } from "yup";


export default function UserSettingComponent() {
  const { userInformation, isLoadingProfiles } = useProfileContext();
  type updateNameFormData = InferType<typeof normalUserUpdateName>;

  const handleSubmit = async (formData: updateNameFormData) => {
    
    try {
        toast("success", {
            description: "You have successfully logged in.",
        });
    } catch (error) {
        console.error(error);
        toast("error", {
            description: "An error occurred. Please try again later.",
        });
    }
  };
  if(isLoadingProfiles || !userInformation) return (
    <main className="container mx-auto my-12 max-w-3xl px-4 md:px-6">
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48 mt-2" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-24" />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-4 w-20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
  return (

    <main className="container mx-auto my-12 max-w-3xl px-4 md:px-6">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Your Informations</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account details and preferences.</p>
        </div>
        <Card>
              <CardHeader>
                <CardTitle>Edit your name</CardTitle>
                <CardDescription>Update your current name, this will be displayed to all other users.</CardDescription>
              </CardHeader>
              <CardContent>
              <Formik
              initialValues={{
                  name: userInformation.name,
                  password: "",
                }}
                validationSchema={normalUserUpdateName}
                onSubmit={handleSubmit}
                validateOnBlur
                validateOnChange
                validateOnMount
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                dirty,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Field
                      type="text"
                      className={
                          cn(
                              "border border-black dark:border-white w-full p-2 rounded"
                          )
                      }
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="name"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-600" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Confirm password</Label>
                    <Field
                      type="text"
                      className={
                          cn(
                              "border border-black dark:border-white w-full p-2 rounded"
                          )
                      }
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      name="password"
                      placeholder="Please enter you password"
                    />
                    <ErrorMessage name="password" component="div" className="text-red-600" />
                  </div>
                  <Button className="w-full" type="submit" disabled={!isValid || isSubmitting || values.name == userInformation.name}>
                      <span className={
                          cn(
                              {
                                  'hidden': isSubmitting
                              }
                          )
                      }>Update</span>
                      <svg aria-hidden="true" role="status" className={
                          cn(
                              "inline w-4 h-4 me-3 text-white animate-spin",
                              {
                                  'hidden': !isSubmitting
                              }
                          )
                      } viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                      </svg>                                              
  
                  </Button>
                </form>
              )}
            </Formik>
              </CardContent>
            </Card>
        <Card className="border-red-600">
          <CardHeader>
            <CardTitle>Danger zone</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-md font-medium">Delete account</h3>
                <p className="text-xs text-gray-600">Permanently delete your account, this action can't be undone.</p>
              </div>
              <Button variant={"destructive"}>Delete Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  
  )
}

