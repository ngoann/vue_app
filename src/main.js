// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import BootstrapVue from 'bootstrap-vue'
import 'iview/dist/styles/iview.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faSave, faPlay, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
library.add(faSearch)
library.add(faSave)
library.add(faPlay)
library.add(faCheck, faTimes)

Vue.component('fa-icon', FontAwesomeIcon);
Vue.use(VueLocalStorage)
Vue.use(BootstrapVue);
Vue.use(iView);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
