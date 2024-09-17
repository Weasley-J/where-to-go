<script setup>
import CityHeader from '@/components/city/Header.vue'
import CitySearch from '@/components/city/Search.vue'
import CityList from '@/components/city/List.vue'
import CityAlphabet from '@/components/city/Alphabet.vue'
import { computed, onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { isDebugEnable } from '@/debugEnable.js'

const store = useStore()
const cityArgs = {
  domestic: 'domestic',
  abroad: 'abroad',
  all: 'domestic,abroad'
}

const cityModules = ref({ domestic: null, abroad: null })
const currentCities = computed(() => {
  // 使用可选链避免 props.whereToGoData 为空时报错
  let _currentCities = (store.state.whereToGoHeaderIcons || [])
    .filter(({ type }) => type === 'jiangzhehuwan') // 只保留 type 为 'jiangzhehuwan' 的项
    .flatMap(({ placeList }) =>
      placeList.map(({ sightId, placeName, imgUrl }) => ({
        sightId,
        placeName,
        imgUrl
      }))
    )
    .sort((a, b) => b.sightId - a.sightId) // 简化排序逻辑

  if (isDebugEnable && _currentCities.length > 0) {
    console.log('CurrentCities: ', _currentCities)
  }
  return _currentCities
})
onBeforeMount(async () => {
  const { data } = await axios.get(`/api/touch/allAndRcmdCitys.json?modules=${cityArgs.all}`)
  const { domestic, abroad } = data.data
  cityModules.value = { domestic, abroad }
  if (isDebugEnable) {
    console.log('Domestic: ', cityModules.value.domestic, '\nAbroad: ', cityModules.value.abroad)
  }
})
</script>

<template>
  <div>
    <city-header />
    <city-search />
    <city-list :city-modules="cityModules" :current-cities="currentCities" />
    <city-alphabet :city-modules="cityModules" />
  </div>
</template>

<style lang="stylus" scoped></style>
