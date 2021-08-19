<template>
	<!-- 登录 -->
	<view class="login">
		<view class="backimg" style="position: relative;">
			<image src="@/static/images/my/login-backimage.png" mode="widthFix" style="width: 100%;">
			</image>
			<image class="Loginimages" :src="userFormat.icon"></image>
		</view>
		<view class="body">
			<view class="qita" v-if="notPhone">
				<view class="log">
					<text class="h1">登录</text>
				</view>
				<view class="userInfo">
					<u-form :model="form" ref="uForm" :border-bottom='false'>
						<text class="h1">账号</text>
						<u-form-item :border-bottom='false' label="" right-icon='arrow-down'>
							<u-input v-model="form['mem-username']" placeholder="请输入手机号或账号"
								placeholderStyle="font-size:26rpx;color:#C1C1C1" style="margin-bottom: 40rpx;" />
						</u-form-item>
						<view class="userInfo_line" />
						<text class="h1">密码</text>
						<u-form-item :border-bottom='false' label="">
							<u-input v-model="form['mem-password']" placeholder="请输入密码" type="password"
								@confirm='doLogin' placeholderStyle="font-size:26rpx;color:#C1C1C1" />
						</u-form-item>
						<view class="userInfo_line" />
					</u-form>
				</view>
				<view class="buttn">
					<text class="mybutton" @click="doLogin">立即登录</text>
				</view>
			</view>

			<!-- 手机号登录 -->
			<view class="myPhone" v-else>

				<view class="userInfo">
					<u-form :model="form" ref="uForm" :border-bottom='false'>
						<text class="h1">手机号</text>
						<u-form-item :border-bottom='false' label="">
							<u-input v-model="phone['sms-mobile']" placeholder="请输入手机号"
								placeholderStyle="font-size:26rpx;color:#C1C1C1" style="margin-bottom: 40rpx;" />
						</u-form-item>
						<view class="userInfo_line" />
						<text class="h1">验证码</text>
						<u-form-item :border-bottom='false' label="">
							<u-input v-model="phone['sms-code']" style="margin-right: 30rpx;" placeholder="请输入验证码"
								@confirm='iphoneLogin' placeholderStyle="font-size:26rpx;color:#C1C1C1" />
							<text size="mini" slot="right" @click="getCode">{{codeText}}</text>
							<u-verification-code ref="uCode" @change="codeChange"> </u-verification-code>
						</u-form-item>
						<view class="userInfo_line" />
					</u-form>
				</view>
				<view class="buttn">
					<text class="mybutton" @click="iphoneLogin">登录/注册</text>
				</view>
			</view>


			<view class="phonelogin">
				<text class="text" style="font-weight: 700;color: #1C1C1C;" v-if="notPhone"
					@click="notPhone=false">手机登录</text>
				<text class="text" style="font-weight: 700;color: #1C1C1C;" v-else @click="notPhone=true">账号登录</text>
				<text class="text" style="margin: 0 56rpx;">|</text>
				<text class="text" style="color: #666;" @click="forgetPw">忘记密码</text>
			</view>
			<u-divider color="#666666" half-width="100%" border-color="#DCDCDC" fontSize='26'>其他登录方式</u-divider>
			<view class="wxlogin">
				<u-grid :col="3" :border="false">
					<u-grid-item @click="dsfLogin('qq')" >
						<image style="width:100rpx;height: 100rpx;" src="../../../static/images/qq-icon1.png" mode="widthFix"></image>
						<view class="grid-text" style="">QQ</view>
					</u-grid-item>
					<u-grid-item @click="dsfLogin('weixin')" >
						<image style="width:100rpx;height: 100rpx;" src="../../../static/images/wx-icon1.png" mode="widthFix"></image>
						<view class="grid-text" style="">微信</view>
					</u-grid-item>
					
					<u-grid-item  v-if="$store.state.platform=='ios'">
						<image style="width:100rpx;height: 100rpx;" src="../../../static/images/wb-login.png" mode="widthFix"></image>
						<view class="grid-text" style="">新浪微博</view>
					</u-grid-item>
					<u-grid-item @click="dsfLogin('sinaweibo')" v-else>
						<image style="width:100rpx;height: 100rpx;" src="../../../static/images/wb-icon1.png" mode="widthFix"></image>
						<view class="grid-text" style="">新浪微博</view>
					</u-grid-item>
					
				</u-grid>
			</view>
			<view class="bottom">
				<text class="text" style="color: #666;">注册登陆即表示同意</text>&nbsp<text class="text"
					style="font-weight: 700;">《平台服务协议》</text>
			</view>
		</view>
		<view class="back" @click="handleback">
			<image src="@/static/images/back.png"  style="width: 44rpx;height: 44rpx;"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				isTrue: true,
				notPhone: true,
				form: {
					"mem-username": "",
					"mem-password": ""
				},
				codeText: "",
				phone: {
					"sms-mobile": '',
					"sms-phone": '2',
					"sms-code": '',
					"sms-type": '2',
				},
				infoData: {
					access_token: ''

				},
			}
		},
		computed: {
			...mapState({
				userInfo: 'userInfo',
				userFormat: 'userFormat'
			})
		},
		methods: {
			//返回
			handleback() {
				uni.navigateBack()
			},


			//第三方登录
			dsfLogin(type) {
				if (this.isTrue) {
					this.isTrue = false
					setTimeout(()=>{
						this.isTrue = true
					},500)
					uni.getProvider({
						service: 'oauth',
						success: res => {
							//支持微信、qq和微博等
							if (~res.provider.indexOf(type)) {
								uni.login({
									provider: type,
									success: loginRes => {
										console.log(loginRes, 'loginResloginRes')
										let access_token = loginRes.authResult.access_token
										let openid = loginRes.authResult.openid
										// console.log('-------获取openid(unionid)-----');
										this.infoData.access_token = access_token
										this.infoData.openid = openid
										uni.setStorageSync('openid', openid);
										// 获取用户信息
										uni.getUserInfo({
											provider: type,
											success: infoRes => {
												console.log('-------获取' + type +
													'用户所有-----');
												// console.log(JSON.stringify(infoRes.userInfo));
												this.infoData = {
													...this.infoData,
													...infoRes.userInfo,
													name: type
												}
												this.login(this.infoData)

											}
										});
									}
								});
							}


						}

					});

				}


			},

			login(data) {
				
				let oauth = {}
				oauth = {
					...data,
					type: 3,
					client_id: this.client_id,
					refresh_token: "",
					app_id: this.app_id,
				}
               console.log(data,'datadatadata')
				this.$api.get("user/login", {
					"mem-openid": oauth.openid,
					"mem-oauth_type":oauth.name=='qq'?2:oauth.name=='weixin'?1:3,
				}).then(res => {
					console.log(res,'rrrrrrrrrrrrrrrrrrrrrrrrrrr')
					if (res.data.code == 41316||res.data.code == 41318||res.data.code == 41320) {
						uni.navigateTo({
							url: `/pages/view/register/index?id=${oauth.openid}&name=${oauth.name=='qq'?'QQ':oauth.name=='weixin'?'微信':'新浪微博'}&oauth_type=${oauth.name=='qq'?2:oauth.name=='weixin'?1:3}`
						})
					} else if(res.data.code==200) {
                        uni.setStorageSync('mem-openid', oauth.openid)
						this.$store.commit("setLoginInfo", res.data.data)
						uni.setStorageSync('mem-username', res.data.data.username)
						uni.setStorageSync('mem-oauth_type',oauth.name=='qq'?2:oauth.name=='weixin'?1:3)
						
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							success: () => {
								// 返回上一页
								setTimeout(() => {
									uni.navigateBack()
								}, 300)
							}
						})

						// 获取用户信息
						this.$common.getuserInfo();
					}

				})
			},
			// 一键登录
			oneLogin() {
				// 显示一键登录选项
				uni.login({
					provider: 'univerify',
					univerifyStyle: { // 自定义登录框样式
						"fullScreen": "true", // 是否全屏显示，默认值： "false"
						"authButton": {
							"normalColor": '#ff5927',
							"textColor": "#ffffff",
							// "border":'#e4e4e4'
						},
						//   "buttons": {  // 自定义登陆按钮
						//     "iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
						//     "list": [
						//       {
						//         "provider": "qq",
						//         "iconPath": "@/static/images/qq-share.png" // 图标路径仅支持本地图片
						//       }, 
						//       {
						//         "provider": "weixin",
						//         "iconPath": "../../../static/images/wx-share.png" // 图标路径仅支持本地图片
						//       },
						// {
						//   "provider": "weibo",
						//   "iconPath": "../../../static/images/wb-share.png" // 图标路径仅支持本地图片
						// }
						//     ]
						//   }
					},
					success: res => { // 登录成功
					console.log(res,'loginRes')
						let loginRes = res.authResult
						uniCloud.callFunction({
							name: 'index', // 你的云函数名称
							data: {
								'access_token': loginRes.access_token, // 客户端一键登录接口返回的access_token
								'openid': loginRes.openid // 客户端一键登录接口返回的openid
							}
						}).then(res => {
							this.onephoneLoin(res.result.content.phoneNumber, 1,loginRes.openid)



							// 登录成功，可以关闭一键登录授权界面了
						}).catch(err => {
							// 处理错误

						})
					},
					fail(res) { // 登录失败
						uni.closeAuthView() //关闭一键登录弹出窗口
					},
					complete: () => {
						// uni.closeAuthView()
						this.notPhone = true
					}
				})

			},
			//本机号码一键登录
			phonelogin() {

				uni.preLogin({ // 该函数是判断当前设备环境是否支持一键登录，
					// 如果能支持一键登录，此时可以显示一键登录选项，同时预登录会准备好相关环境
					provider: 'univerify',
					success: res => {
						//预登录成功
						this.oneLogin()
					},
					fail(res) {
					
						uni.showToast({
							title: '该设备不支持一键登录',
							icon: 'none',

						})
						// 预登录失败
						//如果手机没有插入有效的sim卡，或者手机蜂窝数据网络关闭，
						//都有可能造成预登录校验失败。
					}
				})
			},
			onephoneLoin(mobile, type,openid) {
				this.$api.get("v8/user/loginm", {
					"sms-mobile": mobile,
					"sms-phone": type
				}).then(res => {
					// 将登录获取的数据记录下来
						console.log(res, 'sssssssssssssss')
						uni.closeAuthView()		
					if (res.data.code == 200) {
						if(res.data.data.is_pwd){
						    uni.setStorageSync('sms-mobile', mobile)
							uni.setStorageSync('mem-username', mobile)
							this.$store.commit("setLoginInfo", res.data.data)			
							uni.showToast({
								title: '登录成功',
								success: () => {
									
									// 返回上一页
									setTimeout(() => {
										uni.navigateBack({
											delta: 1,
										})
									}, 300)
								}
							})
							// 获取用户信息
							this.$common.getuserInfo();
						}else{
							uni.setStorageSync('sms-mobile', mobile)
							uni.setStorageSync('mem-username', mobile)
							this.$store.commit("setLoginInfo", res.data.data)
							//跳转
							uni.navigateTo({
								url:'/pages/my/children/bindingPssword/bindingPssword'
							})
							
							
						}

					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'

						})
					}

				})




			},
			doLogin() {
				this.$api.get("user/login", {
					...this.form,
					equipmentCode: this.equipmentCode
				}).then(res => {
					console.log(res, 'doLogindoLogindoLogindoLogin')
					// 将登录获取的数据记录下来
					if (res.data.code == 200) {
						this.$store.commit("setLoginInfo", res.data.data)
						// 将用户名密码记录在本地
						uni.setStorageSync('mem-username', this.form["mem-username"])
						uni.setStorageSync('mem-password', this.form["mem-password"])

						uni.showToast({
							title: '登录成功',
							success: () => {
								this.$common.getuserInfo();
								// 返回上一页
								setTimeout(() => {
									uni.navigateBack({
										delta: 1,
									})
								}, 300)
							}
						})
						// 获取用户信息

				
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'

						})
					}

				})
			},
			/* 手机号登录 */
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if (!this.phone['sms-mobile']) {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					})
					return;
				}
				let that = this;
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						success() {
							that.$api.get("v8/sms/send", {
								...that.phone
							}).then(res => {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})

								if (res.data.code == 200) {
									uni.hideLoading();
									that.$refs.uCode.start();
								}
							})
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			iphoneLogin() {
				this.$api.get("v8/user/loginm", {
					...this.phone
				}).then(res => {
					// 将登录获取的数据记录下来
					if (res.data.code == 200) {
						if(res.data.data.is_pwd){
							uni.setStorageSync('mem-username', this.phone['sms-mobile'])
							uni.setStorageSync('sms-mobile', this.phone['sms-mobile'])
							this.$store.commit("setLoginInfo", res.data.data)
							uni.showToast({
								title: '登录成功',
								success: () => {
									// 返回上一页
									setTimeout(() => {
										uni.navigateBack({
											delta: 1,
										})
									}, 300)
								}
							})
							// 获取用户信息
							
							this.$common.getuserInfo();
						}else{
							uni.setStorageSync('mem-username', this.phone['sms-mobile'])
							uni.setStorageSync('sms-mobile', this.phone['sms-mobile'])
							this.$store.commit("setLoginInfo", res.data.data)
							//跳转
							uni.navigateTo({
								url:'/pages/my/children/bindingPssword/bindingPssword'
							})
							
							
						}

					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'

						})
					}

				})
			},



			//忘记密码
			forgetPw() {
				uni.navigateTo({
					url: `/pages/my/children/forgetPwd`
				})
			}

		},
		onLoad() {
			this.phonelogin()
		}
	}
