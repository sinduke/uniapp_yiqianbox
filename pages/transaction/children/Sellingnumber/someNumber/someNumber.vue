<template>
	<view class="someNumber">
		<view class="myshadowLine">

		</view>
		<view class="mycards" v-if="pageData">
			<view class="gamedetail">
				<image :src="pageData[0].game.new_icon" mode="widthFix"
					style="width: 140rpx;height: 140rpx;margin-right: 32rpx;"></image>
				<text class="game_name">{{pageData[0].game.name}}</text>
			</view>
			<view style="display: flex;flex-wrap: wrap;">
				<view @click="handleRouter(item.role_name,item.server_name,item.id,item.mg_id)"  v-for="(item,index) in pageData" :key='index' style="border-radius:30rpx;background-color: #F9F9F9;padding: 10rpx 120rpx 10rpx 24rpx;margin: 20rpx;">
					<view style="font-weight: 700;color:#1C1C1C;margin-bottom: 8rpx;font-size: 32rpx;">{{item.role_name}}</view>
					<view class="text">实际充值：{{item.money}}.00</view>
					<view class="text">区服：{{item.server_name}}</view>
				</view>

			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				game_id: 0,
				pageData: null
			}
		},
		methods: {
			getData(game_id) {
				this.$api.get("/rebate/getTrumpet", {
					game_id
				}).then(res => {
					this.pageData = res.data.data;
				})
			},
			handleRouter(role_name, server_name,id,mg_id) {
				// 把game_id和gamename存起来
				this.$store.commit('setSelectedGame',{
					...this.$store.state.selectedGame,
					role_name,
					server_name,
					id,
					mg_id
				})
				
				uni.navigateBack();
			}
		},
		onLoad(option) {
			this.game_id = option.game_id
			this.getData(this.game_id)
		}
	}
</script>

<style scoped lang="scss">
	.someNumber {
		.gamedetail {
			@include flex;
			justify-content: flex-start;
			margin-bottom: 32rpx;
		}
	}

	.mycards {
		@include padding;
		.game_name{
	       font-size: $xw-h2-font;
		   font-weight: 700;
		   color: $xw-black-dark;
		}
	}

	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 60rpx;


	}
	.text{
		font-size: $xw-h4-font;
		color: #999;
		font-size: 700;
		margin-bottom: 8rpx;
	}
</style>
