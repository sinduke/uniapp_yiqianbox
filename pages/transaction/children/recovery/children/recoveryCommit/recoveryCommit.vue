<!-- 回收确认 -->
<template>
	<view class="" style="height: 100vh;overflow: hidden;">
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer" style="font-weight: 400;margin-left:-25rpx ;font-size: 32rpx;">{{formData.active==0?'回收确认':'赎回确认'}} </text>
					</view>
					<view class="slot-right">
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
					<text class="value">{{formData.game_name}}</text>
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
					<text>{{formData.sum_money}}</text>
				</u-col>
				<u-col span="1">
					<text class="text" style="color: #666;">元</text>
				</u-col>
			</u-row>
		</view>
		<view class="input">
			<u-row>
				<u-col span="3">
					<text color='#1c1c1c' class="title" v-if="formData.active==0">回收可得</text>
					<text color='#1c1c1c' class="title" v-else>赎回扣除</text>
				</u-col>
				<u-col span="7">
					<text>{{formData.amount}}</text>
				</u-col>
				<u-col span="1.5">
					<text class="text" style="color: #666;white-space: nowrap;">平台币</text>
				</u-col>
			</u-row>
		</view>

		<view class="Button">
			<view @click='handleSub' v-if="formData.active==0"  class="mybutton" >确认信息无误，提交回收</view>
			<view @click='handleShu' class="mybutton" v-else>确认信息无误，提交赎回</view>
			
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
				recycle_way:1,
				formData: {
					id:'',
					content: '',
					active:0

				}
			}
		},
		methods: {
			//提交
			handleSub() {
				
			this.$api.get('app/recycle/add_recycle', {
						mg_mem_id: this.formData.mg_mem_id,
						recycle_way: this.recycle_way
					
				}).then(res => {
					if (res.data.code == 200) {
					uni.showToast({
						title:res.data.msg,
						success: () => {
							setTimeout(()=>{
								this.$common.getuserInfo()
								uni.navigateBack()
							},400)
						}
					})
					

					} else {
						uni.showToast({
							title:res.data.msg,
							icon:'none',
							success: () => {
								setTimeout(()=>{
									uni.navigateBack()
								},400)
							}
						})
					}
				})
			},
			//赎回
			handleShu(){
				//预下单信息
				console.log(this.formData.id);
			uni.navigateTo({url: `/pages/transaction/children/recovery/children/payRedeem/payRedeem?id=${this.formData.id}`})
			}

		},
		onLoad(option) {
			this.formData = {
				...option
			}
		},

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
			margin-bottom: 40rpx;
			@include border-box;

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
