<!-- 试玩游戏 -->
<template>
	<view class="demoGame">
		<view :style="{height:$store.state.statusBarHeight+'px',width:'100%'}" />
		<view class="title nav">
			<view class="TitleLeft">
				<view style="transform: rotate(180deg);margin-right:20rpx;margin-left: -10rpx;">
					<text class="iconfonts" style="font-size: 50rpx;font-weight:400" @click="handleBack">&#xe633;</text>
				</view>
				<text class="h1" style="font-weight: 400;margin-top: -2rpx;font-size: 32rpx;">试玩游戏</text>
			</view>
		</view>
		<view class="bottom" :style="{height:$store.state.mysHeight-160+'rpx'}" >
			<scroll-view scroll-y="true" :style="{height:$store.state.mysHeight-160+'rpx'}" v-if="pageData.length>0" @scrolltolower='scrollLoad'>
				<view class="head">
					<view class="str">1.点击试玩领取任务后，进入游戏详情</view>
					<view class="str">2.在达到试玩要求后，自己发放奖励到您账户中</view>
					<view class="str">3.使用获得的奖励兑换其他福利</view>
				</view>
				<view style="height: 48rpx;" />
				<view v-for="(item,index) in pageData" style="margin-bottom: 84rpx;">
					<demoGame-list @getData='getData' :key='index' :item='item'></demoGame-list>
				</view>
               <xw-loadingGif :isShow='isShow'></xw-loadingGif>
			</scroll-view>
			<nvue-loading v-else></nvue-loading>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				pageData: [],
				count:0,
				formData:{
					page:1,
					offset:15
				},
				isShow:false
				
				
			}
		},
		methods: {
			getpageData(data = {}) {
				this.$api.get('/task/listgame', {
					mg_mem_id: this.$store.state.userInfo.mem_id,...this.formData
					
				}).then(res => {
					if(res.data.data.list.length){
						this.pageData = this.pageData.concat(res.data.data.list)
						this.count = res.data.data.count
					}
					
				})

			},
			handleBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			//刷新页面
			getData(e) {
				if (e) {
					this.pageData = []
					this.getpageData()
				}
			},
			//加载更多
			scrollLoad(e){
				setTimeout(()=>{
					if(this.count>this.pageData.length){
				        this.isShow = true
						this.formData.page++
						this.getpageData()
					}
					this.isShow = false
				},1800)

			}

		},
		onLoad() {
			this.getpageData()
		}
	}
</script>

<style scoped lang="scss">
	@import '@/common/css/nvue-whith.css';

	.demoGame {
		width: 100%;
		height: 100vh;
		overflow: hidden;

		.nav {
			@include padding;
			box-shadow: 0px 6rpx 3px rgba(111, 111, 111, 0.16);
		}

		.TitleLeft {
			@include flex;
			justify-content: flex-start;
		}
	}

	.str {
		margin-bottom: 24rpx;
		font-size: $xw-font;
		color: $xw-color;

	}

	.head {
		padding: 0 32rpx;
		margin-top: 48rpx;
		@include border_box;
	}

	.bottom {
		padding: 0 32rpx;

		// border: 1px #efefef solid;
		// margin: 0 auto;
		// background-color: #007AFF;

	}
</style>
