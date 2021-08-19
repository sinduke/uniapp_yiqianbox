<template>
	<view class="container">
		<!-- 引导页 -->
		<view class="guidePage">
			<!-- 引导页视频 -->
			<view class="video" v-if="videoshow&&videoData.isshow">
				<video :src="videosrc" autoplay :muted="false" object-fit='fill' style="width: 100%;" class="video-play"
					:controls='false'></video>
			</view>
			<view class="content" v-if="guideFirstya==1">
				<swiper class="swiper" @change="changeSwiper" indicator-dots indicator-active-color="#ff8500">
					<swiper-item class="swiper-item" v-for="(item,index) in images" :key="index">
						<u-image :src="item" width="100%" height="100%"></u-image>
					</swiper-item>
				</swiper>
			</view>
 
			<view class="content" v-else>
				<image :src="pageData.image" style="width: 100%;height: 100%;" v-if="pageData"></image>
			</view>

			<view class="timer" @click="handleClick" v-if="timerShow && timer<=3">{{timer}}s <text style="margin-left: 15rpx;">{{$t('index.close')}}</text></view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	config
	// } from '../../static/video/video_cofig.js'

	export default {

		data() {
			return {
				time: "",
				// 引导页
				guideShow: true,
				images: [
					"../../static/images/index/guide1.png",
					"../../static/images/index/guide2.png",
					"../../static/images/index/guide3.png",
				],
				pageData: null,
				timer: 3,
				timerShow: false,
				videoshow: true,
				videosrc: '',
				videoData: false

			};
		},
		computed:{
			guideFirstya(){
				return uni.getStorageSync('guideFirstya')||1
			}
		},
		methods: {
			// 引导页
			getPageData() {
				this.$api.get("home/slideguid").then((res) => {
					if (res.data.data) {				
						this.pageData = res.data.data.hometopper;
						if (this.guideFirstya != 1) {
							this.countDown();
						}
						
						
					} else {
						this.homeShow = true;
						this.guideShow = false;
						uni.switchTab({
							url: "/pages/index/index",
						})
					}
				});
			},
			countDown() {
				let settime;
				if (this.videoData.isshow) {
					settime = setTimeout(() => {
						this.videoshow = false
						this.timerShow = true;
						this.time = setInterval(() => {
							this.timer--;
							this.homeShow = true;
							if (this.timer < 1) {
								clearInterval(this.time);
								this.handleClick();
							}
						}, 1000);
					}, 7000)

				} else {
					clearInterval(settime)
					this.videoshow = false
					this.timerShow = true;
					this.time = setInterval(() => {
						this.timer--;
						this.homeShow = true;
						if (this.timer==0) {
							clearInterval(this.time);
							this.handleClick();
						}
					}, 1000);


				}



			},
			/* 路由跳转 */
			// routerTo() {
			// 	clearInterval(this.time);
			// 	uni.navigateTo({
			// 		url: "/pages/views/gameDetail/index?game_id=" + this.pageData.target_id + "&guidePage=1",
			// 	});
			// },
			changeSwiper(e) {
				if (e.detail.current == 2) {
					uni.setStorageSync("guideFirstya", 2);
					this.countDown();
				}
			},
			//点击事件
			handleClick() {
				uni.preloadPage({
					url: "/pages/index/index",
					complete: () => {
						clearInterval(this.time);
						uni.switchTab({
							url: "/pages/index/index",
						})
					}
				})
			}
		},
		mounted() {
			this.getPageData()
		},
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		display: flex;
		position: relative;
		background-color: #fff;

		// 蒙层
		.mantle {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 100;
		}

		// 主体
		.main {
			flex: 1;
			width: 100%;
			height: 100%;

			.scroll {
				width: 100%;
				height: 100%;
				position: relative;

				.search {
					width: 150rpx;
					height: 70rpx;
					position: fixed;
					top: 100rpx;
					right: 30rpx;
					z-index: 20;
					background: rgba(28, 28, 28, .5);
					// box-shadow: 0px 0px 9px 0px #ffffff;
					border-radius: 40rpx;
					padding: 14rpx 0;
					display: flex;
					color: #fff;
					font-weight: 700;
					opacity: 0.9;
					// text-shadow: 0px 0px 2px rgba(135, 135, 135, 0.8);
					justify-content: center;
					border: 1px solid #989898;

					.text {
						margin-left: 4rpx;
					}
				}
			}
		}

		// 视频
		.video {
			background-color: #fff;
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 101;

			.video-play {
				position: absolute;
				top: 30%;
				left: 0;

			}
		}
		// 引导页
		.guidePage {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: 100;

			.content {
				width: 100%;
				height: 100%;
			}

			.swiper {
				width: 100%;
				height: 100%;
			}

			.timer {
				position: fixed;
				bottom: 0;
				right: 0;
				margin-right: 60rpx;
				margin-bottom: 20%;
				background: rgba(255, 255, 255, 0.6);
				border:1px solid rgba(255, 255, 255, 0.6);
				white-space: nowrap;
				padding: 15rpx 20rpx;
				border-radius: 50rpx;
				color: #1c1c1c;
				font-size: 28rpx;
				font-weight: 600;
				letter-spacing: 2px
			}
		}
	}
</style>
