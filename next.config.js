
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', '0.0.0.0'],
  },
  // This will configure the build output for compatibility with your current setup
  output: 'standalone',
}

export default nextConfig;
