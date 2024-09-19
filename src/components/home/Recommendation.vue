<script setup>
import { onBeforeMount, ref } from 'vue'
import axios from 'axios'
import { isDebugEnable } from '@/common-js/debugEnable.js'
import { logger } from '@/common-js/logger.js'

const recommendationList = ref({ categoryName: '', categories: [] })

onBeforeMount(async () => {
  const { data } = await axios.get('/api/weasley/aliyun/recommendationList.json')
  const { categoryName, categories } = data
  recommendationList.value = { categoryName, categories }
  if (isDebugEnable) {
    logger.debug('recommendation_list:', recommendationList.value)
  }
})
</script>

<template>
  <div>
    <div class="recommendation-title">{{ recommendationList.categoryName }}</div>
    <ul>
      <li
        class="recommendation-item border-bottom"
        v-for="{ id, title, imgUrl, desc } in recommendationList.categories"
        :key="id"
      >
        <img :src="imgUrl" alt="recommendation-item" class="item-img" />
        <div class="item-info">
          <p class="item-title">{{ title }}</p>
          <p class="item-desc">{{ desc }}</p>
          <router-link :to="`/detail/${id}`">
            <button class="item-button" type="button">查看详情</button>
          </router-link>
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


/* 覆盖 <router-link> 默认的 <a> 标签样式 */
a.recommendation-item
  text-decoration none
  color inherit

.recommendation-title
  margin-top 0.85rem
  line-height 1.5rem
  font-size: 1rem
  background-color #eee
  text-indent 0.6rem

.recommendation-item
  overflow hidden
  display flex
  height 5rem
  margin-bottom 0.08rem

  .item-img
    width 5.2rem
    height 5.2rem
    padding .1rem
    border-radius 0.26rem

  .item-info
    flex 1
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

    .item-button
      border: 1px solid #fff;
      background #ff9300
      margin-top 0.75rem
      padding 0 0.2rem
      border-radius .38rem
      line-height .98rem
      color #fff
</style>
