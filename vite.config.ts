import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/expo/',
  define: {
    // Temporarily disable AI features for security
    'process.env.API_KEY': JSON.stringify(''),
    'process.env.GEMINI_API_KEY': JSON.stringify('')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});