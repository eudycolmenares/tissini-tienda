import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    customer: null,
    categories: [],
    productInmDel: [],
    categoriesShow: [],
    sections: [],
    spinner: null
  },
  mutations: {
    setInitial (state, data) {
      state.customer = data.customer
      state.categories = data.categories
    },
    setCustomer (state, data) {
      state.customer = data
    },
    setCategories (state, data) {
      state.categories = data
    },
    setCategoriesShow (state, data) {
      state.categoriesShow = data
    },
    setProductInmDel (state, data) {
      state.productInmDel = data
    },
    setSection (state, data) {
      state.sections = data
    },
    setSpinner (state, data) {
      state.spinner = data
    }
  },
  actions: {
  },
  modules: {
  }
})
