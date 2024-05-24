/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_WS_ROBOT_COMMANDS: process.env.NEXT_PUBLIC_WS_ROBOT_COMMANDS,
        NEXT_PUBLIC_WS_PROJECT_EVENTS: process.env.NEXT_PUBLIC_WS_PROJECT_EVENTS,
    },
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "iblock-back-test.onrender.com", "miniature-dollop-5595wvgj9rphp465-3005.app.github.dev"],
        }
    }
};

export default nextConfig;
