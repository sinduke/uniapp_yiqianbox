<template>
	<view class="signRule">
		<view class="myshadowLine" />
		<view class="body">
			<view class="title" style="margin-bottom: 32rpx;">规则</view>
			 <text class="title1">
			 	1. 签到领积分：同一账号每天可签到1次，签到可以获 得平台积分，积分直接发放至用户账号；根据用户连续签到的天数，每日积分发放数不同。
			 </text>
			 <text class="title1">
			 	2. 连续签到规则：
			 </text>
			 <view  style="margin-bottom: 32rpx;">
			 	<text class="text">1）当连续签到天数小于7天时，签到首日可得1个积分，每日递增1个积分；</text>
			 	<text class="text">2）当连续签到天数达到7天以上时，每日可得7个积分；</text>
			 	<text class="text">3）若用户断签，则重新开始计算连续签到天数。</text>
			 </view>
			 <text class="title1">
			 	3. 举例：
			 </text>
			 <view class="text" style="margin-bottom: 32rpx;">
			 	您连续签到10天，则每日可获积分数分别为1，2,  3，4，5,  6，
			 	7，7  ,  7,  7；若第11天断签，则第12天签到时，重新计算签到
			 	天数，发放1个积分。
			 </view>
			 <view class="title" style="margin-bottom: 32rpx;">
			 	其他说明
			 </view>
			 <view class="">
			 	<text class="title1">
					1.每日签到+1积分，连续签到翻倍，单日+30封顶  
				</text>
				<text class="title1">
					2.如用户存在违规刷积分行为，我们有权取消用户获得积分的资格，已领取的积分将被扣回。
				</text>
			 </view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.text{
      font-size: $xw-font;
	  display: block;
	}
	.signRule {
		height: 100vh;
		overflow: hidden;
		.title{
			color: $xw-black-dark;
			font-weight: 700;
			font-size: $xw-h3-font;
		}
		.title1{
			display: block;
			color: $xw-black-dark;
			font-weight: 600;
			font-size: $xw-h4-font;
			margin-bottom: 24rpx;
		}


		.body {
			@include padding;
		}
	}

	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 60rpx;

	}
</style>
