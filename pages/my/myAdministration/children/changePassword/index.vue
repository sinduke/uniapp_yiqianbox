<!-- 修改密码 -->
<template>
	<view class="container">
		<u-form :model="form" ref="uForm">
			<u-form-item>
				<u-input v-model="form.oldpwd" type="password" :border="true" :placeholder="$t('my.qsrymm')" style="border:none" />
			</u-form-item>
			<u-form-item>
				<u-input v-model="form.newpwd" type="password" :border="true" :placeholder="$t('my.qsrxmm')" style="border:none"  />
			</u-form-item>
			<u-form-item>
				<u-input v-model="form.newpwdAgain" type="password" :border="true" :placeholder="$t('my.qzcsrxmm')" style="border:none"  />
			</u-form-item>
		</u-form>

		<u-toast ref="uToast" />

		<view class="" style="display: flex; justify-content: center;">
		<view class="buttons" @click="getPageData">{{$t('confirm')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					oldpwd: "",
					newpwd: "",
					newpwdAgain: ""
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('ChangePassword')
			})
		},
		methods: {
			getPageData() {
				if(this.form.newpwd != this.form.newpwdAgain){
					this.$refs.uToast.show({
						title: this.$t('my.srmmbyz'),
						type: 'error',
					})
					return ;
				}
				this.$api.get("user/passwd/update",{
                         ...this.form
				}).then(res => {
					if(res.data.code==200){
						console.log(res)
						this.$refs.uToast.show({
							title: this.$t('my.xgcg'),
							type: 'success',
							back: true
						})
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none",	
						})
					}
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
    background-color: #fff;
		padding: 20rpx;
	}
	.buttons{
		margin-top: 32rpx;
		@include button(60rpx,20rpx,186rpx);
		 font-size:36rpx;
		 display: inline-block;
	

	}
	
</style>
