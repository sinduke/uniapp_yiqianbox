<!-- 忘记密码 -->
<template>
	<view class="container">
		<view class="" style="color: #1C1C1C;font-weight: bold;font-size: 56rpx;">忘记密码</view>
		<!-- 第一步：验证码 -->
		<u-form label-position='top' :model="form1" ref="uForm" :border-bottom='false'>
			<u-form-item :label="$t('phoneNumber')">
				<u-input v-model="form1['sms-mobile']" :placeholder="$t('pleaseInput')+$t('phoneNumber')" />
			</u-form-item>
			<u-form-item :label="$t('verificationCode')">
				<u-input v-model="form1['sms-code']" :placeholder="$t('pleaseInput')+$t('verificationCode')" />
				<view class="" @click="getCode">{{codeText}}</view>
			</u-form-item>
			<u-verification-code style="background: #fff;" ref="uCode" @change="codeChange"></u-verification-code>
		</u-form>

		<!-- 第二步：修改密码 -->
		<u-form :model="form2" ref="uForm" label-width="150" :border-bottom="false" label-position='top'>
			<u-form-item :label="$t('my.czmm')">
				<u-input v-model="form2.password" type="password" :placeholder="$t('pleaseInput')+'新'+$t('password')" />
			</u-form-item>
			<u-form-item :label="$t('confirm1')+$t('password')">
				<u-input v-model="form2.passwordAgain" type="password" :placeholder="$t('my.qzcsrmm')" />
			</u-form-item>
			<view class="" @click="handleConfirm"
				style="width: 100%;height: 80rpx;border-radius: 40rpx;border: 1rpx solid #E4E4E4;color: #FF5927;font-size: 32rpx;line-height: 80rpx;text-align: center;font-weight: 500;margin-top: 64rpx;">
				设置新密码
			</view>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				codeText: "",
				form1: {
					"sms-mobile": "",
					"sms-code": "",
					"sms-type": 5
				},
				form2: {
					password: "",
					passwordAgain: "",
					verify_token: ""
				}
			}
		},
		methods: {
			codeChange(text) {
				this.codeText = text;
			},
			// 发送验证码
			getCode() {
				let that = this;
				if (!this.form1['sms-mobile']) {
					// 手机号为空弹出
					uni.showToast({
						title: this.$t('pleaseInput') + this.$t('phoneNumber'),
						icon: "none",
					})
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在' + this.$t('get') + this.$t('verificationCode'),
						success() {
							that.$api.get("findpwd/sms/send", {
								...that.form1
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
					this.$u.toast(this.$t('my.djsjszfs'));
				}
			},
			// 确认验证码
			handleConfirm() {
				this.$api.get("findpwd/sms/check", {
					...this.form1
				}).then(res => {
					uni.showToast({
						title: res.data.msg,
						icon: "none"
					})
					this.show = false;
					this.form2.verify_token = res.data.data.verify_token;
					this.submitPassword()
				})

			},
			// 提交密码修改
			submitPassword() {
				if (this.form2.password != this.form2.passwordAgain || this.form2.password == 0) {
					uni.showToast({
						title: this.$t('my.srmmbyz'),
						icon: "none"
					})
					return;
				}
				this.$api.get("findpwd/password/reset", {
					...this.form2
				}).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: "修改密码成功",
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 400)
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 60rpx 36rpx;
		position: relative;
		background-color: #fff;

		.bottom {
			width: 100%;
			position: absolute;
			bottom: 40rpx;
			text-align: center;
			// font-size: $xw-font-size-sm;

			.lianxi {
				// color: $xw-font-primary-color;
				text-decoration: underline;
			}
		}
	}
</style>
