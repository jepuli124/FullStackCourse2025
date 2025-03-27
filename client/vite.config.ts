import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:1234',
        changeOrigin: true,
      },
      '^.*/images' : {
        target: 'http://localhost:1234',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/map/, ''),
      }
    },
    port: 3000
  }
})
//http://localhost:3000/images/turtle_e22e41f5-7826-4068-b8b3-6c548f00d241.png
//http://localhost:3000/images/turtle_e22e41f5-7826-4068-b8b3-6c548f00d241.png