import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    nodePolyfills(),
  ],
  optimizeDeps: {
    exclude: ['@noir-lang/noirc_abi', '@noir-lang/acvm_js', '@noir-lang/noir_js', '@aztec/bb.js']
  },
  resolve: {
    alias: {
      pino: "pino/browser.js",
    },
  },
});