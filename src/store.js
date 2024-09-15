import { createStore } from 'vuex'

const store = createStore({
  state: {
    whereToGoIconPackage: null,
    showJSONData: true
  },
  mutations: {
    setIconPackage(state, iconPackage) {
      state.whereToGoIconPackage = iconPackage
    },
    setShowJSONData(state, showJSON) {
      state.showJSONData = showJSON
    }
  }
})

export default store
