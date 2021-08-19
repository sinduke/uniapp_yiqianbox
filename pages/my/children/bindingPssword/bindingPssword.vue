<!-- 注册页面 -->
<template>
	<view class="container">
		<view>
			<view class="h1">欢迎注册</view>
		</view>

		<!-- 手机号注册 -->
		<view style="width: 94%;">
			<u-form :model="form" ref="uForm" label-width="120" :border-bottom="false" label-align="right">
				<view class="h2">密码</view>
				<u-form-item label="">
					<u-input v-model="form['mem-password']" type="password" placeholder="请输入密码" />
				</u-form-item>
				<view class="h2">再次输入密码</view>
				<u-form-item label="">
					<u-input v-model="again_psd" type="password" placeholder="请再次输入密码" />
				</u-form-item>
			</u-form>

			<view class="mobile clearfix">
				<text>首次一键登录，需要绑定密码</text>
			</view>
			<view class="btn">
				<text class="buttons" @click="submitPassword">提 交</text>
			</view>
		</view>

		<view class="bottom">注册即表示同意<text class="txt">《平台服务协议》</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oauth: {
					openid:'',
					name:''
				},
				again_psd: "",
				form: {
					"mem-password": "",
				},
			}
		},
		methods: {
       	// 提交密码修改
			submitPassword() {
				if (this.form["mem-password"] != this.again_psd) {
					uni.showToast({
						title: this.$t('my.srmmbyz'),
						icon:'none'
					})
					return;
				}
				this.$api.get("password/update_pwd",{
					 ...this.form
				}).then(res => {
					if(res.data.code==200){
						uni.getStorageSync('mem-password',this.form["mem-password"])
						uni.showToast({
							title: res.data.msg, 
							  success: () => {
							  	uni.switchTab({
							  		url:'/pages/my/index'
							  	})
							  }
							
						})
					         this.$common.getuserInfo()	
					}else{
						uni.showToast({
							title: res.data.msg, 
							icon:"none"
							
						})
						return
					}

				})
			},
		},
		onLoad(option) {
			if (Object.keys(option).length) {
			
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
