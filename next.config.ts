import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/camunda-site-prototype",
  images: { unoptimized: true },
};

export default nextConfig;
