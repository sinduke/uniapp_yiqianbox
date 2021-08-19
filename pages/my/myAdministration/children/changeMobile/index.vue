<!-- 修改手机号 -->
<template>
	<view class="">
		<view class="myshadowLine" style="margin-bottom: 32rpx;"/>
	
	<view class="container">
		
		<!-- 未绑定 -->
		<view class="noBind" v-show="!isBind">
			<u-form :model="form1" ref="uForm" :border-bottom="false" label-width="150" style="margin-bottom: 40rpx;">
				<u-form-item :label="$t('phoneNumber')">
					<u-input v-model="form1['sms-mobile']" :border="true"
						:placeholder="$t('pleaseInput')+$t('phoneNumber')" />
				</u-form-item>
				<u-field v-model="form1['sms-code']" :placeholder="$t('pleaseInput')+$t('verificationCode')"
					placeholder-style="color: #c0c4d4;">
					<text size="mini" slot="right" type="warning" @click="getCode1">{{codeText1}}</text>
				</u-field>
				<u-verification-code style="background: #ffd014;" ref="uCode1" @change="codeChange1" unique-key="page-1"
					:start-text="$t('get')+$t('verificationCode')" :end-text="$t('get')+$t('verificationCode')">
				</u-verification-code>
			</u-form>
			<view class="" style="display: flex; justify-content: center;">
			<view class="buttons" @click="handleBind1">完成{{$t('obtain')}}</view>
			</view>
		</view>

		<!-- 已绑定 -->
		<view class="hasBind" v-show="isBind">
			<view class="text" style="display: flex;flex-direction: column; align-items: center;">
				<view class="text" style="color: #1C1C1C;font-weight: 700;font-size:36rpx;">当前{{$t('Bindingobilehonenumber')}}：{{userInfo.mobile}}</view>
				<view class="txt">{{$t('Theboundmobilephonebeverifiedbeforethenewmobilephonenumbercanbereplacedfirst')}}
				</view>
			</view>
			<u-form :model="form2" ref="uForm" :border-bottom="false" style="margin: 40rpx 0;">
				<u-field v-model="form2['sms-code']" :placeholder="$t('pleaseInput')+$t('verificationCode')" placeholder-style="color: #c0c4d4;" label-width="0">
					<text size="mini" slot="right" type="warning" @click="getCode2">{{codeText2}}</text>
				</u-field>
				<u-verification-code style="background: #ffd014;" ref="uCode2" @change="codeChange2" unique-key="page-2"
					:start-text="$t('get')+$t('verificationCode')" :end-text="$t('get')+$t('verificationCode')">
				</u-verification-code>
			</u-form>
			<view class="" style="display: flex; justify-content: center;">
				
			<view class="buttons" @click="handleBind2">{{$t('verification')+$t('phoneNumber')}}</view>
			</view>
		</view>

	</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				isBind: true,

				codeText1: "",
				form1: {
					"sms-mobile": "",
					"sms-code": "",
					"sms-type": 4,
				},

				codeText2: "",
				form2: {
					"sms-code": "",
					"sms-type": 4
				}
			}
		},
		// onReady() {
		// 	uni.setNavigationBarTitle({
		// 		title: this.$t('Bindingobilehonenumber')
		// 	})
		// },
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
							that.$api({
								url: "v8/sms/send",
								method: "GET",
								data: that.form1
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
				this.$api({
					url: "user/phone/bind",
					method: "GET",
					data: {
						mobile: this.form1["sms-mobile"],
						code: this.form1["sms-code"]
					}
				}).then(res => {
					uni.showToast({
						title: this.$t('obtain')+"成功",
					})
					this.getUserInfo();
					this.$Router.back(1);
				})
			},

			codeChange2(text) {
				this.codeText2 = text;
			},
			getCode2() {
				let that = this;
				if (this.$refs.uCode2.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在' + this.$t('pleaseInput') + this.$t('phoneNumber'),
						success() {
							that.$api.get("v8/sms/send", {
									"sms-mobile": that.userInfo.mobile,
									...that.form2
								
							}).then(res => {
								
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})

								if (res.data.code == 200) {
									uni.hideLoading();
									that.$refs.uCode2.start();
								}
							})
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			// 验证号码
			handleBind2() {
				this.$api.get( "user/phone/unbind",{
						mobile: this.userInfo.mobile,
						code: this.form2['sms-code']
				
				}).then(res => {
					console.log(res.data.code)
					if(res.data.code==200){
						uni.showToast({
							title: `解${this.$t('obtain')}成功`,
						})
						this.isBind = false;
						
						this.$refs.uCode2.reset();
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
					}
					
				})
			}
		},

		created() {
			if (this.userInfo.has_bind_mobile == 1) {
				this.isBind = false;
			} else {
				this.isBind = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/nvue-whith.css';
	.container {
		// padding: $xw-padding-base;
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
	.buttons{
		@include button(60rpx,20rpx,86rpx);
		 font-size:36rpx;
		 display: inline-block;
	

	}
</style>
