<!-- 注册页面 -->
<template>
	<view class="container">
		<view>
			<view class="h1">欢迎注册/绑定</view>
		</view>

		<!-- 手机号注册 -->
		<view style="width: 94%;">
			<u-form :model="form2" ref="uForm" label-width="120" :border-bottom="false" label-align="right">
				<view class="h2">手机号</view>
				<u-form-item label="">
					<u-input v-model="form2['sms-mobile']" placeholder="请输入手机号" />
				</u-form-item>
				<view class="h2">验证码</view>
				<u-form-item label="">
					<u-input v-model="form2['sms-code']" placeholder="请输入验证码" style="margin-right: 30rpx;" />
					<text size="mini" slot="right" type="warning" @click="getCode">{{codeText}}</text>
					<u-verification-code style="background: #ffd014;" ref="uCode" @change="codeChange">
					</u-verification-code>
				</u-form-item>
				<view class="h2" v-if="ispassword">密 码</view>
				<u-form-item label="" v-if="ispassword">
					<u-input v-model="form2['mem-password']" type="password" placeholder="请输入密码" />
				</u-form-item>
			</u-form>
				<view class="mobile clearfix" v-if="!this.oauth">
				<text class="fr" @click="changeRegister">{{text}}</text>
			</view>
			<view class="mobile clearfix">
				<text>首次{{oauth.name}}登录，需要{{is_reg?"注册":"绑定"}}手机号</text>
			</view>
			<view class="btn">
				<text class="buttons" v-if="is_reg" @click="register2">注 册/绑 定</text>
				<text class="buttons" v-else @click="register1">注 册/绑 定</text>
				
			</view>
		</view>

		<!-- <view class="bottom">注册即表示同意<text class="txt">《平台服务协议》</text></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				register: 1,
				text: "手机号注册",
				ispassword:false,
				is_reg:false,
				oauth: {
					openid:'',
					name:''
				},

				form1: {
					"mem-username": "",
					"mem-password": "",
					passwordAgain: ""
				},

				codeText: "",
				form2: {
					"sms-mobile": "",
					"sms-code": "",
					"mem-password": "",
					"sms-type": 1,
					"sms-oauth_type": '',
					

				}
			}
		},
		methods: {
			//手机号注册
			register1(){
				if (this.oauth) {
					this.form2["sms-openid"] = this.oauth.openid
					this.form2["sms-type"] = 2
					console.log(this.form2, 'this.form2this.form2')
				}
				this.$api.get("user/mobile/register", {
					...this.form2,
					equipmentCode: this.equipmentCode,
				}).then(res => {
					console.log(res,'registerregisterregisterregisterregister')
					if(res.data.code==200){
						uni.showToast({
							title: "注册成功",
						})
					uni.setStorageSync('mem-openid', this.oauth.openid)
					this.$store.commit("setLoginInfo", res.data.data)
					uni.setStorageSync('mem-username', res.data.data.username)
					uni.setStorageSync('mem-oauth_type', this.form2['sms-oauth_type'])
					
					
					uni.showToast({
						title: '登录成功',
						icon: 'none',
						success: () => {
							setTimeout(() => {
								// 返回我的页面
								uni.switchTab({
									url: "/pages/my/index"
								})
							}, 300)
						}
					})
					// 获取用户信息
					this.$common.getuserInfo();
						
						
						
						
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
					
				})
			},
			
			// 手机号绑定
			register2() {
				if (this.oauth) {
					this.form2["sms-openid"] = this.oauth.openid
					this.form2["sms-type"] = 2
					
				}
				this.$api.get("v8/user/bind_login", {
					...this.form2,
					equipmentCode: this.equipmentCode,
				}).then(res => {
						console.log(res,'bind_loginbind_loginbind_login')
					if(res.data.code==200){
						uni.showToast({
							title: "绑定成功",
						})
                     uni.setStorageSync('mem-openid', this.oauth.openid)
                     this.$store.commit("setLoginInfo", res.data.data)
                     uni.setStorageSync('mem-username', res.data.data.username)
					 uni.setStorageSync('mem-oauth_type', this.form2['sms-oauth_type'])
                     uni.showToast({
                     	title: '登录成功',
                     	icon: 'none',
                     	success: () => {
                     		setTimeout(() => {
                     			// 返回我的页面
                     			uni.switchTab({
                     				url: "/pages/my/index"
                     			})
                     		}, 300)
                     	}
                     })
                     // 获取用户信息
                     this.$common.getuserInfo();


					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
					
				})

			},
			//绑定登录
			bindingLogin(){
				this.$api.get("user/login", {
					"mem-openid": this.oauth.openid,
					"mem-oauth_type":this.form2['sms-oauth_type'],
				}).then(res => {
					console.log(res,'registerregisterregisterregisterregister')
                       if(res.data.code==200) {
					    uni.setStorageSync('mem-openid', this.oauth.openid)
						this.$store.commit("setLoginInfo", res.data.data)
						uni.setStorageSync('mem-username', res.data.data.username)
						uni.setStorageSync('mem-oauth_type', this.form2['sms-oauth_type'])
						uni.showToast({
							title: '登录成功',
							icon: 'none',
							success: () => {
								setTimeout(() => {
									// 返回我的页面
									uni.switchTab({
										url: "/pages/my/index"
									})
								}, 300)
							}
						})
						// 获取用户信息
						this.$common.getuserInfo();
					}
				
				})
			},

			doLogin(form) {
				this.$api.get("user/login", {
					...form
				}).then(res => {
		
					if (res.data.code == 200) {
						// 将登录获取的数据记录下来
						this.$store.commit("setLoginInfo", res.data.data)
						// 将用户名密码记录在本地
						uni.setStorageSync('mem-username', form["mem-username"])
						uni.setStorageSync('mem-password', form["mem-password"])
						// 返回我的页面
						uni.switchTab({
							url: "/pages/my/index"
						})
						console.log('loginloginlogin')
						// 获取用户信息
						this.$common.getuserInfo();
					}

				})
			},
			codeChange(text) {
				this.codeText = text;
			},
			getCode() {
				if (!this.form2['sms-mobile']) {
					uni.showToast({
						title: "请输入手机号",
						icon: "none"
					})
					return;
				}

				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						success:()=> {
							this.$api.get("v8/sms/oauth_send", {
								...this.form2
							}).then(res => {
						console.log(res,'showLoadingshowLoadingshowLoadingshowLoading')
								if (res.data.code == 200) {
									this.is_reg = res.data.data.is_reg
									if(!res.data.data.is_reg){
										this.ispassword = true
									}
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								
									uni.hideLoading();
									this.$refs.uCode.start();
									
								}else{
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
									return
								}
							})
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			}
		},
		onLoad(option) {
			if (Object.keys(option).length) {
				this.oauth.openid = option.id,
				this.oauth.name = option.name,
				this.form2['sms-oauth_type'] = option.oauth_type,
				
				console.log(this.oauth)
				this.register = 2
			}

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		@include padding;
		position: relative;
		background-color: #fff;
		overflow: hidden;
		height: 100vh;

		// @include flex-column;
		.h1 {
			font-size: $xw-h2-font;
			color: $xw-black-dark;
			font-weight: 700;
			margin: 42rpx 0;

		}

		.h2 {
			font-size: $xw-h3-font;
			color: $xw-black-dark;
			font-weight: 700;
			margin-top: 42rpx;
		}

		.mobile {
			@include flex;
			justify-content: center;
			margin: 24rpx 0;

			text {
				font-size: $xw-font;
				color: $xw-color;
			}

			.fr {
				color: $xw-color;
			}
		}

		.btn {
			margin-top: 60rpx;
			width: 100%;
			@include flex;
			justify-content: center;

			.buttons {
				@include button(30rpx, 8rpx, 220rpx);
				font-size: $xw-h3-font;

			}
		}

		.bottom {
			width: 100%;
			position: absolute;
			bottom: 40rpx;
			text-align: center;
			font-size: $xw-font;

			.txt {
				color: $xw-color;
			}
		}
	}
</style>
