<!-- 赎回支付 -->
<template>
	<view class="container">
		<view class='text'>请选择你的支付方式</view>
		<u-cell-group v-if="paylist">
			<u-cell-item :title="item.name" bg-color="#f5f5f5" :center="true" @click="handlePay(item.payway)"
				v-for="(item,index) in paylist" :key="index">
				<u-image :lazy-load="false" :src="item.icon" slot="icon" width="100" height="100"
					style="margin-right: 30rpx;"></u-image>
			</u-cell-item>
		</u-cell-group>
		<!-- 弹出框 -->
		<!-- <u-popup width='70%' height="30%" v-model="isShow" mode="center" border-radius='14' :mask-close-able='false'>
			<view class="popup">
				<view class="popupSub">
					确认提交
				</view>
				<view class="" style="color: red; font-size: 26rpx;">
					提交后会从您平台币扣取余额！
				</view>
				<view class="butter">
					<u-button shape="circle" type="info" size="mini" style="width: 160rpx;height: 60rpx;"
						@click="haColse">取消</u-button>
					<u-button shape="circle" size="mini" @click="hadlSub"
						style=" height: 60rpx; width: 160rpx; background-color: rgb(255, 89, 39);color: #fff;">
						提交</u-button>
					<u-toast ref="uToast" />
				</view>
			</view>
		</u-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recycle_id: '',
				paylist: null,
				order_id: '',
				payway: '',
				isShow: false,
			}
		},
		methods: {
			//获取支付接口
			getdleRecy() {
				console.log(this.order_id);
				this.$api.get('app/recycle/pre_order', {
					recycle_id: this.recycle_id
				}).then(res => {
					console.log(res.data, 'res.data');
					if (res.data.code == 200) {
						this.paylist = res.data.data.payway
						this.order_id = res.data.data.order_id
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg,
							success: () => {
								console.log(1111);
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/transaction/index'
									})
								}, 500);
							}
						})

					}

				})

			},
			//提交
			hadlSub() {
				this.$api.get('app/recycle/pay', {
					payway: this.payway,
					order_id: this.order_id
				}).then(res => {
					if (res.data.code == 200) {
						
						this.$common.getuserInfo()
						uni.showToast({
							title: '赎回成功',
							success: () => {
								setTimeout(function() {
									uni.switchTab({
										url: '/pages/transaction/index'
									})
								}, 500);
							}
						})
					}
				})  
			},
			//点击支付
			handlePay(ip) {
				this.payway = ip
				// this.isShow = true
			uni.showModal({
			    title: '确认提交',
			    content: '提交后会从您平台币扣取余额！',
				confirmText:'提交',
			    success: res=> {
			        if (res.confirm) {
			          this.hadlSub()
			        } else if (res.cancel) {			
			           return
			        }
			    }
			});

			}
		},
		onLoad(options) {
			this.recycle_id = options.id
			this.getdleRecy()
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		.text {
			// color: $xw-font-auxiliary-color;
			padding:32rpx 40rpx;
		}

		.popup {
			width: 100%;
			height: 100%;
			padding: 12rpx;

			.popupSub {
				font-size: 44rpx;
				font-weight: 600;
				margin: 60rpx auto;

			}

			.butter {
				display: flex;
				margin-top: 60rpx;
			}
		}

	}
</style>
