import authConfig from "./auth.config"
import NextAuth from "next-auth"
import {
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  ROBOTADMIN_LOGIN_REDIRECT,
  ADMIN_LOGIN_REDIRECT,
  SCHOOLADMIN_LOGIN_REDIRECT,
  SUPERADMIN_LOGIN_REDIRECT
} from '@/configs/routes.config'
import { auth as session} from "./auth"
import { NextResponse } from "next/server"

 
const { auth } = NextAuth(authConfig)
export default auth(async (req) => {
  const isLoggedIn = !!req.auth
  const {nextUrl} = req;
  const data = await session();
  const role = data?.user?.role || null;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isRobotAdminRoute = nextUrl.pathname.startsWith(ROBOTADMIN_LOGIN_REDIRECT);
  const isSchoolAdminRoute = nextUrl.pathname.startsWith(SCHOOLADMIN_LOGIN_REDIRECT);
  const isSuperAdminRoute = nextUrl.pathname.startsWith(ADMIN_LOGIN_REDIRECT);
  const isDefaultDashboardRoute = nextUrl.pathname.startsWith(DEFAULT_LOGIN_REDIRECT);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute) {
    return NextResponse.next();
  }

  if(isDefaultDashboardRoute) {
    if(!isLoggedIn || (role != 'student' && role != 'teacher')) {
      return Response.redirect(new URL(authRoutes[0], nextUrl))
    }
    return NextResponse.next();
  }

  if(isSuperAdminRoute) {
    if(!isLoggedIn || role != 'super_admin') {
      return Response.redirect(new URL(authRoutes[0], nextUrl))
    }
    return NextResponse.next();
  }

  if(isRobotAdminRoute) {
    if(!isLoggedIn || role != 'robot_admin') {
      return Response.redirect(new URL(authRoutes[0], nextUrl))
    }
    return NextResponse.next();
  }

  if(isSchoolAdminRoute) {
    if(!isLoggedIn || role != 'school_admin') {
      return Response.redirect(new URL(authRoutes[0], nextUrl))
    }

    return NextResponse.next()
  }


  if(isAuthRoute) {
      if(isLoggedIn && (role == 'student' || role == 'teacher')) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
      if(isLoggedIn && role == 'super_admin') {
          return Response.redirect(new URL(SUPERADMIN_LOGIN_REDIRECT, nextUrl))
      }
      if(isLoggedIn && role == 'robot_admin') {
          return Response.redirect(new URL(ROBOTADMIN_LOGIN_REDIRECT, nextUrl))
      }
      if(isLoggedIn && role == 'school_admin') {
        return Response.redirect(new URL(SCHOOLADMIN_LOGIN_REDIRECT, nextUrl))
      }
      return NextResponse.next();
  }

    

    if(!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', nextUrl))
    }

  return NextResponse.next();
})


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}