<template>
	<view class="youhui">
		<view class="line" style="box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);width: 100%;height: 8rpx;background: #FFFFFF;margin-bottom: 24rpx;">
			
		</view>
		 <scroll-view scroll-y="true" :style="{height:$store.state.myHeight-160+'rpx'}">
		 	<view>
				<view class="bottom" v-for="(item,index) in couponList1">
					<view class="left">
						<text class="left_1">{{item.coupons_amount}}</text>
						<text class="left_2">{{item.title}}</text>
					</view>
					<view class="right">
						<view class="right_head">
							<view class="right_head_1">
								<view class="right_head_2">
									<text class=" bg-purple">	有效期至：{{item.get_time_end | dateFormat('yyyy-MM-dd')}}</text>
									<text class=" bg-purple-light">领取时间：{{item.get_time_begin | dateFormat('yyyy-MM-dd')}}后</text>
								</view>
								<u-button v-if="!item.have_got" @click="handleClick(item.id,item.period_type)" class="but" 	shape='circle' size="mini">领取</u-button>
								<u-button v-else  class="but1" shape='circle' size="mini">已领取</u-button>
							</view>
						</view>
						<view class="right_bot">
							适用于《{{coupon.gamename}}》
						</view>
					</view>
				</view>
			</view>
		 </scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
						page: 1,
						offset: 20,
						status:1,
						game_id:0
				},
				active: 0,
				current: 0,
				couponList1: [],
				coupon:[]	
			}
		},
		methods: {
			//点击领取
			handleClick(id, period_type) {
				if(this.$common.isLogin()){
					this.$api.get("user/coupons/add", {
						coupon_id: id,
						period_type
					}).then(res => {
						if (res.data.code == 200) {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.msg
							})
						}
						this.getPage1Data()
					})
				}
				
				
				
			},
			//获取数据
			getPage1Data() {
				this.$api.get('game/detail', {
					...this.params
				}).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						this.couponList1 = res.data.data.coupons.list;
						this.coupon = res.data.data	
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			
			},
		},
		onLoad(option){
			this.params.game_id = option.gameid
			this.getPage1Data()
		}
	}
</script>

<style scoped lang="scss">
	.youhui{
		height: 100vh;
		overflow: hidden;
	}
	.right_head_1{
		@include flex;
		.right_head_2{
			@include flex-column;
		}
		
	}
	/* item渲染界面 */
	.bottom {
		height: 190rpx;
		margin-bottom: 48rpx;
		width: 100%;
		padding: 0 32rpx;
	}
	
	.left {
		width: 30%;
		height: 100%;
		background-color: #E9E9E9;
		float: left;
		border-radius: 40rpx 0 0 40rpx;
		display: flex;
		flex-flow: column;
	}
	
	.left_1 {
		text-align: center;
		margin-top: 40rpx;
		font-size: 60rpx;
		font-family: PingFang SC;
		font-weight: bolder;
	}
	
	.left_2 {
		text-align: center;
		font-size: 24rpx;
		color: #666666;
	}
	
	.right {
		width: 70%;
		height: 100%;
		background-color: #F8F8F8;
		float: right;
		padding: 16rpx 16rpx;
		border-radius: 0 40rpx 40rpx 0;
	}
	
	.but {
		color: #FF5E2F;
		font-weight: bold;
		margin-left: 60rpx;
		margin-top: 20rpx;
		width: 104rpx;
	}
	.but1 {
		background-color: #C1C1C1;
		color: #fff;
		font-weight: bold;
		margin-left: 60rpx;
		margin-top: 20rpx;
		width: 104rpx;
	}
	
	.right_head {
		height: 65%;
		border-bottom: 2rpx #efefef dashed;
		display: flex;
	
		flex-flow: column;
	}
	
	.right_bot {
		margin-top: 16rpx;
		font-size: 24rpx;
		color: #C8C8C8;
		margin-left: 5rpx;
	}
	
	.bg-purple {
		font-size: $xw-h5-font;
		margin-bottom: 12rpx;
		@include overflow;
	}
	
	.bg-purple-light {
		font-size: 24rpx;
		color: #C8C8C8;
	}
</style>
