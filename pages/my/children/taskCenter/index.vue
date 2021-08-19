<template>
	<view class="tankCenter">
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer" style="font-weight: 400;font-size: 32rpx;margin-left: -20rpx;">任务中心</text>
					</view>
					<view class="slot-right">
						<view class="radius">
							<text class="iconfont" style="font-weight: 400;font-size: 32rpx;" @click="handleRouter('/pages/my/children/taskCenter/signRule/signRule')">&#xe645;</text>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
		<view class="banner">
			<image src="@/static/images/my/rwzx-banner.png" mode="widthFix" style="width: 100%;"></image>
			<view class="myjf">
				<text style="font-weight: 700;">当前剩余积分</text>
				<view class="jfrouter" @click="handleRouter('/pages/my/integral/integral')" >
					<text style="font-weight: 900;font-size: 48rpx;">{{userInfo.my_integral}}</text>
					<text style="margin: 0 6rpx;font-weight: 700;font-size: 32rpx;">积分</text>
					<view class="jfradius"><text class="iconfont" style="font-weight: 400;font-size: 34rpx;">&#xe633;</text></view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{height: $store.state.myHeight-460+'rpx'}">
		<view class="qdjf">
			<view class="qdjf_tit">已连续签到<text style="color: #FF5927;font-size: 38rpx;">{{userInfo.continuous_sign}}</text>天,明天签到+2积分</view>
			<view class="qdjf_body">
			<view class="qdjf_item" v-for="(item,index) in 7" :key='index'>
				<view class="" style="display: flex;align-items: center;justify-content:">
				<view class="qdjf_raidus" :style="{borderColor:index<userInfo.continuous_sign?'#FF5927':'#999'}">
					<u-icon name="checkbox-mark" v-if="index<userInfo.continuous_sign" color="#FF5927"></u-icon>
					<text class="text" v-else>+{{index+1}}</text>
				</view>
					<view class="qdjf_line" v-if="index<6" :style="{backgroundColor:index<userInfo.continuous_sign?'#FF5927':'#999'}"></view>
				</view>
				<view class="text" v-if="!index" style="margin-left: -50rpx;">
					今天
				</view>
				<view class="text" :style="{marginLeft:index<6?'-50rpx':''}" v-else>
					{{new Date()/1000+(86400*index)|dateFormat('MM.dd')}}
				</view>
			</view>
			</view>
		</view>
		<view class="zptz">
			<image src="@/static/images/my/rwzx-xyzp.png" mode="widthFix" style="width:220rpx;"
				@click="handleRouter('/pages/my/children/bigTurntable/index')"></image>
			<image src="@/static/images/my/rwzx-qmtg.png" mode="widthFix" style="width:220rpx;"
				@click="handleRouter('/pages/my/children/share/index')"></image>
			<image src="@/static/images/my/rwzx-jfsc.png" mode="widthFix" style="width:220rpx;"
				@click="handleRouter('/pages/my/children/pointMall/index')"></image>
		
		</view>
		<!-- 日常任务 -->
		<view class="rcrw">
			<view class="title">日常任务</view>
			<view class="body" v-if="pageData">
				<view class="rcrw_item" v-for="(item,index) in pageData.daily.list" :key='index'>
					<view class="left">
						<image :src="item.icon" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<view class="right" style="	 margin-left: 32rpx;">
						<view class="" style="display: flex;flex-direction: column;width: 420rpx;">
							<text class="right_title">{{item.ia_name}}</text>
							<text class="text">{{item.ia_desc}}</text>
						</view>
						<view >
							<text v-if="item.ia_code == 'sign'" @click="signIn(item.finish_flag)" :class="{active:item.finish_flag==2}" class="button">{{item.finish_flag == 1 ? '领&emsp;取' : '已完成'}}</text>
							<text v-else class="button"  @click="handleClick(item.finish_flag,item.ia_id)" :class="{active:item.finish_flag==2}">{{item.finish_flag == 1 ? '去完成' : '已完成'}}</text>
						</view>
					
					</view>
				</view>
			</view>
		</view>
		<!-- 新手任务 -->
		<view class="rcrw">
			<view class="title">新手任务</view>
			<view class="body" v-if="pageData">
				<view class="rcrw_item" v-for="(item,index) in pageData.one.list" :key='index'>
					<view class="left">
						<image :src="item.icon" mode="widthFix" style="width: 60rpx; height: 60rpx;"></image>
					</view>
					<view class="right" style="	 margin-left: 32rpx;">
						<view class="" style="display: flex;flex-direction: column;width: 420rpx;">
							<text class="right_title">{{item.ia_name}}</text>
							<text class="text">{{item.ia_desc}}</text>
						</view>
						<view >
							<text  class="button" :class="{active:item.finish_flag==2}"  @click="handleClick(item.finish_flag,item.ia_id)">{{item.finish_flag == 1 ? '去完成' : '已完成'}}</text>
							
						</view>
					
					</view>
				</view>
			</view>
		</view>
								
		</scroll-view>

	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				pageData:null,

			}
		},
		computed: {
			...mapState({
				userInfo: 'userInfo',
				loginInfo:'loginInfo'
			})
		},
		methods: {
			//获取
			getPageData() {
				this.$api.get("app/integral/task/home",
				).then(res => {
					this.pageData = res.data.data;
				})
			},
	 // 签到
			signIn(type) {
				if(type==1){
					this.$api.get("user/sign/add", {
							token: this.loginInfo.user_token
						
					}).then(res => {
						this.getPageData();
						uni.showToast({
							title:'签到成功！',
							icon:'none',
							success: () => {
								setTimeout(()=>{
									this.$common.getuserInfo()
								},200)
							}
						})

					})
				}
			
			},
			//任务跳转
		handleClick(type,ia_id){
		if(type==1){
		switch (ia_id) {
					// 每日新游
					case 27:
						uni.navigateTo({
							url:`/pages/game/children/special?name=每日新游&id=${3}`
						})
						break;
					case 5:
					case 24:
					case 25:
						uni.switchTab({
							url: `/pages/game/index`
						})
						break;
					case 26:
					uni.navigateTo({
						url:`/pages/index/index`
					})

						break;
					case 2:
					case 23:
					case 9:
					case 7:
						uni.navigateTo({
							url:`/pages/my/myAdministration/index`
						})
						
						break;
				}
			}	
				
			},
			
			
			//路由跳转
			handleRouter(url) {
				uni.navigateTo({
					url
				})
			},
		},
		onShow() {
			this.getPageData()
		}
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

	.tankCenter {
		width: 100%;
		height: 100vh;
		overflow: hidden;
		background-color: #F4F4F4;

		.banner {
			position: relative;

			.myjf {
				position: absolute;
				@include flex-column;
				align-items: flex-start;
				color: #fff;
				left: 32rpx;
				top: 40%;
			}
		}

		.qdjf {
			padding: 40rpx 32rpx;
			background-color: #fff;
			margin-bottom: 20rpx;
			.qdjf_tit {
				margin-bottom: 20rpx;
				color: $xw-black-dark;
				font-weight: 700;
				font-size: $xw-h2-font;
			}
			.qdjf_body{
				@include flex;
				.qdjf_item{
					@include flex-column;
					.qdjf_raidus{
						@include flex;
						justify-content: center;
						width: 50rpx;
						height: 50rpx;
						border: 1px solid #CECECE;
						border-radius: 50rpx;
						margin-bottom: 10rpx;
						
						
					}
				}
				.qdjf_line{
					margin-left: 4rpx;
					width: 50rpx;
					height: 4rpx;
					background-color: #CECECE;
				}
				
			}
		
		}

		.zptz {
			padding: 40rpx 32rpx;
			@include flex;
			margin-bottom: 20rpx;
			background-color: #fff;

			image {
				border-radius: 30rpx;
			}
		}
		.jfrouter{
			@include flex;
			justify-content: flex-start;
			.jfradius{
				width: 40rpx;
				height: 40rpx;
				border-radius:40rpx;
				background-color: rgba(255,255,255,.4);
				@include flex;
				justify-content: center;
			}
		}

		.rcrw {
			padding: 20rpx 32rpx;
			background-color: #fff;
			margin-bottom: 20rpx;

			.title {
				color: $xw-black-dark;
				font-weight: 700;
				font-size: $xw-h3-font;
				margin-bottom: 20rpx;
			}
            .rcrw_item{
				@include flex;
				justify-content: flex-start;
				margin-bottom: 40rpx;
				
			
             .left{
				 width: 100rpx;
				 height: 100rpx;
				 border-radius: 100rpx;
				 border:1px solid #e4e4e4;
				 @include flex;
				 justify-content: center;
			
			 }
			 .right{
				 	@include border-box;
					padding-bottom: 20rpx;
					@include flex;
				 .right_title{
					font-weight: 700;
					font-size: $xw-h4-font;
					
					margin-bottom: 4rpx;
				 }
				 
				 .button{
				 	@include button(32rpx,8rpx,18rpx);
				 	font-weight: 700;
				 	font-size: $xw-font;
					flex-wrap: nowrap;
				 	
				 	
				 }
			 }
			}
		}
		

	}

	.text {
		font-size: $xw-font;
		color: #999;
	}
  .active{
	  background-color: #C1C1C1 !important;
	  color: #fff !important;
	  border: 1px solid #C1C1C1 !important;
  }
</style>
