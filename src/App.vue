<script setup>
import { RouterView } from 'vue-router'
import { computed } from 'vue'

// Don't cache
const excludes = computed(() => {
  return ['Detail']
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :exclude="excludes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
