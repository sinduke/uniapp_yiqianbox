<template>
	<view class="xw-recycle400">
		<view class="body">
			<!-- <view class="textTit">
				暂无可回收小号
			</view> -->
			<view class="img">
				<image src="@/static/images/transaction/transaction-nodata.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="foots">
			<view class="ditl">
				<text>回收说明</text>
			</view>
			<view class="number">
				<view class="">
					<text class="tit">选择不玩的小号</text>
					<text style="font-size: 22rpx;color: #FF8500;
					margin-bottom:10rpx ;">未充值小号不可回收</text>
				</view>
				<view class="">
					<text class="tit">回收后获得平台币</text>
					<text style="font-size: 22rpx;color: #a1a1a1;">平台币全平台通用</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'xw-recycle400',
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.xw-recycle400 {
		.body {
			margin-top: 80rpx;
			width: 100%;
                @include flex;
				justify-content: center;
			.textTit {
				letter-spacing: 5rpx;
				font-size: 32rpx;
				color: #a1a1a1;
				font-weight: 600;
				margin: 60rpx 0;
			}

			.img {
				image {
					width: 400rpx;
					height: 400rpx;
				}
			}

			text {
				font-weight: 600;
				font-size: 34rpx;
				color: #a1a1a1;
				letter-spacing: 5rpx;
			}
		}

		.foots {
			padding: 10rpx;
			margin-top: 50rpx;

			.number {
				display: flex;
				flex-direction: column;

				view {
					display: flex;
					flex-direction: column;

					.tit {
						font-weight: 600;
						margin: 12rpx auto;
						font-size: 38rpx;
						letter-spacing: 5rpx;
						white-space:nowrap;
						margin-left: -3%;
					}
				}

			}

			height: 300rpx;
			background: url(../../static/images/transaction/quans.png) no-repeat center;
			background-size: 110%;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.ditl {
				margin: 0 160rpx 0 60rpx;
				width: 10rpx;

				text {
					color: #a1a1a1;

				}
			}

		}
	}
</style>
