<template>
	<view class="giftItem"  v-if="pageData.length>0">
		<view class="giftDetail"  v-for="(item,index) in pageData" :key='index'>
			<u-row>
				<u-col span="2">
					<image :src="item.icon" mode="widthFix" style="width: 120rpx;height: 120rpx;">
					</image>
				</u-col>
				<u-col span="7" class="desc">
					<h4 class="name">{{item.gift_name}} (<text style="color:#FF5927;">{{item.remain_cnt}}</text>/<text style="color:#FF5927;">{{item.total_cnt}}</text>)</h4>
					<view style="padding: 0 32rpx;">
						<progress :percent="Math.floor(item.remain_cnt/item.total_cnt*100)" activeColor="#FF5927" border-radius='10' active stroke-width="4" style="border-radius: 6rpx;" />
					</view>
				</u-col>
				<u-col span="3" class="tags">
					<text class="giftButton" @click="getGift(item.gift_id,item.is_get_gift)">{{item.is_get_gift ? '已领取' : '领 取'}}</text>
				</u-col>
			</u-row>
			<view class="info text">{{item.content}}</view>
		</view>
	</view>
	
	<nvue-loading v-else></nvue-loading>
</template>

<script>
	export default {
		data() {
			return {
				isGift:true,
			}
		},
		props: {
			pageData: {
				type: Array,
				default: ()=>{
					return []
				}
			},
		},
		methods: {
			// 领取礼包  
			getGift(gift_id, code) {
				if (this.isGift) {
					this.isGift = false
					setTimeout(() => {
					this.isGift = true
					}, 1000)

					if (code) {
						uni.navigateTo({
							url:'/pages/my/comprehensive/gameGiftBag/gameGiftBag'
						})

					} else {
						this.$api.get("user/gift/add", {
							gift_id,
						}).then(res => {
						console.log(res,'ssssssssssssss')
							if(res.data.code==200){
								uni.showToast({
									title: "领取成功",
									icon:'none',
									success: () => {
										setTimeout(() => {
											this.$emit('isGifts',true)
										}, 100)
									}
								})
							}else{
								uni.showToast({
									title: res.data.msg,
									icon:'none',
									success: () => {
										setTimeout(() => {
											uni.navigateTo({
												url:'/pages/my/children/login'
											})
										}, 100)
									}
								})
							}

							// 刷新页面数据
						})

					}
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.giftDetail {
		@include border_box;
		padding-bottom: 40rpx;
		margin-bottom: 40rpx;
		.name {
			margin: 0 0 24rpx 24rpx;
		}
		
		.giftButton {
			@include button(32rpx, 6rpx, 24rpx);
			font-weight: 400;
			font-size: $xw-font;
			white-space: nowrap;
		
		
		}
		
		.info {
			margin: 12rpx 0 0 12rpx;
			@include overflow;
			color: $xw-color;
		
		
		}

	}
</style>
