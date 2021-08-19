<template>
	<view>
		
			<view class="myGameList">
				<!-- tabs和line -->
				<view class="mygameList">
					<view class="listitem" v-for="(item,index) in myGame" :key='index' @click="handleClick(index)">
						<text class="mygametext" :class="{mygametext1:active==index}">{{item}}</text>
						<view class="lines" v-if="active==index" />
					</view>
				</view>
				<!-- 滑动区域固定tabs -->
				<swiper @change='swiperChange' :current="active" :style="{height:$store.state.myHeight-287+'rpx'}" >
					<swiper-item >
						<!-- 固定tabs -->
						<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-270+'rpx'}" @scrolltolower='scrollLoad1'>
							<!-- V-for渲染区域-玩过 -->
							<view class="" style="width: 100%;padding: 0 32rpx;">
								<view class="container" v-for="(item,index) in pageData1"   @click="handleRouterdetail(item.news_id,item.post_hits)">
									
									<view class="head">
										<image :src="item.img" class="img"></image>		
									</view>
									<view class="bottom" style="width: 100%;height: 116rpx; display: flex;flex-flow: row; ">
										<view class="bottom_left" style="">
											<image class="img1" :src="item.game2.icon" mode=""></image>
										</view>
										<view class="bottom_middle" style="width:50%;" >
											<view class="img_text">{{item.post_title}}</view>
											<view class="middle_1"
												style="margin-left: 40rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
												{{item.title}}
											</view>
											<view class="middle_2" style="margin-left: 50rpx;">
												{{item.start_time | dateFormat('yyyy-MM-dd hh:mm')}}
											</view>
										</view>
										<view class="bottom_right" style="white-space: nowrap;width: 40%;padding-right: 20rpx;">
											<text
											style="line-height: 100rpx;margin-left: 8rpx;color: #666666;float: right;">{{item.post_hits}}</text>
											<text class="iconfont"
												style="color: #FF5927;float: right;line-height: 100rpx">&#xe630;</text>
										</view>
									</view>
									<!-- 遮罩层 -->
									<view class="bagColor"></view>
								</view>
							</view>
							
							<nvue-loading style="position: fixed;top: 300rpx;left: 50%;transform: translateX(-50%);" v-if="pageData1.length==0"></nvue-loading>
							<xw-loadingGif :isShow='isShow'></xw-loadingGif>
						</scroll-view>
					</swiper-item>
					<swiper-item >
						<!-- 固定tabs -->
						<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-270+'rpx'}" @scrolltolower='scrollLoad2'>
							<!-- V-for渲染区域-玩过 -->
							<view class="" style="width: 100%;padding: 0 32rpx;">
								<view  class="container" v-for="(item,index) in pageData2"   @click="handleRouterdetail(item.news_id,item.post_hits)">
									<view class="head" style="width: 100%;height: 292rpx;overflow: hidden;">
										<image :src="item.img" class="img"></image>		
									</view>
									<view class="bottom" style="width: 100%;height: 116rpx; display: flex;flex-flow: row; ">
										<view class="bottom_left" style="">
											<image class="img1" :src="item.game2.icon" mode=""></image>
										</view>
										<view class="bottom_middle" style="width: 400rpx;" >
											<view class="img_text">{{item.post_title}}</view>
											<view class="middle_1"
												style="margin-left: 40rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
												{{item.title}}
											</view>
											<view class="middle_2" style="margin-left: 50rpx;">
												{{item.start_time | dateFormat('yyyy-MM-dd hh:mm')}}
											</view>
										</view>
										<view class="bottom_right">
											<text class="iconfont"
												style="color: #FF5927;text-align: center;margin-left: 10rpx;">&#xe630;</text><text
												style="line-height: 100rpx;margin-left: 8rpx;color: #666666;">{{item.post_hits}}</text>
										</view>
									</view>
									<!-- 遮罩层 -->
									<view class="bagColor"></view>
								</view>
								<nvue-loading style="position: fixed;top: 300rpx;left: 50%;transform: translateX(-50%);" v-if="pageData2.length==0"></nvue-loading>
								<xw-loadingGif :isShow='isShow'></xw-loadingGif>
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item >
						<!-- 固定tabs -->
						<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-270+'rpx'}" @scrolltolower='scrollLoad3'>
							<view class="" style="width: 100%;padding: 0 32rpx;">
								<view class="container" v-for="(item,index) in pageData3"  @click="handleRouterdetail(item.news_id,item.post_hits)">
									<view class="head">
										<image :src="item.img" class="img"></image>		
									</view>
									<view class="bottom" style="width: 100%;height: 116rpx; display: flex;flex-flow: row; ">
										<view class="bottom_left" style="">
											<image class="img1" :src="item.game2.icon" mode="widthFix"></image>
										</view>
										<view class="bottom_middle" style="width: 400rpx;" >
											<view class="img_text">{{item.post_title}}</view>
											<view class="middle_1"
												style="margin-left: 40rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
												{{item.title}}
											</view>
											<view class="middle_2" style="margin-left: 50rpx;">
												{{item.start_time | dateFormat('yyyy-MM-dd hh:mm')}}
											</view>
										</view>
										<view class="bottom_right">
											<text class="iconfont"
												style="color: #FF5927;text-align: center;margin-left: 10rpx;">&#xe630;</text><text
												style="line-height: 100rpx;margin-left: 8rpx;color: #666666;">{{item.post_hits}}</text>
										</view>
									</view>
									
									<!-- 遮罩层 -->
									<view class="bagColor"></view>
								</view>
								<nvue-loading style="position: fixed;top: 300rpx;left: 50%;transform: translateX(-50%);" v-if="pageData3.length==0"></nvue-loading>
								<xw-loadingGif :isShow='isShow'></xw-loadingGif>
							</view>
							
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				count1:0,
				count2:0,
				count3:0,
				id:'',
				active: 0,
				myGame: [
					'福利', '资讯', '攻略'
				],
				params: [{
					page: 1,
					offset: 10,
					type: 1
				}, {
					page: 1,
					offset: 10,
					type: 2
				}, {
					page: 1,
					offset: 10,
					type: 3
				}],
				pageData3:[],
				pageData1:[],
				pageData2:[],
				isRank:false,
				isServer:false,
				

			}
		},
		methods: {
			scrollLoad1(e){
				this.isShow = true
				setTimeout(()=>{
					if(this.count1>this.pageData1.length){
						this.params[1].page++
						this.getflData()
					}
					this.isShow = false
				},1800)
			
			},
			scrollLoad2(e){
				this.isShow = true
				setTimeout(()=>{
					if(this.count2>this.pageData2.length){
						this.params[0].page++
						this.getzxData()
					}
					this.isShow = false
				},1800)
			
			},
			scrollLoad3(e){
				this.isShow = true
				setTimeout(()=>{
					if(this.count3>this.pageData3.length){
						this.params[2].page++
						this.getglData()
					}
					this.isShow = false
				},1800)
			
			},
			handleRouterdetail(id,post_hits) {
				uni.navigateTo({
					url: `/pages/my/comprehensive/gameConsulting/gameDetail/gameDetail?news_id=${id}&post_hits=${post_hits}`
				})
			},
			handleClick(i) {
				this.active = i
			},
			swiperChange(e) {
				this.active = e.detail.current
			},
			//福利
			getflData(data = {}) {
				this.$api.get('/news/list', {
					...this.params[1]
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData1 = this.pageData1.concat(res.data.data.list)
						this.count1 = res.data.data.count
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			},
			//资讯
			getzxData(data = {}) {
				this.$api.get('/news/list', {
					...this.params[0]
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData2 = this.pageData2.concat(res.data.data.list)
						this.count2 = res.data.data.count
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			},
			//攻略
			getglData(data = {}) {
				this.$api.get('/news/list', {
					...this.params[2]
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData3 = this.pageData3.concat(res.data.data.list)
						this.count3 = res.data.data.count
					} else {
						//加载失败
						uni.showToast({
							title: "加载失败",
							icon: "none"
						})
					}
				})
			},
		},
		onLoad() {
			this.getflData()
		},
		watch: {
			active(val) {
				if (val == 1) {
					this.isRank = true
				} else if (val == 2) {
					this.isServer = true
				}
		
			},
			isRank(val) {
				if (val) {
					this.getzxData()
				}
					
			},
			isServer(val) {
				if (val) {
					this.getglData()
				}
					
			},
		}
	}
</script>

<style>
	.myGameList{
		width: 100%;
	}
	.mygameList {
		display: flex;
		flex-flow: row;
		margin-bottom: 48rpx;
		padding: 0rpx 32rpx;
	}

	.listitem {
		margin-right: 50rpx;
	}

	.mygametext {
		margin-bottom: 18rpx;
		color: #999999;
		font-size: 32rpx;
	}
	.mygametext1 {
		color: #1C1C1C;
		font-weight: 700;
		font-size: 36rpx;
	}
	.lines {
		margin-top: 6rpx;
		margin-left: 8rpx;
		width: 54rpx;
		height: 6rpx;
		border-radius: 12rpx;
		background-color: #FF5927;
	}
	/* 渲染内容 */
	.container {
		height: 408rpx;
		margin-bottom: 48rpx;
		border-radius: 20rpx;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 8rpx rgba(0, 0, 0, 0.16);
	}

	.middle_1 {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		margin-top: -35rpx;
		color: #1C1C1C;
	}

	.middle_2 {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		margin-top: 15rpx;
		color: #666666;

	}
	.bottom_left {
		width: 176rpx;
		height: 176rpx;
		border-radius: 40rpx;
		position: relative;
		top: -92rpx;
		left: 24rpx;
		z-index: 99;
	}

	.img {
		width: 100%;
		height: 292rpx;
		border-radius: 20rpx 20rpx 0 0;
	}
	.img_text{
		width: 680rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bolder;
		color: #ffffff;
		position: relative;
		top: -70rpx;
		left: 40rpx;
		white-space: nowrap;text-overflow: ellipsis;overflow: hidden;
		z-index: 99;
	}
	.img1{
		width: 176rpx;
		height: 176rpx;
		border-radius: 40rpx;
	}
	
	.bagColor{
		position: relative;
		top: -191rpx;
		width: 100%;
		height: 70rpx;
		background-image: linear-gradient(to top, rgba(0, 0, 0, .4), rgba(255, 255, 255, 0.1));
	}
</style>
