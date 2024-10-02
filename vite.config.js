import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { hosts } = APIs(mode)
  const { apiUrlToGoZt, apiUrlToGoTouch, apiUrlToGoWeasley } = hosts

  return {
    define: {},
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      open: true,
      proxy: {
        '/api/zt': {
          target: apiUrlToGoZt,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/zt/, '')
        },
        '/api/touch': {
          target: apiUrlToGoTouch,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/touch/, '')
        },
        '/api/weasley/aliyun': {
          target: apiUrlToGoWeasley,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/weasley\/aliyun/, '')
        }
      }
    }
  }
})

// Helper functions

export const base64Utils = {
  defaultRecursiveCount: 15,
  isBase64(str) {
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
    if (!base64Regex.test(str)) return false
    try {
      atob(str)
      return true
    } catch {
      return false
    }
  },

  encodeBase64(str, recursiveCount = 1, currentCount = 0) {
    if (currentCount >= recursiveCount) return str
    const utf8Bytes = new TextEncoder().encode(str)
    const base64String = btoa(String.fromCharCode(...utf8Bytes))
    return this.encodeBase64(base64String, recursiveCount, currentCount + 1)
  },

  decodeBase64(encodedStr, recursiveCount = 1, currentCount = 0) {
    if (currentCount >= recursiveCount) return encodedStr

    if (this.isBase64(encodedStr)) {
      try {
        const decoded = atob(encodedStr)
        const utf8Decoded = this.utf8Decode(decoded)
        return this.decodeBase64(utf8Decoded, recursiveCount, currentCount + 1)
      } catch {
        return encodedStr
      }
    } else {
      return encodedStr
    }
  },

  utf8Decode(utf8String) {
    const bytes = new Uint8Array([...utf8String].map((char) => char.charCodeAt(0)))
    return new TextDecoder().decode(bytes)
  }
}

/**
 * This function is used to convert a string or boolean value to boolean.
 */
function isTrue(value) {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase()
    return ['true', '1', 'on', 'yes'].includes(lowerValue)
  }
  return false
}

/**
 * APIs
 */
const APIs = (mode) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDebugEnable = isTrue(env.VITE_IS_DEBUG_ENABLE)

  const apiUrls = [
    { key: 'apiUrlToGoZt', url: env.APP_API_URL_WHERE_TO_GO_ZT },
    { key: 'apiUrlToGoTouch', url: env.APP_API_URL_WHERE_TO_GO_TOUCH },
    { key: 'apiUrlToGoWeasley', url: env.APP_API_URL_WHERE_TO_GO_WEASLEY }
  ]

  let encodeByBase64 = false
  apiUrls.forEach((api) => {
    if (base64Utils.isBase64(api.url)) {
      encodeByBase64 = true
      api.url = base64Utils.decodeBase64(api.url, 20)
    }
  })

  if (isDebugEnable && encodeByBase64) {
    console.log(`Parsed APIs: ${apiUrls.map((api) => api.url).join(', ')}\n`)
  }

  return {
    isDebugEnable,
    hosts: Object.fromEntries(apiUrls.map((api) => [api.key, api.url]))
  }
}
