import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // YouTube thumbnails for the featured video facade
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
