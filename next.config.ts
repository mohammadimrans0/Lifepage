import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lifepage-server.onrender.com', // Specify the hostname
        pathname: '/**', // Allow all paths (or specify a specific path pattern)
      },
    ],
  },
};

export default nextConfig;
