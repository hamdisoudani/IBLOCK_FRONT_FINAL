import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { GlobalLoginSchema } from "./lib/schemas/login.schema";
import axios from "axios";
 
export default { 
    trustHost: true,
    providers: [
    Credentials({
        authorize: async (credentials, request) => {
            try {
                const {email, password} = credentials;
                // Validate the email and the password for security reasons
                const isValidated = await GlobalLoginSchema.validate({email, password});
                if(!isValidated) return null;
                try {
                    const request = await axios.post(`http://localhost:3005/auth/signin`, {email, password});
                    if(request.status == 200) {
                        return {
                            email: request.data.user.email, 
                            name: request.data.user.name, 
                            role: request.data.user.role,
                            accessToken: request.data.accessToken,
                            // We assign the user role to the id so we can access it in the middleware to check the user role
                            id: request.data.user.role
                        };
                    }
                    return  null;
                } catch (error) {
                    return null
                }
                
            } catch (error) {
                return null
            }
        },
    })
] } satisfies NextAuthConfig
