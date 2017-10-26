// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from "./routers"
import vueLazyLoad from 'vue-lazyload'
import vuexStore from './store/index'

// Vue.config.productionTip = false
fastclick.attach(document.body);
Vue.use(vueLazyLoad,{
  loading:require('assets/imgs/default.png')
});
new Vue({
  el: '#app',
  render:h=>h(App),
  //因此路由配置，可以之后用$router,$route获取路由信息
  router,
  //引入store，可以之后再组件中用$store获取
  store:vuexStore
});
