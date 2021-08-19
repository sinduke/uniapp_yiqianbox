<template>
	<view v-if="pageData.activity.count>0" style="padding: 0 32rpx;">
		<view class="new-list">
			<u-collapse event-type="close">
				<u-collapse-item :index="index" :title="item.title" v-for="(item,index) in pageData.activity.list"
					key="index">
					<view class="collapse-item">
						<text>{{item.pub_time}}</text>
						<u-parse :html="item.content"></u-parse>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
	</view>
	<nvue-loading v-else></nvue-loading>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			pageData: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
</style>
