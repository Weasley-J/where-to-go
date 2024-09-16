import { createStore } from 'vuex'

const store = createStore({
  state: {
    whereToGoIconPackage: null,
    whereToGoData: null,
    showJSONData: true,
    cityData: []
  },
  mutations: {
    setIconPackage(state, iconPackage) {
      state.whereToGoIconPackage = iconPackage
    },
    setWhereToGoData(state, whereToGoData) {
      state.whereToGoData = whereToGoData
    },
    setShowJSONData(state, showJSON) {
      state.showJSONData = showJSON
    },
    setCityData(state, cityData) {
      state.cityData = cityData
    }
  }
})

export default store
