import { createStore } from 'vuex'

const store = createStore({
  state: {
    showJSONData: true,
    cityData: [],
    whereToGoIconPackage: null
  },
  mutations: {
    setShowJSON(state, showJSON) {
      state.showJSONData = showJSON
    },
    setCityData(state, cityData) {
      state.cityData = cityData
    },
    setIconPackages(state, iconPackages) {
      state.whereToGoIconPackage = iconPackages
    }
  }
})

export default store
