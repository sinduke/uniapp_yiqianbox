/*
 * 全局过滤器
 */

export default {
	// 1.日期格式过滤器
	dateFormat(value, fmt) {
		let getDate = new Date(value * 1000);
		let o = {
			"M+": getDate.getMonth() + 1,
			"d+": getDate.getDate(),
			"h+": getDate.getHours(),
			"m+": getDate.getMinutes(),
			"s+": getDate.getSeconds(),
			"q+": Math.floor((getDate.getMonth() + 3) / 3),
			S: getDate.getMilliseconds(),
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				(getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
			);
		}
		for (let k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ?
					o[k] :
					("00" + o[k]).substr(("" + o[k]).length)
				);
			}
		}
		return fmt;
	},
	// 2.隐藏手机号码中间四位
	mobileHide(val) {
		return String(val).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
	},
	// 3.保留一位小数
	KeepOne(val, num) {
		return val.toFixed(num)
	},
}
