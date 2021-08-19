<!-- 申请记录 -->
<template>
	<view class="applicatRecord">
		<view class="recharscroll" :style="{height:$store.state.myHeight-20+'rpx'}" v-if="list.length>0">
			<scroll-view scroll-y style="height: 100%;width: 100%;" lower-threshold="100" @scrolltolower="loadMore">
				<view class="list">
					<xw-saleorderlist @getData='getData' :list='list' :type='1' ></xw-saleorderlist>
				</view>
				<!-- <u-loadmore font-size="20" bg-color="#f5f5f5" :status="status" :icon-type="iconType" v-if="list.length>9" :load-text="loadText" @loadmore="loadMore" /> -->
			</scroll-view>
		</view>
		<nvue-loading v-else></nvue-loading>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				list: [],
				count: 0,
				status: 'loadmore',
				formData: {
					offset: 15,
					page: 1
				}
			}
		},
		methods: {
			getPageData() {
				this.$api.get('rebate/applyList',
				).then(res => {
					if (res.data.code == 200) {
						this.list = this.list.concat(res.data.data.list)
						this.count = res.data.data.count
						if (res.data.data.list.length < this.formData.offset) {
							this.status = "nomore";
						} else {
							this.status = "loadmore";
						}

					}
				})
			},
			loadMore() {
				if (this.count > this.list.length) {
					this.status = "loading";
					this.formData.page++;
					this.getPageData(this.formData);
				} else {
					this.status = "nomore";
				}

			},
			getData(type) {
				console.log(type)
				if (type) {
					this.list=[]
					this.formData.page=1
					this.getPageData()
				}
			}

		},
		// onReady() {
		// 	uni.setNavigationBarTitle({
		// 		title: this.$t('applicatRecord')
		// 	})
		// },
		onLoad() {
			this.getPageData()
		}
	}
</script>

<style lang="scss" scoped>
	.applicatRecord {
		border-top: 4rpx solid #f0f0f0;
		height: 100%;
		overflow: hidden;
		background-color: #fff;

		.list {
			padding: 5rpx 15rpx;

		}
	}
</style>
