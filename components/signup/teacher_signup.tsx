"use client";
// Import the necessary components and modules
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
import { InferType } from "yup";
import { cn } from "@/lib/utils";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Toaster } from "react-hot-toast";
import { useErrorToast, useSuccessToast } from "@/hooks/useToast";
import axiosInstance from "@/plugins/axios";
import { teacherRegisterSchema } from "@/lib/schemas/teacher_signup.schema";


interface RegisterError {
    error: boolean;
    message: string;
    validationErrors?: { [key: string]: string };
}

export default function TeacherRegister() {
    const [registerError, setRegisterError] = useState<RegisterError>({
      error: false,
      message: "",
    });
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);
  
    type registerFormData = InferType<typeof teacherRegisterSchema>;
  
      // Define the type for the form data using Yup's InferType
      type RegisterFormData = {
          email: string;
          password: string;
          confirmPassword: string;
          fullname: string;
      };
  
      const handleSubmit = async (
          formData: RegisterFormData,
          { resetForm }: { resetForm: any }
        ) => {
          
          setRegisterError({ error: false, message: "" });
      
          try {
            const validateFields = await teacherRegisterSchema.validate(formData)
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
            <div className="block w-[80%] mx-auto my-0">
                                <div className="mx-auto max-w-sm space-y-2 mt-5">
                                    <div className="space-y-2 text-center">
                                        <h1 className="text-xl font-bold uppercase">Sign Up as Teacher</h1>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Enter your information to create an account
                                        </p>
                                    </div>
                                    <Toaster />
                                    {/* Use Formik to manage the form state and handle submission */}
                                    <Formik
                                        initialValues={{
                                            email: "",
                                            password: "",
                                            confirmPassword: "",
                                            fullname: ""
                                        }}
                                        validationSchema={teacherRegisterSchema}
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
                                                    <Label htmlFor="password">Password</Label>
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
                                                    }>Sign up</span>
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
                                </div>
                            </div>
        )
};

