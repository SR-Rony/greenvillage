import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Cloudinary
      },
      {
        protocol: "http",
        hostname: "localhost", // ✅ Local backend
        port: "5000",           // adjust if your backend runs on another port
      },
    ],
  },
};

export default nextConfig;
