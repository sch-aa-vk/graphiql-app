/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/graphiql-app/',
  server: {
    proxy: {
      '/graphql': {
        target: 'https://countries.trevorblades.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});
