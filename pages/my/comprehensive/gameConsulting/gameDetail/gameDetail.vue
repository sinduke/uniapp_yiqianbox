<!-- 游戏资讯详情 -->
<template>
	<view class="container" v-if="detailList">
		<!-- 自定义导航栏 -->
		<u-navbar title="" :is-back='false' :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title" style="padding: 0 20rpx;">
					<view class="iconfont" style="transform: rotate(180deg);font-size: 60rpx;" @click="toRouter">
						&#xe633;
					</view>
					<view class="slot-wrap" style="margin-left: -350rpx;">
						<text class="customer"></text>
					</view>
					<view class="slot-right">
						<view class="radius" @click="popClick">
							<view class="iconfont" style="font-weight: 600;font-size: 34rpx;">&#xe670;</view>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
		<!-- 内容部分 -->
		<view class="box" style="margin-top: 24rpx;">
			<view class="box_head" style="padding-bottom:36rpx; border-bottom: 1rpx solid #ECECEC;" @click="handleRouterdetail(detailList.game_id)">
				<view class="head_left" style="width: 120rpx;height: 120rpx;border-radius: 28rpx;margin-right: 28rpx;">
					<image :src="detailList.icon" mode="" style="width: 120rpx;height: 120rpx"></image>
				</view>
				<view class="head_mid" >
					<text class="head_mid1" style="font-size: 32rpx;font-weight: 700;color: #252525;margin-top: 13rpx;">{{detailList.title}}</text>
					<view style="font-size: 24rpx;color: #666666;margin-top: 24rpx;">
						<text>{{detailList.start_time | dateFormat('yyyy-MM-dd hh:mm')}}</text><text style="margin: 0 20rpx;">|</text><text>{{post_hits}} 浏览</text>
					</view>
				</view>
				<!-- <view  class="head_right" style="width: 120rpx;height: 55rpx;border-radius: 24rpx;border:1rpx solid #E1E1E1;color: #19BFFF;font-size: 26rpx;text-align: center;line-height: 46rpx;margin-top: 36rpx;">
					优惠券
				</view> -->
			</view>
			<view class="box_middle">
				<view
					style="font-size: 41rpx;font-family: PingFang SC;font-weight:600;;color: #252525;line-height: 60rpx;margin: 36rpx 0;">
					{{detailList.excerpt}}
				</view>
				<view class="" style="width: 100%; height: 370rpx;border-radius: 20rpx;margin-bottom: 36rpx;">
					<image :src="detailList.img" mode=""
						style="width: 100%; height: 370rpx;border-radius: 20rpx;margin-bottom: 36rpx;"></image>
				</view>
				<view v-html="content" style="color: #252525;font-size: 32rpx;"></view>
			</view>
		</view>
		<!-- 分享 -->
		<xw-share v-if="show" @close='show=false' :shareData='shareData' type='game' ></xw-share>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				detailList: null,
				content: '',
				shareData:null,
				post_hits:0
			}
		},
		methods: {
			//返回上一级路由
			toRouter() {
				uni.navigateBack({
				    delta: 1
				});
			},
			//跳转资讯详情页
			handleRouterdetail(id) {
				uni.navigateTo({
					url: `/pages/view/gamedetail/gamedetail?gameid=${id}`
				})
			},
			getPageData(params) {
				this.$api.get('/news/detail', {
					...params
				}).then(res => {
					if (res.statusCode == 200) {
						this.detailList = res.data.data.data;
						this.content = this.detailList.content;
					}
				})
			},
			getData() {
				this.$api.get("share/detail", {
					share_type: 'game',
					game_id: this.detailList.game_id,
					client_id: this.$store.state.client_id
			
				}).then(res => {
					if (res.data.code == 200) {
						this.shareData = {
							...res.data.data
						}
			
					}
				})
			},
			//显示弹出层
			popClick() {
				this.getData()
				this.show = true
			},
		},
		onLoad(option) {
			this.getPageData({
				news_id: option.news_id
			})
			this.post_hits = option.post_hits
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: $xw-paddings;
	}

	/* 自定义导航栏 */
	.u-navbar {
		// box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
		position: sticky;
		top: 0rpx;
		position: -webkit-sticky;
		background-color: #fff;
		z-index: 99;
		overflow: hidden;
	}

	.title {
		flex: 1;
		// padding: 0 $xw-padding;
		@include flex;
	}

	.customer {
		color: $xw-black-dark;
		font-size: $xw-h1-font;
		font-weight: 800;
	}

	.radius {
		width: 64rpx;
		height: 64rpx;
		// border-radius: 50%;
		// box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
		@include flex;
		justify-content: center;
	}

	//内容部分
	.box_head {
		display: flex;
		flex-flow: row;
	}
   .head_mid{
	   @include flex-column;
	   align-items: flex-start;
   }
	.head_mid1 {
		max-width: 400rpx;
		@include overflow;
	}
</style>
