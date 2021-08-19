<template>
	<view class="customerService">
		<view :style="{height:$store.state.statusBarHeight+'px',width:'100%'}" />
		<view class="title">
			<view class="titleLeft">
			   <view class="customer">客服中心</view> 
			</view>
			<view class="titleRight">
				<view class="Righticon" style="margin:0 8.5rpx 0 24rpx;">
				<view class="iconfont" @click="handleRouter('/pages/my/comprehensive/feedback/feedback')">&#xe724;</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="Body" :style="{height:$store.state.myHeight-252+'rpx'}">
			<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-252+'rpx'}">
				<view>
				<view class="Bodytitle">
						在使用中遇到任何问题请联系在线客服
					</view>
					<view class="Body__back">
						<view class="Body__back__left backimg" @click="handleRouter('/pages/customerService/children/problem/index')">
							<view class="backitem">
								<view class="backName">
									常见问题
								</view>
								<view class="backsname">
									FAQ答疑
								</view>
							</view>
							<view class="">
								<image src="@/static/images/customerService/cjwt.png" mode="widthFix"
									style="width: 72rpx;height: 72rpx;"></image>
							</view>
						</view>
						<view class="Body__back__right backimg"  @click="handleRouter('/pages/customerService/children/rechargeRebate/index')">
							<view class="backitem">
								<view class="backName">
									返利申请
								</view>
								<view class="backsname">
									更多福利
								</view>
							</view>
							<view class="">
								<image src="@/static/images/customerService/flsq.png" mode="widthFix"
									style="width: 64rpx;height: 72rpx;"></image>
							</view>
				
						</view>
					</view>
					<view class="kfqq-Item">
				
						<image src="@/static/images/qq-icon.png" mode="widthFix"></image>
						<view class="kfqq-Item__left">
							<view class="detail">
								<text class="detailname">游戏客服QQ: {{userFormat1.QQ_customerService}}</text>
								<text class="detailtell">在线时间：09:00-22:00</text>
							</view>
						</view>
						<text class="kfqq-Item__Right" @click="telme(userFormat1.QQ_customerService)">去联系</text>
					</view>
					<view class="kfqq-Item">
						<image src="@/static/images/phone-icon.png" mode="widthFix"></image>
						<view class="kfqq-Item__left">
							<view class="detail">
								<text class="detailname">游戏客服电话:{{userFormat1.footer_mobile}}</text>
								<text class="detailtell">在线时间：09:00-22:00</text>
							</view>
						</view>
						<text class="kfqq-Item__Right" @click="go">拨 打</text>
					</view>
					<view class="kfqq-Item">
						<image src="@/static/images/wx-icon.png" mode="widthFix"></image>
						<view class="kfqq-Item__left">
							<view class="detail">
								<text class="detailname">游戏客服微信: {{userFormat1.footer_wechat_number}}</text>
								<text class="detailtell">在线时间：09:00-22:00</text>
							</view>
						</view>
						<text class="kfqq-Item__Right" @click="weixinGo">复 制</text>
				
				
					</view>
				</view>
				<view class="bottom">
					<image @click="saveImage" :src="userFormat1.footer_wechatCode_number" class="erweima" mode="widthFix"></image>
					<view class="scanning" @click="saveImage" >
						<view class="iconfont"  style="color: #fff;margin-right: 6rpx;">&#xe712;</view>
						<text class="text" style="color: #fff;" >微信扫码</text>
					</view>
				
				</view>	
			</scroll-view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userFormat1: {}
			}

		},
		methods: {
			telme(qq) { //QQ号聊天
				console.log('mqq://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web', 121354);
				plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + qq + '&version=1&src_type=web');

			},

			go() {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: this.userFormat1.footer_mobile,
					// 成功回调
					success: (res) => {
					},
					// 失败回调
					fail: (res) => {

					}

				});
			},
			getList() {
				this.$api.get(`system/box_front_setup`).then(res => {
					this.userFormat1 = res.data.data.front_setup
				})
			},
			//微信跳转
			weixinGo(){
				this.$common.copyText(this.userFormat1.footer_wechat_number)
				plus.runtime.openURL("weixin://");
			},
			//保存图片
			saveImage(){

				uni.previewImage({
				current:1,
				urls: [this.userFormat1.footer_wechatCode_number],
				longPressActions: {
					itemList: ['保存图片'],
					itemColor:'#ff5927',		
					success: data => {
						uni.downloadFile({
						    url: this.userFormat1.footer_wechatCode_number, //仅为示例，并非真实的资源
						    success: res => {
						        if (res.statusCode === 200) {
									    uni.saveImageToPhotosAlbum({
									      filePath: res.tempFilePath,
									      success: res => {
											 plus.nativeUI.alert('保存成功')
									      }
									    });
									
						        }
						    }
						});
					},
					fail: function(err) {
						console.log(err.errMsg);
					}
				}
			});
			},
			//路由跳转
			handleRouter(url){
				if(this.$common.isLogin()){
					uni.navigateTo({
						url
					})
				}
				
			},
			
		},
		onShow() {
			this.getList()
		}
	}
