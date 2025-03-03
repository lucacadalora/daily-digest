/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure rewrites to maintain compatibility with existing Express routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*', // Proxy API requests to Express server
      },
    ];
  },
}

module.exports = nextConfig;