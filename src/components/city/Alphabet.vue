<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { isDebugEnable } from '@/debugEnable.js'
import eventBus from '@/stores/eventBus.js'
import { usePiniaStore } from '@/stores/usePiniaStore.js'

const props = defineProps({
  defaultCityLetters: {
    type: Array,
    default: () => {
      const result = []
      for (let i = 65; i <= 90; i++) {
        result.push(String.fromCharCode(i))
      }
      return result
    }
  },
  cityModules: {
    type: Object,
    default: () => ({
      domestic: null,
      abroad: null
    })
  }
})

const cityLetters = ref([])
const currentCityLetter = ref('')
const piniaStore = usePiniaStore()
const touchStatus = ref(false)
const letterElRefs = ref([]) // 定义存储 DOM 元素引用的对象
onBeforeMount(() => {
  // 排序: A - Z
  cityLetters.value = Object.keys(props.cityModules.domestic || {}).sort((a, b) =>
    a.localeCompare(b)
  )
})

// 监听 cityModules 变化
watch(
  () => props.cityModules,
  (value, oldValue, onCleanup) => {
    cityLetters.value = Object.keys(value.domestic || {})
    if (isDebugEnable) console.log('CityLetters: ', cityLetters.value)
  }
)

function handleClickCityLetter(alphabet) {
  if (isDebugEnable) console.log(`You clicked: ${alphabet}`)
  eventBus.currentCityLetter = alphabet // Type 1
  piniaStore.updateCityLetter(alphabet) // Type 2
}

function handleTouchStar(e) {
  touchStatus.value = true
}

/**
 * 处理滚动事件
 */
function handleTouchMove(e) {
  if (touchStatus.value) {
    let startY = letterElRefs.value['A'].offsetTop
    let touchY = e.touches[0].clientY - 81 // 80 是字母 A 的高度
    let distance = touchY - startY
    let index = Math.floor(distance / 19)
    if (index >= 0 && index < cityLetters.value.length) {
      let indexLetter = cityLetters.value[index]
      if (isDebugEnable) console.log(`Handle scroll events：${startY} - ${index} - ${indexLetter}`)
      handleClickCityLetter(indexLetter) // 触发点击事件
    }
  }
}

function handleTouchEnd(e) {
  touchStatus.value = false
}
</script>

<template>
  <div class="container">
    <div class="list">
      <ul v-for="(alphabet, index) in cityLetters" :key="index">
        <li
          :ref="(el) => (letterElRefs[alphabet] = el)"
          class="item"
          @click="handleClickCityLetter(alphabet)"
          @touchend="handleTouchEnd"
          @touchmove="handleTouchMove"
          @touchstart="handleTouchStar"
        >
          {{ alphabet }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.container
  position: relative;
  width: 100%;

  .list
    float: right;
    margin-top 1.45rem
    padding-right .98rem

    .item
      line-height 0.88rem
      font-size 0.88rem
      text-align center
      margin-top .18rem;
      padding .08rem
      color #000000
      border 1px solid #00bcd4
      border-radius 50%
</style>
