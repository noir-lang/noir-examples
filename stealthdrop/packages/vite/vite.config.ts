import { defineConfig, searchForWorkspaceRoot } from 'vite';
import react from '@vitejs/plugin-react-swc';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
    // Headers needed for bb WASM to work in multithreaded mode
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    // Allow vite to serve files from these directories, since they are symlinked
    // These are the protocol circuit artifacts and noir/bb WASMs.
    // ONLY REQUIRED TO RUN FROM THE MONOREPO
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        "../../node_modules/@noir-lang/noirc_abi/web",
        "../../node_modules/@noir-lang/acvm_js/web",
      ],
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
    // Exclude WASM packages from optimization to avoid MIME type issues
    exclude: ['@noir-lang/noirc_abi', '@noir-lang/acvm_js', '@aztec/bb.js'],
  },
  // Ensure WASM files are served with correct MIME type
  assetsInclude: ['**/*.wasm'],
});
