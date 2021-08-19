<!-- 全民推广 -->
<template>
	<view class="">
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer" style="font-weight: 400;margin-left: -20rpx;font-size: 32rpx;">全民推广</text>
					</view>
					<view class="slot-right">
						<view class="radius">
							<text class="iconfont" style="font-weight: 400;font-size: 34rpx;"
								@click="handleRouter('/pages/my/children/withdrawalRecord/index')">&#xe645;</text>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>

		<view class="share" :style="{height:2000+'rpx'}">
			<view class="image-btn" @click="ishow"></view>
			<view class="image-pay">
				<view class="image-total">
					<view class="image-total-item">
						<view style="color: #ff5927;">{{shareData.share_total}}</view>
						<view>{{$t('index.share1')}}</view>
					</view>
					<view class="image-total-item">
						<view style="color: #ff5927;">{{shareData.share_remain}}</view>
						<view>可领取金额</view>
					</view>
					<view class="image-total-item">
						<view style="color: #ff5927;">{{shareData.mem_cnt}}</view>
						<view>{{$t('index.share3')}}</view>
					</view>
				</view>

				<view style="height: 100rpx;width: 100%;" @click="getPay"></view>
			</view>
			<!-- 分享 -->
			<xw-share v-if="show" @close='show=false' :shareData='shareData'></xw-share>
			<!-- 提现 -->
			<xw-popup :mask-close-able='true' v-model="txshow" mode="center" border-radius="30" width="80%" height="60%">
				<view class="withdrawal" style="width: 100%;height: 100%;position: relative;" @close="close">
					<image src="@/static/images/comment-close.png" mode="widthFix" style="width: 40rpx;height: 40rpx;position: absolute;top: 20%;right: 60rpx;" @click="close">
					</image>
					<view class="" style="position: absolute; bottom: 22%;width: 80%;left: 10%;" >
						<u-form :model="form" label-align="center" ref="uForm" style="margin-top:60rpx">
							<u-form-item :label="$t('index.share8')" label-width='200'>
								<u-input v-model="payWay.name" @click="payWay.show=true" :disabled="true"
									:placeholder="$t('index.share9')" />
							</u-form-item>
							<u-form-item label-align="center" :label="$t('index.share10')" label-width='200'>
								<u-input v-model="form.amount" type="number" :placeholder="$t('index.share11')" />
							</u-form-item>
						</u-form>

						<view class="" style="display: flex; justify-content: center;">
							<view class="buttons" @click="withdraw">{{$t('index.share12')}}</view>
						</view>
					</view>
				</view>
			</xw-popup>
			<u-select v-model="payWay.show" confirm-color='#ff5924' :list="payWay.payList" mode="single-column"
				@confirm="handleSelect"></u-select>
			<u-toast ref="uToast" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				shareData: {},
				txshow: false,
				payWay: {
					name: "",
					show: false,
					payList: [{
							label: this.$t('alipay'),
							value: 'alipay'
						},
						{
							label: this.$t('wxpay'),
							value: 'wxpay'
						},
						{
							label: this.$t('bank'),
							value: 'bank'
						}
					]
				},
				form: {
					type: "",
					amount: "",
					share_type: 1
				}
			}
		},
		methods: {

			// onReady() {
			// 	uni.setNavigationBarTitle({
			// 		title: this.$t('Sharingbenefits')
			// 	})
			// },
			getData() {
				this.$api.get("share/detail", {
					share_type: 'app',
					client_id: this.$store.state.client_id

				}).then(res => {
					if (res.data.code == 200) {
						this.shareData = {
							...res.data.data
						}

					}
				})
			},
			getPay() {
				this.txshow = true
				// this.common.nativeRouterTo({ url: '/pages/my/children/myAccount/index' })
			},
			ishow() {
				this.show = !this.show
			},
			handleSelect(arr) {
				this.form.type = arr[0].value
				this.payWay.name = arr[0].label
			},
			//提现按钮
			withdraw() {
				if (this.form.type == '') {
					this.$refs.uToast.show({
						title: this.$t('index.share13'),
						type: 'error',
						position: 'top',
					})
					return
				}
				if (this.form.amount == '' || this.form.amount == 0) {
					this.$refs.uToast.show({
						title: this.$t('index.share14'),
						type: 'error',
						position: 'top',
					})
					return
				}
				this.$api.get(`financial/withdraw`, {
					...this.form

				}).then(res => {
					if (res.data.code == 200) {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
							position: 'top',
						})
						this.close()
						this.getData();
					} else if (res.data.code == 44208) {
						this.$refs.uToast.show({
							title: this.$t('index.share15'),
							type: 'error',
							position: 'top',
							url: '/pages/my/myAdministration/children/withdrawalList/index',
							isTab: false

						})
					} else {
						uni.showToast({
							icon: "none",
							title: res.data.msg
						})
					}
				})
			},
			close() {
				this.form.type = ""
				this.form.amount = ""
				this.payWay.name = ""
				this.txshow = false
			},
			handleRouter(url) {
				uni.navigateTo({
					url
				})
			}
		},
		created() {
			this.getData()
		},
	}
