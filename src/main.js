import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './api/request';
import './assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible'

import download from './components/downloadapp';
Vue.component('download',download);

import {Menu,Submenu,Button } from 'element-ui';
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Button)
Vue.config.productionTip = false
Vue.prototype.$request = request;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
