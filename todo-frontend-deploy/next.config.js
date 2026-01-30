/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  // Allow API requests to our backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/:path*`,
      },
    ]
  },
  experimental: {
    esmExternals: 'loose',
  },
  // Optimize images if any are added later
  images: {
    unoptimized: true, // Since we don't have images currently
  },
  reactStrictMode: true,
}

module.exports = nextConfig