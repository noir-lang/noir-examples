/** @type {import('next').NextConfig} */
const nextConfig = {
  // permits loading of the worker file (barretenberg.js):
  experimental: {
    esmExternals: 'loose',
  },
  // allows for local running of multithreads:
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
