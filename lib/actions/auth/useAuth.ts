"use server";
import { signIn, signOut } from "@/auth";
import { GlobalLoginSchema } from "@/lib/schemas/login.schema";
import axios from "axios";
import { AuthError } from "next-auth";
import { InferType } from "yup";

type loginFormData = InferType<typeof GlobalLoginSchema>;
export const useSignIn = async (formData: loginFormData): Promise<{error: boolean, message: string}> => {
    
    const isFieldValidated = await GlobalLoginSchema.validate(formData)
    if(!isFieldValidated) {
        return {
            error: true,
            message: "Field are missed or invalid"
        }
    }

    const {email, password} = isFieldValidated;
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false
        })
            return {
                error: false,
                message: "You've successfully logged in."
            };
        
        
    } catch (error ) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: true,
                        message: "Invalid credentials"
                    }
                default:
                    return {
                        error: true,
                        message: "We've encountered an error. Please try again later."
                    }
            }
        } else {
            return {
                error: true,
                message: "We've encountered an error. Please try again later."
            }
        }
        //throw error;
    }
}

export const useSignOut = async (): Promise<{error: boolean, message: string}> => {
    try {
        await signOut({redirect: false});
        return {
            error: false,
            message: "You've successfully logged out."
        };
    } catch (error) {
        return {
            error: true,
            message: "We've encountered an error. Please try again later. "+ error
        }
    }
}