<template>
	<view class="transaItem" v-if="item">
		<u-row style="display: flex;align-items: flex-start;">
			<u-col span="3.5" >
				<image @click="showtoasts" :src="item.game_icon||item.game_new_icon||item.icon||item.new_icon" mode="widthFix" v-if="status==1&&item.back_status==2"   style="width: 160rpx;height: 160rpx;"></image>
				<image :src="item.game_icon||item.game_new_icon" mode="widthFix" v-else-if="status==3||status==0"   style="width: 160rpx;height: 160rpx;" @click="handleRouter('/pages/transaction/children/buynumber/children/commodityDetail?goods_id='+item.goods_id)"></image>
				<image :src="item.game_icon||item.game_new_icon||item.icon||item.new_icon" mode="widthFix" v-else-if="status==1"   style="width: 160rpx;height: 160rpx;" @click="handleRouter(`/pages/transaction/children/recovery/children/recoveryCommit/recoveryCommit?game_name=${item.game_name}&nickname=${item.nickname}&server_name=${item.server_name}&role_name=${item.role_name}&amount=${item.amount}&role_id=${item.role_id}&mg_mem_id=${item.mg_mem_id}&sum_money=${item.sum_money}&active=${active}`)"></image>
				<image :src="item.game_icon||item.game_new_icon||item.icon||item.new_icon" mode="widthFix" v-else-if="status==2"   style="width: 160rpx;height: 160rpx;"></image>
			</u-col>
			<u-col span="8.5" style="border-bottom: 1rpx solid #EFEFEF;">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view class="detail" v-if="status==1&&item.back_status==2" @click="showtoasts">
						<text class="gamename">{{item.game_name}}</text>
						<text class="text">上架时间：{{item.create_time|dateFormat('yyyy-MM-dd')}}</text>
						<text class="text">当前区服：{{item.server_name}}</text>
						<text class="text" style="margin-bottom: 36rpx;">充值小号：{{item.role_name}}</text>
					</view>
					<view class="detail" v-else-if="status==1" @click="handleRouter(`/pages/transaction/children/recovery/children/recoveryCommit/recoveryCommit?id=${item.id}&game_name=${item.game_name}&nickname=${item.nickname}&server_name=${item.server_name}&role_name=${item.role_name}&amount=${item.amount}&role_id=${item.role_id}&mg_mem_id=${item.mg_mem_id}&sum_money=${item.sum_money}&active=${active}`	)">
						<text class="gamename">{{item.game_name}}</text>
						<text class="text">上架时间：{{item.create_time|dateFormat('yyyy-MM-dd')}}</text>
						<text class="text">当前区服：{{item.server_name}}</text>
						<text class="text" style="margin-bottom: 36rpx;">充值小号：{{item.role_name}}</text>
					</view>
					<view class="detail" v-else-if="status==2" >
						<text class="gamename">{{item.gamename}}</text>
						<text class="text">当前区服：{{item.server_name}}</text>
						<text class="text" >充值小号：{{item.role_name}}</text>
						<text class="text" style="margin-bottom: 36rpx;">上架时间：{{item.create_time||item.goods.create_time |dateFormat('yyyy-MM-dd')}}</text>
					</view>
					<view class="detail" v-else-if="status==3||status==0" 
						@click="handleRouter('/pages/transaction/children/buynumber/children/commodityDetail?goods_id='+item.goods_id)">
						<text class="gamename">{{item.gamename}}</text>
						<text class="text">当前区服：{{item.server_name}}</text>
						<text class="text">当前累充：{{item.sum_money}}</text>
						<text class="text"
							style="margin-bottom: 36rpx;">上架时间：{{item.create_time|dateFormat('yyyy-MM-dd')}}</text>
					</view>
					<view class="" v-if="status==1" style="margin-top: -30rpx;">
						<text style="color:#FF5927;font-size: 32rpx;" v-if="active&&item.back_status==1">可赎回</text>
						<text style="color:#FF5927;font-size: 32rpx;" v-else-if="active&&item.back_status==2">赎回过期</text>
						<text style="color:#FF5927;font-size: 32rpx;" v-else>可回收</text>
					</view>
					<view class="" v-else-if="status==2" >
						<text :style="{color:'#19BFFF',fontSize:'32rpx'}" v-if="item.status==1" @click="handleRouter(`/pages/view/payMethods/index?goods_id=${item.ags_id}`)">{{'待处理'}}</text>
						<text :style="{color:item.status==2?'#FF5927':'#999',fontSize:'32rpx'}" v-else>{{item.status==2?'已购买':'购买失败' }}</text>			
					</view>
					<view class="" v-else-if="status==3">
						<text :style="{color:item.status==1?'#19BFFF' :item.status==2?'#FF5927':'#999',fontSize:'32rpx'}">{{ item.status==1?'正在审核':item.status==2?'已上架'
						:item.status==3?'已下架':item.status==4?'已出售':item.status==5?'审核不通过':'锁定中'}}</text>
								
					</view>
					
					<view class="" v-else>
						<text class="gamename">￥{{item.price}}.</text><text
							style="font-weight: 700;font-size: 26rpx;">00</text>
					</view>
				</view>
			</u-col>

		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			item: {
				type: Object,
				default: () => {}

			},
			status: {
				default: 0
			},
			active:{
				default: 0
			}
		},
		methods: {
			handleRouter(url) {
				uni.navigateTo({
					url
				})

			},
			showtoasts(){
				uni.showToast({
					title: '赎回时间已过期',
					icon:"none"
				})
			}

		}

	}
</script>

<style lang="scss" scoped>
	.transaItem {

		.detail {
			
			@include flex-column;
			align-items: flex-start;
			text {
				margin-bottom: 8rpx;
			}
		}

		.gamename {
			color: $xw-black-dark;
			font-size: $xw-h2-font;
			font-weight: 700;
			max-width: 300rpx;
			@include overflow;


		}

		.text {
			color: $xw-color;
			font-size: $xw-small-font;
		}
	}
</style>
