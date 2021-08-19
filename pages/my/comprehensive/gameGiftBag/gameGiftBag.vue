<!-- 游戏礼包 -->
<template>
	<view class="box">
		<!-- 自定义导航栏 -->
		<u-navbar title="" :is-back='false' :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="iconfont" style="transform: rotate(180deg);font-size: 48rpx;margin-left: -10rpx;" @click="toRouter">
						&#xe633;
					</view>
					<view class="slot-wrap" style="margin-left: -480rpx;">
						<text class="customer" style="font-weight: 400;font-size: 32rpx;">游戏礼包</text>
					</view>
					<view class="slot-right">
						
					</view>
				</view>
			</slot>
		</u-navbar>
		<view class="" style="width: 100%;height: 4rpx; background-color: #fff; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);"/>
		<view class="container">
			<scroll-view scroll-y :style="{height:$store.state.myHeight-100+'rpx',width: '100%'}"  lower-threshold="100" @scrolltolower="loadMore"  v-if="pageData.length">
				<view class="head" v-for="(item,index) in pageData" >
					<view class="" style=" margin:48rpx 0; display:flex; flex-flow:row; ">
						<view class="left" style="width:160rpx; height:160rpx;">
							<image :src="item.icon" mode="" style="width:160rpx; height:160rpx;margin-top: 10rpx;" @click="toDetail(item.game_id)">
							</image>
						</view>
						<view @click="toDetail(item.game_id)" class="middle" style="margin-left: 24rpx;width: 60%; ">
							<view class="middle_text" style="">{{item.gift_name}}</view>
							<view class="middle_1">礼包类型：元宵节礼包</view>
							<view class="middle_1">礼包码：{{item.code}}</view>
							<view class="middle_1">兑换期限：{{item.end_time | dateFormat("yyyy-MM-dd")}}</view>
						</view>
						<view class="right" @click="copy(item.code)" >
							复制
						</view>
					</view>
					<view class="" style="width: 532rpx;border-bottom: 1rpx solid #EFEFEF; float: right;">
					</view>
				</view>
			</scroll-view>
			<nvue-loading v-else></nvue-loading>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				copyShow: false,
				params: {
					page: 1,
					offset: 15,
				},
				count:0,
				pageData: []
			}
		},
		methods: {
			toDetail(id){
				uni.navigateTo({
					url:'/pages/view/gamedetail/gamedetail?gameid='+id
				})
			},
			toRouter(){
				uni.navigateBack({
					delta:1
				})
			},
			getpageData(data = {}) {
				this.$api.get('/user/gift/list', {
					...data
				}).then(res => {
					if (res.data.code == 200) {
						console.log(6666,res)
						this.pageData = this.pageData.concat(res.data.data.list) ;
						this.count = res.data.data.count
						if (res.data.data.list.length < this.params.offset) {
						
						} 
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			},
			//加载更多
			loadMore() {		
				if(this.count>this.pageData.length){
					this.params.page++;
					this.getpageData(this.params);
				}
			},
			//复制
			copy(value) {
				uni.setClipboardData({
					data: value,
				});
			}
		},
		onLoad() {
			this.getpageData()
		}
	}
</script>

<style lang="scss" scoped>
	.box{
		height: 100vh;
		overflow: hidden;
	}
	.title {
		flex: 1;
		padding: 0 $xw-padding;
		@include flex;
	}
	.customer {
		color: $xw-black-dark;
		
	}
	.container {
		padding: 0 32rpx;
	}

	.head {
		width: 100%;
		height: 250rpx;
		.right{
			margin-top: 70rpx;
			 text-align: center;
			 line-height: 45rpx;
			  width: 104rpx;
			   height: 48rpx;
				border-radius: 24rpx;
				color: #FF5927;
				 font-size: 24rpx;
				  border: 1px solid #E4E4E4;
		}
	}

	.middle_text {

		color: #1C1C1C;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.middle_1 {
		line-height: 48rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666666;
	}
</style>
