<!-- 绑定手机号 -->
<template>
	<view class="">
		<view class="container">
			<u-form :model="form1" ref="uForm" :border-bottom="false" label-width="150" style="margin-bottom: 40rpx;">
				<view class="title">{{$t('phoneNumber')}}</view>
				<u-form-item label="">
					<u-input v-model="form1['sms-mobile']" :placeholder="$t('pleaseInput')+$t('phoneNumber')" />
				</u-form-item>
				<view class="title">{{$t('verificationCode')}}</view>
				<u-form-item>
					<u-input v-model="form1['sms-code']" :placeholder="$t('pleaseInput')+$t('verificationCode')"
						placeholder-style="color: #c0c4d4;" />
					<text size="mini" slot="right" type="warning" @click="getCode1">{{codeText1}}</text>
				</u-form-item>
				<u-verification-code style="background: #ff5927;" ref="uCode1" @change="codeChange1" unique-key="page-1"
					:start-text="$t('get')+$t('verificationCode')" :end-text="$t('get')+$t('verificationCode')">
				</u-verification-code>
			</u-form>
			<view class="" style="display: flex; justify-content: center;">
				<view class="buttons" @click="handleBind1">完成{{$t('obtain')}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				codeText1: "",
				form1: {
					"sms-mobile": "",
					"sms-code": "",
					"sms-type": 4,
				},
			}
		},

		computed: {
			...mapState({
				userInfo: "userInfo",
				client_id: "client_id",
			}),
		},
		methods: {
			codeChange1(text) {
				this.codeText1 = text;
			},
			getCode1() {
				if (!this.form1['sms-mobile']) {
					uni.showToast({
						title: this.$t('pleaseInput') + this.$t('phoneNumber'),
						icon: "none"
					})
					return;
				}
				let that = this;
				if (this.$refs.uCode1.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在' + this.$t('pleaseInput') + this.$t('phoneNumber'),
						success() {
							that.$api.get("v8/sms/send", {
								...that.form1
							}).then(res => {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})
								if (res.data.code == 200) {
									uni.hideLoading();
									that.$refs.uCode1.start();
								}
							})
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			// 完成绑定
			handleBind1() {
				this.$api.get("user/bind_phone", {
					"sms-mobile": this.form1["sms-mobile"],
					"sms-code": this.form1["sms-code"]
				}).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: this.$t('obtain') + "成功",
							success: () => {
								setTimeout(() => {
									this.$common.getuserInfo();
									uni.navigateBack()
								}, 300)
							}
						})

					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						return
					}

				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/nvue-whith.css';

	.container {
		margin-top: 60rpx;
		@include padding;
		background-color: #fff;

		.text {

			.txt {
				font-size: $xw-font;
				color: $xw-color;
				line-height: 2;
			}
		}

	}

	.title {
		margin-top: 40rpx;
		font-size: $xw-h3-font;
		font-weight: 700;
	}

	.buttons {
		@include button(60rpx, 20rpx, 148rpx);
		font-size: 36rpx;
		display: inline-block;


	}
</style>
