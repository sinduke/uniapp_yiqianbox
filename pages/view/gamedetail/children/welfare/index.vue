<!-- 福利 -->
<template>
	<view class="welfare" v-if="pageData">
		<view style="overflow: hidden;width: 100%;height: 462rpx;">
			<view class="backImages" :style="{background:'url('+pageData.app_hot_image+') center no-repeat'}"></view>
		</view>
		<view class="myback" @click="back">
			<image src="@/static/images/back.png" style="width: 40rpx;height: 40rpx;"></image>
		</view>
		<view class="myDetail">
			<image :src="pageData.icon" mode="widthFix" style="width: 176rpx;height: 176rpx;margin-right: 24rpx;">
			</image>
			<view class="detailRight">
				<text class="gamename">{{pageData.gamename}}</text>
				<view class="">
					<text class="text" v-if="pageData.gc_id">{{pageData.gc_id}}出品</text><text class="text"
						v-if="pageData.gc_id">|</text><text class="text">{{pageData.popularity_cnt}}人在玩</text>
				</view>
			</view>
		</view>
		<view class="cardRidus"></view>
		<!-- 详细信息 -->
		<view class="mycard" :style="{height:$store.state.myHeight-462+'rpx'}">
			<!-- <view class="TitleList"> -->
			<xw-tab ref="navTab" :tabTitle="TitleList" @changeTab='changeTab' style="margin-bottom: 40rpx;"></xw-tab>
			<!-- </view> -->

			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-562+'rpx'}" style="display: flex;justify-content: center;">
						<giftsitem :pageData="pageData.gift" @isGifts='isGifts'></giftsitem>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-562+'rpx'}" style="display: flex;justify-content: center;">
						<welfareitem :pageData="pageData.post"></welfareitem>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-562+'rpx'}" style="display: flex;justify-content: center;">
						<rebateitem :pageData="pageData.post"></rebateitem>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-562+'rpx'}" style="display: flex;justify-content: center;">
						<vipitem :pageData="pageData.post"></vipitem>
					</scroll-view>
				</swiper-item>
			</swiper>
			<!-- <tabBar4 :currentPage="currentPage"></tabBar4> -->
		</view>


	</view>
	</view>
</template>

<script>
	import giftsitem from "./giftsitem.vue"
	import welfareitem from "./welfareitem.vue"
	import rebateitem from "./rebateitem.vue"
	import  vipitem from "./vipitem.vue"
	export default {
		data() {
			return {
				game_id: 0,
				pageData: null,
				isActive: false,
				active: 0,
				number: 0,
				scrollMove: 0,
				isGift: true,
				TitleList: ['礼包', '游戏福利', '返利', 'VIP表'],
				currentTab: 0,

			}
		},
		components: {
			giftsitem,
			welfareitem,
			rebateitem,
			vipitem
		},
		methods: {
			//后退
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取游戏数据
			getPageData() {
				this.$api.get('game/detail', {
					game_id: this.game_id
				}).then(res => {
					this.pageData = res.data.data
	

				})
			},
			isGifts(e){
				if(e){
					this.getPageData()
				}
			},


			// 切换
			touchstart(e) {
				this.isActive = true
			},
			isactive(e) {
				this.isActive = false
			},
			handleActive(e) {
				this.active = e
			},
			animationfinish(e) {
				this.number = e.detail.current
			},
			changeTab(index) {
				this.currentTab = index;
			},
			swiperTab(e) {
				var index = e.detail.current //获取索引
				this.$refs.navTab.longClick(index);
			},
			//滑动监听
			transition(e) {
				this.scrollMove = Math.round(e.detail.dx)
			},
			swiperChange(e) {
				this.active = e.detail.current
			},

		},
		onLoad(option) {
			console.log(option.game_id)
			this.game_id = option.game_id
			this.getPageData()
		}
	}
</script>

<style lang="scss" scoped>
	.welfare {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		// background:url(../../../../../static/images/Refreshmore.gif) no-repeat;

		.backImages {
			height: 462rpx;
			width: 100%;
			background-size: 20;
			filter: blur(20rpx);
		}

		.myback {
			width: 66rpx;
			height: 66rpx;
			@include flex;
			justify-content: center;
			position: absolute;
			top: 88rpx;
			left: 32rpx;
			border-radius: 40rpx;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.myDetail {
			@include flex;
			justify-content: flex-start;
			position: absolute;
			top: 204rpx;
			left: 32rpx;


		}

		// .giftDetail {
		// 	@include border_box;
		// 	padding-bottom: 40rpx;
		// 	margin-bottom: 40rpx;

		// }

		.text {
			font-size: $xw-font;
			margin-right: 16rpx;
			color: #fff;
		}


		.gamename {
			font-size: $xw-h1-font;
			color: #fff;
			margin-bottom: 14rpx;
		}

		.cardRidus {
			width: 100%;
			height: 40rpx;
			border-radius: 20px 20px 0 0;
			position: absolute;
			top: 426rpx;
			background-color: #fff;

		}

		.mycard {
			width: 100%;
			@include padding;
			background-color: #fff;

		}

	}
</style>
