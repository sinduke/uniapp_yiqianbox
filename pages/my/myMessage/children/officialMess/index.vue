<!-- 官方通知 -->
<template>
	<view class="myMessage">
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer">官方通知</text>
					</view>
					<view class="slot-right">
						<view class="radius">
							<text class="iconfont" style="font-weight: 400;font-size: 36rpx;" @click="">&#xe8b0;</text>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
		<!-- 消息列表 -->
		<view class="myshadowLine" />
		<view class="body">
			<view class="">
				<scroll-view  scroll-y="true" v-if="pageData" :style="{height:$store.state.myHeight-200+'rpx'}" @scrolltolower="loadMore">
					<view>
						<view class="" style="width: 100%;height: 60rpx;"></view>
						<view class="card" v-for="(item,index) in pageData" :key='index' >
                             <view class="title" @click="handleRouter(item.game_id)">{{item.title}}</view>
                             <view class="text"  v-html="item.content"></view>
                             <view class="text1" >{{item.create_time|dateFormat('yyyy/MM/dd hh:mm:ss')}}</view>
						</view>
					</view>
				</scroll-view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					page: 1,
					offset: 20,
					type: 2
				},
				count:0,
				pageData: [],
			}
		},
		methods: {
			toDetail(item){
				uni.navigateTo({
					url: `/pages/my/myMessage/children/officialMess/detail?title=${item.title}&content=${item.content}`
				})
			},
			handleRouter(id){
				uni.navigateTo({
					url: `/pages/view/gamedetail/gamedetail?gameid=${id}`
				})
			},
			/* 消息列表 */
			getPageData() {
				this.$api.get("msg/list", {
					...this.params
				}).then(res => {
					this.pageData = this.pageData.concat(res.data.data.list);
					this.count = res.data.data.count
				})
			},
			loadMore() {
			
				if (this.count > this.pageData.length) {

					this.params.page++;
					this.getPageData(this.params);
				} else {
					// this.status = "nomore";
				}
			},

		},
		onLoad() {
			this.getPageData()
		}

	}
</script>

	
<style lang="scss" scoped>
	.myMessage{
		height: 100vh;
		overflow: hidden;
	}
	.u-navbar {

		.title {
			flex: 1;
			padding: 0 $xw-padding;
			@include flex;
		}

		.customer {
			color: $xw-black-dark;
			font-size: $xw-h4-font;
			font-weight: 400;
			margin-left: -20rpx;
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
		

	}

	.body {
		@include padding;

		.card {
			padding: 24rpx;
			background-color: #f4f4f4;
			border-radius: 30rpx;
			margin-bottom: 40rpx;
			.title{
				margin-bottom: 10rpx;
				color: $xw-black-dark;
				font-size: $xw-h3-font;
				font-weight: 700;
				@include overflow;
			}
		}
		.text{	
			color: $xw-color;
			font-size: $xw-h4-font;
			margin-bottom: 8rpx;
			display:-webkit-box;
			-webkit-line-clamp:3;
			-webkit-box-orient:vertical;
			overflow:hidden;
			word-break: break-all;
		}
		.text1{
			color: $xw-page-icon;
			font-size: $xw-font;
		}

	}
</style>
