<template>
	<view v-if="pageData.rebate.count>0">
		<view class="vipheader">
			<text class="title">{{pageData.rebate.list[0].title}}</text>
			<view class="btn" @click="handleRouter"><text>返利申请</text></view>
		</view>
		<view class="time">
			{{pageData.rebate.list[0].pub_time}}
		</view>
		<u-parse style="color: #666666;" :html="pageData.rebate.list[0].content"></u-parse>
	</view>
	<nvue-loading v-else></nvue-loading>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: {
			pageData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods:{
			handleRouter(){
				uni.navigateTo({
					url:'/pages/customerService/children/rechargeRebate/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vipheader{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.title{
			font-weight: 700;
			margin-bottom: 10rpx;
		}
		.btn{
			width: 72px;
			background: #FFFFFF;
			border: 1px solid #E4E4E4;
			border-radius: 16px;
			@include flex;
			justify-content: center;
			padding: 6rpx 0;
			text{
				font-size: $xw-small-font;
				color: $xw-theme-color;
				
			}
		}
	}
	.time{
		color: $xw-color;
		margin-bottom: 30rpx;
	}
</style>
