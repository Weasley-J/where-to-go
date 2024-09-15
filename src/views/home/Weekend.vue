<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { isDebugEnable } from '@/main.js'

const weekendList = ref({ categoryName: '', categories: [] })
onBeforeMount(async () => {
  const { data } = await axios.get('/api/weasley/aliyun/weekendList.json')
  const { categoryName, categories } = data
  weekendList.value = { categoryName, categories }
  if (isDebugEnable) {
    console.log('weekend_list:', weekendList.value)
  }
})
</script>

<template>
  <div>
    <div class="recommendation-title">
      <span class="recommendation-title-text">{{ weekendList.categoryName }}</span>
    </div>
    <ul>
      <li
        v-for="{ id, title, imgUrl, desc } in weekendList.categories"
        :key="id"
        class="recommendation-item border-bottom"
      >
        <div class="recommendation-img-wrapper">
          <img :src="imgUrl" alt="recommendation-item" class="item-img" />
        </div>
        <div class="item-info">
          <p class="item-title">{{ title }}</p>
          <p class="item-desc">{{ desc }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="stylus" scoped>
ellipse()
  overflow hidden
  white-space nowrap
  text-overflow ellipsis

.recommendation-title
  margin-top 0.85rem
  line-height 1.5rem
  font-size: 1.08rem
  background-color #eee
  text-indent 0.6rem

  .recommendation-title-text
    font-size 1.28rem
    font-style italic

.recommendation-img-wrapper
  overflow hidden
  height 0
  padding-bottom 33.9%

  .item-img
    width 100%

.item-info
  padding .2rem
  min-width 0

  .item-title
    line-height .88rem
    font-size .8rem
    ellipse()

  .item-desc
    margin-top .6rem;
    line-height 0.98rem
    color #ccc
    ellipse()
</style>
