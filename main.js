import Vue from 'vue'
import App from './App'
// import uView from "uview-ui";

// 全局公用方法
import common from "@/common/js/common.js";
Vue.prototype.$common = common;
 //引入全局请求插件
import { $api } from '@/config/api.js' // 全局挂载引入，配置相关在该index.js文件里修改
Vue.prototype.$api = $api

// 全局过滤器
import filters from "@/common/js/filters.js";
for (let i in filters) {
	Vue.filter(i, filters[i]);
}

// vuex
import store from './store/store.js';
Vue.prototype.$store = store;

//引入ui组件
// Vue.use(uView);
Vue.config.productionTip = false


App.mpType = 'app'
//国际化语言
import i18n from './lang/index'

const app = new Vue({
	i18n,
	store,
	...App
})
app.$mount()
