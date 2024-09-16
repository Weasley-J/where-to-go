<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  cityModules: {
    type: Object,
    default: () => ({ domestic: {}, abroad: {} })
  },
  currentCities: {
    type: Array,
    default: () => []
  }
})
const provinceList = computed(() => {
  const domestic = props.cityModules.domestic || {} // 确保 domestic 为对象
  return Object.entries(domestic)
    .flatMap(([key, values]) =>
      (values || []) // 确保 values 存在
        .filter(({ flag }) => flag === 1) // 过滤 flag 为 1 的项
        .map(({ flag, name, pinyin, cityCode }) => ({
          firstWord: key,
          flag,
          name,
          pinyin,
          cityCode
        }))
    )
    .sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div class="list">
    <div class="area">
      <div class="title border-topbottom">热门城市</div>
      <div class="button-list">
        <div
          v-for="({ flag, name, pinyin, cityCode }, index) of provinceList"
          :key="index"
          class="button-wrapper"
        >
          <div class="button">{{ name }}</div>
        </div>
      </div>
    </div>
    <div class="area">
      <div class="title border-topbottom">当前城市</div>
      <div class="button-list">
        <div
          v-for="({ sightId, placeName, imgUrl }, index) in currentCities"
          :key="sightId"
          class="button-wrapper"
        >
          <div class="button">{{ placeName }}</div>
        </div>
      </div>
    </div>
    <div v-for="(values, key) in cityModules.domestic" :key="key" class="area">
      <div class="title border-topbottom">{{ key }}</div>
      <div class="item-list">
        <ul v-for="({ name, pinyin }, index) in values" :key="index">
          <li class="item border-top">{{ name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.border-topbottom
  &::before
    background-color #cccccc

.border-bottom
  &::before
    background-color #cccccc

.list
  overflow hidden
  position absolute
  top 3.8rem
  right 0
  left 0
  bottom 0

.area
  .title
    font-size .68rem
    color #666;
    background #eee;
    padding .3rem .4rem

  .button-list
    overflow hidden
    padding 1px 36px 1px 2px

    .button-wrapper
      float left
      width 33.3%

    .button
      height .88rem
      margin .22rem
      pading .1rem 0
      text-align center
      vertical-align center
      line-height .88rem
      font-size .68rem
      border 1px solid #ccc
      border-radius .2rem

  .item-list
    .item
      padding-left .4rem
      line-height 1.58rem
      margin-bottom .2rem
      font-size .68rem
</style>
