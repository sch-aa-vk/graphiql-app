/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '/' : '/graphiql-app/',
  plugins: [react()],
});
