<script setup>
import { ref } from 'vue'

let appName = ref(import.meta.env.VITE_APP_NAME)
</script>

<template>
  <div>
    <h1>Welcome to {{ appName }}</h1>
  </div>
</template>

<style scoped></style>
