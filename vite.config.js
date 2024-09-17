import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const { hosts } = APIs(mode)
  const { apiUrlZtDujia, apiUrlTouchDujia, apiUrlAliyun } = hosts
  // 配置代理
  const proxyConfig = {
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

  return {
    define: {},
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      proxy: proxyConfig
    }
  }
})

// Helper functions

function isBase64(str) {
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
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

function encodeBase64(str, recursiveCount = 1, currentCount = 0) {
  // 递归的终止条件：达到指定递归次数
  if (currentCount >= recursiveCount) {
    return str
  }
  // 使用 TextEncoder 编码为 UTF-8，再进行 Base64 编码
  const utf8Bytes = new TextEncoder().encode(str)
  const base64String = btoa(String.fromCharCode(...utf8Bytes))
  return encodeBase64(base64String, recursiveCount, currentCount + 1)
}

function decodeBase64(encodedStr) {
  let decode = encodedStr
  if (isBase64(decode)) {
    decode = atob(decode) // Base64 解码为字符
    decode = utf8Decode(decode)
    return decodeBase64(decode)
  } else {
    return decode
  }
}

// 将 Base64 解码后的字符转换为 UTF-8 字符串
function utf8Decode(utf8String) {
  const bytes = new Uint8Array(utf8String.split('').map((char) => char.charCodeAt(0)))
  return new TextDecoder().decode(bytes)
}

/**
 * This function is used to convert a string or boolean value to boolean.
 */
function isTrue(value) {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value.toLowerCase() === '1'
  }
  return Boolean(value).valueOf()
}

/**
 * APIs: 主要用于解析环境变量，并返回 API 地址
 */
const APIs = (mode) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDebugEnable = isTrue(env.VITE_IS_DEBUG_ENABLE)

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
