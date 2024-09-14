<script setup>
import HomeHeader from '@/views/home/Header.vue'
import HomeSwiper from '@/views/home/HomeSwiper.vue'
import HomeIcons from '@/views/home/Icons.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import HomeRecommendation from '@/views/home/Recommendation.vue'
import HomeWeekend from '@/views/home/Weekend.vue'
import { Navigation, Pagination } from 'swiper/modules'

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
    <home-header />
    <home-swiper />
    <home-icons :swiper-modules="swiperModules" :where-to-go-icon-package="whereToGoIconPackage" />
    <home-recommendation />
    <home-weekend />
    <div class="fetch-home-data">
      <button class="fetch-data-btn" @click="fetchAllData">刷新数据</button>
    </div>
    <nav>
      <router-link class="navigation-button" to="/about">关于</router-link>
    </nav>
  </div>
</template>

<style scoped>
.fetch-home-data {
  margin-top: 18px;
  margin-bottom: 18px;
  text-align: center;
}

.fetch-data-btn {
  display: none;
  background-color: #fff;
  color: #00bcd4;
  border: 1px solid #00bcd4;
  border-radius: 8px;
}

nav {
  margin-top: 18px;
  margin-bottom: 18px;
  text-align: center;
}

.navigation-button {
  color: #00bcd4;
  text-decoration: none;
}
</style>
