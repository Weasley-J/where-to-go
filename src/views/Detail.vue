<script setup>
import DetailBanner from '@/components/detail/Banner.vue'
import DetailHeader from '@/components/detail/Header.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const defaultImgSrc = ref(
  'https://dimg04.c-ctrip.com/images/0306612000cwxiuf0E1FC_C_750_420_Q90.jpg'
)
const detailData = ref({})
const images = ref([])

onMounted(async () => {
  const { data } = await axios.post('/api/touch/gw/ctr/productDetailV5', {
    ProductId: 41421113,
    DepartureCityId: null
  })
  let data_ = data.data
  const { BasicInfo, MediaInfo, TagGroupInfo } = data_
  detailData.value = { BasicInfo, MediaInfo, TagGroupInfo }
  defaultImgSrc.value = MediaInfo?.ImgList?.[0]?.UrlList?.[0]?.Value
  let images_ = MediaInfo?.ImgList || []
  images_.forEach(({ ImageId, UrlList }, index) => {
    images.value.push({
      imageId: ImageId,
      imgUrl: UrlList?.[0]?.Value
    })
  })
})
</script>

<template>
  <div>
    <detail-banner :default-img-src="defaultImgSrc" :detail-data="detailData" :images="images" />
    <detail-header :detail-data="detailData"></detail-header>
    <div class="content"></div>
  </div>
</template>

<style lang="stylus" scoped>
.content
  height 50rem
</style>
