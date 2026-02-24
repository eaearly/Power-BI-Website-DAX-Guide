import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  webpack: (config, { isServer }) => {
    // Suppress the "Serializing big strings" cache warning (cosmetic only)
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: "error",
    };
    return config;
  },
};

export default nextConfig;
