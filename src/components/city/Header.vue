<script setup></script>

<template>
  <div class="header">
    城市选择
    <router-link to="/">
      <div class="iconfont header-back">&#xe624;</div>
    </router-link>
  </div>
</template>

<style lang="stylus" scoped>
.header
  position relative
  overflow hidden
  line-height 1.8rem
  text-align center
  background #00bcd4
  color #fff
  font-size .8rem

  .header-back
    top 0
    left 0
    position absolute
    text-align: center
    font-size: .8rem
    color #fff
</style>
