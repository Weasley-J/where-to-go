<template>
  <div class="wrapper">
    <swiper
      ref="swiperRef"
      :autoplay="true"
      :navigation="false"
      :pagination="{ clickable: true }"
      :loop="true"
      :slides-per-view="1"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="item of images" :key="item.id">
        <img :src="item.url" alt="Image" class="swiper-img" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue'
import axios from 'axios'

// 定义属性
const props = defineProps({
  swiperModules: {
    type: Array,
    default: () => []
  }
})

// 定义数据
const swiperRef = ref(null)
const autoplayTimeout = ref(3000) // 自动轮播间隔时间
reactive({ id: 1 })

const images = ref([{}])
onBeforeMount(async () => {
  try {
    let { data } = await axios.get('/api/touch/' + 'qdeProxy.json?position=touch_top')
    const fetchedImages = []
    for (let i = 0; i < data.data.length; i++) {
      let content = data.data[i]
      let splitContents = content.toString().split('=')
      fetchedImages.push({
        id: i,
        url: splitContents[1].split('\n')[0]
      })
    }
    images.value = fetchedImages
  } catch (err) {
    console.log('获取图片失败：', err)
  }
})

let intervalId = null

// 获取 swiper 实例
const onSwiper = (swiper) => {
  swiperRef.value = swiper
  startAutoplay()
}

// 启动自动轮播
const startAutoplay = () => {
  intervalId = setInterval(() => {
    if (null !== swiperRef.value) {
      swiperRef.value.slideNext(autoplayTimeout.value, true)
    }
  }, autoplayTimeout.value)
}

// 停止自动轮播
const stopAutoplay = () => {
  clearInterval(intervalId)
}

// 组件挂载时启动定时器
onMounted(() => {
  startAutoplay()
})

// 组件卸载时停止定时器
onUnmounted(() => {
  stopAutoplay()
})
</script>

<style lang="stylus" scoped>
.wrapper:deep(.swiper-pagination-bullet-active)
  background #fff

.wrapper
  overflow hidden
  width 100%
  height 0
  padding-bottom 25.2%
  background #eee

  .swiper-img
    width 100%
</style>
