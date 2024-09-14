<script setup>
import HomeHeader from '@/components/home/Header.vue'
import HomeSwiper from '@/components/home/HomeSwiper.vue'
import HomeIcons from '@/components/home/Icons.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import Recommendation from '@/components/home/Recommendation.vue'
import { Navigation, Pagination } from 'swiper/modules'
import SwiperDemo from '@/components/demo/SwiperDemo.vue'

// 定义数据
const whereToDoData = ref(null)
const whereToGoIconPackage = ref(null)
const swiperModules = ref([Pagination, Navigation])

const route = useRoute()
const fetchAllData = async () => {
  let dept = '上海'
  let { data } = await axios.get(
    '/api/touch/' + `golfz/free/travelClass?query=all&dep=${dept}&type=free`
  )
  whereToDoData.value = data.data
  whereToGoIconPackage.value = fetchFullIcons(whereToDoData.value)
}
const fetchFullIcons = (whereToDoData) => {
  let fullIconPack = []
  for (const obj of whereToDoData) {
    let { name, icon, type } = obj
    fullIconPack.push({ name, icon, type })
  }
  return fullIconPack
}

/**
 * 进入页面时加载数据
 */
onMounted(() => {
  fetchAllData()
  if (whereToDoData.value && whereToDoData.value.length > 0) {
    console.log('进入页面时加载: ', JSON.stringify(whereToDoData.value))
  }
})

/** 监听路由变化-重载数据 */
watch(route, () => {
  fetchAllData()
  if (whereToDoData.value && whereToDoData.value.length > 0) {
    console.log('路由变化重新加载: ', JSON.stringify(whereToDoData.value))
  }
})
</script>

<template>
  <div>
    <home-header></home-header>
    <home-swiper></home-swiper>
    <home-icons :swiper-modules="swiperModules" :where-to-go-icon-package="whereToGoIconPackage" />
    <swiper-demo></swiper-demo>
    <recommendation></recommendation>
    <div class="fetch-home-data">
      <button class="fetch-data-btn" @click="fetchAllData">刷新数据</button>
    </div>
  </div>
</template>

<style scoped>
.fetch-home-data {
  margin-top: 68px;
  text-align: center;
}

.fetch-data-btn {
  display: inline-block;
  background-color: #fff;
  color: #00bcd4;
  border: 1px solid #00bcd4;
  border-radius: 8px;
}
</style>
