<!--
 * @Author: your name
 * @Date: 2021-05-12 15:39:01
 * @LastEditTime: 2021-05-29 10:58:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sdk_box_app_ui_uniapp_baijin\components\xw-saleorderlist\xw-saleorderlist.vue
-->
<!-- 我买到的 -->
<template>
	<view class="list">
		<view v-if="list.length">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="h3" v-if="!type">{{$t('my.ddh1')}}：{{item.order_id}}</view>
				<view class="content">
					<view style="color:#666666;white-space: nowrap">{{$t('my.yxmc')}}：{{type?item.name:item.gamename}}</view>
					<view style="color:#666666;" v-if="type">{{$t('my.yyzh')}}：{{item.nickname}}</view>
					<view style="color:#666666;" v-if="!type">{{$t('trumpet')}}ID：{{item.role_id}}</view>
					<view style="color:#666666;" v-if="type">{{$t('my.jsmc')}}：{{item.role_name}}</view>
					<view style="color:#666666;" v-if="type">{{$t('role')}}ID：{{item.role_id}}</view>

					<view style="color:#666666;">{{$t('my.qf1')}}：{{type?item.server_name:item.server_name}}
					</view>
					<view style="color:#666666;">
						{{ type?$t('my.czje'):$t('my.zfje')}}：{{type?item.money:item.price}}{{$t('money')}}
					</view>
					<view style="color:#666666;" v-if="!type">{{$t('my.zffs')}}：{{item.payway}}</view>
					<view style="color:#666666;" v-if="!type"><text
							v-if="item.goods.update_time">{{$t('my.zfsj')}}：{{item.goods.update_time | dateFormat("yyyy-MM-dd hh:mm")}}</text>
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view class="">
							<text style="color: #1c1c1c;font-size: 32rpx;font-weight: 600;">{{$t('state')}}：</text>
							<text style="color: #FC6170;font-size: 32rpx;font-weight: 600;" v-if="item.status == 1">{{$t('my.dcl')}}</text>
							<text style="color: #2bc8f9;font-size: 32rpx;font-weight: 600;"
								v-else-if="item.status == 2">{{type?$t('my.shtg'):$t('success')}}</text>
							<text style="color: #1c1c1c;font-size: 32rpx;font-weight: 600;"
								v-else-if="item.status == 3">{{type?$t('my.shbtg'):$t('error')}}</text>
						</view>
						<text class="btn" v-if="item.status == 1&&!type"
							@click="common.routerTo({path: '/pages/views/payMethods/index', query: {order_id: item.order_id}})">{{$t('my.qzf1')}}</text>
						<view v-else>
							<text v-if="item.status==1" class="btn"
								@click="handleClick(item,3)">{{$t('my.qxsq')}}</text>
							<text v-if="item.status==3" class="btn" style="background-color: #ccc"
								@click="handleClick(item,1)">{{$t('my.zcsq')}}</text>
						</view>

					</view>

				</view>
			</view>
		</view>

		<xw-nodata v-else>{{$t('my.wddxx')}}</xw-nodata>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			},
			type: {
				type: Number,
				default: 0
			}
		},
		methods: {
			handleClick(item, status) {
				let _this = this
				uni.showModal({
					title: '提示',
					confirmColor: '#FF5927',
					content: `确认${status==3?'取消申请？':'重新申请？'}`,
					success: function(res) {
						if (res.confirm) {
							_this.$api.get('rebate/cancel', {
									id:item.id,
									game_id:item.app_id,
									status
							}).then(res => {
								uni.showToast({
									icon:'none',
									title:res.data.msg,
									success:() =>{
										console.log(_this.$parent,'_this.$parent.event')
										_this.$emit('getData',true)

									}
								})
							})
						} else if (res.cancel) {
							return
						}
					}
				})


			}
		}
	}
</script>

<style lang="scss" scoped>

	.list {
		text-align: left;
		// padding: 0 $xw-padding-base $xw-padding-base;

		.item {
			// border-top: 20rpx solid $xw-border-primary-color;
			background: #fff;
			margin: 20rpx auto;
			border-radius: 28rpx;
			box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
			padding: 40rpx;
			margin-bottom: 32rpx;

			.h3 {
				padding: 12rpx 0;
				font-weight: 700;
			}

			.text {
				font-size: 28rpx;
				color: #666;
			}

			.content {
				color: $xw-font;
				line-height: 60rpx;
				position: relative;

				.btn {
					padding: 5rpx 30rpx;
					// box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
					border-radius: 30rpx;
					color: #fff;
					background-color: #FF5927;
					font-size: 26rpx;


				}
			}
		}
	}
</style>
