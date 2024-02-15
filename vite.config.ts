import { defineConfig } from 'vite'
import {fileURLToPath} from "url";
import react from '@vitejs/plugin-react'
import {TanStackRouterVite} from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      TanStackRouterVite(),
  ],
    resolve: {
        alias: [
            { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
            { find: '@assets', replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
        ],
    },
})
