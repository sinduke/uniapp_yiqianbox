<!-- 消息 -->
<template>
	<view class="myMessage">
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer" style="font-size: 32rpx;font-weight: 400;margin-left: -20rpx;">消息</text>
					</view>
					<view class="slot-right">
					<!-- 	<view class="radius">
							<text class="iconfont" style="font-weight: 300;font-size: 52rpx;" >&#xe666;</text>
						</view> -->
					</view>
				</view>
			</slot>
		</u-navbar>
		<view class="myshadowLine" />
		<view class="body">
			<view class="messageOpen" v-if="!isMessage">
				<view class="openLeft">
					<u-icon name="close-circle" style="color:#C1C1C1 ;margin-right: 16rpx;" size="36"></u-icon>
					<view class="" style="display: flex;flex-direction: column;align-items: flex-start;">
						<text class="h1">打开通知，接收重要信息</text>
						<text class="text">不错过任何一个精彩内容</text>
					</view>
				</view>
				<view class="opneRight">
					<view class="">
						<text class="buttons" @click="handleRouter('/pages/my/mySetting/tySetting')">去开启</text>
					</view>
				</view>
			</view>

			<view class="messageItem" >
				<view class="item" v-if="pageData" @click="handleRouter('/pages/my/myMessage/children/officialMess/index')">
					<view class="itemRight" style="display:flex;justify-content: space-between;">
						<image src="@/static/images/view/gftz.png" mode="widthFix" style="width: 96rpx;height: 96rpx;margin-right: 32rpx;"></image>
						<view style="display: flex;flex-direction: column;align-items: flex-start">
							<text class="titles">官方通知</text>
							<text class="text" style="width: 300rpx; overflow: hidden;text-overflow: ellipsis;white-space:nowrap;">{{pageData.title}}</text>
						</view>
					</view>
					<view class="text" style="color: #C1C1C1;margin-top: 52rpx;">
						{{pageData.create_time|dateFormat('yyyy/MM/dd hh:mm:ss')}}
					</view>
				</view>
				
                <view class="item" @click="handleRouter('/pages/my/myMessage/children/activeMessage/activeMessage')">
                 	<view class="itemRight" style="display:flex;justify-content: space-between;">
						<view class="">
							<view class="" v-if="likeDate.is_comment_read" style="width: 28rpx;height: 28rpx;background-color: #FF5927;border-radius: 50%;position: fixed;z-index: 99;left: 100rpx;display: flex;justify-content: center;align-items: center;">
								<text style="color: #FFFFFF;font-size: 16rpx;font-weight: 500;">{{likeDate.is_comment_read}}</text>
							</view>
							<image src="@/static/images/view/hdxx.png" mode="widthFix" style="width: 96rpx;height: 96rpx;margin-right: 32rpx;"></image>
							
						</view>
                 		<view style="display: flex;flex-direction: column;align-items: flex-start">
                 			<text class="titles">互动消息</text>
                 			<text class="text" v-if="likeDate.is_comment_read">您有新消息</text>
                 			<text class="text" v-else>您未有新消息</text>
                 		</view>
                 	</view>
                 	<view class="text" style="color: #C1C1C1;">
                 		{{page2Data.time_str}}
                 	</view>
                 </view>
               <view class="item" @click="handleRouter('/pages/my/myMessage/children/customerNotice/index')">
                	<view class="itemRight" style="display:flex;justify-content: space-between;">
                		<image src="@/static/images/view/kftz.png" mode="widthFix" style="width: 96rpx;height: 96rpx;margin-right: 32rpx;"></image>
                		<view style="display: flex;flex-direction: column;align-items: flex-start">
                			<text class="titles">客服通知</text>
                			<text class="text">[消息列表]</text>
                		</view>
                	</view>
                	<view class="text" style="color: #C1C1C1;">
                		今天
                	</view>
                </view>
                  <view class="item" @click="handleRouter('/pages/customerService/children/problem/index')">
                  	<view class="itemRight" style="display:flex;justify-content: space-between;">
						<view class="">
							<image src="@/static/images/view/cjwt.png" mode="widthFix" style="width: 96rpx;height: 96rpx;margin-right: 32rpx;"></image>
						</view>
                  		<view style="display: flex;flex-direction: column;align-items: flex-start">
                  			<text class="titles">常见问题</text>
                  			<text class="text">HI，您好，请在底部选择你要咨询的...</text>
                  		</view>
                  	</view>
                  	<view class="text" style="color: #C1C1C1;">
                  		今天
                  	</view>
                  </view>




			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
                isMessage:false,
				params: {
					page: 1,
					offset: 1,
					type: 2
				},
				pageData:null,
				page2Data:[],
				likeDate:[],
			}
		},
		onShow(){
			this.isMessage = uni.getStorageSync('isMessage').status
			this.getPage2Date()
			
		},
		onLoad(){
			this.getPageData()
		},
		methods: {
			getMessage() {
				// 监听plusready事件  

				// 扩展API加载完毕，现在可以正常调用扩展API
				// 添加监听从系统消息中心点击某条消息启动应用事件
				// plus.push.addEventListener('click', function(msg) {
				// 	// 分析msg.payload处理业务逻辑 
				// 	alert('You clicked: ' + msg.content);
				// }, true);

			},
			// 官方通知
			getPageData() {
				this.$api.get("msg/list", {
					...this.params
				}).then(res => {
					this.pageData = res.data.data.list[0];
				})
			},
			getPage2Date(){
				this.$api.get("v8/comments/message_list",{	
					offset:1,
				}).then(res=> {
					this.page2Data = res.data.data.list[0]
					this.likeDate = res.data.data
				})
			},
			handleRouter(url){
				uni.navigateTo({
					url
				})
				
			}

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

	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 60rpx;

	}

	.body {
		@include padding;

		.messageOpen {
			background-color: #F4F4F4;
			border-radius: 30rpx;
			padding: 32rpx 20rpx;
			margin-bottom: 40rpx;
			@include flex;

			.openLeft {
				@include flex;

				.h1 {
					color: $xw-black-dark;
					font-size: $xw-h4-font;
					font-weight: 700;
					margin-bottom: 12rpx;
				}
			}

			.buttons {
				@include button(32rpx, 8rpx, 24rpx) font-size: $xw-font;
				font-weight: 300;
				background-color: #fff;
				border: none;

			}
		}

		.text {
			font-size: $xw-font;
			color: $xw-color;

		}

		.item {
			@include flex;
			align-items: flex-start;
			padding-bottom: 24rpx;
			@include border-box;
			margin-bottom: 30rpx;
		}

		.titles {
			color: $xw-black-dark;
			font-size: $xw-h3-font;
			font-weight: 700;
			margin-bottom: 8rpx;
		}
	}
</style>