</script>

<style lang="scss" scoped>
	.back {
		position: fixed;
		width: 66rpx;
		height: 66rpx;
		top: 80rpx;
		left: 32rpx;
		border-radius: 50%;
		@include flex;
		justify-content: center;
		background-color: #1C1C1C;
		opacity: .5;
	}

	.login {
		height: 100%;
		overflow: hidden;

		.body {
			margin-top: -20rpx;
			@include padding;

			.log {
				text {
					font-size: 52rpx;
				}
			}

			.userInfo {
				margin-top: 36rpx;
			}

			.userInfo_line {
				height: 3rpx;
				width: 100%;
				background-color: #E4E4E4;
				margin-bottom: 52rpx;

			}

			.myPhone {

				margin-top: 100rpx;


				.number {
					font-size: $xw-h1-font;
					color: $xw-black-dark;
					font-weight: 700;
					margin-bottom: 80rpx;

				}
			}
		}

		.buttn {
			width: 100%;
			@include flex;
			justify-content: center;
			margin-top: 70rpx;
			margin-bottom: 64rpx;

			.mybutton {
				@include button(50rpx, 18rpx, 286rpx);
				font-size: 30rpx;
				white-space: nowrap;
			}
		}

		.phonelogin {
			@include flex;
			justify-content: center;
			margin-bottom: 120rpx;
		}

		.wxlogin {
			margin-bottom: 36rpx;

			.images {
				border-radius: 50%;
				width: 82rpx;
				height: 82rpx;
			}

			.iconfont {
				font-size: 60rpx;
				color: #C1C1C1;
				background-color: #EFEFEF;
				border-radius: 50%;
				padding: 14rpx 20rpx;
				margin-bottom: 6rpx;
			}

			.grid-text {
				font-size: $xw-font;
				color: $xw-color;
			}
		}

		.bottom {
			width: 100%;
			@include flex;
			justify-content: center;
		}


	}

	.Loginimages {
		width: 180rpx;
		height: 180rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 220rpx;
		box-shadow: 0 0 4px rgba(222, 222, 222, .8);
		padding: 6rpx 10rpx;
		border-radius: 30rpx;
	}

	.text {
		font-size: $xw-font;
		color: $xw-black-dark;
	}

	/deep/.u-input {
		margin-bottom: 2rpx !important;
	}

	/deep/.u-form-item {
		padding: 0;
	}
</style>
<style>
	@import '@/common/css/nvue-whith.css';
</style>
