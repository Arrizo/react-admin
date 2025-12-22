/*
 * @Author: chase
 * @Date: 2025-08-06 14:32:19
 * @LastEditors: chase
 * @LastEditTime: 2025-10-31 15:03:09
 * @FilePath: \react\reacti-project\vite.config.js
 * @Description: 
 * 
 */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// https://vite.dev/config/


export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const proxyPrefix = env.VITE_API_BASE_URL
  return defineConfig({
    plugins: [react()],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          relativeUrls: true,
          modifyVars: {}
        }
      }
    },
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        [proxyPrefix]: {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },

  })
}


