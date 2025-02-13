import react from '@vitejs/plugin-react-swc';

import tailwindcss from '@tailwindcss/vite';

export default {
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
  },
};
