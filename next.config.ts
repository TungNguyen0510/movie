import type { NextConfig } from "next";

const imageHostName1 = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME1 as string;
const imageHostName2 = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME2 as string;
const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: imageHostName1,
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: imageHostName2,
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
