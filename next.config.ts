import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical URLs across the site use trailing slashes (sitemap, canonical
  // tags, internal links) — make Next normalize to the same form.
  trailingSlash: true,
  images: {
    remotePatterns: [
      // YouTube thumbnails for the featured video facade
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
};

export default nextConfig;
