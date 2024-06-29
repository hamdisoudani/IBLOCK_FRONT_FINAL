"use client";
import React, { useEffect, useState } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Formik, Field, ErrorMessage } from "formik";
import { InferType } from "yup";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { GlobalLoginSchema } from '@/lib/schemas/login.schema';
import axios from 'axios';
import axiosInstance from '@/plugins/axios';
import { useErrorToast, useSuccessToast } from '@/hooks/useToast';
import { useSignIn } from '@/lib/actions/auth/useAuth';
import { useSession } from 'next-auth/react';
import { ADMIN_LOGIN_REDIRECT, DEFAULT_LOGIN_REDIRECT, ROBOTADMIN_LOGIN_REDIRECT, SCHOOLADMIN_LOGIN_REDIRECT, SUPERADMIN_LOGIN_REDIRECT } from '@/configs/routes.config';


interface loginError {
  error: boolean;
  message: string;
}

export default function StudentSignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {data, status, update} = useSession()
  const [loginError, setLoginError] = useState<loginError>({
    error: false,
    message: "",
  });
  type loginFormData = InferType<typeof GlobalLoginSchema>;

  const handleSubmit = async (formData: loginFormData) => {
    
    try {
        const {error, message} = await useSignIn(formData);
        if(!error) {
          useSuccessToast(message);
          // fetch user session
          update();
          await fetch('/api/auth/session').then(res => res.json()).then(data => {
            if(data) {
              const role = data?.user?.role || null;
              if(role == 'student' || role == 'teacher') {
                window.location.href = DEFAULT_LOGIN_REDIRECT;
              }
              else if(role == 'admin') {
                window.location.href = ADMIN_LOGIN_REDIRECT;
              }
              else if(role == 'robot_admin') {
                window.location.href = ROBOTADMIN_LOGIN_REDIRECT;
              }
              else if(role == 'school_admin') {
                window.location.href = SCHOOLADMIN_LOGIN_REDIRECT;
              }
              else if(role == 'super_admin') {
                window.location.href = SUPERADMIN_LOGIN_REDIRECT;
              }
              else {
                window.location.href = DEFAULT_LOGIN_REDIRECT;
              }
            }
          }).catch(error => {
            useErrorToast("An error occurred during login. Please try again later.");
          });
          return;
        } else {
          useErrorToast(message);
        }
    } catch (error) {
      useErrorToast("An error occurred during login. Please try again later.");
    }
  };
  // Old code (deprecated)
  /*const handleSubmit = async (formData: loginFormData) => {
    try {
        const {email, password} = formData;
        await axiosInstance.post('/users/signin', {
            email,
            password
        }).then(res => {
            if(!res.data.accessToken) {
              useErrorToast("Errorr while logging you in, please contact our support.");
            }

            useSuccessToast(res.data.message);
            localStorage.setItem("accessToken", res.data.accessToken);

        }).catch((error: any) => {
          useErrorToast("Invalid email or password. Please try again.");
        })
           // const res = await useAuth(formData);
      // if (res.error) {
      //   setLoginError({error: true, message: "Invalid email or password. Please try again."})
      //   // useErrorToast("Invalid email or password. Please try again."); // More user-friendly error message
      //   return;
      // }
      // useSuccessToast("You've been logged in successfully!");
    } catch (error) {
      //setLoginError({error: true, message: "An error occurred during login. Please try again later."})
      useErrorToast("An error occurred during login. Please try again later.");
    }
    };*/
  return (
      <div className="grid items-center place-content-center h-full mt-10">
        <Card className="mx-auto w-full md:w-[500px] ml-5 md:ml-0 mr-5 md:mr-0 border-black dark:border-white">
          <CardHeader  className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email below to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={GlobalLoginSchema}
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
                    <Label htmlFor="email">Email</Label>
                    <Field
                      type="text"
                      className={
                          cn(
                              "border border-black dark:border-white w-full p-2 rounded",
                              {
                                  'border-[2px] border-red-800 dark:border-red-800 bg-red-200': loginError.error
                              }
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
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="relative">
  
                    <Field
                      className={
                        cn(
                            "border border-black dark:border-white w-full p-2 rounded",
                            {
                                'border-[2px] border-red-800 dark:border-red-800': false
                            }
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
                  <Button className="w-full" type="submit" disabled={!isValid || isSubmitting}>
                      <span className={
                          cn(
                              {
                                  'hidden': isSubmitting
                              }
                          )
                      }>Sign in</span>
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
                  <div className="flex justify-center items-center space-x-4">
                    <a href="#" className="flex items-center p-2 rounded">
                      <FaGoogle className="mr-2" />
                    </a>
                    <a href="#" className="flex items-center p-2 rounded">
                      <FaFacebook className="mr-2" />
                    </a>
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?
                    <Link href="/register" className="underline">
                      Sign up
                    </Link>
                  </div>
                </form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    );
}