<script setup>
import CommonGallery from '@/components/common/Gallery.vue'
import { onMounted } from 'vue'
import { usePiniaStore } from '@/stores/usePiniaStore.js'
import FaceTransition from '@/components/fade/FaceTransition.vue'

const piniaStore = usePiniaStore() // 获取 pinia store

defineProps({
  defaultImgSrc: {
    type: String,
    default: ''
  },
  detailData: {
    type: Object,
    default: () => {}
  },
  images: {
    type: Array,
    default: () => []
  }
})

onMounted(async () => {
  piniaStore.updateShowGallery(false)
})
</script>
<template>
  <div class="banner">
    <img
      alt="banner"
      :src="defaultImgSrc"
      class="banner-img"
      @click="piniaStore.updateShowGallery(true)"
    />
    <div class="banner-info">
      <div class="banner-title">{{ detailData.BasicInfo?.Title }}</div>
      <div class="banner-number">
        <span class="iconfont banner-icon">&#xe8ba;</span>{{ images.length }}
      </div>
    </div>
    <face-transition>
      <common-gallery v-show="piniaStore.showGallery" :images="images" />
    </face-transition>
  </div>
</template>

<style lang="stylus" scoped>
.banner
  position relative;
  overflow hidden
  padding-bottom 56.25% /* 16:9 比例 */

  .banner-img
    width 100%

  .banner-info
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 240px;
    padding: 1rem;
    align-items: center
    color: #fff
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))

    .banner-title
      flex 1
      font-size 1.1rem
      padding 0 .6rem

    .banner-number
      height 1rem
      line-height 1rem
      padding 0 .4rem
      margin-top .14rem;
      font-size: 1srem
      border-radius .25rem
      background-color rgba(0, 0, 0, .8)

      .banner-icon
        font-size 1.18rem
        padding-right .1rem;
</style>
