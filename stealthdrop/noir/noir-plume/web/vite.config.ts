import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext' 
  },
  resolve: {
    alias: {
      path: 'path-browserify',
      fs: 'false',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    exclude: [
        '@noir-lang/noirc_abi',
        '@noir-lang/acvm_js',
      ],
    esbuildOptions: {
        target: 'esnext',
    },  
  },
});
