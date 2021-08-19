<template>
	<!-- 积分页面 -->
	<view class="FlatGoldCoins">
		<!-- 自定义导航栏 -->
		<u-navbar title="" :is-back='false' :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="iconfont" style="transform: rotate(180deg);font-size: 48rpx;margin-left: -10rpx;font-weight: 300;" @click="toRouter">
						&#xe633;
					</view>
					<view class="slot-wrap" style="margin-left: -400rpx;">
						<text class="customer" style="font-weight: 400;margin-left:-25rpx ;font-size: 32rpx;">我的积分</text>
					</view>
					<view class="slot-right">
						<view class="radius"  @click="handleRouter('/pages/my/integral/integral')" >
							<view class="iconfont" style="font-weight: 400;font-size: 32rpx;">&#xe645;</view>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
		<view class="box">
			<view class="head"></view>
			<view class="bottom">
				<text style="color: #666666; font-size: 26rpx;">积分余额</text>
				<text style="color: #1C1C1C; font-size: 48rpx; font-weight: bold;">{{$store.state.userInfo.my_integral}}</text>
				<view class="btn" @click="handleRouter('/pages/my/integral/dhptb')">
					兑换平台币
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				ptb_cnt:0,
			}
		},
		methods: {
			handleRouter(url) {
				uni.navigateTo({
					url
				})
			},
			// 返回上一级目录
			toRouter(){
				uni.navigateBack()
			},
		},
	}
</script>

<style lang="scss" scoped>
	// 自定义导航栏
	.u-navbar {
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
	}
	
	.title {
		flex: 1;
		padding: 0 $xw-padding;
		@include flex;
	}
	.customer {
		color: $xw-black-dark;
		font-size: $xw-h1-font;
	}
	
	.radius {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
		@include flex;
		justify-content: center;
	}
	// 内容
	.head {
		width: 100%;
		height: 8rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 16px 0px rgba(221, 221, 221, 0.8);
	}

	.bottom {
		display: flex;
		flex-flow: column;
		text-align: center;
	}

	text {
		margin-top: 48rpx;
	}
	.btn{
		margin: 48rpx auto;
		width: 50%;
		height: 80rpx;
		border-radius: 40rpx;
		border: solid 1px #E4E4E4;
		color: rgb(255, 72, 16);
		text-align: center;
		line-height: 76rpx;
		font-size: 30rpx;
		font-weight: 600;
	}
</style>
