import { createStore } from 'vuex'

const store = createStore({
  state: {
    showJSONData: true,
    cityData: [],
    whereToGoIconPackage: null
  },
  mutations: {
    setShowJSONData(state, showJSON) {
      state.showJSONData = showJSON
    },
    setCityData(state, cityData) {
      state.cityData = cityData
    },
    setIconPackage(state, iconPackage) {
      state.whereToGoIconPackage = iconPackage
    }
  }
})

export default store
