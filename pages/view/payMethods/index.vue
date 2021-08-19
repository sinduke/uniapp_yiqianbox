<!-- 支付方式 -->
<template>
	<view class="container">
		<view class="myshadowLine"/>
		<view class="" style="width: 100%;display: flex;justify-content: center;margin-bottom: 48rpx;">
			
		<view class='text'>请选择你的支付方式</view>
		</view>
		<u-cell-group v-if="payMethods">
			<u-cell-item :title="item.name" :title-style="{color:'#999'}" bg-color="#fff" :center="true" @click="handlePay(item.payway)"
				v-for="(item,index) in payMethods" :key="index">
				<u-image :lazy-load="false" :src="item.icon" slot="icon" width="70" height="70" border-radius="50" style="margin-right: 30rpx;"></u-image>
			</u-cell-item>
		</u-cell-group>
		<!-- <web-view :src="payitem"></web-view> -->
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.goods_id = options.goods_id;
			this.order_id = options.order_id || "";
			this.order_token = options.order_token || "";
		},
		data() {
			return {
				goods_id: 0,
				order_id: "",
				order_token: "",
				isShow: false,

				payMethods: null,
				payway: "",
				order: {} // 下单之后的返回值
			}
		},
		methods: {
			// 获取支付方式
			getPayMethods() {
				this.$api.get( "account/pay/payway").then(res => {
					this.payMethods = res.data.data;
				})
			},
			// 点击支付
			handlePay(payway) { 
				this.payway = payway;
				if (!this.order_id) {
					this.placeOrder();
				} else {
					this.initiatePay(this.order_id, this.order_token);
				}
			},
			// 第一步：下单
			placeOrder() {
				this.$api.get( "account/goods/buy",{
						payway: this.payway,
						goods_id: this.goods_id
					
				}).then(res => {
					console.log(res, 'account')
					if (res.data.code == 200) {
						this.order = res.data.data;
						this.initiatePay(this.order.order_id, this.order.token);
					} else {
						uni.showToast({
							title: '下单失败'
						})
					}
				})
			},
			// 第二步：发起支付
			initiatePay(order_id, order_token) {
				this.$api.get("account/goods/pay?goods_id=81",{
						goods_id: this.goods_id,
						payway: this.payway,
						order_id: order_id,
						pay_token: order_token
				}).then(res => {
					console.log(res, 'goods_id')
					if ("alipayh5" == res.data.data.pay_type) {
						if (uni.getSystemInfoSync().platform == 'ios') {
							plus.runtime.openURL(res.data.data.token, function(res) {
								console.log(res);
							})
						} else {
							plus.runtime.openURL(res.data.data.btoken, function(res) {
								console.log(res);
							})
						}
					}
					if ("wxpayh5" == res.data.data.pay_type) {
						plus.runtime.openURL(res.data.data.btoken, function(res) {
							console.log(res);
						})
					}
					this.orderStatus();
					 this.isShow = true 
				})
			},
			// 监听订单状态
			orderStatus() {
				this.$api.get( "/account/order/queryj", {
						order_id: this.order.order_id
					
				}).then(res => {

					console.log(res, 'queryj')
					if (res.data.data.status == 2) {
						uni.showToast({
							title: res.data.msg
						})
					} else {
						setTimeout(() => {
							this.orderStatus();
						}, 3000);
					}
				})
			}
		},
		created() {
			this.getPayMethods();
		},
		onShow() {
			var args = plus.runtime.arguments;
			if(this.isShow){
				if(args){
						console.log(args);
						uni.redirectTo({
							url:'/pages/transaction/index'
						})
					} 
			}
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		.text {
			color: #999999;
			@include padding;
		}
	}
	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 60rpx;
	
	}
	
</style>
