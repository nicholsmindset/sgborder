/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.data.gov.sg',
      },
      {
        protocol: 'https',
        hostname: 'api.data.gov.sg',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'sgborder.live' }],
        destination: 'https://www.sgborder.live/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
