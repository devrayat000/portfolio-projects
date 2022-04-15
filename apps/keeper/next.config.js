const withTM = require("next-transpile-modules")(["mantine"]);

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
};

module.exports = withTM(nextConfig);
