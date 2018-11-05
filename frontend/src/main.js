// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faSave, faPlay, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import Vuex from 'vuex';
import store from './store'
import moment from 'moment';
import VueMomentJS from 'vue-momentjs';
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import Argon from "./plugins/argon-kit";
import JsonExcel from 'vue-json-excel'
import Message from 'vue-m-message'

Vue.use(Message)
Vue.use(Vuex);
Vue.use(Argon);
Vue.use(VueSweetalert2);
Vue.use(VueAxios, axios)
Vue.use(VueMomentJS, moment);
Vue.use(Datetime);
library.add(faSearch)
library.add(faSave)
library.add(faPlay)
library.add(faCheck, faTimes)

Vue.component('downloadExcel', JsonExcel)
Vue.component('fa-icon', FontAwesomeIcon);
Vue.use(VueLocalStorage)
Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.prototype.$baseUrl = (url = '') => {
  return process.env.ROOT_API + url
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
