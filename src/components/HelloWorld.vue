<script setup>
import { version as vueVersion } from 'vue'

let viteAppName = import.meta.env.VITE_APP_NAME
let viteAppId = import.meta.env.VITE_APP_ID
let apiUrl = import.meta.env.VITE_DOMAIN_QUNAR_COM_TOUCH_DUJIA
let appEnv = import.meta.env.VITE_APP_ENV
let isProduction = import.meta.env.VITE_IS_PROD

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

console.log(data)
</script>

<template>
  <div>
    <h1>Welcome to {{ data.appInfo.appName }}</h1>
  </div>
</template>

<style scoped></style>
