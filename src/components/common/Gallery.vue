<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Navigation, Pagination } from 'swiper/modules'
import { usePiniaStore } from '@/stores/usePiniaStore.js'

const swiperModules = [Pagination, Navigation]
const piniaStore = usePiniaStore() // 获取 pinia store

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="gallery" @click="piniaStore.updateShowGallery(false)">
    <div class="wrapper">
      <swiper
        :loop="true"
        :modules="swiperModules"
        :observe-parents="true"
        :observer="true"
        :pagination="{ clickable: true, type: 'fraction' }"
        :slides-per-group="1"
        :slides-per-view="1"
        class="swiper-pagination-fraction"
        navigation
        space-between="0"
      >
        <swiper-slide v-for="({ imgUrl }, index) in images" :key="index" class="gallery-img">
          <img :alt="`image ${index + 1}`" :src="imgUrl" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="stylus" scoped>

.gallery
  display flex
  flex-direction column
  justify-content center
  z-index 99
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color #000
  opacity 1;

  .wrapper
    height 0
    width 100%
    padding-bottom 56.25% /* 改为16:9比例，或你想要的比例 */
    background-color #fff

    .swiper-pagination-fraction
      color: #fff

    .gallery-img img
      width 100%
      height 100%
</style>
