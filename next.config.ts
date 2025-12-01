import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'xte1m1p6ld0ixejx.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
