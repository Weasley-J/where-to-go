<template>
  <div>
    <transition>
      <slot></slot>
    </transition>
  </div>
</template>

<script setup>
defineOptions({
  name: 'FaceTransition'
})
</script>

<style lang="css" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s;
}
</style>
