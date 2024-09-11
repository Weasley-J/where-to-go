<script setup>
import { version as vueVersion } from 'vue'

let viteAppName = import.meta.env.VITE_APP_NAME
let viteAppId = import.meta.env.VITE_APP_ID
let apiUrl = import.meta.env.VITE_API_URL
let appEnv = import.meta.env.VITE_APP_ENV
let isProduction = import.meta.env.VITE_IS_PROD

let dbPassword = import.meta.env.DB_PASSWORD

console.log('Vite app name: ', viteAppName)
console.log('Vite app ID: ', viteAppId)
console.log('Vite app env: ', appEnv)
console.log('Vite is prod: ', isProduction) // undefined
console.log('DB password: ', dbPassword) // undefined

const data = {
  vueVersion: vueVersion,
  appInfo: {
    appName: viteAppName,
    appId: viteAppId,
    apiUrl: apiUrl,
    appEnv: appEnv,
    isProduction: isProduction
  }
}
</script>

<template>
  <div>
    <div class="font-container">
      <h2 class="centered-text">Welcome to {{ data.appInfo.appName }}</h2>
    </div>
    <p style="margin: 10px 0 10px">
      This app is created with Vite. powered by Vue<strong style="color: red">{{
        (data?.vueVersion ? ' v' : '').concat(data.vueVersion)
      }}</strong>
    </p>
    <p>应用 ID: {{ data.appInfo.appId }}</p>
    <p>运行环境 : {{ data.appInfo.appEnv }}</p>
    <p>
      API URL: <a :href="data.appInfo?.apiUrl" target="_blank">{{ data.appInfo.apiUrl }}</a>
    </p>
    <p>isProduction: {{ data.appInfo.isProduction }}</p>
    <div style="text-align: center">
      <router-link to="/">首页</router-link>
    </div>
  </div>
</template>

<style scoped></style>
