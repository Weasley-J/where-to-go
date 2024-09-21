<script setup>
import HomeHeader from '@/components/home/Header.vue'
import HomeSwiper from '@/components/home/HomeSwiper.vue'
import HomeIcons from '@/components/home/Icons.vue'
import { onActivated, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import HomeRecommendation from '@/components/home/Recommendation.vue'
import HomeWeekend from '@/components/home/Weekend.vue'
import { Navigation, Pagination } from 'swiper/modules'
import { useStore } from 'vuex'
import { isDebugEnable } from '@/common/debugEnable.js'
import { usePiniaStore } from '@/stores/usePiniaStore.js'
import { logger } from '@/common/logger.js'
import isTrue from '@/common/isTrue.js'

// 定义数据
const store = useStore()
const route = useRoute()
const router = useRouter()

const piniaStore = usePiniaStore()
const refreshData = ref(!isTrue(import.meta.env.VITE_IS_PROD))
const whereToGoData = ref(null)
const whereToGoHeaderIcons = ref(null)
const swiperModules = ref([Pagination, Navigation])
const lastCity = ref('')
const fetchSourceData = async () => {
  const query = 'all'
  const url = `/api/touch/golfz/free/travelClass?query=${query}&dep=&type=free&city=${lastCity.value}`
  try {
    const { data } = await axios.get(url)
    const responseData = data.data
    if (responseData && responseData.length > 0) {
      piniaStore.updateWhereToGoData(responseData)
      if (isDebugEnable) {
        logger.info('Home.vue: fetchSourceData: responseData', piniaStore.whereToGoData)
      }
    } else {
      console.error('No data found in response')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const refreshAllData = async () => {
  await fetchSourceData()
  setTimeout(() => {
    refreshData.value = false
  }, 3000)
}
const fetchFullIcons = (whereToDoData) => {
  let fullIconPack = []
  for (const obj of whereToDoData) {
    let { name, icon, type } = obj
    fullIconPack.push({ name, icon, type })
  }
  return fullIconPack
}

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

/**
 * 进入页面时加载数据
 */
onMounted(async () => {
  await fetchSourceData()
  lastCity.value = piniaStore.currentCity
  whereToGoData.value = piniaStore.whereToGoData
  whereToGoHeaderIcons.value = fetchFullIcons(piniaStore.whereToGoData)
})

/** 监听路由变化：是否要重载数据 */
watch(route, (to, from) => {
  let lastRoute = router.options.history.state.back // 上一个路由的完整路径
  let currentRoute = route.fullPath // 当前路由的完整路径
  if (isDebugEnable) {
    logger.info('Home.vue: 路由变化: ', currentRoute, ' => ', lastRoute)
  }
})

onActivated(() => {
  if (lastCity.value && lastCity.value !== piniaStore.currentCity) {
    fetchSourceData()
    if (isDebugEnable) {
      logger.debug(
        `City changed, fetching new data: lastCity: ${lastCity.value}, currentCity: ${piniaStore.currentCity}`
      )
    }
  }
})
</script>

<template>
  <div>
    <home-header :where-to-go-data="whereToGoData" />
    <home-swiper />
    <home-icons :swiper-modules="swiperModules" :where-to-go-header-icons="whereToGoHeaderIcons" />
    <home-recommendation />
    <home-weekend />
    <nav>
      <span class="navigation-button" @click="goToAbout">关于</span>
    </nav>
    <div v-show="refreshData" class="fetch-home-data">
      <button class="fetch-data-btn" @click="refreshAllData">refresh data</button>
    </div>
  </div>
</template>

<style scoped>
.fetch-home-data {
  margin: 0 20px 30px 0;
  text-align: right;
}

.fetch-data-btn {
  background-color: #fff;
  color: #00bcd4;
  border: #00bcd4;
  border-radius: 8px;
}

nav {
  margin: 25px 33px 0 0;
  padding-bottom: 25px;
  text-align: right;
}

.navigation-button {
  color: #00bcd4;
  font-size: 24px;
  text-decoration: none;
  cursor: pointer;
}
</style>
