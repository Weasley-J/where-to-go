import { createStore } from 'vuex'

const store = createStore({
  state: {
    whereToGoIconPackage: null
  },
  mutations: {
    setIconPackage(state, iconPackage) {
      state.whereToGoIconPackage = iconPackage
    }
  }
})

export default store
