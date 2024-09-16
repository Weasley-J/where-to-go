import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { isDebugEnable, hosts } = APIs(mode)
  const { apiUrlZtDujia, apiUrlTouchDujia, apiUrlAliyun } = hosts
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
          target: apiUrlZtDujia,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/zt/, '')
        },
        '/api/touch': {
          target: apiUrlTouchDujia,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/touch/, '')
        },
        '/api/weasley/aliyun': {
          target: apiUrlAliyun,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/weasley\/aliyun/, '')
        }
      }
    }
  }
})

// Helper functions
function isBase64(str) {
  const base64Regex = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/

  if (!base64Regex.test(str)) {
    return false
  }

  try {
    atob(str)
    return true
  } catch (e) {
    return false
  }
}

function decodeBase64(encodedStr) {
  return atob(encodedStr)
}

/**
 * APIs: 主要用于解析环境变量，并返回 API 地址
 */
const APIs = (mode) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDebugEnable = !!env.VITE_IS_DEBUG_ENABLE

  // 创建一个包含 API URL 的数组
  const apiUrls = [
    { key: 'apiUrlZtDujia', url: env.APP_API_URL_ZT_DUJIA_QUNAR },
    { key: 'apiUrlTouchDujia', url: env.APP_API_URL_TOUCH_DUJIA_QUNAR },
    { key: 'apiUrlAliyun', url: env.APP_API_URL_ALIYUN_WEASLEY }
  ]

  let encodeByBase64 = false

  // 遍历 API URL，解码 Base64 编码的 URL
  apiUrls.forEach((api) => {
    if (isBase64(api.url)) {
      encodeByBase64 = true
      api.url = decodeBase64(api.url)
    }
  })

  // 如果调试模式启用且有 URL 被解码，则打印日志
  if (isDebugEnable && encodeByBase64) {
    console.log(`Parsed APIs: ${apiUrls.map((api) => api.url).join(', ')}\n`)
  }

  // 返回结果
  return {
    isDebugEnable,
    hosts: Object.fromEntries(apiUrls.map((api) => [api.key, api.url]))
  }
}
