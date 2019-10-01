import Vue from 'vue'
Vue.config.devtools = true;

import axios from "../src/http.js"
Vue.prototype.axios = axios;

import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'

Vue.use(ElementUI);
Vue.config.productionTip = false

//定义全局过滤器(修改时间)
import moment from "moment";
Vue.filter("dateString",function(dataStr,pattern= "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
