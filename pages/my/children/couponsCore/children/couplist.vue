<template>
	<view class="">
		<view class="mygameList">
			<!-- <view class="listitem" v-for="(item,index) in myGame" :key='index' @click="handleTitle(index)">
				<text class="mygametext" :class="{mygametext1:active==index}">{{item}}</text>
				<view class="lines" :class="{line:active==index}" />
			</view> -->
			<scroll-view class="listitem" style="width: 100%;" scroll-x="true" scroll-with-animation
				:scroll-left="tabsScrollLeft" @scroll="scroll">
				<view class="tab" id="tab_list">
					<view  class="mygametext" id="tab_item" :class="{ 'active': listActive == index,'tab__item':true}"
						v-for="(item, index) in myGame"  :key="index" @click="clickSort(index)">
						{{item}}
					</view>
				</view>
				<!-- tabs下划线 -->
				<view class="tab__line"	:style="{ width: lineStyle.width, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}">
				</view>
			</scroll-view>

		</view>
		<swiper @change='swiperChange' :current="listActive" v-if="pageData" style="width:100%;height: 800rpx;">
			<swiper-item v-for="(data,i) in pageData" :key='i'>

				<view class="swiper-item">
					<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-600+'rpx'}" >
						<view>
							<view style="width: 100%;height: 30rpx;"></view>
							<view class="cards" v-for="(item,index) in data.list" :key='index' >
								<view class="cardsLeft" @click="toDetail(item.game_id)">
									<view class="text">￥<text class="money">{{item.coupons_amount}}</text>
									</view>
									<text class="text">{{item.title}}</text>
								</view>
								<view class="cardsRight">
									<view style="display: flex;align-items: center;justify-content: space-between;">
										<view style="display: flex;flex-direction: column; width: 320rpx;">
											<text class="text"
												style="font-size: 30rpx;">有效期至：{{item.get_time_end|dateFormat('yyyy.MM.dd')}}</text>
											<text class="text1"
												style="font-size: 24rpx;">领取时间：{{item.get_time_begin|dateFormat('yyyy.MM.dd')}}后</text>
										</view>
										<view class="buttons" v-if="!item.have_got"
											@click="handleClick(item.id,item.period_type,item)">领 取</view>
										<view class="buttons text" v-if="item.have_got"style="background-color: #C1C1C1;color: #fff;padding: 8rpx 18rpx;">已领取</view>
							
									</view>
									<view class="text1" style="font-size: 20rpx;white-space: nowrap;">
										------------------------------------------------------------</view>
									<view class="text1" style="font-size: 24rpx;">适用于《{{item.game.name}}》</view>
								</view>
							</view>
							
						</view>
							<view style="width: 100%;height: 120rpx;"></view>
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
				listActive: 0, // 当前选中项
				tabsScrollLeft: 0, // tabs当前偏移量
				scrollLeft: 0,
				lineStyle: {}, // 下划线位置--动态甲酸
				duration: 0.5, // 下划线动画时长
				active: 0,
				myGame: [],
				pageData: null,
				pramas:{
					offset:10,
					game_num:6,
				}
			}
		},
		watch:{
			listActive(newVal) { // 监听当前选中项
				this.setTabList()
			}
		},
		mounted() {
			this.setTabList()
		},
		methods: {
			//去详情页
			toDetail(id){
				uni.navigateTo({
					url: `/pages/view/gamedetail/gamedetail?gameid=${id}`
				})
			},
			clickSort(index) {
				this.listActive = index
			},
			swiperChange(e) {
				this.listActive = e.detail.current
			},
			// scroll-view滑动事件
			scroll(e) {
				this.scrollLeft = e.detail.scrollLeft;
			},
			setTabList() {
				this.$nextTick(() => {
					this.setLine()
					this.scrollIntoView()
				})
			},
			// 计算tabs位置
			scrollIntoView() { // item滚动
				let lineLeft = 0;
				this.getElementData('#tab_list', (data) => {
					let list = data[0]
					this.getElementData(`#tab_item`, (data) => {
						let el = data[this.listActive]
						lineLeft = el.width / 2 + (-list.left) + el.left - list.width / 2 - this.scrollLeft
						this.tabsScrollLeft = this.scrollLeft + lineLeft 
					})
				})
			},
			//  计算下划线位置
			setLine() {
				let lineWidth = 0,
					lineLeft = 0
				this.getElementData(`#tab_item`, (data) => {
					let el = data[this.listActive]
					lineWidth = el.width / 3 
					// lineLeft = el.width * (this.currentIndex + 0.5)  // 此种只能针对每个item长度一致的
					lineLeft = (el.width / 2 + (-data[0].left) + el.left)-29
					this.lineStyle = {
						width: `${lineWidth}px`,
						transform: `translateX(${lineLeft}px) translateX(-50%)`,
						transitionDuration: `${this.duration}s`
					};
				})
			},
			getElementData(el, callback) {
				uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
					callback(data[0]);
				});
			},
			//优惠券
			getPageData() {
				this.$api.get('/user/coupons/rand_games',{
					...this.pramas
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData = res.data.data.data
						this.myGame = res.data.data.game
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						})
						return
					}

				})
			},
			//点击领取
			handleClick(id, period_type,item) {
				this.$api.get("user/coupons/add", {
					coupon_id: id,
					period_type
				}).then(res => {
					if (res.data.code == 200) {
						item.have_got = true
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
				})
			},
			
		},
		mounted() {
			this.getPageData()
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/css/nvue-whith.css';

	.mygameList {
		width: 100%;
		@include flex;
		justify-content: space-around;
		border-bottom: 1rpx solid #efefef;

		.listitem {
			// @include flex-column;
			white-space: nowrap;
			width: 100%;

		}

		.mygametext {
			margin-bottom: 18rpx;
			color: #999999;
			font-size: $xw-font;
			transition-delay:0.3s;
		}

		.mygametext1 {
			color: #1C1C1C;
			font-weight: 700;
			font-size: $xw-font;
			
		}


	}

	.cards {
		width: 100%;
		// padding: 0 32rpx;
		margin-bottom: 40rpx;
		border-radius: 40rpx;
		@include flex;
		justify-content: flex-start;

		.cardsLeft {
			width: 28%;
			background-color: #E9E9E9;
			padding: 32rpx 24rpx;
			border-radius: 40rpx 0 0 40rpx;

			.money {
				font-size: $xw-h1-font;
				font-weight: 700;
				color: $xw-black-dark;
				margin-bottom: 24rpx;

			}
		}

		.cardsRight {
			width: 72%;
			padding: 11rpx 12rpx;
			background-color: #F8F8F8;
			border-radius: 0 40rpx 40rpx 0;

			.buttons {
				@include button(30rpx, 8rpx, 24rpx);
				font-size: $xw-font;

			}
		}

	}

	.text {
		font-size: $xw-font;
		white-space: nowrap;
	}

	.text1 {
		color: #999;
	}
	
	//tabs
	.sticky-box {
		display: flex;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;
		margin: 0px;
		border-top: 1px #f9f9f9 solid;
		border-bottom: 1px #f9f9f9 solid;
		background: #fff;
	}
	
	.tab {
		
		position: relative;
		display: flex;
		font-size: 28rpx;
		padding-bottom: 10rpx;
		white-space: nowrap;
		color: #999999;
	
		&__item {
			flex: 1;
			padding: 0 20rpx;
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
			color: #666;
	
			&.active {
				color: #252525;
				font-size: 30rpx;
				font-weight: 700;
			}
		}
	}
	
	.tab__line {
		width: 60rpx;
		display: block;
		height: 6rpx;
		position: absolute;
		bottom: 0;
		left: 50rpx;
		z-index: 1;
		border-radius: 6rpx;
		position: relative;
		background: #FF573C;
	}
	
</style>
