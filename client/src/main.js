// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(vueAxios,axios)
// axios.default.baseURL = apiConfig.baseUrl

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
