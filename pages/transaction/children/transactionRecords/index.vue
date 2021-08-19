<!-- 交易记录 -->
<template>
	<view class="transactionRecords">
		<view class="mygameList">
			<view class="listitem" v-for="(item,index) in myGame" :key='index' @click="handleClick(index)">
				<text class="mygametext" :class="{mygametext1:active==index}">{{item}}</text>
				<view class="lines" :class="{line:active==index}" />
			</view>
		</view>
		<swiper @change='swiperChange' :current="active" :style="{height:$store.state.myHeight-200+'rpx'}">
			<!-- 已购买 -->
			<swiper-item>
				<view>
					<scroll-view scroll-y="true" v-if="pageData.length" @scrolltolower="loadMore"
						:style="{height:$store.state.myHeight-200+'rpx'}">
						<view style="height: 60rpx;width: 100%;">
						</view>
						<view v-for="(item,index) in pageData" :key='index' style="margin-bottom: 60rpx;">
							<box-transaItem :item='item' :status="2"></box-transaItem>
						</view>
					</scroll-view>
					<nvue-loading v-else></nvue-loading>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="">
					<scroll-view scroll-y="true" v-if="pageData.length" @scrolltolower="loadMore"	:style="{height:$store.state.myHeight-200+'rpx'}">
						<view style="height: 60rpx;width: 100%;">
						</view>
						<view v-for="(item,index) in pageData" :key='index' style="margin-bottom: 60rpx;">
							<box-transaItem :item='item' :status="3"></box-transaItem>
						</view>
					</scroll-view>
					<nvue-loading v-else></nvue-loading>

				</view>
			</swiper-item>
		</swiper>
	</view>

</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				active: 0,
				myGame: [
					'已购买', '出售'
				],
				params: {
					page: 1,
					offset: 20,
					status: 0
				},
				count: 0,
				pageData: []

			}
		},
		methods: {
			handleClick(i) {
				this.active = i
			},
			swiperChange(e) {
				this.active = e.detail.current
				this.reset()
		
				switch (this.active) {
					case 0:
						this.getpurchaseData()
						break;
					case 1:
						this.getSellData()
						break;
					default:
						break;
				}






			},
			//购买
			getpurchaseData() {
				this.$api.get("account/order/list", {
					...this.params
				}).then(res => {
					this.pageData = this.pageData.concat(res.data.data.list);
					this.count = res.data.data.count
				})
			},
			//出售
			getSellData() {
				this.$api.get("account/goods/list", {
					...this.params,
					is_me_sell: 2,
				}).then(res => {
					this.pageData = res.data.data.list;
					this.count = res.data.data.count
				
				})
			},

			// 加载更多
			loadMore() {
				this.params.page++;
				switch (this.active) {
					case 0:
						this.getpurchaseData()
						break;
					case 1:
						this.getSellData()
						break;
					default:
						break;
				}



			},
			reset() {
				this.params.page = 1
				this.pageData = []
				this.count = 0
			}


		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		onLoad() {
			this.getpurchaseData()
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/nvue-whith.css';

	.transactionRecords {
		height: 100vh;
		overflow: hidden;
		@include padding;

		.mygameList {
			width: 100%;
			@include flex;
			justify-content: flex-start;

			.listitem {
				@include flex-column;
				margin-right: 80rpx;
			}

			.mygametext {
				margin-bottom: 18rpx;
				color: #999999;
				font-size: 30rpx;
			}

			.mygametext1 {
				color: #1C1C1C;
				font-weight: 700;
				font-size: 34rpx;
			}


		}


		.buttons {
			margin-top: 100rpx;
			@include flex;
			justify-content: center;

			.mybutton {
				@include button(60rpx, 20rpx, 120rpx);
				font-size: 34rpx;

			}
		}
	}
</style>
