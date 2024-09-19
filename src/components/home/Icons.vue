<script setup>
import { computed, onBeforeMount, ref, watch } from 'vue'
import axios from 'axios'
import { isDebugEnable } from '@/common/debugEnable.js'
import { logger } from '@/common/logger.js'

// 定义属性
const props = defineProps({
  whereToGoHeaderIcons: {
    type: Array,
    default: () => []
  },
  swiperModules: {
    type: Array
  }
})

// 定义数据
const swiperOption = ref({
  autoplay: false,
  loop: true,
  itemsPerPage: 8
})
const icons = ref([])
const paginationIcons = ref([])

// 计算属性
const computedPages = computed(() => {
  const pages = []
  icons.value.forEach((item, index) => {
    const page = Math.floor(index / 8)
    if (!pages[page]) {
      pages[page] = []
    }
    pages[page].push(item)
  })
  return pages
})

// 监听 paginationIcons 的变化
watch(
  () => paginationIcons,
  (newValue) => {
    paginationIcons.value = computedPages.value
    swiperOption.value.autoplay = paginationIcons.value.length > 8 // length > 8，则 autoplay 设为 true
    swiperOption.value.loop = paginationIcons.value.length > 1 // length > 1，则 loop 设为 true
  },
  { immediate: true }
)

// 监听 whereToGoHeaderIcons 的变化
watch(
  () => props.whereToGoHeaderIcons,
  (newValue) => {
    if (newValue && newValue.length > 0) {
      // console.log('where-to-go-icon-package 已更新:', newValue)
    }
  },
  { immediate: true }
)

/**
 * 合并 where-to-go 的两个 icons 数组, 处理分页逻辑
 */
const mergeIconToPaginationIcons = async (icons, whereToGoHeaderIcons) => {
  const _icons = [...icons.value] // 解构 icons.value 数组
  const lastOne = _icons[_icons.length - 1]
  // 解构 whereToGoHeaderIcons 的元素对象属性
  const updatedIcons = whereToGoHeaderIcons.map(({ name, icon }, index) => ({
    id: lastOne.id + index + 1, // 动态生成新的 id
    desc: name,
    imgUrl: icon
  }))

  // 合并两个数组
  icons.value = [..._icons, ...updatedIcons]

  // 处理分页逻辑, 二维数组
  const itemsPerPage = swiperOption.value.itemsPerPage
  const totalPages = Math.ceil(icons.value.length / itemsPerPage)
  const paginatedIcons = []
  for (let i = 0; i < totalPages; i++) {
    const startIndex = i * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    paginatedIcons.push(icons.value.slice(startIndex, endIndex))
  }

  return paginatedIcons
}

/**
 * 获取数据
 */
onBeforeMount(async () => {
  try {
    const { data } = await axios.get('/api/zt/' + 'api/app_dujia/index.php?city=上海')
    icons.value = data.data.map(({ id, title, extend: { image } }) => ({
      id,
      desc: title,
      imgUrl: image
    }))
    const paginatedIcons = await mergeIconToPaginationIcons(icons, props.whereToGoHeaderIcons)
    if (isDebugEnable) {
      logger.debug('paginated_icons:', paginatedIcons)
    }
    paginationIcons.value = paginatedIcons
  } catch (err) {
    console.log(err.message)
  }
})
</script>

<template>
  <div class="icons">
    <swiper
      :modules="swiperModules"
      :autoplay="swiperOption.autoplay"
      :loop="swiperOption.loop"
      :navigation="false"
      :pagination="{ clickable: true }"
      :slides-per-group="1"
      :slides-per-view="1"
    >
      <swiper-slide v-for="(page, index) in paginationIcons" :key="index">
        <div v-for="({ id, imgUrl, desc }, index) in page" :key="id" class="icon">
          <div class="icon-img">
            <img :src="imgUrl" alt="" class="icon-img-content" />
          </div>
          <p class="icon-desc">{{ desc }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style lang="stylus" scoped>
fontColor = #333
ellipse()
  overflow hidden
  white-space nowrap
  text-overflow ellipsis

.icons:deep( .swiper-container)
  height: 0
  padding-bottom: 50%

.icons
  margin-top: .1rem

  .icon
    position: relative
    overflow: hidden
    float: left
    width: 25%
    height: 0
    padding-bottom: 25%

    .icon-img
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: .50rem
      box-sizing: border-box
      padding: .1rem

      .icon-img-content
        display: block
        margin: 0 auto
        height: 100%

    .icon-desc
      position: absolute
      left: 0
      right: 0
      bottom: 0
      height: .50rem
      font-size .55rem
      line-height: .50rem
      text-align: center
      color: $fontColor
      ellipsis()
</style>
