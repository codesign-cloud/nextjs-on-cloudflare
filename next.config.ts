import type { NextConfig } from 'next'
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare'

const nextConfig: NextConfig = {
  experimental: {
    // Enable experimental features for Next.js 15
  },
  // OpenNext supports full Node.js runtime on Cloudflare Workers
  // No need for edge runtime restrictions
}

export default nextConfig

// ========================================================
// Cloudflare Workers runtime configuration
// Initialize OpenNext Cloudflare only during local development
// ========================================================
if (process.env.NODE_ENV === 'development') {
  // Dynamically import only in dev to keep bundle size minimal in prod
  initOpenNextCloudflareForDev()
}
