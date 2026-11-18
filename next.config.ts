import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    // React <ViewTransition> → browser View Transitions API (route changes)
    viewTransition: true,
  },
};

export default nextConfig;
