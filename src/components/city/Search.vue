<script setup></script>

<template>
  <div class="search">
    <input class="search-input" placeholder="城市名/拼音" type="text" />
  </div>
</template>

<style lang="stylus" scoped>
.search
  height 2rem
  padding: 0 .2rem
  background #00bcd4

  .search-input
    box-sizing border-box
    width 100%
    height 1.58rem
    padding 0 .98rem
    line-height 1rem
    border-radius .38rem
    text-align center
    font-size .55rem
    color #666
    background-color #f0f0f0;
    border 1px solid #00bcd4
    outline none

    &::plaholder
      color #999

    &::user-focus
      border-color #ff4081
      background-color #fff;
</style>
