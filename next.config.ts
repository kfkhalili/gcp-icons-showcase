import type { NextConfig } from "next";

const gcpIconsVersion =
  (require("gcp-icons/package.json") as { version?: string }).version ?? "1.0.4";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_GCP_ICONS_VERSION: gcpIconsVersion,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "unpkg.com", pathname: "/gcp-icons@**" },
    ],
  },
};

export default nextConfig;

