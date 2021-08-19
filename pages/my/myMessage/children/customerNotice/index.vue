<template>
	<view class="customerNotice">
		<!-- 自定义导航栏 -->
			<u-navbar title="" :border-bottom='false' class="u-navbar">
				<slot>
					<view class="title">
						<view class="slot-wrap">
							<text class="customer">客服通知</text>
						</view>
						<view class="slot-right">
							<!-- <view class="radius">
								<text class="iconfont" style="font-weight: 600;font-size: 34rpx;" @click="isActive=false" v-if="isActive">&#xe608;</text>
								<text class="iconfont" style="font-weight: 600;font-size: 34rpx;" @click="handleDelete" v-else>&#xe8b0;</text>
							</view> -->
						</view>
					</view>
				</slot>
			</u-navbar>
			
		<view class="line" style="box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);background: #FFFFFF;height: 12rpx;"></view>
		<view class="container" >
			<scroll-view scroll-y="true" v-if="pageData" :style="{height:$store.state.mysHeight-200+'rpx'}">
				<view class=""style="height: 48rpx;width: 100%;"></view>
				<view>
					<view class="">
						<!-- 小号购买 -->
						<view class="account_buy" v-for="(item,index) in pageData['account_buy']" :key='index' v-if="index<5">
						      <serve-card :item='item' type='account_buy'></serve-card>
						</view>
					</view>
					<view class="">
						<!-- 小号出售 -->
						<view class="account_buy" v-for="(item,index) in pageData['account_sell']" :key='index' v-if="index<5">
						      <serve-card :item='item' type='account_sell'></serve-card>
						</view>
					</view>
				<view class="">
					<!-- 返利发放 -->
					<view class="account_buy" v-for="(item,index) in pageData['rebate_list']" :key='index' v-if="index<5">
						  <serve-card :item='item' type='rebate_list'></serve-card>
					</view>
				</view>
				<view class="">
					<!-- 我的反馈 -->
					<view class="account_buy" v-for="(item,index) in pageData['feedback']" :key='index' v-if="index<5">
						  <serve-card :item='item' type='feedback'></serve-card>
					</view>
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
				pageData:null,
				// likeDate:[],
				isActive:false,
				params:{
					page:1,
					count:0,
					offset:15
	
				}
			}
		},
		methods: {
		  handleDelete(){
			  
		  },
		  //获取列表
		  getPageData(){
			  this.$api.get("service/service_notice",{
			  	...this.params
			  }).then(res=> {
				  if(res.data.code==200){
					this.pageData = res.data.data
				  }
				  
			  })
		  }
		},
		onLoad(){
			this.getPageData()
		}
	}
</script>

<style lang="scss" scoped>
	.customerNotice{
		height: 100vh;
		overflow: hidden;
	}
	.container{
		@include padding;
	}
	.u-navbar {

		.title {
			flex: 1;
			padding: 0 $xw-padding;
			@include flex;
		}
		.customer {
			color: $xw-black-dark;
			font-size: 32rpx;
			font-weight: 400;
			margin-left: -20rpx;
		}
		.radius {
			width: 64rpx;
			height: 64rpx;
			border-radius: 50%;
			box-shadow: 0px 0px 8px rgba(111, 111, 111, 0.16);
			@include flex;
			justify-content: center;
		}
	}

	.bottom2 {
		position: fixed;
		bottom: 0;
		height: 120rpx;
		width: 100%;
		@include padding;
		@include flex;
		background-color: #fff;
	
		.button {
			@include button(32rpx, 12rpx, 140rpx);
			font-size: $xw-font;
			font-weight: 500;
			@include overflow;
		}
	}
	.text {
		font-size: $xw-font;
		color: $xw-color;
		margin-right: 8rpx;
	}
</style>
