/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: {
        allowedOrigins: ["app.localhost:3000"],
      },
    },
    images: {
      remotePatterns: [
        { protocol: "https", hostname: "ucarecdn.com",},
        { protocol: "https", hostname: "img.clerk.com",},
        { hostname: "public.blob.vercel-storage.com" },
        { hostname: "www.google.com" },
        { hostname: "avatar.vercel.sh" },
      ],
    },
  };
  
  export default nextConfig;
  