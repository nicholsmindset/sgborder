/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  turbopack: { root: __dirname },
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
      ...['pie', 'cte', 'sle', 'tpe', 'ecp', 'kpe'].map((road) => ({
        source: `/cameras/${road}`,
        destination: '/cameras',
        permanent: true,
      })),
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
