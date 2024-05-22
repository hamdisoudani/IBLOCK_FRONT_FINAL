/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        WS_PROJECT_EVENTS: "http://localhost:3005/",
        NEXT_PUBLIC_WS_ROBOT_COMMANDS: process.env.WS_ROBOT_COMMANDS,
        NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    },
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:3000", "iblock-back-test.onrender.com"],
        }
    }
};

export default nextConfig;
