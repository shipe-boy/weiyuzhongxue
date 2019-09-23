// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//注册全局组件
import HeaderNav from './components/HeaderNav.vue'
import FooterNav from './components/FooterNav.vue'
import Crumbs from './components/crumbs.vue'
Vue.component("HeaderNav", HeaderNav)
Vue.component("FooterNav", FooterNav)
Vue.component("Crumbs", Crumbs)

// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

//axios
import Axios from 'axios'
import {BASEURL} from './globalSet/global'
Axios.defaults.baseURL= BASEURL
Vue.prototype.$ = Axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'babel-polyfill'

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})