<!-- 积分商城 -->
<template>
	<view class="gameDemo">
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer" style="font-weight: 400;margin-left: -20rpx;font-size: 32rpx;">积分商城</text>
					</view>
					<view class="slot-right">
						<view class="radius">
							<text class="iconfont" style="font-weight: 400;font-size: 34rpx;"
								@click="handleRouter('/pages/my/integral/integral')">&#xe645;</text>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
		<view class="demoOverflow">
			<scroll-view scroll-y class="scroll" lower-threshold="100"  :style="{height:$store.state.mysHeight-152+'rpx'}"   @scrolltolower="loadMore" style="background-color:#F6F6F8" v-if="pageData.length>0">
			<view class="demoTitle">
			 <image src="@/static/images/my/jfsc_banner.png" mode="widthFix" style="width: 100%;"></image>
			</view>
			<view class="demoDetail">
				<text>{{$t('index.pointMall1')}}：{{userInfo.my_integral}}</text>
				<view style="display: flex; align-items: center;">
					<image src="@/static/images/my/rhhqjf.png" mode="widthFix" style="width:28rpx;height:28rpx; margin-right:6rpx;" @click="isShow= true"></image>
					<text style="color: #a1a1a1;font-size: 24rpx;" @click="isShow= true">{{$t('index.pointMall2')}}</text>
				</view>
			</view>
			<view class="" style="height: 30rpx;width: 100%;">	
			</view>
				<u-row style="margin-bottom: 10rpx;padding:0 12rpx;">
					<u-col span="6">
						<view class="uni-card">
							<view class="bg">
								<image src="@/static/images/my/jfsc-xyzp.png" style="width: 200rpx;height: 140rpx;"></image>
								<text>{{$t('index.pointMall3')}}</text>
							</view>
							<text class="ntitle">{{$t('index.pointMall4')}}</text>
							<text class="nButton" @click="handleRouter('/pages/my/children/bigTurntable/index')">{{$t('index.pointMall5')}}</text>
						</view>
					</u-col>
					<u-col span="6" v-for="item in pageData" :key='item.id'>
						<view class="uni-card">
							<view class="bg" v-if="item.goods_img" >
								<image :src="item.goods_img" style="width: 200rpx;height: 140rpx;"></image>	
								<text>{{item.goods_content.length>12?item.goods_content.slice(0,10)+'..':item.goods_content}}</text>
							</view>
							
							<view class="bg" v-else>
								 <image :src="item.integral<=500?'../../../../static/images/my/jfsc-5ptb.png':(item.integral>500&&item.integral<=1000)?'../../../../static/images/my/jfsc-10ptb.png':(item.integral>1000&&item.integral<=2000)?'../../../../static/images/my/jfsc-20ptb.png':'../../../../static/images/my/jfsc-30ptb.png'" style="width: 200rpx;height: 140rpx;"></image>
								 
								<text >{{item.goods_content.length>12?item.goods_content.slice(0,10)+'..':item.goods_content}}</text>
							</view>
							<text
								class="ntitle">{{item.goods_name.length>12?item.goods_name.slice(0,10)+'..':item.goods_name}}</text>
							<text class="nButton" @click="handleClick(item)">{{$t('index.pointMall6')}}</text>
						</view>
					</u-col>
				</u-row>
				 <xw-loadingGif :isShow='loadingShow' style="margin-bottom: 80rpx;"></xw-loadingGif>
			</scroll-view>
			<nvue-loading v-else></nvue-loading>
		</view>
		<!-- 规则弹出层 -->
		<xw-popup v-model="isShow" mode="center">
			<view class="porps">
				<view class="title">
					<text style="margin-bottom: 40rpx;">{{$t('index.pointMall8')}}</text>

					<text>{{$t('index.pointMall9')}}</text>
				</view>
				<view class="" style="width: 100%;">
					<view class="buttons">
						<view @click="isShow=false">{{$t('index.pointMall10')}}</view>
					</view>
				</view>
			</view>
		</xw-popup>

		<!-- 确认弹出层 -->
		<xw-popup v-model="handleShow" mode="center">
			<view class="subProp">
				<view class="subTitle">
					<image src="@/static/images/ptbicon.png" style="width: 80rpx;height: 80rpx;">
					</image>
					<view class="">
						<!-- <text>{{$t('index.pointMall11')}}{{subData.exchange_amount}}{{$t('index.pointMall12')}}</text> -->
						<text style="white-space: nowrap;font-weight: 700;">{{subData.goods_name}}</text>
						<text>{{$t('index.pointMall13')}}{{subData.integral}}{{$t('index.pointMall14')}}</text>
					</view>
					
				</view>
				<view class="subMessage" v-if="userInfo.my_integral<subData.integral">
					<image src="@/static/images/my/rhhqjf.png" mode="scaleToFill" style="width: 34rpx;height: 34rpx;"></image>
					<text style="color: #19BFFF;">{{$t('index.pointMall16')}}</text>
				</view>
				<view class="subMessage" style="margin-bottom: 61%;">
					<text style="width:100%;text-align: center;">{{$t('index.pointMall15')}}{{subData.remain_cnt-subData.change_cnt}}/{{subData.remain_cnt}}</text>
				</view>

				<view class="subButton">
					<view class="mybutton">
						<text class="buttonText h2"  @click="handleShow=false">{{$t('index.pointMall17')}}</text>
						<text class="h2 buttonText1" style="color: #c1c1c1;background-color: #F0F0F0;" v-if="(userInfo.my_integral<subData.integral)||(subData.remain_cnt-subData.change_cnt<=0)">{{$t('index.pointMall18')}}</text>
						<text  class="h2 buttonText1" v-else @click="subPtb">{{$t('index.pointMall18')}}</text>
					</view>
					
				<!-- 	<text style="white-space:nowrap; background-color:#A1A1A1 ;" @click="handleShow=false">{{$t('index.pointMall17')}}</text>
					<text v-if="(userInfo.my_integral<subData.integral)||(subData.remain_cnt-subData.change_cnt<=0)" style="white-space:nowrap; background-color:#a1a1a1 ;">{{$t('index.pointMall18')}}</text>
					<text v-else style="white-space:nowrap; background-color:#4AD88D ;" @click="subPtb">{{$t('index.pointMall18')}}</text>
					 -->
					
				</view>
				<view class="SuBbottom">
					<text>{{$t('index.pointMall19')}}：</text></br>
					<text>
						{{$t('index.pointMall20')}}
						</br>{{$t('index.pointMall21')}}</br>{{$t('index.pointMall22')}}</br>{{$t('index.pointMall111')}}</br>{{$t('index.pointMall23')}}
					</text>
				</view>
			</view>
		</xw-popup>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				count: 0,
				clickShow: true,
				isShow: false,
				handleShow: false,
				loadingShow:false,
				subData: "",
				pageData: [],
				form: {
					page: 1,
				},
			};
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('Pointsmall')
			})
		},
		onLoad() {
			this.getPageData();
		},
		computed: {
			...mapState({
				userInfo: 'userInfo'
			})
		},
		methods: {
			handleRouter(url) {
				uni.navigateTo({
					url
				})
			},
			handleClick(item) {
				if (item.mem_times == 1 && item.is_exchange == 1) {
					uni.showToast({
						icon: "none",
						title: this.$t('index.pointMall24'),
					});
					return;
				} else {
					this.handleShow = true;
					this.subData = item;

				}
			},
			//确认兑换
			subPtb() {
				if (this.clickShow) {
					this.clickShow = false;
					this.$api.get("app/shop/exchange_ptb", {
						ptb_cnt: this.subData.exchange_amount,
						integral: this.subData.integral,
						good_id: this.subData.id,
					}).then((res) => {

						if (res.data.code == 200) {
							if (this.subData.exchange_type == 1) {

								uni.showToast({
									icon: "none",
									title: this.$t('index.pointMall25'),
									success: () => {
										setTimeout(() => {
											this.pageData = [];
											this.handleShow = false;
											this.$common.getuserInfo();
											this.getPageData();
											this.clickShow = true;
										}, 300);
									},
								});
							} else {
								uni.showToast({
									icon: "none",
									title: this.$t('index.pointMall26'),
									success: () => {
										setTimeout(() => {
											this.pageData = [];
											this.handleShow = false;
											this.$common.getuserInfo();
											this.getPageData();
											this.clickShow = true;
											uni.navigateTo({
												url: '/pages/my/children/myService/index'
											})
										}, 300);
									},
								});


							}
						}
					});
				}
			},
			getPageData() {
				this.$api.get(
					"app/shop/integralList", {
						mg_mem_id: this.userInfo.mem_id,
						...this.form			
					}
				).then((res) => {
					if(res.data.code==200){
					this.count = res.data.data.count;
					this.pageData = this.pageData.concat(res.data.data.list);
						
					}
				});
			},
			//加载更多
			loadMore() {
			if(this.count>this.pageData.length){
			    this.loadingShow = true
				setTimeout(()=>{
						this.form.page++
						this.getPageData()
					this.loadingShow = false
				},1000)
			}
			
			},
		},
	}
