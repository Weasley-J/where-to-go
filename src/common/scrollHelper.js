// This function is used to initialize the scroll functionality of the website.
import BetterScroll from 'better-scroll'
import { logger } from '@/common/logger.js'

// 初始化 BetterScroll
export const initScroll = (wrapperRef) => {
  let scrollInstance = null
  if (!wrapperRef.value) {
    logger.error('wrapperRef is not defined')
    return scrollInstance
  }
  return new BetterScroll(wrapperRef.value, {
    scrollY: true, // enable vertical scroll
    click: true, // enable click event
    mouseWheel: true // enable mouse wheel
  })
}

// DOM 更新完成后 BetterScroll 刷新
export const refreshScroll = (scrollInstance) => {
  setTimeout(() => {
    scrollInstance?.refresh()
  }, 500)
}

// BetterScroll 销毁
export const destroyScroll = (scrollInstance) => {
  scrollInstance?.destroy()
}
