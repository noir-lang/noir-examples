/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      // This is required for @aztec/bb.js as it imports wasm files
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  // These headers enable SharedArrayBuffer which is required for running
  // @aztec/bb.js wasm in multiple threads.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
