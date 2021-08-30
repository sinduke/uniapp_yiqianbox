<!-- 回收 -->
<template>
	<view class="buynumber">
		<view class="search">
			<view v-for="(item,index) in Data" :key='index' :class="{isacivte:active==index}"	@click="handleClick(index)">{{item}}</view>
		</view>
		<view class="list">
			<scroll-view scroll-y="true" :style="{height: $store.state.myHeight-176-200+'rpx',width: '100%'}"
				v-if="pageData.length">
				<view style="width: 100%;margin-top: 64rpx;" />
				<view class="item" v-for="(item,index) in pageData" :key='index'>
					<box-transaItem :item="item" status='1' :active='active'></box-transaItem>
				</view>
			</scroll-view>
			<xw-recycle400 v-else></xw-recycle400>

		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				myinput: '',
				active: 0,
				Data: ['小号回收', '小号赎回'],
				params: {
					page: 1,
					offset: 20,

				},
				pageData: [],
				count: 0,
				countsh: 0


			}
		},
		props: {
			actives: {
				type: Number
			},
			activs:{
				type: Number
			}
		},
		methods: {
			getData() {
				this.$api.get('app/recycle/mg_list', {
					...this.params
				}).then(res => {
					if (res.data.data.list) {

						this.pageData = res.data.data.list
					} else {
						this.pageData = []
					}
					this.count = res.data.data.count
				})
			},
			getshData() {
				this.$api.get('app/recycle/order_list', {
					classify: this.$store.state.app_id == 100 ? 3 : 4
				}).then(res => {
					this.pageData = res.data.data.list
					this.count = res.data.data.count
				})
			},
			handleClick(i) {
				this.active = i
				this.pageData = []
				if (this.active) {
					this.getshData()
				} else {
					this.getData()
				}
			}
		},
		watch: {
			actives(val) {
				if (val == 2) {
					console.log(val,'val')
					this.getData()
				}
			},
			activs(val) {
			  this.active = 0
			}
		},
	}
</script>

<style lang="scss" scoped>
	.buynumber {
		.search {
			width: 100%;
			margin-top: 32rpx;
			padding: 4rpx 32rpx;
			@include flex;
			justify-content: flex-start;

			view {
				margin-right: 32rpx;
				background-color: #F4F4F4;
				border-radius: 24rpx;
				padding: 12rpx 32rpx;
				color: #666666;
				border: 1px solid #F4F4F4;
			}

		}

		.item {
			padding: 0 32rpx;
			margin-bottom: 48rpx;
		}

		.isacivte {
			background-color: #fff !important;
			border: 1px solid #FF5927 !important;
			color: $xw-color-z !important;
		}
	}
</style>
