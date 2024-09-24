<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import eventBus from '@/stores/eventBus.js'
import { isDebugEnable } from '@/common/debugEnable.js'
import { usePiniaStore } from '@/stores/usePiniaStore.js'
import { logger } from '@/common/logger.js'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'
import { destroyScroll, initScroll, refreshScroll } from '@/common/scrollHelper.js'

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

const route = useRoute()
const piniaStore = usePiniaStore() // 获取 pinia store
const letterElementsRefs = ref([]) // 创建一个数组来存储每个 item 的 DOM 元素引用
const wrapper = ref(null)
let scroll = null

const currentCityLetter = ref('') // 当前城市字母, 从 eventBus 获取
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

function handleClickCity(cityName) {
  piniaStore.updateCurrentCity(cityName)
  piniaStore.updateShowSearch(false)
  router.push('/')
}

onMounted(() => {
  scroll = initScroll(wrapper)
  refreshScroll(scroll)
})

onBeforeUnmount(() => {
  destroyScroll(scroll)
})

// 获取 pinia store 消息
watch(
  () => piniaStore.cityLetter,
  (newCityLetter, oldValue) => {
    if (isDebugEnable) {
      logger.debug('获取 pinia store 消息: ', newCityLetter)
    }
    if (newCityLetter) {
      let scrollElement = letterElementsRefs.value[newCityLetter] // 获取当前城市字母对应的元素
      if (isDebugEnable) logger.debug('Scrolling to Element:\n', scrollElement)
      // 滚动到元素
      if (scrollElement) {
        // scrollElement.scrollIntoView({ behavior: 'smooth' })
        scroll.scrollToElement(scrollElement)
      }
    }
  }
)

watch(
  () => props.currentCities,
  (value, oldValue, onCleanup) => {
    if (value) {
      refreshScroll(scroll)
    }
  }
)

watch(
  () => eventBus.currentCityLetter,
  (value, oldValue, onCleanup) => {
    if (value) {
      currentCityLetter.value = value
      if (isDebugEnable) {
        logger.debug(`Current city letter changed (eventBus): ${value}`)
      }
    }
  }
)
watch(route, async (to, from) => {
  if (isDebugEnable) logger.info('List.vue: 路由变化: ', route.path)
  await nextTick(() => scroll?.refresh()) // 刷新滚动实例: nextTick 配合 async-await 使用
})
</script>

<template>
  <div ref="wrapper" class="list">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div v-show="piniaStore.currentCity !== '城市'" class="button">
              {{ piniaStore.currentCity }}
            </div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div v-for="({ flag, name, pinyin, cityCode }, index) of provinceList" :key="index" class="button-wrapper">
            <div class="button" @click="handleClickCity(name)">{{ name }}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">附近城市</div>
        <div class="button-list">
          <div v-for="({ sightId, placeName, imgUrl }, index) in currentCities" :key="sightId" class="button-wrapper">
            <div class="button" @click="handleClickCity(placeName)">
              {{ placeName }}
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="(values, key) in cityModules.domestic"
        :key="key"
        :ref="(el) => (letterElementsRefs[key] = el)"
        class="area"
      >
        <div class="title border-topbottom">{{ key }}</div>
        <div class="item-list">
          <ul v-for="({ name, pinyin }, index) in values" :key="index">
            <li class="item border-top" @click="handleClickCity(name)">{{ name }}</li>
          </ul>
        </div>
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

  .title
    font-size .68rem
    line-height .78rem
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
      padding .1rem 0
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
