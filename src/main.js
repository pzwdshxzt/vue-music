import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  './axios.js'
import store from './store'
import './plugins/element.js'

import {post,fetch,patch,put} from './http'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // axios,
  render: h => h(App)
}).$mount('#app')
