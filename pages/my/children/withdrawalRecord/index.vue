<!-- 获取记录 -->
<template>
	<view class="withdrawalRecord">
		<scroll-view scroll-y="true">
			<view class="card" v-for="(item,index) in pageData" :key='index' v-if="pageData.length>0">
				<view class="cardLeft">
					<view class="cardLeft-text">领取金额</view>
					<view class="cardLeft-time">{{item.create_time | dateFormat("yyyy-MM-dd hh:mm:ss")}}</view>
				</view>
				<view class="cardRight">
					<text>+{{item.amount}}元</text>
				</view>
			</view>
			<nvue-loading v-if="pageData.length==0" style="margin-top: 300rpx;"></nvue-loading>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageData: [],
				fromData: {
					page: 1,
					offset: 10
				},
				isshow:false
			}
		},
		methods: {
			getPageData() {
				this.$api.get("financial/withdraw/list", {
					...this.fromData
				}).then(res => {
					this.pageData = this.pageData.concat(res.data.data.list)
					this.count = res.data.data.count
				})
			},
			// scroll-view到底部加载更多
			loadMore() {
				if (this.count > this.pageData.length) {
					this.fromData.page++;
					this.getPageData();
				}
			},
			//
		},
		onLoad() {
			this.getPageData()
		},
		onReachBottom() {
			let _this = this
			this.isshow = true
			setTimeout(function() {
				_this.loadMore()
				_this.isshow = false
		
			}, 500);
		},
	}
</script>

<style lang="scss" scoped>
	.card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 20px;
		height: 160rpx;
		border-bottom: 1px solid #ececec;

		.cardLeft {
			padding: 24rpx 0;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.cardLeft-text {
				font-size: 30rpx;
				font-weight: 700;
			}

			.cardLeft-time {
				color: #999;
				font-size: 24rpx;
			}
		}

		.cardRight {
			color: $xw-theme-color;
			font-weight: 700;
		}
	}
	.loading{
		display: flex;
		justify-content: center;
	}
</style>
