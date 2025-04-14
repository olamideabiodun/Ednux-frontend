/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['cdn.ednux.com'],
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: process.env.API_BASE_URL + '/:path*',
        },
      ];
    },
  };
  
  module.exports = nextConfig;