<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">
    <RouterView />
    <nav>
      <router-link to="/about">关于</router-link>
    </nav>
  </div>
</template>

<style scoped></style>
