import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import MyHeader from '@/components/MyHeader'
import Tag from '@/components/Tag'
axios.defaults.baseURL='http://lulaoshi:82';
axios.defaults.withCredentials = true;

Vue.prototype.axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.component('my-header', MyHeader);
Vue.component('tag', Tag);
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
