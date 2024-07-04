import nextI18NextConfig from "./next-i18next.config.js";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  i18n: {
    ...nextI18NextConfig.i18n,
    localeDetection: false,
  },
};

export default nextConfig;
