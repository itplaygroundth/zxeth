// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import VueSession from 'vue-session'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueSession)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
