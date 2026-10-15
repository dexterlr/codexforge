import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  // Opt in only for the bounded isolated production build. Runtime and ordinary
  // builds retain the default Next configuration and caching behavior.
  if (
    phase !== PHASE_PRODUCTION_BUILD ||
    process.env.CODEXFORGE_BUILD_DISABLE_WEBPACK_CACHE !== "1"
  ) {
    return {};
  }

  return {
    experimental: { webpackBuildWorker: true },
    webpack(config) {
      config.cache = false;
      return config;
    },
  };
}
