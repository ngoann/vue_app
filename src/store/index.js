import Vue from 'vue'
import Vuex from 'vuex'
import report from './modules/report'
import authentication from './modules/authentication'
import VueLocalStorage from 'vue-localstorage'

Vue.use(Vuex)
Vue.use(VueLocalStorage)

export default new Vuex.Store({
  modules: {
    report, authentication
  }
})
