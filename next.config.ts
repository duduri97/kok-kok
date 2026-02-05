import type { NextConfig } from "next";
import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = config({
  /* config options here */
  reactStrictMode: true,
});

export default nextConfig;
