<script setup></script>
<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input"><span class="iconfont">&#xe632;</span>输入城市/景点/游玩主题</div>
    <div class="header-right arrow-icon">城市<span class="iconfont">&#xe62d;</span></div>
  </div>
</template>

<style lang="stylus" scoped>
.header
  display flex
  line-height .95rem
  background #00bcd4
  color #fff

  .header-left
    min-width: 1.04rem
    padding: 0 .1rem
    float: left
    text-align: center
    color: #fff

  .back-icon
    text-align: center
    font-size: .8rem

  .header-input
    flex: 1
    height: .64rem
    line-height: .64rem
    text-align center;
    margin-top: .12rem
    margin-left: .2rem
    padding-left: .2rem
    background: #fff
    border-radius: .1rem
    color: #ccc

  .header-right
    min-width: 1.04rem
    padding: 0 .1rem
    float: right
    text-align: center
    color: #fff

    .arrow-icon
      margin-left: -.04rem
      font-size: .24rem
</style>
