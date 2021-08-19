<!-- 积分页面 -->

<template>
	<view class="">
		<view class="line" style="width:100%; height: 4rpx; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16); background: #FFFFFF;"></view>
		<view class="box">
			<!-- tabs部分 -->
			<view class="tabs" style="padding: 0 32rpx;margin-top: 40rpx;">
				<view class="tabsList" :active="active" v-for="(item,index) in tabslist" @click="tabsClick(index)">
					<view class="tabitem">
						<view class="tabsText" :class="{tabsText1:active==index}">{{item}} </view>
						<view :class="{tabsLine:active==index}"></view>
					</view>
				</view>
				
			</view>
			<view class="swiperBox" >
				<swiper @change="swiperClick" :current="current" :style="{height:$store.state.myHeight-268+'rpx'}">
					<swiper-item>
						<view class="swiperClass">
							<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-270+'rpx'}" @scrolltolower='scrollLoad1' v-if="ObtainList.length">
								<view class="bottom" v-for="(item,index) in ObtainList">
									<view class="left">
										<text class="left_1">{{item.ia_name}}</text><text
											class="left_2">{{item.create_time | dateFormat('yyyy-MM-dd hh:mm')}}</text>
									</view>
									<view class="right">
										<text>+{{item.integral}}积分</text>
									</view>
								</view>
                             <xw-loadingGif :isShow='isShow1'></xw-loadingGif>
							</scroll-view>
							<nvue-loading v-else></nvue-loading>
						</view>
					</swiper-item>
					<!-- 兑换记录 -->
					<swiper-item class="swiperClass">
						<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-270+'rpx'}"  @scrolltolower='scrollLoad2' v-if="couponList.length">
							<view class="bottom" v-for="(item,index) in couponList">
								<view class="left">
									<text class="left_1">{{item.goods_name}}</text><text
										class="left_2">{{item.create_time | dateFormat('yyyy-MM-dd hh:mm')}}</text>
								</view>
								<view class="right">
									<text style="color: #999999;">-{{item.integral}}积分</text>
								</view>
							</view>
							<xw-loadingGif :isShow='isShow2'></xw-loadingGif>
						</scroll-view>
                      <nvue-loading v-else></nvue-loading>
					</swiper-item>
				</swiper>
			</view>


		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				tabslist: ['获取记录', '兑换记录'],
				active: 0,
				isShow1:false,
				isShow2:false,
				current: 0,
				swiperCurrent: 0,
				couponList: [],
				ObtainList: [],
				params: [{
					page: 1,
					offset: 20,
					itg_type: 1,
					count:0,
				}, {
					page: 1,
					count:0,
					offset: 20,

				}],
			}
		},
		methods: {
			tabsClick(index) {
				this.current = index
			},
			swiperClick(e) {
				this.active = e.detail.current
			},
			// 1.获取记录
			getObtainData() {
				this.$api.get('/app/user/itg/list', {
					...this.params[0]
				}).then(res => {
					if (res.data.code == 200) {
						this.ObtainList = this.ObtainList.concat(res.data.data.list)
						this.params[0].count = res.data.data.count
						// 判断是否加载更多
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}

				})

			},

			// 2.兑换记录
			getExchangeData(data = {}) {
				this.$api.get('/app/shop/goods/exchange_list', {
					...this.params[1]
				}).then(res => {
					if (res.data.code == 200) {
						this.couponList = this.couponList.concat(res.data.data.list) ;
						this.params[1].count = res.data.data.count


					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}

				})

			},
			//加载更多
			scrollLoad1(){
				this.isShow1 = true
				setTimeout(()=>{
					if(this.params[0].count>this.ObtainList.length){
						this.params[0].page++
						this.getObtainData()
					}
					this.isShow1 = false
				},1800)
			},
			//加载更多
			scrollLoad2(){
				this.isShow2 = true
				setTimeout(()=>{
					if(this.params[1].count>this.couponList.length){
						this.params[1].page++
						this.getExchangeData()
					}
					this.isShow2 = false
				},1800)
			},
		},
		onLoad() {
			this.getExchangeData();
			this.getObtainData();
		}

	}
</script>

<style lang="scss" scoped>
	.integral {
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



	/* swiper部分css */

	.swiperClass {
		display: flex;
		flex-flow: column;
	}

	/* 尾部swiper盒子部分bottom */
	.bottom {
		padding: 0 32rpx;
		height: 162rpx;
		border-bottom: 2rpx solid #ECECEC;
	}

	.left {
		float: left;
		display: flex;
		flex-flow: column;
	}

	.left_1 {
		font-size: xw-h2-font;
		color: #000;
		font-weight: bold;
		font-family: PingFang SC;
		line-height: 90rpx;
	}

	.left_2 {
		font-size: 24rpx;
		color: #999999;
	}

	.right {
		float: right;
		line-height: 162rpx;
		color: #FF4810;
		font-size: $xw-h3-font;
		font-family: PingFang SC;
	}
  .tabsList{
	  background-color: #fff;
  }
	.tabitem {
		@include flex-column;
		margin-right: 64rpx;
 
		.tabsLine {
			border-radius: 6rpx;
			width: 50rpx;
			height: 6rpx;
			background-color: #FF5927;
		}
		/* 设置默认样式 */
		.tabsText {
			color: $xw-color;
			font-size: $xw-h4-font;
			font-weight: 400;
			margin-bottom: 12rpx;
		
		}
		
		/* 设置点击样式 */
		.tabsText1 {
			color: #1C1C1C;
			font-size: $xw-h3-font;
			font-weight: 700;
		}
		
	}
</style>
