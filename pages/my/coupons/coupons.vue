<template>
	<view class="box">
		<!-- tabs部分 --> 
		<view class="tabs" style="padding: 0 32rpx;margin-top: 10rpx;">
			<view class="tabsList"  :active="active" v-for="(item,index) in tabslist" @click="tabsClick(index)">
				<view class="tabsText" :class="{tabsText1:active==index}">{{item}} </view>
				<view id="ref" class="tabsLine" :class="{tabsLine1:active==index}"></view>
			</view>
		</view>
		<!-- swiper，scroll滑动，滚动部分 -->
		<swiper @change="swiperClick" :current="current" style="margin-top: 48rpx;" :style="{height:$store.state.myHeight-230+'rpx'}">
			<swiper-item>
				<view class="swiper-item">
					<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-270+'rpx'}" @scrolltolower='scrollLoad1'>
						<view class="bottom" v-for="(item,index) in couponList1" > 
							<view class="left">
								<text class="left_1">{{item.coupon.coupons_amount}}</text><text
									class="left_2">{{item.coupon.title}}</text>
							</view>
							<view class="right">
								<view class="right_head">
									<view class="right_head_1">
						
										<view class=" bg-purple" style="width: 70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; ">
											有效期至：{{item.coupon.get_time_end | dateFormat('yyyy-MM-dd')}}
										</view>
										<u-button @click="handleRouterdetail(item.coupon.game_id)" class="but"
											shape='circle' size="mini" style="float: right;">去使用</u-button>
										<view class=" bg-purple-left">
											<view class=" bg-purple-light" style="width: 70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-top: 4%; ">
												领取时间：{{item.coupon.get_time_begin | dateFormat('yyyy-MM-dd')}}后
											</view>
										</view>
									</view>
								</view>
								<view class="right_bot" style="white-space:nowrap;overflow:hidden; ">
									适用于《{{item.coupon.game_name}}》
								</view>
							</view>

						</view>
						<nvue-loading style="position: fixed;top: 300rpx;left: 50%;transform: translateX(-50%);" v-if="couponList1.length==0"></nvue-loading>
						<xw-loadingGif :isShow='isShow'></xw-loadingGif>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<scroll-view scroll-y="true":style="{height:$store.state.myHeight-270+'rpx'}"  @scrolltolower='scrollLoad2'>
						<view class="bottom" v-for="(item,index) in couponList2">
							<view class="left">
								<text class="left_1">{{item.coupon.coupons_amount}}</text><text
									class="left_2">{{item.coupon.title}}</text>
							</view>
							<view class="right">
								<view class="right_head">
									<view class="right_head_1">
										<view class=" bg-purple" style="width: 70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; ">
											有效期至：{{item.coupon.get_time_end | dateFormat('yyyy-MM-dd')}}
										</view>
										<u-button class="but" style="color: #fff; background: #DBDBDB;float: right;" shape='circle'
											size="mini">已使用</u-button>
										<view class=" bg-purple-left">
											<view class=" bg-purple-light" style="width: 70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-top: 4%; ">
												领取时间：{{item.coupon.get_time_begin | dateFormat('yyyy-MM-dd')}}后
											</view>
										</view>
									</view>
								</view>
								<view class="right_bot" style="white-space:nowrap;overflow:hidden; ">
									适用于《{{item.coupon.game_name}}》
								</view>
							</view>
						</view>  
						<nvue-loading style="position: fixed;top: 300rpx;left: 50%;transform: translateX(-50%);" v-if="couponList2.length==0"></nvue-loading>
						<xw-loadingGif :isShow='isShow'></xw-loadingGif>
					</scroll-view>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-270+'rpx'}"  @scrolltolower='scrollLoad3'>
						<view class="bottom" v-for="(item,index) in couponList3">
							<view class="left">
								<text class="left_1">{{item.coupon.coupons_amount}}</text><text
									class="left_2">{{item.coupon.title}}</text>
							</view>
							<view class="right">
								<view class="right_head">
									<view class="right_head_1">
										<view class=" bg-purple" style="width: 70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; ">
											有效期至：{{item.coupon.get_time_end | dateFormat('yyyy-MM-dd')}}
										</view>
										<u-button class="but" shape='circle' size="mini"
											style="color: #fff; background: #DBDBDB;float: right;">已过期</u-button>
										<view class=" bg-purple-left">
											<view class=" bg-purple-light" style="width: 70%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; padding-top: 4%;">
												领取时间：{{item.coupon.get_time_begin | dateFormat('yyyy-MM-dd')}}后
											</view>
										</view>
									</view>
								</view>
								<view class="right_bot" style="white-space:nowrap;overflow:hidden; ">
									适用于《{{item.coupon.game_name}}》
								</view>
							</view>
						</view>
						<nvue-loading style="position: fixed;top: 300rpx;left: 50%;transform: translateX(-50%);" v-if="couponList3.length==0"></nvue-loading>
						<xw-loadingGif :isShow='isShow'></xw-loadingGif>
					</scroll-view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isShow:false,
				tabslist: ["可使用", "已使用", "已过期", ],
				active: 0,
				current: 0,
				count1:0,
				count2:0,
				count3:0,
				couponList1: [],
				couponList2: [],
				couponList3: [],
				params: [
					{
						page: 1,
						offset: 10,
						status:1
					},
					{
						page: 1,
						offset: 10,
						status:2
					},
					{
						page: 1,
						offset: 10,
						status:3
					},
				]
			}
		},
		methods: {
			//加载更多
			scrollLoad1(e){
				this.isShow = true
				setTimeout(()=>{
					if(this.count1>this.couponList1.length){
						this.params[0].page++
						this.getPage1Data()
					}
					this.isShow = false
				},1800)
			
			},
			scrollLoad2(e){
				this.isShow = true
				setTimeout(()=>{
					if(this.count2>this.couponList2.length){
						this.params[1].page++
						this.getPage2Data()
					}
					this.isShow = false
				},1800)
			
			},
			scrollLoad3(e){
				this.isShow = true
				setTimeout(()=>{
					if(this.count3>this.couponList3.length){
						this.params[2].page++
						this.getPage3Data()
					}
					this.isShow = false
				},1800)
			
			},
			tabsClick(index) {
				this.current = index
			},
			swiperClick(e) {
				this.active = e.detail.current
			},
			handleRouterdetail(id) {
				uni.navigateTo({
					url: `/pages/view/gamedetail/gamedetail?gameid=${id}`
				})
			},
			//请求数据
			getPage1Data() {
				this.$api.get('/user/coupons/list', {
					...this.params[0]
				}).then(res => {
					if (res.data.code == 200) {
						this.couponList1 =this.couponList1.concat(res.data.data.list) 
						this.count1 = res.data.data.count
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})

			},
			getPage2Data() {
				this.$api.get('/user/coupons/list', {
					...this.params[1]
				}).then(res => {
					if (res.data.code == 200) {
						this.couponList2 =this.couponList2.concat(res.data.data.list)
						this.count2 = res.data.data.count
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			
			},
			getPage3Data() {
				this.$api.get('/user/coupons/list', {
					...this.params[2]
				}).then(res => {
					if (res.data.code == 200) {
						this.couponList3 =this.couponList3.concat(res.data.data.list)
						this.count3 = res.data.data.count
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			
			},
			// scroll-view到底部加载更多
			loadMore() {
				if (this.params[0].offset < this.couponList1.length) {
					this.params[0].page++;
					console.log(6666,this.params[0].page)
					this.getPage1Data()
				}
			},
		},
		onLoad() {
			this.getPage1Data()
			this.getPage2Data()
			this.getPage3Data()
		},
		onReachBottom() {
			let _this = this
			console.log(1111111)
			this.isshow = true
			
			setTimeout(function() {
				_this.loadMore()
				_this.isshow = false
		
			}, 500);
			console.log(2222)
		},
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		
	}
	/* 顶置tabs */
	.tabs {
		position: sticky;
		position: -webkit-sticky;
		top: var(--window-top);
		display: flex;
		flex-flow: row;
		z-index: 99;
		background-color: #fff;
	}

	/* 设置默认样式 */
	.tabsText {
		color: #666666;
		font-size: 32rpx;
		margin-right: 64rpx;
		font-family: PingFang SC;
		font-weight: 400;
	}

	/* 设置点击样式 */
	.tabsText1 {
		color: #1C1C1C;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 600;
	}

	.tabsLine1 {
		margin-left: 32rpx;
		margin-top: 10rpx;
		border-radius: 6rpx;
		width: 48rpx;
		height: 6rpx;
		background-color: #FF5927;
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
		margin-top: 15%;
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
		margin-top: 4%;
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
		float: left;
	}

	.bg-purple-light {
		font-size: 24rpx;
		color: #C8C8C8;
		// margin-top: 11%;
	}
	.loading{
		display: flex;
		justify-content: center;
		height: 100rpx;
		}
</style>
