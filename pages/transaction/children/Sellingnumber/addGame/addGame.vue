<!-- 添加游戏 -->
<template>
	<view class="container">
		<u-row>
			<u-col span="6" style="margin-top: 30rpx;" v-for="(item,index) in pageData" :key="index">
				<u-row>
					<u-col span="4" @click="handleRouter(item.game_id, item.gamename)">
						<u-image :lazy-load="false" :src="item.game_icon||item.game_new_icon" width="100%" height="100rpx"></u-image>
					</u-col>
					<u-col span="8" @click="handleRouter(item.game_id, item.gamename)">
						<view class="gamename">{{item.gamename}}</view>
						<view class="xiaohao">{{$t('my.xhs')}}：{{item.account_cnt}}</view>
					</u-col>
				</u-row>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				params: {
					page: 1,
					offset: 20,
					is_seft: 1
				},
				pageData: []

			}
		},
		methods: {
			getData(params) {
				this.$api.get( "user/account/game/list",
				{	...params
				}).then(res => {
					this.pageData = res.data.data.list;
				})
			},
			handleRouter(game_id, gamename) {
				// 把game_id和gamename存起来
				this.$store.commit('setSelectedGame',{
					game_id,
					gamename
				})
				
				uni.navigateBack();
			}
		},
		onLoad() {
			this.getData(this.params);
		}
	}
</script>

<style lang="scss" scoped>
	.container {

		line-height: 50rpx;

		.gamename {
			@include overflow;
			// font-weight: $xw-font-weight-bolder;
		}

		.xiaohao {
			font-size: $xw-font;
			color: $xw-black-dark;
		}
	}
</style>
