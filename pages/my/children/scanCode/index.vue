<template>
	<view class="scanCode">
		<view class="scanCodeBox">
			<u-toast ref="uToast" />
			<view class="codeBorder">
				<view class="avatar">
					<u-image :src="userInfo.avatar" width="120rpx" height="120rpx" shape='circle'></u-image>
				</view>
				<view class="userInfo">
					{{userInfo.nickname}}
				</view>
				<view class="ptInfo">
					{{userFormat.name}}官网请求您的账号登录
				</view>
				<view class="button">
					<view @click="handleLogin" style="background-color: #FF5927;color: #fff;padding:12rpx 42rpx;border-radius: 32rpx;">确认登录</view>
					<!-- <u-button @click="handleLogin" shape="circle" type="warning">确认登录</u-button> -->
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
				url: '',
				key: ''
			}
		},
	computed: {
		...mapState({
			userInfo: "userInfo",
			client_id: "client_id",
			userFormat: 'userFormat'
		}),
		
		equipmentCode(){
			return this.$store.state.equipmentCode.split(",")[0]
		}
	},
		methods: {
			handleLogin() {
				uni.request({
					url: this.url,
					method: 'GET',
					header: {
						'Content-Type': 'application/json'
					},
					success: res => {
						if (res.data.code == 200) {
							this.$refs.uToast.show({
								title: '登录成功',
								type: 'success',
								url: '/pages/my/index',
								position: 'top',
								isTab: true

							})
						} else {
							this.$refs.uToast.show({
								title: res.data.msg,
								type: 'error',
								position: 'top',
							
							})
						}
					}
				})
			},
		},
		onLoad(option) {
			this.key = JSON.parse(option.result).key
			this.url = JSON.parse(option.result).url +`?key=${this.key}&abc_game_agent_id=${this.client_id}&username=${uni.getStorageSync('mem-username')}&password=${uni.getStorageSync('mem-password')}&format=json&openid=${uni.getStorageSync('openid')?uni.getStorageSync('openid'):''}`;
		},
	}
</script>

<style scoped lang="scss">
	.scanCode {
		width: 100%;
		height: 100%;
         @include flex;
		 justify-content: center;
		.scanCodeBox {
	            margin-top: 300rpx;
			.codeBorder {
				view {
					margin: 10rpx auto;

				}

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.avatar {}

				.button {
					margin-top: 100rpx;
				}
			}
		}

	}
</style>
