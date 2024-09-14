<script setup>
import { ref } from 'vue'

const recommendationList = ref([
  {
    id: 1,
    title: '滑雪运动·特色玩法',
    imgUrl:
      'https://imgs.qunarzz.com/vs_ceph_b2c_001/9124aede-ccda-4f24-8018-e3deb2c047c6.jpg_180x120x90_af4c3832.jpg',
    desc: '真纯玩+年轻派💖西岭雪山深度全景1日💖赠景区门票+保险+车费💖畅游映雪广场+日月坪💖休闲度假ღ观云海+可升保姆车'
  },
  {
    id: 2,
    title: '滑雪运动·特色玩法',
    imgUrl:
      'https://imgs.qunarzz.com/vs_ceph_b2c_001/9124aede-ccda-4f24-8018-e3deb2c047c6.jpg_180x120x90_af4c3832.jpg',
    desc: '真纯玩+年轻派💖西岭雪山深度全景1日💖赠景区门票+保险+车费💖畅游映雪广场+日月坪💖休闲度假ღ观云海+可升保姆车'
  },
  {
    id: 3,
    title: '滑雪运动·特色玩法',
    imgUrl:
      'https://imgs.qunarzz.com/vs_ceph_b2c_001/9124aede-ccda-4f24-8018-e3deb2c047c6.jpg_180x120x90_af4c3832.jpg',
    desc: '真纯玩+年轻派💖西岭雪山深度全景1日💖赠景区门票+保险+车费💖畅游映雪广场+日月坪💖休闲度假ღ观云海+可升保姆车'
  }
])
</script>

<template>
  <div>
    <div class="recommendation-title">💥热销推荐💥</div>
    <ul>
      <li
        v-for="({ id, title, imgUrl, desc }, index) in recommendationList"
        :key="id"
        class="recommendation-item border-bottom"
      >
        <img :src="imgUrl" alt="recommendation-item" class="item-img" />
        <div class="item-info">
          <p class="item-title">{{ title }}</p>
          <p class="item-desc">{{ desc }}</p>
          <button class="item-button" type="button">查看详情</button>
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
