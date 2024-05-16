import NextAuth from "next-auth"
import authConfig from "./auth.config"

export const { auth, handlers, signIn, signOut } = NextAuth({
    session: { strategy: "jwt" },
    pages: {
        signIn: '/login',
        
    },
    ...authConfig,
    callbacks: {
        async session({session, token}) {
            return {
                ...session,
                user: {
                  ...session.user,
                  role: token.role,
                  accessToken: token.accessToken
                }
            }
        },
        async jwt({token, user, session}) {
            if (session) {
                return  {...token, accessToken: session.user.accessToken, ...user};
            }
            
            return {...token, ...user}
        }
    }
})