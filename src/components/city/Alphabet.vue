<script setup>
import { onBeforeMount, onUpdated, ref, watch } from 'vue'
import { isDebugEnable } from '@/common-js/debugEnable.js'
import eventBus from '@/stores/eventBus.js'
import { usePiniaStore } from '@/stores/usePiniaStore.js'
import { logger } from '@/common-js/logger.js'

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
const piniaStore = usePiniaStore()
const touchStatus = ref(false)
const letterElRefs = ref([]) // 定义存储 DOM 元素引用的对象
const startY = ref(0) // 定义开始的 Y 坐标
const touchTimer = ref(null)

onBeforeMount(() => {
  // 排序: A - Z
  cityLetters.value = Object.keys(props.cityModules.domestic || {}).sort((a, b) =>
    a.localeCompare(b)
  )
})

onUpdated(() => {
  if (letterElRefs.value) {
    startY.value = letterElRefs.value['A'].offsetTop // 初始化起始 Y 坐标
  }
})

// 监听 cityModules 变化
watch(
  () => props.cityModules,
  (value, oldValue, onCleanup) => {
    cityLetters.value = Object.keys(value.domestic || {})
    if (isDebugEnable) logger.debug('CityLetters: ', cityLetters.value)
  }
)

function handleClickCityLetter(alphabet) {
  if (isDebugEnable) logger.debug(`You clicked: ${alphabet}`)
  eventBus.currentCityLetter = alphabet // Type 1
  piniaStore.updateCityLetter(alphabet) // Type 2
}

function handleTouchStar(event) {
  touchStatus.value = true
}

/**
 * 处理滚动事件
 */
function handleTouchMove(event) {
  // 如果 touchStatus 为 false，则不执行
  if (!touchStatus.value) {
    return
  }

  // 阻止默认事件，避免页面滚动
  event.preventDefault()

  // 清除之前的定时器，避免多次触发
  if (touchTimer.value) {
    clearTimeout(touchTimer.value)
  }

  // 字母 A 的偏移量和每个字母的高度
  const alphabetOffset = 81 // 字母 A 的高度
  const letterHeight = 19 // 每个字母的高度

  // 设置定时器，防止快速滑动时触发多次点击事件
  touchTimer.value = setTimeout(() => {
    const { clientY } = event.touches[0] // 获取触摸点的 Y 坐标
    const startY_ = startY.value
    const touchY = clientY - alphabetOffset // 计算触摸位置相对于 A 的偏移量

    // 根据触摸的位置计算字母索引
    const distance = touchY - startY_
    const index = Math.floor(distance / letterHeight)

    if (index >= 0 && index < cityLetters.value.length) {
      const indexLetter = cityLetters.value[index]
      if (isDebugEnable) {
        logger.debug(
          `Handle scroll events: startY=${startY_}, index=${index}, letter=${indexLetter}`
        )
      }
      handleClickCityLetter(indexLetter) // 触发点击事件
    }
  }, 8) // 16ms 是一个典型的帧率间隔时间（60fps）
}

function handleTouchEnd(event) {
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
