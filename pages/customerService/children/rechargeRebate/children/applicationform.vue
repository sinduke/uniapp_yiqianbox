<!-- 申请填写 -->
<template>
	<view class="" style="height: 100vh;overflow: hidden;">
	<u-navbar title="" :border-bottom='false' class="u-navbar">
		<slot>
			<view class="title">
				<view class="slot-wrap">
					<text class="customer">申请填写</text>
				</view>
				<view class="slot-right">
					<view class="radius" >
						<text class="iconfont" style="font-weight: 400;font-size: 34rpx;" @click="handleRouter" >&#xe786;</text>
					</view>
				</view>
			</view>
		</slot>
	</u-navbar>
	
	
	<view class="Application">
		<view class="input">
			<u-row>
				<u-col span="3">
					<text color='#1c1c1c' class="title">{{$t('my.yxm5')}}</text>
				</u-col>
				<u-col span="9">
					<text class="value">{{game_name}}</text>
				</u-col>
			</u-row>
		</view>
		<view class="input">
			<u-row>
				<u-col span="3">
					<text color='#1c1c1c' class="title">{{$t('my.czxh5')}}</text>
				</u-col>
				<u-col span="9">
					<text>{{formData.nickname}}</text>
				</u-col>
			</u-row>
		</view>

		<view class="input">
			<u-row>
				<u-col span="3">
					<text color='#1c1c1c' class="title">{{$t('my.yxjs5')}}</text>
				</u-col>
				<u-col span="9">
					<text>{{formData.role_name}}</text>
				</u-col>
			</u-row>
		</view>
		<view class="input">
			<u-row>
				<u-col span="3">
					<text color='#1c1c1c' class="title">{{$t('role')}}ID</text>
				</u-col>
				<u-col span="9">
					<text>{{formData.role_id}}</text>
				</u-col>
			</u-row>
		</view>
		
		
		<view class="input">
			<u-row>
				<u-col span="3">
					<text color='#1c1c1c' class="title">{{$t('my.yxqf5')}}</text>
				</u-col>
				<u-col span="9">
					<text>{{formData.server_name}}</text>
				</u-col>
			</u-row>
		</view>
		<view class="input">
			<u-row>
				<u-col span="3">
					<text color='#1c1c1c' class="title">{{$t('my.czje')}}</text>
				</u-col>
				<u-col span="8">
					<text>{{formData.money}}</text>
				</u-col>
				<u-col span="1">
					<text class="text" style="color: #666;">元</text>
				</u-col>
			</u-row>
		</view>
        <view class="input inp1">
			<u-row style="align-items:flex-start;">
				<u-col span="4">
					<view color='#1c1c1c' class="title" style="margin-top: 4rpx;">申请档位内容</view>
				</u-col>
				<u-col span="8">
					<textarea class="textarea text" placeholder-style='font-size: 28rpx;color: #C1C1C1;' type="textarea"
						v-model="formData.gear_content" placeholder="请按照返利表格里的档位内容填写" maxlength="100" />
				</u-col>
			</u-row>
			
			
		</view>
		<view class="input inp1">
			<u-row style="align-items:flex-start;">
				<u-col span="3">
					<view color='#1c1c1c' class="title" style="margin-top: 4rpx;">{{$t('my.bz5')}}</view>
				</u-col>
				<u-col span="9">
					<textarea class="textarea text" placeholder-style='font-size: 28rpx;color: #C1C1C1;' type="textarea"	v-model="formData.content" :placeholder="$t('my.xt50zyn')" maxlength="50" />
				</u-col>
			</u-row>
		</view>

		<view class="Button">
			<view @click='handleSub' class="mybutton">{{$t('my.qqxxwwt')}}</view>
		</view>
	   </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				game_id: '',
				trumpetShow: false,
				role_nameShow: false,
				game_name: '',
				pageData: [],
				list: [],
				roleList: [],
				nikename: '',
				role_id: '',
				formData: {
					// mg_mem_id: '',
					// role_id: '',
					// role_name: '',
					// server_name: "",
					// money: '',
					content: '',
					gear_content:''

				}
			}
		},
		methods: {
			getDetailData() {
				this.$api.get('rebate/getRoleData',{
						role_id: this.role_id,
						game_id: this.game_id
					
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData = res.data.data[0]
						this.formData = {

							...this.pageData
						}

					}

				})
			},
			//提交
			handleSub() {
				this.formData.game_id = this.game_id
				this.$api.get('rebate/addRebate',{	...this.formData})
				.then(res => {
					 if(res.data.code == 200) {
						uni.showToast({
							title: '申请成功',
							success: () => {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 300)
							}
						})
					}else{
						uni.showToast({
							title: res.data.msg,
							icon:'none'
						})
						return
					}

				})
			},
			//路由跳转
			handleRouter(){
				uni.navigateTo({
					url:'/pages/customerService/children/rechargeRebate/children/guide'
				})
			}

		},
		onLoad(option) {
			this.role_id = option.role_id
			this.game_id = option.game_id
			this.game_name = option.game_name
			this.getDetailData()
		},
		// onNavigationBarButtonTap() {
		// 	uni.navigateTo({
		// 		url: '/pages/my/children/rechargeRebate/children/guide',

		// 	})
		// },
	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/nvue-whith.css';
	
	.u-navbar {
	
		.title {
			flex: 1;
			padding: 0 $xw-padding;
			@include flex;
		}
		
		.customer {
			color: $xw-black-dark;
			font-size: $xw-h3-font;
			font-weight: 400;
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
	.Application {
		border-top: 4rpx solid #f0f0f0;
		background-color: #fff;
		width: 100%;
		padding: 40rpx 32rpx;


		.input {
			width: 100%;
			padding: 0 30rpx;
			height: 74rpx;
			line-height: 74rpx;
			background-color: #fff;
			border-radius: 36rpx;
			margin-bottom: 30rpx;
			border: 1px solid #E4E4E4;

			.title {
				font-weight: 700;
				white-space: nowrap
			}

			.value {
				color: #666;
			}

			text {
				font-size: 28rpx;

			}

		}

		.inp1 {
			display: flex;
			height: 200rpx;
			margin-bottom: 40rpx;
		}

		.textarea {
			height: 180rpx;
			color: #666;
			width: 440rpx;
			padding: 20rpx 0;
			font-size: 28rpx;

		}

		/deep/.btn {
			height: 70rpx;
			line-height: 70rpx;
		}
	}
	.Button{
		width: 100%;
		@include  flex;
		justify-content: center;
		.mybutton{
		    display: inline-block;
			@include button(64rpx,20rpx,194rpx);
			font-size:$xw-font;
		}
	}


	/deep/.uni-input-placeholder {
		font-size: 28rpx;
		color: #C1C1C1;
	}

	/deep/.u-select__header__confirm {
		color: #FF5927 !important;
	}
</style>
