"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import "react-form-wizard-component/dist/style.css";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

import DataTablePage from '@/components/data-table/data-table';
import { CirclePlusIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ErrorMessage, Field, Formik } from "formik";
import { InferType } from "yup";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Toaster } from "react-hot-toast";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import axiosInstance from "@/plugins/axios";
import { addSchoolRegisterSchema } from '@/lib/schemas/add_school.schema'; 


interface RegisterError {
    error: boolean;
    message: string;
    validationErrors?: { [key: string]: string };
}
const CreateUser = () => {
    const [registerError, setRegisterError] = useState<RegisterError>({
        error: false,
        message: "",
      });
      const [showPassword, setShowPassword] = useState<Boolean>(false);
      const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);
    
      type addSchoolFormData = InferType<typeof addSchoolRegisterSchema>;

    
        const handleSubmit = async (
            formData: addSchoolFormData,
            { resetForm }: { resetForm: any }
          ) => {
            
            setRegisterError({ error: false, message: "" });
        
            try {
              const validateFields = await addSchoolRegisterSchema.validate(formData)
              if(validateFields) {
                const { email, password, fullname } = formData;
          
                await axiosInstance.post('/auth/teacher/signup', {
                  email,
                  password,
                  name: fullname
                }).then((res: any) => {
                  if(res.data.error) {
                    useErrorToast(res.data.message)
                    //setRegisterError({error: res.data.error, message: res.data.message})
                    return;
                  }
                  useSuccessToast(res.data.message)
                  setTimeout(() => {
                    setRegisterError({error: res.data.error, message: res.data.message})
                    resetForm()
                    return Response.redirect("/login")
                  },4000)
                }).catch(() => {
                  setRegisterError({
                    error: true,
                    message:
                  "Error while performing this action please try again later, if the problem persist please contact us.",
                  })
                })
              } else {
                setRegisterError({
                  error: true,
                  message:
                "Please fill all required fields before continue",
                })
              }
              
              //resetForm();
            } catch (error) {
              setRegisterError({
                error: true,
                message:
                  "Error while performing this action please try again later, if the problem persist please contact us.",
              });
              //resetForm();
            }
          };
  
    return (
        <Sheet>
            <SheetTrigger asChild>
            <Button variant="outline">
                <CirclePlusIcon className="w-5 h-5 mr-2" />
                add school
                </Button>
            </SheetTrigger>


            <SheetContent className="w-screen sm:w-auto">
                <ScrollArea className='h-full'>
                    <SheetHeader>
                        <SheetTitle className=' text-3xl flex justify-center items-center h-full text-center'>add school</SheetTitle>
                        <SheetDescription>
                            <p className="text-sm text-gray-400">Add a new school to the platform</p>
                        </SheetDescription>
                    </SheetHeader>
                    <Toaster />
                    
                    <Formik
                                        initialValues={{
                                            email: "",
                                            password: "",
                                            confirmPassword: "",
                                            fullname: "",
                                            schoolName: ""
                                        }}
                                        validationSchema={addSchoolRegisterSchema}
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
                                            isSubmitting,
                                        }) => (
                                            <form
                                                id="formAuthentication"
                                                className="mb-3"
                                                onSubmit={handleSubmit}
                                            >  
                                                <div className="space-y-1 my-5">
                                                    <h4 className=" text-xl font-medium leading-none">School information</h4>
                                                </div>
                                                {/* Name of the school Field */}
                                                <div className="space-y-2">
                                                <Label htmlFor="schoolName">Name of the school</Label>
                                                <Field
                                                    type="text"
                                                    className={
                                                        cn(
                                                            "border border-black dark:border-white w-full p-2 rounded"
                                                        )
                                                    }
                                                    id="schoolName"
                                                    value={values.schoolName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="schoolName"
                                                    placeholder="Enter name of the school"
                                                />
                                                <ErrorMessage name="schoolName" component="div" className="text-red-600" />
                                                </div>
                                                <div className=" my-5">
                                                <Separator  />
                                                </div>
                                                <div className="space-y-4">
                                                    <h4 className="text-xl font-medium leading-none">School admin information </h4>
                                                </div>

                                                {/* Full Name Field */}
                                                <div className="space-y-2">
                                                <Label htmlFor="fullname">Full name</Label>
                                                <Field
                                                    type="text"
                                                    className={
                                                        cn(
                                                            "border border-black dark:border-white w-full p-2 rounded"
                                                        )
                                                    }
                                                    id="fullname"
                                                    value={values.fullname}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="fullname"
                                                    placeholder="Enter your name"
                                                />
                                                <ErrorMessage name="fullname" component="div" className="text-red-600" />
                                                </div>
                                                
                                                {/* Email Field */}
                                                <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Field
                                                    type="text"
                                                    className={
                                                        cn(
                                                            "border border-black dark:border-white w-full p-2 rounded"
                                                        )
                                                    }
                                                    id="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    name="email"
                                                    placeholder="Enter your email"
                                                />
                                                <ErrorMessage name="email" component="div" className="text-red-600" />
                                                </div>

                                                {/* Password Field */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="email">Password</Label>
                                                    <div className="relative">

                                                    <Field
                                                        className={
                                                        cn(
                                                            "border border-black dark:border-white w-full p-2 rounded"
                                                        )
                                                    }
                                                        id="password"
                                                        name="password"
                                                        value={values.password}
                                                        type={showPassword ? "text" : "password"}
                                                        placeholder="Enter your password"
                                                    />
                                                    <span
                                                        className="absolute inset-y-0 right-0 flex items-center px-3 dark:text-white text-dark"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {
                                                        showPassword ? (
                                                            <EyeClosedIcon />
                                                        ) : (
                                                            <EyeOpenIcon />
                                                        )
                                                        }
                                                    </span>
                                                    </div>
                                                    <ErrorMessage name="password" component="div" className="text-red-600" />
                                                </div>

                                                {/* Confirm Password Field */}
                                                <div className="space-y-2">
                                                    <Label htmlFor="confirmPassword">Confirm password</Label>
                                                    <div className="relative">

                                                    <Field
                                                        className={
                                                        cn(
                                                            "border border-black dark:border-white w-full p-2 rounded"
                                                        )
                                                    }
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        value={values.confirmPassword}
                                                        type={showConfirmPassword ? "text" : "password"}
                                                        placeholder="Confirm your password"
                                                    />
                                                    <span
                                                        className="absolute inset-y-0 right-0 flex items-center px-3 dark:text-white text-dark"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    >
                                                        {
                                                        showConfirmPassword ? (
                                                            <EyeClosedIcon />
                                                        ) : (
                                                            <EyeOpenIcon />
                                                        )
                                                        }
                                                    </span>
                                                    </div>
                                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-600" />
                                                </div>
                                                

                                                {/* Submit Button */}
                                                <Button className="w-full mt-5" type="submit" disabled={!isValid || isSubmitting}>
                                                    <span className={
                                                        cn(
                                                            {
                                                                'hidden': isSubmitting
                                                            }
                                                        )
                                                    }>Add school</span>
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
                    
                </ScrollArea>
            </SheetContent>

        </Sheet>
    )
}


  
export default function Page() {
   
    return (
        <div className="flex w-full h-full">
            
            
            <div className="w-full h-full overflow-auto">
                
                    <div className="flex items-center justify-between flex-wrap mb-4 sm:hidden">
                        <h2 className="text-2xl font-bold ">Schools</h2>
                        <CreateUser/>
                        
                    </div>
                    <div className="hidden items-center justify-between flex-wrap mb-4 sm:flex">
                        <h2 className="text-2xl font-bold ">Schools</h2>
                        <div className='flex-1'>
                            &nbsp;
                        </div>
                        <div className='flex items-center'>
                        <CreateUser/>
                            
                        </div>
                    </div>
                    <DataTablePage />
            </div>
            
            

        </div>
    );
}






