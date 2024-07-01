/**
 * An array of routes that are accessible for authenticated users or non authenticated users
 * @type {String[]}
 */
export const publicRoutes = [
    '/'
]


/**
 * An array of routes that are used for authentification
 * These routes will redirect users to the dashboard page
 * @type {String[]}
 */
export const authRoutes = [
    '/login',
    '/register',
    '/api/register',
]


/**
 * The prefix for API authentification routes
 * Routes that starts with this API prefix are accessible by any user (authenticated or not authenticated)
 * These routes are used for authentification purposes
 * @type {String}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default redirect path after logging in for users with role "student" and "teacher"
 * @type {String}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard"

/**
 * The default redirect path after logging in for users with role "admin"
 * @type {String}
 */
export const ADMIN_LOGIN_REDIRECT = "/admin"

/**
 * The default redirect path after logging in for users with role "superadmin"
 * @type {String}
 */
export const SUPERADMIN_LOGIN_REDIRECT = "/super-admin"

/**
 * The default redirect path after logging in for users with role "robotadmin"
 * @type {String}
 */
export const ROBOTADMIN_LOGIN_REDIRECT = "/robot-admin"

/**
 * The default redirect path after logging in for users with role "schooladmin"
 * @type {String}
 */
export const SCHOOLADMIN_LOGIN_REDIRECT = "/school-admin"