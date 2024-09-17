import { createStore } from 'vuex'

const vuexStore = createStore({
  state: {
    showJSONData: true,
    cityData: [],
    whereToGoHeaderIcons: null
  },
  mutations: {
    setShowJSON(state, showJSON) {
      state.showJSONData = showJSON
    },
    setCityData(state, cityData) {
      state.cityData = cityData
    },
    setIconPackages(state, iconPackages) {
      state.whereToGoHeaderIcons = iconPackages
    }
  }
})

export default vuexStore
