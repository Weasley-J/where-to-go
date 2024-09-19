<script setup>
import CommonGallery from '@/components/common/Gallery.vue'
import { onMounted, ref } from 'vue'
import { usePiniaStore } from '@/stores/usePiniaStore.js'

const piniaStore = usePiniaStore() // 获取 pinia store

onMounted(() => {
  piniaStore.updateShowGallery(false)
})

const images = ref([
  {
    imgUrl:
      'https://img1.qunarzz.com/vs_ceph_b2c_001/2bb7a9aa-b536-4287-9814-8bbf75cd5310.jpg_r_1280x840x95_3dcc6133.jpg'
  },
  {
    imgUrl:
      'https://img1.qunarzz.com/vs_ceph_b2c_001/2bb7a9aa-b536-4287-9814-8bbf75cd5310.jpg_r_1280x840x95_3dcc6133.jpg'
  },
  {
    imgUrl:
      'https://img1.qunarzz.com/vs_ceph_b2c_001/2bb7a9aa-b536-4287-9814-8bbf75cd5310.jpg_r_1280x840x95_3dcc6133.jpg'
  }
])
</script>
<template>
  <div class="banner">
    <img
      alt="banner"
      class="banner-img"
      src="https://dimg04.c-ctrip.com/images/0306612000cwxiuf0E1FC_C_750_420_Q90.jpg"
      @click="piniaStore.updateShowGallery(true)"
    />
    <div class="banner-info">
      <div class="banner-title">德国3日2晚自由行·包车游</div>
      <div class="banner-number"><span class="iconfont banner-icon">&#xe8ba;</span>39</div>
    </div>
    <common-gallery v-show="piniaStore.showGallery" :images="images" />
  </div>
</template>

<style lang="stylus" scoped>
.banner
  position relative;
  overflow hidden
  /* 修改为合理的比例 */
  padding-bottom 56.25% /* 16:9 比例 */

  .banner-img
    width 100%

  .banner-info
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 214px;
    padding: 1rem;
    line-height .8rem;
    align-items: center
    color: #fff
    background-image: linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8))

    .banner-title
      flex 1
      font-size 1.1rem
      padding 0 .6rem

    .banner-number
      height 1rem
      line-height .9rem;
      padding 0 .4rem
      margin-top .14rem;
      font-size: 1.1rem
      border-radius .25rem
      background-color rgba(0, 0, 0, .8)

      .banner-icon
        font-size 1.18rem
        padding-right .1rem;
</style>
