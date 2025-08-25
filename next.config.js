/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable experimental features for Next.js 15
  },
  // OpenNext supports full Node.js runtime on Cloudflare Workers
  // No need for edge runtime restrictions
};

module.exports = nextConfig;