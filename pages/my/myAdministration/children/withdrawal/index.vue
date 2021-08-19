<!-- 提现信息 -->
<template>
	<view class="container">
		<u-form :model="form" ref="uForm">
			<u-form-item label="支付方式" label-width="200">
				<u-input v-model="payWay.payList[form.type]" :disabled="true" />
			</u-form-item>
			<u-form-item label="户名" label-width="200">
				<u-input v-model="form.cardholder" placeholder="请输入户名" />
			</u-form-item>
			<u-form-item label="账号" label-width="200">
				<u-input v-model="form.banknum" placeholder="请输入账号" />
			</u-form-item>
			<u-form-item label="银行名称" label-width="200" v-if="form.type=='bank'">
				<u-input v-model="form.bankname" placeholder="请输入银行名称"  />
			</u-form-item>
			<u-form-item label="支行名称" label-width="200" v-if="form.type=='bank'">
				<u-input v-model="form.branchname" type="textarea" placeholder="请输入支行名称" :fixed="true"  />
			</u-form-item>
		</u-form>

		<view class="" style="display: flex; justify-content: center;">
		<view class="buttons" @click="editSettlement">提 交</view>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				payWay: {
					name: "",
					show: false,
					payList: {
						alipay: "支付宝",
						wxpay: '微信',
						bank: '银行卡',
					}
				},
				form: {
					type: '',
					cardholder: "",
					banknum: "",
					bankname: "",
					branchname: ""
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('accountManagement')
			})
		},
		methods: {
			editSettlement() {
				if (this.form.cardholder == '') {
					this.$refs.uToast.show({
						title: "用户名不能为空",
						type: 'error',
						position: 'top',
					})
					return
				}
				if (this.form.banknum == '') {
					this.$refs.uToast.show({
						title: "账号不能为空",
						type: 'error',
						position: 'top',
					})
					return
				}
				if (this.form.type == 'bank') {
					if (this.form.bankname == '') {
						this.$refs.uToast.show({
							title: "银行名称不能为空",
							type: 'error',
							position: 'top',
						})
						return
					}
					if (this.form.branchname == '') {
						this.$refs.uToast.show({
							title: "支行名称不能为空",
							type: 'error',
							position: 'top',
						})
						return
					}
				}
				this.$api.get( "user/editSettlement",{ ...this.form		
				}).then(res => {
					console.log(res,'sssssssssssss')
					if (res.data.code == 200) {
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
							position: 'top',
							back:true,
							
						})
					}
					this.$common.getuserInfo();
				})
			}
		},
		onLoad(data) {
			this.form.type = data.paytype
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		/deep/.u-form-item--right__content {
			flex: 0.9;
		}

		/deep/.u-form-item--left__content__label {
			margin-left: 30rpx;
		}

		.btn1 {
			width: 60%;
			margin: 40rpx auto;
		}
	}
	.buttons{
		margin-top: 48rpx;
		@include button(60rpx,20rpx,146rpx);
		 font-size:36rpx;
		 display: inline-block;
	
	
	}
</style>
