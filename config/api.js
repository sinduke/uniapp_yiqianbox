import {
	api
} from '@/config/request.js' // 全局挂载引入，配置相关在该common.js文件里修改
const $api = {
	get(url, data) {
		return api.get(url, {
			params: data
		});
	},
	post(url, data) {
		return api.post(url, data);
	}
}

export {
	$api
}