</script>

<style lang="scss" scoped>
	.gameDemo {
		height: 100vh;
		overflow: hidden;

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

		//确认弹出
		.subProp {
			position: relative;
			width: 60vh;
			height: 80vh;
		    background: url("~@/static/images/my/jfsc-qrdh.png") no-repeat center;
			background-size: 80%;

			.subMessage {
				position: absolute;
				bottom: 0;
				left: 0;
				margin-bottom: 68%;
				margin-left: 14%;
				@include flex;
				justify-content: flex-start;
				background-color: #f3f3f3;
				padding: 10rpx 30rpx;
				border-radius: 8rpx;
				width: 72%;

				text {
					margin-left: 10rpx;
					font-size: 24rpx;
					color: #ff8500;
				}
			}

			.subTitle {
				border-radius: 12rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 72%;
				margin-bottom: 76%;
				margin-left: 14%;
				@include flex;
				justify-content: flex-start;
				background-color: #f3f3f3;
				padding: 20rpx 50rpx;

				view {
					display: flex;
					flex-direction: column;
					margin-left: 40rpx;
					font-weight: 24rpx;
					font-weight: 600;
				}

				view>text:nth-child(1) {
					color: #000;
				}

				view>text:nth-child(2) {
					color: #e71b24;
				}
			}

			.subButton {
				position: absolute;
				bottom: 0;
				left: 0;
				margin-bottom: 46%;
				margin-left: 15%;
				width: 70%;
			.mybutton {
				/* flex: 1; */
				height: 88rpx;
				@include flex;
				margin-bottom: 24rpx;
				border-radius: 46rpx;
				background-color: #EFEFEF;
				overflow:hidden
			}
	
			.buttonText {
				display: inline-block;
				color: #666;
				padding: 18rpx 90rpx;
				border-radius: 46rpx;
				white-space: nowrap;

			}

			.buttonText1 {
				height: 88rpx;
				display: inline-block;
				white-space: nowrap;
				color: #FF5927;
				padding: 18rpx 100rpx 18rpx 100rpx;
				background-color: #FFFFFF;
				border: 1rpx solid #FF5927;
				border-bottom-right-radius: 46rpx;
				border-top-right-radius: 46rpx;
				border-bottom-left-radius: 46rpx;
			}
			
			
			}

			.SuBbottom {
				position: absolute;
				bottom: 0;
				left: 0;
				margin-bottom: 140rpx;
				margin-left: 15%;
			}

			.SuBbottom>text:nth-child(1) {
				color: #000;
				font-size: 22rpx;
				font-weight: 400;
			}

			.SuBbottom :nth-child(3) {
				color: #a1a1a1;
				font-size: 22rpx;
				font-weight: 400;
			}
		}

		.porps {
			position: relative;
			width: 50vh;
			height: 60vh;
			background: url("~@/static/images/my/jfsc-jfgz.png") center no-repeat;
			background-size: 80%;

			.buttons {
				position: absolute;
				@include flex;
				justify-content: center;
				width: 100%;
				bottom: 0;
				left: 0;
				margin-bottom: 30%;
				line-height: 2;
				view{
					border: 1px solid #efefef;
					color: #FF5927;
					padding: 12rpx 76rpx;
					font-size: $xw-h4-font;
					border-radius: 60rpx;
				}
			}

			.title {
				position: absolute;
				bottom: 0;
				margin-bottom: 48%;
				margin-left: 20%;
				width: 100%;
				display: flex;
				flex-direction: column;
				font-size: $xw-font;
				font-weight: 700;
				color: #000;
			}

			.title>text {
				margin: 10rpx 0;
			}
		}

		.navbar {
			// position: fixed;
			width: 100%;
			height: 70rpx;
			line-height: 70rpx;
			top: 0;
			left: 0;
			padding-top: var(--status-bar-height);
			// margin-top: 20rpx;
			z-index: 5;
			background-color: #fff;

			.title {
				color: #1c1c1c;
				font-weight: 600;
				font-size: 30rpx;
			}
		}

		.demoTitle {
			width: 100%;
			height: 400rpx;

			background-size: 105%;
			background-position: 0 0;
		}

		.demoDetail {
			@include flex;
			background-color: #fff;
			padding: 10rpx 32rpx;
		}

		.demoDetail>text:nth-child(1) {
			font-weight: 600;
			font-size: 24rpx;
		}

		.demoOverflow {
			width: 100%;
			margin-top: 20rpx;
			overflow-y: scroll;

			.scroll {
				display: flex;
				height: 65vh;
				.uni-card {
					@include flex;
					flex-direction: column;
					background-color: #fff;
					padding: 10rpx 20rpx;
					margin:0rpx 10rpx  40rpx 10rpx;
					border-radius: 20rpx;

					.bg {
						margin-top: 10rpx;
						height: 200rpx;
						width: 100%;
						position: relative;
					    background-color: #F6F6F8;
						border-radius: 20rpx;

						text {
							width: 100%;
							position: absolute;
							bottom: 0;
							font-size: 24rpx;	
							text-align: center;
							margin-bottom: 6rpx;
							color: #FF6A3D;
						}

						image {
							position: absolute;
							top: 20rpx;
							left: 50%;
							transform: translate(-50%, 0);
						}
					}

					.ntitle {
						font-weight: 700;
						color: $xw-black-dark;
						font-size: $xw-font;
						margin: 12rpx 0;
					}

					.nButton {
						border: 1px solid #EFEFEF;
						padding: 8rpx 25rpx;
						border-radius: 32rpx;
						color: #FF5927;
						font-size: 26rpx;
						font-weight: 700;
						margin-bottom: 10rpx;
					}
				}
			}
		}
	}
</style>
