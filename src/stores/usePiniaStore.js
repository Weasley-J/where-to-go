import { defineStore } from 'pinia'
import { isDebugEnable } from '@/debugEnable.js'

// Create a Pinia store
export const usePiniaStore = defineStore('use-pinia-store', {
  state: () => ({
    cityLetter: ''
  }),
  actions: {
    updateCityLetter(letter) {
      if (isDebugEnable) {
        console.log('Pinia message updated:', letter)
      }
      this.cityLetter = letter
    }
  }
})
