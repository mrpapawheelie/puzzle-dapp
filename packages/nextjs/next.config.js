// @ts-check

// Uncomment (check bottom line as well) to run bundle analyzer
// command is: ANALYZE=true yarn build

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//  enabled: process.env.ANALYZE === "true",
// });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
// module.exports = withBundleAnalyzer(nextConfig);
