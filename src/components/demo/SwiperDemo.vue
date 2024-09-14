<script setup>
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

const swiperModules = [Pagination, Navigation]
</script>

<template>
  <div class="swiper">
    <swiper :loop="true" :modules="swiperModules" navigation pagination slides-per-view="1">
      <swiper-slide class="swiper-content">Slide 1</swiper-slide>
      <swiper-slide class="swiper-content">Slide 2</swiper-slide>
      <swiper-slide class="swiper-content">Slide 3</swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.swiper {
  height: 120px;
  margin-top: 1px;
  margin-bottom: 10px;
  background-color: lightgreen;
  border-radius: 5px;
}

.swiper-content {
  margin-top: 25px;
  box-sizing: border-box;
  background-color: lightgreen;
  text-align: center;
  font-size: 38px;
}
</style>
