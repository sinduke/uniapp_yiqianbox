<!-- 我的账号 -->
<template>
	<view class="container">
		<view class="avatar">
			<image :src="userInfo.avatar"  style="width: 240rpx;height: 240rpx;border-radius: 240rpx;" @click="changeAvatar"></image>
			<image @click="changeAvatar" src="../../../static/images/userp.png" mode="" style="width: 48rpx;height: 48rpx;border-radius: 24rpx;position: fixed;top: 240rpx;left: 445rpx;"></image>
		</view>
		<u-cell-group>
			<!-- @click="handleRouter('/pages/my/myAdministration/children/changeMobile/index')" -->
			<u-cell-item :title-style="{fontWeight:700}" :title="$t('phoneNumber')" v-if="userInfo.has_bind_mobile == 2" :value="userInfo.mobile" :arrow="false" bg-color="#fff"></u-cell-item>
			<u-cell-item :title-style="{fontWeight:700}" :title="$t('phoneNumber')"  @click="handleRouter('/pages/view/changeMobile/changeMobile')" v-else value="待绑定" bg-color="#fff"	></u-cell-item>
			<u-cell-item :title-style="{fontWeight:700}" :title="$t('nickname')" :value="userInfo.nickname" bg-color="#fff" @click="nickName.show = true"></u-cell-item>
			<u-cell-item :title-style="{fontWeight:700}" :title="$t('passwordModification')" bg-color="#fff" @click="handleRouter('/pages/my/myAdministration/children/changePassword/index')"></u-cell-item>
			<u-cell-item :title-style="{fontWeight:700}" :title="$t('RealNameauthentication')" :value="userInfo.has_identify == 2 ? $t('certified') : $t('tobecertified')" bg-color="#fff" @click="handleRouter('/pages/my/myAdministration/children/changeRealname/index')"></u-cell-item>
			<u-cell-item :title-style="{fontWeight:700}" :title="$t('Withdrawalinformation')" bg-color="#fff" @click="handleRouter('/pages/my/myAdministration/children/withdrawalList/index')"></u-cell-item>
		</u-cell-group>
		<!-- 修改昵称弹框 -->
		<u-modal  negative-top="600" border-radius="48" :show-title="false" v-model="nickName.show" :mask-close-able="true" confirm-color="#ff5297" :show-confirm-button="false" :show-cancel-button="false" @confirm="changeNickname">
			<view class="" style="margin: 36rpx 0 0 36rpx;">修改昵称</view>
			<view class="nickName">
				<u-input v-model="nickName.value" :border="true" :placeholder="$t('my.qsrnc')" style="border: none;padding: 0 32rpx;"></u-input>
			</view>
			<view class="modalBtn">
				<view  style="width: 50%;text-align: center;color: #666666;"@click="noModal">
					取消
				</view>
				<view @click="changeNickname"  style="width: 50%;background: #fff;text-align: center;color: #FF4810;border: 1rpx solid #FF4810;border-radius: 0px 30px 30px 30px;">
					确认
				</view>
			</view>
		</u-modal>

	</view>
</template>


<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				nickName: {
					value: "",
					show: false,
				},
			}
		},

		computed: {
			...mapState({
				userInfo: "userInfo",
				client_id: "client_id",
			}),
		},
		methods: {
			// 进入图库选图上传
			changeAvatar() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success(file) {
						uni.uploadFile({
							url: that.$store.state.httpAPI+"asset/upload",
							files: [{
								name: "file",
								uri: file.tempFilePaths[0]
							}],
							success(res) {
								console.log(res)
								let avatar = JSON.parse(res.data).data.url;
								that.avatarUpload({
									avatar: avatar
								})
							},
						})
					}
				})
			},
			// 头像数据上传
			avatarUpload(params) {
				this.$api.get("user/avatar/update",{ ...params
				}).then(res => {
					this.$common.getuserInfo();
				})
			},
			// 修改用户昵称
			noModal(){
				this.nickName.show = false
			},
			changeNickname() {
				this.$api.get("user/nickname/update",{
						nickname: this.nickName.value,
				}).then(res => {
					// console.log(res,'sssssssssssss')
					if(res.data.code==200){
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						this.$common.getuserInfo()
					}
					else{
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				})
				this.nickName.show = false
			},
			//跳转
			handleRouter(url){
				uni.navigateTo({
					url
				})
			}
		},
		

	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		

		.u-cell {
			line-height: 48rpx;
		}

		.avatar {
			@include flex;
			margin: 56rpx 0;
			justify-content: center;

			.avatarUpload {
				width: 70rpx;
				height: 70rpx;
				position: absolute;
				right: 40rpx;
				top: 20rpx;
				background: transparent;
			}
		}

		.nickName {
			width: 80%;
			margin: 35rpx 0 0 10%;
		}
	}
	.modalBtn{
		width: 80%;
		height: 60rpx;
		margin: 35rpx 0 36rpx 10%;
		background: #F0F0F0;
		border-radius: 30rpx;
		display: flex;
		line-height: 56rpx;
		flex-flow: row;
	}
</style>
