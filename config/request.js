import Request from '@/utils/luch-request/index.js'
import Store from "@/store/store.js"

const api = new Request()
export {
	api
}

api.setConfig((config) => {
	/* config 为默认全局配置*/
	config.baseURL = Store.state.httpAPI  /* 根域名 */
	config.header = {
		'X-Requested-With': 'XMLHttpRequest',
		"Accept": "application/json",
		"Content-Type": "application/json; charset=UTF-8"
	}
	return config
})
//请求前拦截
api.interceptors.request.use((config) => { // 可使用async await 做异步操作
	config.header = {
		...config.header
	}
	config.params = {
		format: 'json',
		app_id: Store.state.app_id,
		token: Store.state.loginInfo.user_token || Store.state.init.user_token || '',
		client_id: Store.state.client_id, // 渠道号  Store.state.client_id
		app_id: Store.state.app_id, // 手机号 100  101   Store.state.app_id
		ts: Date.parse(new Date()),
		equipmentCode: Store.state.equipmentCode, // 手机设备码
		...config.params

	}
	//获取存储的token
	// const token = uni.getStorageSync('token');
	// config.header.token = token;
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})


// 请求后拦截器
api.interceptors.response.use((response) => {
	return response
}, (response) => {
	//未登录时清空缓存跳转
	// if(response.statusCode ==401){
	//  uni.clearStorageSync();
	//  uni.navigateTo({
	//  	url:"/pages/login/wechat"
	//  })
	// }
	return Promise.reject(response)
})