</script>

<style lang="scss" scoped>
	.u-navbar {

		.title {
			flex: 1;
			padding: 0 $xw-padding;
			@include flex;
		}

		.customer {
			color: $xw-black-dark;
			font-size: $xw-h1-font;
		}

		.radius {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
			@include flex;
			justify-content: center;
		}

	}

	.share {
		width: 100%;
		background: url("../../../../static/images/my/share-bgi.png") no-repeat;
		background-size: 100% 100%;
		position: relative;

		.image-btn {
			position: absolute;
			width: 100%;
			height: 140rpx;
			bottom: 32%;
			left: 50%;
			transform: translate(-50%);
		}

		.image-gz {
			position: absolute;
			top: 25%;
			left: 11%;
			width: 70rpx;
			height: 70rpx;
			padding: 20rpx;
			border-radius: 50%;
			background-color: #ff8500;
			border: 20rpx solid #f2f2ba;
			text-align: center;
			box-sizing: content-box;
			color: #fff;
		}

		.image-conter {
			position: absolute;
			width: 60%;
			left: 50%;
			top: 37%;
			transform: translate(-50%);
			letter-spacing: 4rpx;
			line-height: 45rpx;
		}

		.image-pay {
			position: absolute;
			bottom: 10%;
			left: 50%;
			transform: translate(-50%);
			width: 70%;

			.image-total {
				padding: 20rpx;
				border-radius: 40rpx;
				display: flex;
				justify-content: center;
				box-shadow: 0 0 2.5vw #ff8500 inset;
				background: linear-gradient(#ff8500, #ff8500) left top,
					linear-gradient(#ff8500, #ff8500) left top,
					linear-gradient(#413d39, #ff8500) right top,
					linear-gradient(#ff8500, #ff8500) right top,
					linear-gradient(#ff8500, #ff8500) left bottom,
					linear-gradient(#ff8500, #ff8500) left bottom,
					linear-gradient(#ff8500, #ff8500) right bottom,
					linear-gradient(#ff8500, #ff8500) right bottom;
				background-repeat: no-repeat;
				background-size: 0.1vw 18vw, 1.5vw 0.1vw;

				.image-total-item {
					flex: 1;
					text-align: center;
					padding: 10rpx;

					&:nth-child(2) {
						border-left: 1px solid #ccc;
						border-right: 1px solid #ccc;
					}
                    view{
						white-space: nowrap;
					}
					view:nth-child(2) {
						margin: 10rpx;
					}
				}
			}

			.image-btn-pay {
				margin: 0 auto;
				margin-top: 15rpx;
			}

			.text {
				color: #ff8500;
				text-decoration: underline;
				text-align: center;
			}
		}


		.custom-close {
			margin-top: 80rpx;
			width: 40%;
			color: #ff8500;
		}

		.btn1 {
			width: 40%;
			margin: 20rpx auto;
		}
	}

	.withdrawal {
		background: url(../../../../static/images/my/share-popup.png) no-repeat center;
		background-size: 90%;
	}

	.buttons {
		margin-top: 40rpx;
		@include button(60rpx, 12rpx, 124rpx);
		font-size: 32rpx;
		font-weight: 400;
		display: inline-block;


	}
</style>
