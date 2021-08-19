<template>
	<view class="">
		<view class="line" style="box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);background: #FFFFFF;height: 8rpx;">

		</view>
		<view class="box" style="padding:0rpx 32rpx 0rpx 32rpx;">
			<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-180+'rpx'}" v-if="pageData2.length">
				<view @click="toDeatil(item.news_id,item.read)" v-for="(item,index) in pageData2" class="item"
					style="display: flex;flex-flow: column;height: 410rpx;width: 688rpx;border-radius: 20rpx;margin-top: 48rpx;box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);position: relative;margin-left: 1rpx;">
					<view class="head">
						<view class="" style="width: 100%;height: 292rpx;overflow: hidden;">
							<image :src="item.image" class="image" mode="widthFix"></image>
						</view>
						<text style="font-size: 28rpx;font-weight: 600;position: absolute;left: 24rpx;bottom: 132rpx;color: #FFFFFF;">{{item.title}}</text>
					</view>
					<view class="bottom"
						style="border-radius: 0 0 20rpx 20rpx;display: flex;flex-flow: row;padding:16rpx 24rpx ;">
						<view class="" style="display: flex;flex-flow: column;width: 550rpx;">
							<text style="color: #1C1C1C;font-size: 24rpx;font-weight: 500;">{{item.title}}</text>
							<text
								style="color: #666666;font-size: 22rpx;font-weight: 400;margin-top: 15rpx;margin-left: 13rpx;">{{item.pub_time}}</text>
						</view>
						<view class="" style="margin-top: 20rpx;display: flex;justify-items: center;">
							<text class="iconfont"
								style="color:#FF5927;margin-right: 16rpx;font-size: 36rpx;">&#xe630;</text>
							<text class=""
								style="color: #666666;font-size: 24rpx;font-weight: 400;">{{item.read}}</text>
						</view>

					</view>
				</view>
			</scroll-view>
			<nvue-loading v-else style="margin-top: 200rpx;"></nvue-loading>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				pageData2: [],
				params: {
					page: 1,
					offset: 15,
					type: 3
				},
			}
		},
		methods: {
			getglData(data = {}) {
				this.$api.get('game/detail', {
					...data
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData2 = res.data.data.post.news.list	
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			},
			toDeatil(id, post_hits) {
				uni.navigateTo({
					url: `/pages/my/comprehensive/gameConsulting/gameDetail/gameDetail?news_id=${id}&post_hits=${post_hits}`
				})
			}
		},
		onLoad(option) {
			this.params.game_id = option.game_id
			this.getglData(this.params)
		}
	}
</script>

<style scoped lang="scss">
	.image {
		width: 100%;
		height: 292rpx;
		border-radius: 20rpx 20rpx 0 0;
	}
</style>
