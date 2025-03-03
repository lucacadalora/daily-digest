/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // This is important for our API routes to be available
  async rewrites() {
    return [
      // Forward API requests to Express server
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      // Forward chat API requests to Express server
      {
        source: '/chat/:path*',
        destination: '/chat/:path*',
      },
    ];
  },
  transpilePackages: [
    // Add packages that need to be transpiled
  ],
};

module.exports = nextConfig;