</script>

<style lang="scss" scoped>
	.customerService {
		// overflow-y: scroll;
		height: 100vh;
		overflow: hidden;
		.title {
			width: 100%;
			padding: 32rpx 32rpx 12rpx 32rpx;
			@include flex;
			box-shadow: -2px 4rpx 6rpx rgba(111, 111,111, 0.1);

			.titleLeft {
				@include flex;
			}

			.titleItem {
				@include flex-column;
				margin-right: 64rpx;
			}

			.titletext {}

			.titleRight {
				margin-bottom: 8rpx;
				// margin-top: 4rpx;
				// margin-left: 4rpx;
				@include flex;

				.iconfont {
					// border-radius: 50%;
					// padding: 9rpx 13rpx;
					// box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
					font-weight: 400;
					// margin: 0 12rpx;
					font-size: 42rpx;

				}
			}
		}
		
		.Righticon {
			margin-left: 20rpx;
			height: 64rpx;
			width: 64rpx;
			border-radius: 64rpx;
			background-color: #fff;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
		}

		.customer {
			color: $xw-black-dark;
			font-size: $xw-h1-font;
			font-weight: 700;
		}

		// .radius {
		// 	width: 64rpx;
		// 	height: 64rpx;
		// 	border-radius: 50%;
		// 	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
		// 	@include flex;
		// 	justify-content: center;
		// }

		.Body {
			padding: 0 $xw-padding;

			.Bodytitle {
				color: $xw-color;
				margin: 48rpx 0;
				font-size: $xw-font;
			}

			&__back {
				width: 100%;
				@include flex;

				&__left {

					background: url(../../static/images/customerService/serverBackgorund1.png) no-repeat center;

				}

				&__right {
					background: url(../../static/images/customerService/serverBackgorund2.png) no-repeat center;
				}

				.backName {
					font-size: $xw-h2-font;
					color: $xw-whith-color;
					font-weight: 600;
					margin-bottom: 8rpx;
					white-space: nowrap;
				}

				.backsname {
					font-size: $xw-small-font;
					color: $xw-whith-color;
				}

				.backfont {
					color: $xw-whith-color;
					font-weight: 600;
					font-size: 60rpx;
				}


			}

			.backitem {
				margin-right: 10rpx;
			}

			.kfqq-Item {
				margin-top: 60rpx;
				@include flex;
				justify-content: flex-start;
				padding-bottom: 46rpx;

				border-bottom: 1px solid #EFEFEF;

				image {
					width: 88rpx;
					height: 88rpx;
					margin-right: 20rpx;
				}

				&__left {
					align-items: center;


					.detail {
						display: flex;
						flex-direction: column;
						width: 450rpx;

						.detailname {
							color: $xw-black-dark;
							font-size: $xw-h5-font;
							font-weight: 700;
							margin-bottom: 14rpx;
							white-space: nowrap;
						}

						.detailtell {
							color: $xw-page-icon;
							font-size: $xw-font;
						}
					}
				}

				&__Right {
					border: 1px solid #E4E4E4;
					border-radius: 32rpx;
					padding: 8rpx 0;
					color: $xw-color-z;
					font-size: $xw-font;
					font-weight: 700;
					white-space: nowrap;
					width: 114rpx;
					text-align: center;

				}
			}

		}

		.backimg {
			width: 46%;
			height: 176rpx;
			border-radius: 40rpx;
			@include flex;

			padding: 24rpx 60rpx 60rpx 30rpx;
		}


		.bottom {
			flex: 1;
			margin-bottom: 20rpx;
			 @include flex-column;
			.erweima {
				margin-top: 48rpx;
				width: 300rpx;
				height: 300rpx;
				// margin: 0rpx auto;
			}
			.scanning{
				display: flex;
				align-items: center;
				padding: 10rpx 20rpx;
				background-color: #C1C1C1;
				border-radius: 30rpx;
				
			}
		}
	}
</style>
