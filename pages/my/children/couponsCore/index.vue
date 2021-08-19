<!-- 领券中心 -->
<template>
	<view class="couponsCore"> 
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer" style="font-weight: 400;margin-left: -20rpx;font-size: 32rpx;">领券中心</text>
					</view>
					<view class="slot-right">
						<view class="radius">
							<text class="iconfont" style="font-weight: 400;font-size: 34rpx;"
								@click="handleRouter('/pages/my/coupons/coupons')">&#xe622;</text>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
	<scroll-view scroll-y="true" :style="{height:$store.state.mysHeight-152+'rpx'}">
	<view class="banner">
		<image src="@/static/images/my/lqzx-banner.png" mode="widthFix" style="width: 100%;"></image>
	</view>
		<view class="timer">
			<view class="" style="display: flex;flex-direction: column; align-items: center;">
			   <text class="timers" style="margin-right: 110rpx;">{{new Date()/1000|dateFormat('yyyy.MM.dd')}}</text>
			   <view class="" style="display: flex;align-items: center;">
			   	<text class="timerBut">今日</text>	<view class="lines"></view>
			   </view>
			   
			</view>
		
			<view class="" style="display: flex;flex-direction: column; align-items: center;">
			   <text class="timers" style="margin-right: 110rpx;">{{new Date()/1000+86400|dateFormat('yyyy.MM.dd')}}</text>
			   <view class="" style="display: flex;align-items: center;">
			   <text class="timerBut" style="border: 1px solid #E1E1E1;color: #999;padding: 12rpx 24rpx;font-weight: 300;">即将开始</text>
			   <view class="lines"></view>
			   </view>
			   
			</view>
			<view class="" style="display: flex;flex-direction: column; align-items: center;">
			   <text class="timers">{{new Date()/1000+(86400*2)|dateFormat('yyyy.MM.dd')}}</text>
			   <text class="timerBut" style="border: 1px solid #E1E1E1;color: #999;padding: 12rpx 24rpx;font-weight: 300;">即将开始</text>
	
			</view>
		</view>
		<view class="cars">
			<view class="title">今日好券</view>
			<scroll-view scroll-x="true" scroll-left="120" :style="{width:$store.state.myWidth-60+'px'}" style="height: 360rpx;" v-if="lengthList">
				<view class="" style="display: flex;">
					<view class="cardsItem" v-for="(item,index) in onpage" :key='index' >
					    <view class="item_backgound" @click="toDetail(item.game_id)">
							<view class="title">￥ <text class="Title">{{item.coupons_amount}}</text></view>
							<text class="Title1">{{item.title}}</text>
							<text class="Title2">{{item.name}}</text>
					    	<text v-if="!item.have_got" class="Title3" @click.stop="handleClick(item.id,item.period_type)">立即领取</text>
					    	<text v-else class="Title3" style="color: #C1C1C1;">已领取</text>
					    </view>				
					</view>
				</view>
			</scroll-view>
			<nvue-loading v-else style="height: 500rpx;margin-top: -50rpx;"></nvue-loading>
		</view>
		
		<view class="cars">
			<view class="title" style="margin-bottom: 40rpx;">优选好券</view>
			<couplist></couplist>
		</view>
		
	</scroll-view>
	
	

	
	
	
	</view>
</template>

<script>
	import couplist from './children/couplist.vue'
	export default {
		components: {
			couplist
		},
		data() {
			return {
				lengthList:0,
				onpage:null,
				active:0,
				myGame:[
					
				]
			}
		},
		methods: {
			handleRouter(url){
				uni.navigateTo({
					url
				})
			},
			toDetail(id){
				uni.navigateTo({
					url: `/pages/view/gamedetail/gamedetail?gameid=${id}`
				})
			},
			//点击领取
			handleClick(id,period_type){
			this.$api.get("user/coupons/add",{coupon_id: id,period_type		
				}).then(res=>{
					
					if(res.data.code == 200){
						uni.showToast({
						  icon: "none",
						  title: res.data.msg
						})
					}else{
						uni.showToast({
						  icon: "none",
						  title: res.data.msg
						})
					}
					this.getOneData()
				})
			},
			
			
			
			//今日优惠券
			getOneData(){
				this.$api.get('/user/coupons/today_list').then(res=>{
					if(res.data.code==200){
					this.onpage = res.data.data.list
					this.lengthList = res.data.data.list.length
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none',
						})
						return
					}
				
				})
			},

			
		},
		onLoad() {
			this.getOneData()
		}
	}
</script>

<style scoped lang="scss">
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

	.couponsCore{
		background-color: #F7F7F7;
		overflow: hidden;
		height: 100vh;
		.timer{
			padding: 22rpx 32rpx;
			@include flex;
			.timers{
				color: $xw-color-z;
				font-weight: 700;
				margin-bottom: 10rpx;
			}
			.timerBut{
				@include button(32rpx,12rpx,48rpx);
				font-weight: 700;
				font-size: $xw-font;
				white-space: nowrap;
			}
			.lines{
				height: 10rpx;
				width: 120rpx;
				background-color: #F1F1F1;
			}
		}
		.cars{
			padding: 40rpx 20rpx;
			width: 90%;
			margin: 40rpx auto;
			background-color: #fff;
			border-radius:45rpx ;
			.title{
				font-size: $xw-h2-font;
				font-weight: 700;
				color: $xw-black-dark;
				
			}
			.cardsItem{
				margin-right: 20rpx;
				display: inline-block;
		
				
			}
			.item_backgound{
				width: 260rpx;
				height: 400rpx;
				background: url(../../../../static/images/my/lqzx-back.png) no-repeat center;
				background-size: 100%;
				@include flex-column;
				justify-content: flex-end;
				.Title{
					font-size: 40rpx; 
					font-weight: 700;
					color: $xw-black-dark;
					
				}
				.Title1{
					font-size: $xw-h3-font; 
					// font-weight: 700;
					color:#666666;
					margin: 14rpx 0;
					@include overflow;
					
				}
				.Title2{
					width: 220rpx;
					font-size: $xw-h5-font; 
					font-weight: 600;
					color: #C1C1C1;
					@include overflow;
					
				}
				.Title3{
					font-size: $xw-h4-font;
					font-weight: 700;
					color: $xw-color-z;
					margin: 65rpx 0 52rpx 0;
					
				}
			}
		}
	}
     
</style>
