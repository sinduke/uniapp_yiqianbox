/*
 * 全局公用方法
 */
import Vue from 'vue'
import Store from '@/store/store';
import {
	$api
} from '@/config/api.js';

export default {

	//登出
	logOut() {       
	    // $api.get('/user/logout')
		// 清空本地存储的登录数据
		uni.setStorageSync('mem-username', '')
		uni.setStorageSync('mem-password', '')
		uni.setStorageSync('sms-mobile', '')
		uni.setStorageSync('mem-openid', '')
		Store.commit('setInit', {});
		Store.commit('setLoginInfo', {});
		Store.commit('setUserInfo', {});
		Store.commit('setSelectedGame', '')
		return
	},
	// 获取用户信息
	getuserInfo() {
		return $api.get("/user/detail").then(res => {
			let username = uni.getStorageSync('mem-username')||uni.getStorageSync('sms-mobile');
			if (res.data.code == 200) {
				// 当记录的用户登录账户与登录之后返回的账户不匹配时，就不允许登录成功
				if (username == res.data.data.mobile || username == res.data.data.username) {
					getApp().globalData.store.commit('setUserInfo', res.data.data);
				} else {	
			    this.logOut()
				}
			} else {
				this.logOut()

			}
		})

	},

	//获取节点
	getEl(el) {
		if (typeof el === 'string' || typeof el === 'number') return el;
		if (WXEnvironment) {
			return el.ref;
		} else {
			return el instanceof HTMLElement ? el : el.$el;
		}
	},
	// 节流函数：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效
	// throttle(canRun, func, wait) {
	// 	return function() {
	// 		console.log(canRun, 'canRuncanRun')
	// 		if (!canRun) return;
	// 		canRun = false;
	// 		setTimeout(() => {
	// 			func.apply(this, arguments);
	// 			canRun = true;
	// 			return canRun;
	// 		}, wait);
	// 		return canRun;
	// 	};
	// },
	// 判断是否登录，评论时需要先登录
	isLogin() {	
			console.log(getApp().globalData.store.state.userInfo,1111111111111111)
		if (Object.keys(getApp().globalData.store.state.userInfo).length == 0) {
			uni.showToast({
				title: '您还未登录，快去登录吧~',
				icon: 'none',
				success: () => {
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/my/children/login',
						})
						return false;
					}, 600)
				}
			})
		} else {
           console.log(1111111111111111)
			return true;
		}
	},

	//复制 
	copyText(text) {
		uni.setClipboardData({
			data: text,
		})
	},
	/* 深拷贝 */
	getClone(obj) {
		if (obj === null) return null
		if (typeof obj !== 'object') return obj;
		if (obj.constructor === Date) return new Date(obj);
		if (obj.constructor === RegExp) return new RegExp(obj);
		var newObj = new obj.constructor(); //保持继承链
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) { //不遍历其原型链上的属性
				var val = obj[key];
				// newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
			}
		}
		return newObj;
	},
	// 预览图片
	previewImage(index, arr) {
		//uniapp预览图片
		uni.previewImage({
			current: index, //预览图片的下标
			urls: arr, //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
			indicator: 'number'
		});
	},
	getNatve() {
		const infoSync = Store.state.infoSync
		const system = Store.state.infoSync.platform
		console.log(infoSync, 'infoSync')
		const navheight = 0


	},
	gaussBlur(imgData) {
		var pixes = imgData.data;
		var width = imgData.width;
		var height = imgData.height;
		var gaussMatrix = [],
			gaussSum = 0,
			x, y,
			r, g, b, a,
			i, j, k, len;

		var radius = 10;
		var sigma = 5;

		a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
		b = -1 / (2 * sigma * sigma);
		//生成高斯矩阵
		for (i = 0, x = -radius; x <= radius; x++, i++) {
			g = a * Math.exp(b * x * x);
			gaussMatrix[i] = g;
			gaussSum += g;

		}

		//归一化, 保证高斯矩阵的值在[0,1]之间
		for (i = 0, len = gaussMatrix.length; i < len; i++) {
			gaussMatrix[i] /= gaussSum;
		}
		//x 方向一维高斯运算
		for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				r = g = b = a = 0;
				gaussSum = 0;
				for (j = -radius; j <= radius; j++) {
					k = x + j;
					if (k >= 0 && k < width) { //确保 k 没超出 x 的范围
						//r,g,b,a 四个一组
						i = (y * width + k) * 4;
						r += pixes[i] * gaussMatrix[j + radius];
						g += pixes[i + 1] * gaussMatrix[j + radius];
						b += pixes[i + 2] * gaussMatrix[j + radius];
						// a += pixes[i + 3] * gaussMatrix[j];
						gaussSum += gaussMatrix[j + radius];
					}
				}
				i = (y * width + x) * 4;
				// 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
				// console.log(gaussSum)
				pixes[i] = r / gaussSum;
				pixes[i + 1] = g / gaussSum;
				pixes[i + 2] = b / gaussSum;
				// pixes[i + 3] = a ;
			}
		}
		//y 方向一维高斯运算
		for (x = 0; x < width; x++) {
			for (y = 0; y < height; y++) {
				r = g = b = a = 0;
				gaussSum = 0;
				for (j = -radius; j <= radius; j++) {
					k = y + j;
					if (k >= 0 && k < height) { //确保 k 没超出 y 的范围
						i = (k * width + x) * 4;
						r += pixes[i] * gaussMatrix[j + radius];
						g += pixes[i + 1] * gaussMatrix[j + radius];
						b += pixes[i + 2] * gaussMatrix[j + radius];
						// a += pixes[i + 3] * gaussMatrix[j];
						gaussSum += gaussMatrix[j + radius];
					}
				}
				i = (y * width + x) * 4;
				pixes[i] = r / gaussSum;
				pixes[i + 1] = g / gaussSum;
				pixes[i + 2] = b / gaussSum;
			}
		}
		return imgData;
	}





}
