<template>
	<view class="xw-loadingGif">
		<view class="loadinggif" v-if="mydisplay" style="height: 120rpx;width: 100%;text-align: center;">
			<image src="@/static/images/loadmore.gif" mode="widthFix" style="width: 120rpx;height: 120rpx;padding-bottom: 20rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'xw-loadingGif',
		data() {
			return {
				mydisplay: false
			}
		},
		props: {
			isShow: {
				default: false
			}
		},
		watch: {
			isShow(val) {
				this.mydisplay = val
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
