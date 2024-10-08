import { defineStore } from 'pinia'
import { isDebugEnable } from '@/common/debugEnable.js'
import { logger } from '@/common/logger.js'

// Create a Pinia store
export const usePiniaStore = defineStore('use-pinia-store', {
  state: () => ({
    keyword: '',
    cityLetter: '',
    currentCity: getCurrentCity(),
    showSearch: false,
    showGallery: false,
    whereToGoData: null
  }),
  actions: {
    updateCityLetter(letter) {
      logUpdate(letter)
      this.cityLetter = letter
    },
    updateShowSearch(showSearch) {
      logUpdate(showSearch)
      this.showSearch = showSearch
    },
    updateCurrentCity(city) {
      logUpdate(city)
      this.currentCity = city
      try {
        localStorage.currentCity = city
      } catch (e) {
        logger.error('Failed to update current city in localStorage', e)
      }
    },
    updateWhereToGoData(data) {
      logUpdate(data)
      this.whereToGoData = data
    },
    updateKeyword(keyword) {
      this.keyword = keyword
    },
    updateShowGallery(showGallery) {
      logUpdate(showGallery)
      this.showGallery = showGallery
    }
  }
})

function getCurrentCity() {
  let _city = '城市'
  try {
    return localStorage.currentCity || _city
  } catch (error) {
    return _city
  }
}

function logUpdate(payload) {
  if (isDebugEnable) logger.debug('Pinia message updated:', payload)
}
