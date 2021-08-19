<template>
	<view class="record">
		<view class="line"
			style="width:100%; height: 4rpx; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16); background: #FFFFFF;"></view>
		<view class="box">
			<!-- tabs部分 -->
			<view class="tabs" style="padding: 0 32rpx;margin-top: 32rpx;">
				<view class="tabsList" :active="active" v-for="(item,index) in list" @click="tabsClick(index)">
					<view class="tabitem">
						<view class="tabsText" :class="{tabsText1:active==index}">{{item.cate_name}} </view>
						<view :class="{tabsLine:active==index}"></view>
					</view>
				</view>
			</view>
			<view class="swiperBox" style="margin-top: 20rpx;">
				<swiper :current="current" @change='swiperChange' :style="{height:$store.state.myHeight-270+'rpx'}">
					<!-- 充值记录 -->
					<swiper-item class="swiperClass" >
					<scroll-view scroll-y="true" v-if="ObtainList.length>0" :style="{height:$store.state.myHeight-270+'rpx'}" @scrolltolower='scrollLoad1'>
						<view class="bottom" v-for="(item,index) in ObtainList">
							<view class="left">
								<text class="left_1" v-if="item.status==1" >充值失败-未确认</text>
								<text class="left_1" v-if="item.status==2">充值成功</text>
								<text class="left_1" v-if="item.status==3">充值失败</text>
								<text class="left_2">{{item.create_time | dateFormat('yyyy-MM-dd hh:mm')}}</text>
							</view>
							<view class="right">
								<text :class="{textColor:item.status==1}">+{{item.ptb_cnt}}平台币</text>
							</view>
						</view>
						<xw-loadingGif :isShow='isShow1'></xw-loadingGif>
					</scroll-view>
						<nvue-loading v-else></nvue-loading>
					</swiper-item>
					<!-- 消费记录 -->
					<swiper-item class="swiperClass">
					<scroll-view scroll-y="true"  v-if="couponList.length>0" style="height: 1259rpx;" :style="{height:$store.state.myHeight-270+'rpx'}" @scrolltolower='scrollLoad2'>
						<view class="bottom" v-for="(item,index) in couponList">
							<view class="left">
								<text class="left_1" >游戏充值</text>
								
								<text class="left_2">{{item.create_time | dateFormat('yyyy-MM-dd hh:mm')}}</text>
							</view>
							<view class="right">
								<text style="color: #999999;">-{{item.amount}}元</text>
							</view>
						</view>
						<xw-loadingGif :isShow='isShow2'></xw-loadingGif>
					</scroll-view>
						<nvue-loading v-else></nvue-loading>
					</swiper-item>
				</swiper>
			</view>
		
		
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					cate_name: '充值记录'
				}, {
					cate_name: '消费记录'
				}],
				current: 0,
				isShow1:false,
				isShow2:false,
				active:0,
				couponList: [],
				ObtainList: [],

				params: [{
					page: 1,
					offset: 20,
					count:0
				}, {
					page: 1,
					offset: 20,
					count:0
					
				}],
			}
		},
		methods: {
			// 点击头部tabs触发事件
			tabsClick(index) {
				this.current = index;		
			},
			// swiper改变触发事件
			swiperChange(e) {
				this.active = e.detail.current;

			},
			//加载更多
			scrollLoad1(){
				this.isShow1 = true
				setTimeout(()=>{
					if(this.params[0].count>this.ObtainList.length){
						this.params[0].page++
						this.getObtainData()
					}
					this.isShow1 = false
				},1800)
			},
			scrollLoad2(){
				this.isShow2 = true
				setTimeout(()=>{
					if(this.params[1].count>this.couponList.length){
						this.params[1].page++
						this.getExchangeData()
					}
					this.isShow2 = false
				},1800)
			},
			// 1.充值记录
			getObtainData() {
				this.$api.get('/app/ptb/recharge/record_list', {
					...this.params[0]
				}).then(res => {
					if (res.data.code == 200) {
						this.ObtainList =	this.ObtainList.concat(res.data.data.list);
						this.params[0].count =  res.data.data.count

					}else{
						//加载失败
						uni.showToast({
						    title: "加载失败",
						    icon: "none"
						})
					}

				})

			},
			// 2.消费记录
			getExchangeData() {
				this.$api.get('/app/sdk/order/list', {
					...this.params[1]
				}).then(res => {
					if (res.data.code == 200) {
						this.couponList = this.couponList.concat(res.data.data.list) ;
						this.params[1].count =  res.data.data.count
						
					}else{
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
			this.getExchangeData();
			this.getObtainData();
		}

	}
</script>

<style lang="scss" scoped>
	.record{
		height: 100vh;
		overflow: hidden;
	}

	/* 顶置tabs */
	.tabs {
		position: sticky;
		position: -webkit-sticky;
		top: var(--window-top);
		display: flex;
		flex-flow: row;
		z-index: 99;
		background-color: #fff;
	}
  .tabsList{
	  background-color: #fff;
  }
	.tabitem {
		@include flex-column;
		margin-right: 64rpx;
 
		.tabsLine {
			border-radius: 6rpx;
			width: 50rpx;
			height: 6rpx;
			background-color: #FF5927;
		}
		/* 设置默认样式 */
		.tabsText {
			color: $xw-color;
			font-size: $xw-h4-font;
			font-weight: 400;
			margin-bottom: 12rpx;
		
		}
		
		/* 设置点击样式 */
		.tabsText1 {
			color: #1C1C1C;
			font-size: $xw-h3-font;
			font-weight: 700;
		}
		
	}
//swiper部分css */

	.swiperClass {
		display: flex;
		flex-flow: column;
	}

	/* 尾部swiper盒子部分bottom */
	.bottom {
		padding: 0 32rpx;
		height: 162rpx;
		border-bottom: 2rpx solid #ECECEC;
	}

	.left {
		float: left;
		display: flex;
		flex-flow: column;
	}

	.left_1 {
		font-size: xw-h2-font;
		color: #000;
		font-weight: bold;
		font-family: PingFang SC;
		line-height: 90rpx;
	}

	.left_2 {
		font-size: 24rpx;
		color: #999999;
	}

	.right {
		float: right;
		line-height: 162rpx;
		color: #FF4810;
		font-size: $xw-h3-font;
		font-family: PingFang SC;
	}
	.textColor{
		color: #999999;
	}
</style>
