import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {},
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: {
        '/api/zt': {
          target: env.APP_API_URL_ZT_DUJIA_QUNAR,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/zt/, '')
        },
        '/api/touch': {
          target: env.APP_API_URL_TOUCH_DUJIA_QUNAR,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/touch/, '')
        }
      }
    }
  }
})
