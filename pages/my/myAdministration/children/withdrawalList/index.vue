<!--
 * @Author: your name
 * @Date: 2021-05-10 12:28:15
 * @LastEditTime: 2021-05-11 10:46:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sdk_box_app_ui_uniapp_baijin\pages\my\children\withdrawalList\index.vue
-->
<!-- 提现信息 -->
<template>
	<view style="background:#fff">
		<u-collapse>
			<u-collapse-item :title="type[item.type]" v-for="(item, index) in SettleInfoList" :key="index">
				<u-cell-group>
					<u-cell-item :title="$t('my.hm')" :value="item.cardholder" :arrow="false"></u-cell-item>
					<u-cell-item :title="$t('my.zh')" :value="item.banknum" :arrow="false"></u-cell-item>
					<u-cell-item :title="$t('my.yhmc')" v-if="item.type=='bank'" :value="item.bankname" :arrow="false">
					</u-cell-item>
					<u-cell-item :title="$t('my.zhmc')" v-if="item.type=='bank'" :value="item.branchname" :arrow="false"></u-cell-item>
				</u-cell-group>

				<view class="" style="display: flex; justify-content: center;">
					<view class="buttons" @click="handleRouter(item.type)">修 改</view>
				</view>
			</u-collapse-item>
		</u-collapse>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				SettleInfoList: [],
				type: {
					alipay: this.$t('alipay'),
					wxpay: this.$t('wxpay'),
					bank: this.$t('bank'),
				}
			}
		},
		methods: {
			handleRouter(type) {
				uni.navigateTo({
					url: `/pages/my/myAdministration/children/withdrawal/index?paytype=${type}`
				})
			}
		},
		// onReady() {
		// 	uni.setNavigationBarTitle({
		// 		title: this.$t('Withdrawalinformation')
		// 	})
		// },
		onShow() {
			this.SettleInfoList = this.$store.state.userInfo.SettleInfo.data.list
		},
	}
</script>

<style lang="scss" scoped>
	.btn1 {
		width: 60%;
		margin: 40rpx auto;
	}

	/deep/.u-collapse-title {
		margin-left: 20rpx;
	}

	.buttons {
		margin-top: 48rpx;
		@include button(60rpx, 12rpx, 146rpx);
		font-size: 36rpx;
		display: inline-block;


	}
</style>
