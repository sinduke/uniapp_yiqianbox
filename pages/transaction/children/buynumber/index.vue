<!-- 买号 -->
<template>
	<view class="buynumber">
		<view class="search">
			<view class="inputs">
				<u-search class="input" placeholder-style='font-size:16px;color:#c1c1c1' type="text"
					v-model="params.game_name" :show-action='false' maxlength='80' placeholder='去找你的想要的游戏'
					@clear='search' @blur="search"></u-search>
			</view>
		</view>
		<view class="list">
			<scroll-view scroll-y="true" :style="{height: $store.state.myHeight-176-200+'rpx',width: '100%'}"
				v-if="pageData.length>0">
				<view style="width: 100%;margin-top: 64rpx;" />
				<view class="item" v-for="(item,index) in pageData" :key='index'>
					<box-transaItem :item="item"></box-transaItem>
				</view>
			</scroll-view>
			<nvue-loading v-else></nvue-loading>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				myinput: '',
				params: {
					page: 1,
					offset: 20,
					status: 2,
					sort_type: 1,
					game_name: ''
				},
				pageData: [],
				count: 0,
				ishow: false

			}
		},
		methods: {
			getData() {
				this.pageData = []
				this.count = 0
				if (this.params.game_name == '') {
					delete this.params.game_name
				}
				this.$api.get("account/goods/list", {
					...this.params
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData = res.data.data.list
						this.count = res.data.data.count

					}
				})
			},
			search() {
				this.getData()
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

			.inputs {
				@include flex;
				justify-content: flex-start;
				background-color: #F4F4F4;
				border-radius: 40rpx;
				padding: 6rpx 32rpx;
			}

			.input {
				font-size: 28rpx;
				margin-left: 20rpx;


			}
		}

		.item {
			padding: 0 32rpx;
			margin-bottom: 48rpx;
		}
	}
</style>
