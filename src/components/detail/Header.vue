<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  detailData: {
    type: Object,
    default: () => {}
  }
})

const headerAbsVisible = ref(true)
const rawHtmlContent = computed(() => {
  return props.detailData.TagGroupInfo?.SpecialTagList?.[0]?.Remark || ''
})

const handleScroll = () => {
  let top = document.documentElement.scrollTop || document.body.scrollTop || window.scrollY
  headerAbsVisible.value = top <= 210
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <div v-show="headerAbsVisible" class="header-abs">
      <router-link class="remove-router-link-default" to="/">
        <div class="iconfont header-abs-back">&#xe624;</div>
      </router-link>
    </div>
    <div v-show="!headerAbsVisible" class="header-fixed">
      景点详情
      <router-link class="remove-router-link-default" to="/">
        <div class="iconfont header-fixed-back">&#xe624;</div>
      </router-link>
    </div>
    <div class="detail-data">
      <h3>{{ detailData.TagGroupInfo?.SpecialTagList?.[0]?.TagName }}</h3>
      <h4>{{ detailData.TagGroupInfo?.SpecialTagList?.[0]?.Description }}</h4>
      <div class="border-top" v-html="rawHtmlContent"></div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.header-abs
  position: absolute;
  left: 0.4rem;
  top: 0.5rem;
  width: 1.48rem;
  height: 1.48rem;
  line-height: 1.48rem;
  border-radius: 50%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 1.2rem;

  .header-abs-back
    top 0
    left 0
    font-size: .8rem
    color #fff

.header-fixed
  z-index 2
  position fixed
  top 0
  left 0
  right 0
  line-height 1.8rem
  text-align center
  background #00bcd4
  color #fff
  font-size .8rem

  .header-fixed-back
    top 0
    left 0
    position absolute
    text-align: center
    font-size: .8rem
    color #fff

.detail-data
  margin-top 30rem;
</style>
