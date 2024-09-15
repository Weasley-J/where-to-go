<script setup>
import { computed, ref, version as vueVersion } from 'vue'
import { useStore } from 'vuex'
import { isDebugEnable } from '@/main.js'
import { useRoute, useRouter } from 'vue-router'

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
const whereToGoIconSrcPackage = ref(
  computed(() => {
    let data = store.state.whereToGoIconPackage
    if (isDebugEnable && data && data.length > 0) {
      console.log(
        `收到路由[${lastRoute}]跳转到路由[${currentRoute}]携带的数据: ${JSON.stringify(data)}`
      )
    }
    return data
  })
)
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
</script>

<template>
  <div>
    <div>
      <h2 class="centered-text">Welcome to {{ data.appInfo.appName }}</h2>
    </div>
    <p class="border-bottom" style="margin: 10px 0 10px">
      This APP created with <span style="color: red">Vite</span>. Powered by Vue<span
        style="color: red"
        >{{ (data?.vueVersion ? ' v' : '').concat(data.vueVersion) }}</span
      >
    </p>
    <p class="border-bottom">应用 ID: {{ data.appInfo.appId }}</p>
    <p class="border-bottom">运行环境 : {{ data.appInfo.appEnv }}</p>
    <p class="border-bottom">
      API URL: <a :href="data.appInfo?.apiUrl" target="_blank">{{ data.appInfo.apiUrl }}</a>
    </p>
    <div style="text-align: center; margin-top: 38px; margin-bottom: 38px">
      <router-link class="navigation-button border-bottom" style="text-decoration: none" to="/"
        >首页
      </router-link>
    </div>
    <ul v-for="(item, index) of whereToGoIconSrcPackage" :key="index">
      <li style="text-indent: 2px; margin-bottom: 2px; font-size: large">{{ item.name }}</li>
      <textarea cols="40" rows="5">{{ item }}</textarea>
    </ul>
  </div>
</template>

<style scoped>
textarea {
  border: 2px solid pink;
  border-radius: 5px;
  border-spacing: 0; /* 防止单元格之间有间隙 */
  width: 98%;
  overflow: hidden; /* 确保圆角不会被单元格的边框影响 */
  margin-bottom: 10px;
}

.centered-text {
  margin-bottom: 10px;
  color: #00bcd4;
  text-decoration: none;
  font-size: 24px;
  text-align: center;
}

.navigation-button {
  color: #00bcd4;
  text-decoration: none;
  font-size: 24px;
}
</style>
