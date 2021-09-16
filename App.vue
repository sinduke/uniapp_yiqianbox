<script>
	import store from '@/store/store.js'
	import {$api} from '@/config/api.js';
	export default {
		globalData: {
			$i18n: {},
			$t: {},
			store
		},
		onLaunch() {
			this.globalData.$i18n = this.$i18n
			this.globalData.$t = str => this.$t(str)
			// 读取client_id
			// this.channelIDSyncFunc()
			// 数据初始化
			this.dataInit();
			//自动登录
			this.autoLogin();
			// 读取设备信息
			// this.getEquipmentCode();
			//下载
			this.getDownLoad()
			// 获取用户定制信息
			this.userFormat();
			setTimeout(() => {
				// plus.navigator.closeSplashscreen();
			}, 100)
			//设置初始化
			this.getSetting()
		},
		methods: {
			// 页面初始化
			dataInit() {
				this.$api.get("system/appinit").then(res => {
					this.$store.commit("setInit", res.data.data);
				})
			},
			// 获取客户信息
			userFormat() {
				this.$api.get(`system/box_front_setup`).then(res => {
					let userFormat = res.data.data.front_setup
					userFormat.down_app_url = userFormat.down_app_url + this.$store.state.client_id;
					this.$store.commit('setUserFormat', userFormat);
				})
			},
			// 自动登录
			autoLogin() {
				this.$store.commit("setUserInfo", {});
				if (uni.getStorageSync('mem-username') && uni.getStorageSync('mem-password')) {
					let username = uni.getStorageSync('mem-username')
					let password = uni.getStorageSync('mem-password')
					this.$api.get("user/login", {
						'mem-username': username,
						'mem-password': password,
						equipmentCode: this.equipmentCode
					}).then(res => {
						if (res.data.code == 200) {
							// 将登录获取的数据记录下来
							this.$store.commit("setLoginInfo", res.data.data)
							// 获取用户信息
							this.$common.getuserInfo();
						}
					})
				} else if (uni.getStorageSync('mem-openid')) {
					this.$api.get("user/login", {
						"mem-openid": uni.getStorageSync('mem-openid'),
						"mem-username": uni.getStorageSync('mem-username'),
						"mem-oauth_type": uni.getStorageSync('mem-oauth_type'),
					}).then(res => {
						console.log(res,'mem-openidmem-openid')
						if (res.data.code == 200) {
							// 将登录获取的数据记录下来
							this.$store.commit("setLoginInfo", res.data.data)
							// 获取用户信息
							this.$common.getuserInfo();
						}
					})


				} else if (uni.getStorageSync('sms-mobile')) {
					this.$api.get("v8/user/loginm", {
						"sms-mobile": uni.getStorageSync('sms-mobile'),
						"sms-phone": '1',
						"sms-type": '2',
					}).then(res => {
						console.log(res, 'sms-mobilesms-mobilesms-mobile')
						// 将登录获取的数据记录下来
						if (res.data.code == 200) {
							if (res.data.data.is_pwd) {
								uni.setStorageSync('mem-username', res.data.data.username)
								uni.setStorageSync('sms-mobile',uni.getStorageSync('sms-mobile'))
								this.$store.commit("setLoginInfo", res.data.data)
								// 获取用户信息
								this.$common.getuserInfo();
							}
						}
					})
				} else {
					// 清空本地存储的登录数据
					this.$store.commit('setInit', {});
					this.$store.commit('setLoginInfo', {});
					this.$store.commit('setUserInfo', {});
					uni.setStorageSync('mem-openid', '')
					uni.setStorageSync('mem-username', '')
					uni.setStorageSync('mem-password', '')
					uni.setStorageSync('sms-mobile','')


				}

			},
			//设置初始化
			getSetting() {
				let heiye = uni.getStorageSync('heiye')
				let isMessage = uni.getStorageSync('isMessage')
				let isWifi = uni.getStorageSync('isWifi')
				let isWifiDown = uni.getStorageSync('isWifiDown')
				let isinstallGame = uni.getStorageSync('isinstallGame')
				let isClearPackage = uni.getStorageSync('isClearPackage')
				
				
				if (!isMessage) {
					uni.setStorageSync('isMessage', {
						type: 1,
						status: true
					})
				}
				if (!isWifi) {
					uni.setStorageSync('isWifi',{
						type: 1,
						status: true
					})
				}
				if (!isWifiDown) {
					uni.setStorageSync('isWifiDown',{
						type: 1,
						status: true
					})
				}
				if (!isinstallGame) {
					uni.setStorageSync('isinstallGame',{
						type: 1,
						status: true
					})
				}
				if (!isClearPackage) {
					uni.setStorageSync('isClearPackage',{
						type: 1,
						status: true
					})
				}
				if (!heiye) {
					uni.setStorageSync('heiye',{
						type: false,
						
					})
				}
				
				
	
				
			},
			// 读取设备信息
			getEquipmentCode() {
				// #ifdef APP-PLUS
				let that = this;
				plus.device.getInfo({
					success: function(e) {
						that.$store.commit("setEquipmentCode", e.uuid);
					},
					fail: function(e) {
						console.log(e);
					}
				});
				// #endif
			},

			//下载管理 
			/* 无法持久化存储下载  */
			getDownLoad() {
				let arrList = uni.getStorageSync('downList')
				if (arrList.length) {
					let downList = []
					arrList.map((item, index) => {
						downList.push({
							game_id: item.game_id,
							downTasks: null,
							status:1
						})
					})
					this.$store.commit('setDownTasksList', downList)
				}


			},
			// 获取channelId
			channelIDSyncFunc() {
				let ret;         
				let udid;
				switch (uni.getSystemInfoSync().platform) {
					case "android":
						let getXWID = uni.requireNativePlugin("GetXWID")
						ret = getXWID.channelIDSyncFunc();
						// console.log(ret,'retretretretrets')
						if (ret.channelid != 0) {
							this.$store.commit('setClientId', ret.channelid);
						} else {
							this.$store.commit('setClientId', 4231);
						}
						break;
					case "ios":
						let channelModule = uni.requireNativePlugin("DCChannelUniPlugin-ChannelModule");
						ret = channelModule.channelIdSyncFunc({
							'name': 'uni-app',
							'age': 1
						}) || 4231
						this.$store.commit('setClientId', ret);
						udid = channelModule.udidSyncFunc({
							'name': 'uni-app',
							'age': 1
						}) || ''
						this.$store.commit('setUdid', udid);       
						console.log(udid,'udidudidudid')
						break;
					default:
						break;
				}
			
			},
		}
	}

</script>

<style>
	/* #ifndef APP-PLUS-NVUE */
	/* @import "uview-ui/index.scss"; */
	/* @import './static/fonts/iconfont.css'; */
	/* #endif */
	 /* @import "./components/u-parse/u-parse.css" */

</style>
