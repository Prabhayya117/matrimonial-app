import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This sets up a proxy during development
    proxy: {
      // Proxy requests from the frontend to the backend server
      // If the frontend makes a request to /api/auth/login, 
      // it will be forwarded to http://localhost:5000/api/auth/login
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
        secure: false, // Set to true if your backend uses HTTPS/SSL
      },
    },
    // The frontend development server will run on port 5173
    port: 5173, 
  },
});