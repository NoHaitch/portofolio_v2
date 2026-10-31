import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lets e2e builds use a separate output folder so they never clobber a running dev server.
  distDir: process.env.NEXT_DIST_DIR || '.next',
}

export default nextConfig
