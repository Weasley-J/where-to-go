<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { isDebugEnable } from '@/common/debugEnable.js'
import { logger } from '@/common/logger.js'
import { usePiniaStore } from '@/stores/usePiniaStore.js'
import router from '@/router/index.js'
import { destroyScroll, initScroll, refreshScroll } from '@/common/scrollHelper.js'

const props = defineProps({
  cityModules: {
    type: Object,
    default: () => ({ domestic: null, abroad: null })
  }
})

const piniaStore = usePiniaStore() // 获取 pinia store
const showSearch = piniaStore.showSearch

const searchResults = ref([])
const searchRefs = ref([])
const timer = ref(null)
const flattenCities = ref({})
const wrapper = ref(null)
let scroll = null

// 初始化时将cityModules扁平化
const initFlattenCities = () => {
  flattenCities.value = Object.entries(props.cityModules.domestic || {}).flatMap(([key, value]) =>
    Object.entries(value).map(([k, { flag, cityCode, name, pinyin }]) => ({
      flag,
      cityCode,
      name,
      pinyin
    }))
  )
}

watch(
  () => searchResults.value,
  (newResults) => {
    if (!wrapper.value) {
      return
    }
    piniaStore.updateShowSearch(true)
    if (isDebugEnable) logger.info('search-content wrapper value : ', wrapper.value)
    refreshScroll(scroll)
  },
  { immediate: true }
)

// 在 component mounted 或 props 改变时调用 initFlattenCities
watch(() => props.cityModules, initFlattenCities, { immediate: true })
watch(
  () => piniaStore.keyword,
  (keyword) => {
    let _keyword = keyword.toString().trim()
    if (!_keyword) {
      searchResults.value = []
      return
    }
    piniaStore.updateKeyword(_keyword)
    searchResults.value = [] // 清空搜索结果
    if (timer.value) clearTimeout(timer.value) // 取消上一次的搜索请求
    timer.value = setTimeout(() => {
      flattenCities.value.forEach(({ flag, cityCode, name, pinyin }) => {
        if (
          name.includes(_keyword) ||
          pinyin?.toString()?.toLowerCase().includes(_keyword.toLowerCase())
        ) {
          searchResults.value.push({ flag, cityCode, name, pinyin })
        }
      })
    }, 200)
  },
  { immediate: true }
)

onBeforeMount(() => {
  if (isDebugEnable) logger.debug('onBeforeMount showSearch value:', showSearch)
})

onMounted(() => {
  initFlattenCities()
  scroll = initScroll(wrapper)
})

onBeforeUnmount(() => {
  destroyScroll(scroll)
})
</script>

<template>
  <div class="search">
    <input
      v-model="piniaStore.keyword"
      class="search-input"
      placeholder="城市名/拼音"
      type="text"
    />
    <div v-show="piniaStore.showSearch" ref="wrapper" class="search-content">
      <div>
        <ul v-for="({ flag, cityCode, name, pinyin }, idx) in searchResults" :key="idx">
          <li
            class="search-item border-bottom"
            @click="
              () => {
                piniaStore.updateCurrentCity(name)
                piniaStore.updateShowSearch(false)
                router.push('/')
              }
            "
          >
            {{ name }}
          </li>
        </ul>
        <p v-show="searchResults.length === 0" class="search-item border-bottom">无匹配项</p>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.search
  height 2.2rem
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

  .search-content
    overflow hidden
    position absolute
    z-index 1
    top 3.58rem
    left 0
    right 0
    bottom 0
    background #eee

    .search-item
      padding .4rem 0 .28rem .4rem
      line-height 1rem
      background-color #fff
      color #666
</style>
