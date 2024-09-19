<script setup>
import { computed, ref, version as vueVersion } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { isDebugEnable } from '@/common-js/debugEnable.js'
import { logger } from '@/common-js/logger.js'

let viteAppName = import.meta.env.VITE_APP_NAME
let viteAppId = import.meta.env.VITE_APP_ID
let apiUrl = import.meta.env.VITE_API_URL
let appEnv = import.meta.env.VITE_APP_ENV
let isProduction = import.meta.env.VITE_IS_PROD

let dbPassword = import.meta.env.DB_PASSWORD

console.log('Vite app name: ', viteAppName)
console.log('Vite app ID: ', viteAppId)
console.log('Vite app env: ', appEnv)
console.log('Vite is prod: ', isProduction)
console.log('DB password: ', dbPassword) // undefined

// 定义数据
const store = useStore()
const route = useRoute()
const router = useRouter()

let lastRoute = router.options.history.state.back // 上一个路由的完整路径
let currentRoute = route.fullPath // 当前路由的完整路径
// 路由变化 - 更新数据
const whereToGoIconSrcPackage = computed(() => {
  let data = store.state.whereToGoHeaderIcons
  if (isDebugEnable && data && data.length > 0) {
    logger.debug(`收到路由[${lastRoute}]跳转到路由[${currentRoute}]携带的数据: ${data.length} 条`)
  }
  return data
})
const showJSONData = computed(() => {
  return store.state.showJSONData
})
const data = ref({
  vueVersion: vueVersion,
  appInfo: {
    appName: viteAppName,
    appId: viteAppId,
    apiUrl: apiUrl,
    appEnv: appEnv,
    isProduction: isProduction
  }
})

function gotoHome() {
  router.push('/')
}
</script>

<template>
  <div>
    <div>
      <h2 class="centered-text" @click="gotoHome">Welcome to {{ data.appInfo.appName }}</h2>
    </div>
    <p class="border-bottom" style="margin: 10px 0 10px">
      This APP created with <span style="color: red">Vite</span>. Powered by Vue<span
        style="color: red"
        >{{ (data?.vueVersion ? ' v' : '').concat(data.vueVersion) }}</span
      >
    </p>
    <p class="border-bottom">应用 ID: {{ data.appInfo.appId }}</p>
    <p class="border-bottom">运行环境 : {{ data.appInfo.appEnv }}</p>
    <p class="border-bottom" style="border-bottom: 1px solid #007aff; padding-bottom: 10px">
      API URL: <a :href="data.appInfo?.apiUrl" target="_blank">{{ data.appInfo.apiUrl }}</a>
    </p>
    <div style="text-align: center; margin-top: 38px; margin-bottom: 38px">
      <router-link class="navigation-button border-bottom" style="text-decoration: none" to="/"
        >首页
      </router-link>
    </div>
    <div v-show="showJSONData">
      <ul v-for="(item, index) of whereToGoIconSrcPackage" :key="index">
        <li style="text-indent: 2px; margin-bottom: 2px; font-size: large">{{ item.name }}</li>
        <textarea cols="40" rows="5">{{ item }}</textarea>
      </ul>
    </div>
  </div>
</template>

<style scoped>
textarea {
  border: 2px solid pink;
  border-radius: 5px;
  width: 100%;
  height: 150px;
  overflow: auto; /* 确保滚动条出现 */
  margin-bottom: 10px;
  scroll-behavior: smooth; /* 平滑滚动 */
  padding: 10px;
  box-sizing: border-box; /* 包含内边距和边框的宽度计算 */
}

/* 自定义滚动条样式 */
/* WebKit-based browsers (Chrome, Safari) */
textarea::-webkit-scrollbar {
  width: 10px;
}

textarea::-webkit-scrollbar-track {
  background: #f0f0f0; /* 滚动条背景 */
  border-radius: 5px;
}

textarea::-webkit-scrollbar-thumb {
  background: pink; /* 滚动条滑块颜色 */
  border-radius: 5px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: hotpink; /* 鼠标悬停时滑块颜色 */
}

/* Firefox */
textarea {
  scrollbar-width: thin;
  scrollbar-color: pink #f0f0f0; /* 滚动条颜色 (滑块颜色 滑槽颜色) */
}

.centered-text {
  margin-top: 15px;
  margin-bottom: 15px;
  color: #00bcd4;
  text-decoration: none;
  font-size: 24px;
  text-align: center;
  border-bottom: 1px solid #007aff;
  cursor: pointer;
}

.navigation-button {
  color: #00bcd4;
  text-decoration: none;
  font-size: 24px;
}
</style>
