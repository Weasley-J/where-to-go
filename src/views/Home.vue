<script setup>
import HomeHeader from '@/components/home/Header.vue'
import HomeSwiper from '@/components/home/HomeSwiper.vue'
import HomeIcons from '@/components/home/Icons.vue'
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import HomeRecommendation from '@/components/home/Recommendation.vue'
import HomeWeekend from '@/components/home/Weekend.vue'
import { Navigation, Pagination } from 'swiper/modules'
import { useStore } from 'vuex'
import router from '@/router/index.js'

// 定义数据
const store = useStore()
const route = useRoute()

const whereToGoData = ref(null)
const whereToGoHeaderIcons = ref(null)
const swiperModules = ref([Pagination, Navigation])
const fetchAllData = async () => {
  try {
    const query = 'all'
    const url = `/api/touch/golfz/free/travelClass?query=${query}&dep=&type=free`
    const { data } = await axios.get(url)
    const responseData = data.data
    if (responseData && responseData.length > 0) {
      const { type, name } = responseData[0]
      whereToGoData.value = responseData
      whereToGoHeaderIcons.value = fetchFullIcons(responseData)
    } else {
      console.error('No data found in response')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
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
  if (whereToGoData.value && whereToGoData.value.length > 0) {
    console.log('进入页面时加载: ', JSON.stringify(whereToGoData.value))
  }
})

/** 监听路由变化-重载数据 */
watch(route, () => {
  fetchAllData()
  if (whereToGoData.value && whereToGoData.value.length > 0) {
    console.log('路由变化重新加载: ', JSON.stringify(whereToGoData.value))
  }
})

// 跳转到关于页面：并传递数据，不改变地址栏
function goToAbout() {
  store.commit('setIconPackages', whereToGoData)
  store.commit('setShowJSON', false)
  router
    .push('/about') // to [/about]
    .then(() => {
      window.scrollTo(0, 0) // 在跳转成功后，滚动到页面顶部
    })
}
</script>

<template>
  <div>
    <home-header :where-to-go-data="whereToGoData" />
    <home-swiper />
    <home-icons :swiper-modules="swiperModules" :where-to-go-header-icons="whereToGoHeaderIcons" />
    <home-recommendation />
    <home-weekend />
    <div class="fetch-home-data">
      <button class="fetch-data-btn" @click="fetchAllData">刷新数据</button>
    </div>
    <nav>
      <span class="navigation-button" @click="goToAbout">关于</span>
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
  font-size: 24px;
  text-decoration: none;
  cursor: pointer;
}
</style>
