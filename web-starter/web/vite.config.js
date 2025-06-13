import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['@noir-lang/noirc_abi', '@noir-lang/acvm_js']
  },
  rollupOptions: {
    input: 'index.html',
    output: {
      dir: 'dist',
      format: 'esm'
    }
  }
});
