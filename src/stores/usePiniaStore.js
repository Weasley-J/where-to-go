import { defineStore } from 'pinia'
import { isDebugEnable } from '@/debugEnable.js'
import { logger } from '@/logger.js'

// Create a Pinia store
export const usePiniaStore = defineStore('use-pinia-store', {
  state: () => ({
    cityLetter: '',
    showSearch: false
  }),
  actions: {
    updateCityLetter(letter) {
      if (isDebugEnable) {
        logger.debug('Pinia message updated:', letter)
      }
      this.cityLetter = letter
    },
    updateShowSearch(showSearch) {
      if (isDebugEnable) {
        logger.debug('Pinia message updated:', showSearch)
      }
      this.showSearch = showSearch
    }
  }
})
