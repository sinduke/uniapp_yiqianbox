<template>
	<view class="demoGame-list">
		<view class="Card">
			<view  style="position: relative;width: 100%;height: 380rpx;overflow: hidden;border-radius: 20rpx;margin-bottom: 24rpx;" >
			<image :src="item.game.ext_info.hot_image" style="width: 100%;height: 100%;border-radius: 20rpx" @click="handleRouter(item.app_id)"></image>
			<view  class="blurs">
				<view class="blur" :style="{background:'url('+item.game.ext_info.hot_image+') bottom'}"></view>
				<view class="text" style="color: #fff; left: 16rpx;position: absolute;bottom: 18rpx;">{{item.content}}</view>
			</view>
			</view>
			<view class="cardItem" >
				<view class="itemLeft" @click="handleRouter(item.app_id)">
					<image  :src="item.game.icon" mode="widthFix" style="width: 88rpx;height: 88rpx;margin-right: 16rpx;"></image>
					<view class="gameDetail">
						<text class="gamename">{{item.game.name}}</text>
						<view style="display: flex;align-items: center;">
							<text class="text">截止时间：{{item.end_time|dateFormat('yyyy-MM-dd')}}</text> <text class="text" style="margin-left: 16rpx;">|</text> <text class="text" style="margin-left: 16rpx;">{{item.popularity_cnt}}在玩</text>
						</view>
					</view>
				</view>
				<view v-if="item.is_complete==1" class="itemRight" >
					<text class="button" v-if="item.is_recevie==1" style="color:#666">已领取</text>
					<text v-else @click="handleClick(item)" style="color:#19BFFF">未领取</text>
				</view>
				<view v-if="item.is_complete==2" class="itemRight" @click="handleRouter(item.app_id)">
					<text class="button"   style="color: #FF5927;">试 玩</text>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'demoGame-list',
		data() {
			return {

			}
		},
		props: {
			item: {
				type: Object,
				default: () => {}
			}
		},
		methods:{
			    handleClick(item) {
			      this.$api.get("/task/receive",{task_id: item.id}).then(res => {
			        if (res.data.code == 200) {
						console.log(res)
			          uni.showToast({
			            icon: 'none',
			            title: '领取成功' + ',' + (item.reward_type == 1 ? '积分' : item.reward_type == 2 ?
			              '平台币' : '现金红包') + '＋' + item.reward_amount,
			            success: () => {
							console.log(1111111111,res)
			              setTimeout(() => {
	
							this.$common.getUserInfo()
			                this.$emit('getData',true)
			              }, 100)
			            }
			          })
			
			        } else {
			          uni.showToast({
			            icon: 'none',
			            title: res.data.msg
			          })
			        }
			
			      })
			    },
			
			
			
			handleRouter(id){
				console.log(id,'ididid')
				uni.navigateTo({
					url: `/pages/view/gamedetail/gamedetail?gameid=${id}`
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.demoGame-list {
		.blurs{
			position: absolute;
			width: 100%;
			height: 66rpx;
			bottom: 0;
			border-bottom-left-radius: 20rpx;
			border-bottom-right-radius: 20rpx;
			overflow: hidden;
		}
		.blur{
			width: 100%;
			height: 100%;
			filter: blur(5px);
			transform: scale(1.6);
			// background-color: #F1F1F1;
		}
		.cardItem {
			@include flex;
		}

		.itemLeft {
			@include flex;
		}
		.gameDetail {
			@include flex-column;
			align-items: flex-start;

			.gamename {
				color: $xw-black-dark;
				font-size: $xw-h2-font;
				font-weight: 700;
			}

			.text {
				color: $xw-color;
				font-size: $xw-font;
			}
		}
		.button{
			@include button(32rpx,6rpx,30rpx);
			font-size:$xw-font;
			font-weight: 600;

		}
	}
</style>
