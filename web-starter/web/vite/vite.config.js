import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@noir-lang/noirc_abi', '@noir-lang/acvm_js', '@aztec/bb.js', '@noir-lang/noir_js']
  },
  rollupOptions: {
    input: 'index.html',
    output: {
      dir: 'dist',
      format: 'esm'
    }
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  },
  preview: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    }
  }
});
