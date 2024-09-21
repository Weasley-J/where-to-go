<script setup>
import DetailBanner from '@/components/detail/Banner.vue'
import DetailHeader from '@/components/detail/Header.vue'
import { getCurrentInstance, onMounted, ref } from 'vue'
import axios from 'axios'
import { isDebugEnable } from '@/common-js/debugEnable.js'
import { logger } from '@/common-js/logger.js'
import { useRoute } from 'vue-router'

const defaultImgSrc = ref('')
const detailData = ref({})
const images = ref([])
const route = useRoute()
const instance = getCurrentInstance() // 获取当前实例

defineOptions({
  name: 'Detail'
})

async function getProductDetail() {
  const productId = route.params.id // get product id
  if (isDebugEnable) {
    logger.debug('Detail productId:', productId)
  }
  const { data } = await axios.post('/api/touch/gw/ctr/productDetailV5', {
    ProductId: 41421113,
    DepartureCityId: null
  })
  let data_ = data.data
  if (isDebugEnable) {
    logger.debug('Detail data:', data_)
  }
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
}

onMounted(async () => {
  await getProductDetail()
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
