<script setup>
import router from '@/router/index.js'
import vuexStore from '@/stores/vuexStore.js'
import { usePiniaStore } from '@/stores/usePiniaStore.js'

const props = defineProps({
  city: {
    type: Object,
    default: () => ({ name: null, type: null })
  },
  whereToGoData: null
})

const piniaStore = usePiniaStore()

function gotoCity() {
  vuexStore.commit('setIconPackages', props.whereToGoData)
  router.push('/city').then(() => {
    window.scrollTo(0, 0)
  })
  piniaStore.updateShowSearch(false)
  piniaStore.updateKeyword('')
}

function gotoSearch(showSearch) {
  piniaStore.updateKeyword('')
  piniaStore.updateShowSearch(showSearch)
  router.push('/search').then(() => {
    window.scrollTo(0, 0)
  })
}
</script>

<template>
  <div class="header">
    <div class="header-left">
      <div class="iconfont back-icon">&#xe624;</div>
    </div>
    <div class="header-input" @click="gotoSearch(true)">
      <span class="iconfont">&#xe632;</span>输入城市/景点/游玩主题
    </div>
    <div class="header-right arrow-icon">
      <span class="iconfont" @click="gotoCity">{{ piniaStore.currentCity }}&#xe62d;</span>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.header
  display flex
  line-height 2rem
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
    margin: 0.1rem

  .header-input
    flex: 1
    height: 1.28rem
    line-height: 1.28rem
    margin-top: 0.48rem
    margin-left: 0.3rem;
    margin-right: 0.5rem;
    border-radius: .18rem
    background: #fff
    color: #ccc
    text-align center

  .header-right
    min-width: 1.04rem
    padding: 0.1rem 0.3rem 0 0
    float: right
    text-align: center
    color: #fff

    .arrow-icon
      margin-left: -.04rem
      font-size: .24rem
</style>
