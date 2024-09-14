<script setup>
import { ref } from 'vue'

const recommendationList = ref([
  {
    id: 1,
    title: '子游纯玩 0 购物',
    imgUrl:
      'https://imgs.qunarzz.com/vs_ceph_b2c_001/d4132120-a3f1-4a30-a144-46905c0f27d6.jpg_480x320x90_6bb2871e.jpg',
    desc: '🔥暑期甄选🔥亲子游丨中旅自营丨纯玩0购物丨张家界3日自驾游（祈福天门山+玻璃栈道+森林公园+天子山+赠晚会）高档酒店'
  },
  {
    id: 2,
    title: '漂流安吉',
    imgUrl:
      'https://imgs.qunarzz.com/vs_ceph_b2c_001/0a2b1db0-fc30-472f-9c1e-28a600007ea8.jpg_180x120x90_3c33ab15.jpg',
    desc: '将军关漂流/浙北漂流/浙北大峡谷自驾2日游 宿如家丽岚睿柏·云酒店'
  },
  {
    id: 3,
    title: '小众秘境',
    imgUrl:
      'https://imgs.qunarzz.com/vs_ceph_b2c_001/82560ce7-880b-4224-ad28-d4380ce1e75d.jpg_180x120x90_221241db.jpg',
    desc: '小众秘境|原生态线路|格里沙漠三日徒步35KM|保障车|牧民领队|沙漠烧烤'
  }
])
</script>

<template>
  <div>
    <div class="recommendation-title">
      <span class="recommendation-title-text">💖Where to go this weekend💖</span>
    </div>
    <ul>
      <li
        v-for="({ id, title, imgUrl, desc }, index) in recommendationList"
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
