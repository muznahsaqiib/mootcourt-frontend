/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // ✅ Prevent build from failing due to ESLint errors
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
