<template>
	<view>
		<view class="" style="box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);background: #FFFFFF;width: 100%;height: 4rpx;">
			
		</view>
		<view class="" style="padding: 48rpx 36rpx;">
			<view class="" style="color: #1C1C1C;font-weight: 600;font-size: 44rpx;margin-bottom: 48rpx;">
				{{pagaData.title}}
			</view>
			<text v-html="pagaData.content" style="font-size: 30rpx;font-weight: 400;line-height: 32px;color: #1C1C1C;"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pagaData:[{
					title:'',
					content:'',
				}]
			}
		},
		methods: {
			/* 消息列表 */
		},
		onLoad(option) {
			this.pagaData.title = option.title,
			this.pagaData.content = option.content
		}
	}
</script>

<style>

</style>





