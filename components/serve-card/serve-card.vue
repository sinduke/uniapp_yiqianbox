<template>
	<view class="">
		<view class="card" :style="{width:$store.state.myWidth-32+'px'}"  >
			<view class="title">
		     <view class="titleLeft">
		     	<text class="title_text"> {{type=='account_buy'?'小号购买提醒':type=='account_sell'?'小号出售提醒': type=='rebate_list'?'返利发放提醒':'我的反馈'}} </text> 
		     </view>
			 <view class="titleRight" v-if="type=='account_buy'||type=='account_sell'">
			 	<text :style="{color:item.status==1?'#19BFFF':item.status==2?'#FF4810':'#666666',fontSize:'28rpx'}">{{item.status==1?'待支付':item.status==2?'已支付':'支付失败'}}</text>  
			 </view>
			 <view class="titleRight" v-if="type=='rebate_list'">
			 	<text :style="{color:item.status==1?'#19BFFF':item.status==2?'#FF4810':'#666666',fontSize:'28rpx'}">{{item.status==1?'待支付':item.status==2?'已支付':'支付失败'}}</text>  
			 </view>
			</view>
			<view class="body" v-if="type=='account_buy'||type=='account_sell'">
				<text class="text">{{item.gamename}}</text>
				<text class="text">当前区服：{{item.server_name}}</text>
				<view class="" style="display: flex;align-items: center;justify-content: space-between;width: 100%;">				
				<text class="text">小号ID：{{item.mg_mem_id}}</text>
				<text style="color: #1C1C1C;font-size: 36rpx;font-weight: 700;">￥{{item.price}}</text>
				</view>
			</view>
			<!-- 返利发放 -->
			<view class="body" v-if="type=='rebate_list'">
				<text class="text">{{item.name}}</text>
				<text class="text">当前区服：{{item.server_name}}</text>
				<view class="" style="display: flex;align-items: center;justify-content: space-between;width: 100%;">				
				<text class="text">小号ID：{{item.mg_mem_id}}</text>
				<!-- <text style="color: #1C1C1C;font-size: 36rpx;font-weight: 700;">￥{{item.price}}</text> -->
				</view>
			</view>
			<!-- 我的反馈 -->
			<view class="body" v-if="type=='feedback'">
				<text class="text">{{item.content}}</text>
				<view class="feedback">	
				<text class="text">官方回复：{{item.reply_content}}</text>
				</view>
			</view>
			<view class="timer text">{{item.create_time|dateFormat('yyyy/MM/dd hh:mm:ss')}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:{
				type:Object,
				default:()=>{}
			},
			type:{
				type:String,
			}
		}
	}
</script>

<style scoped lang="scss">
	.card{
		  background-color:$xw-page-backgrouncolor;
		  margin: 0 auto;
		  border-radius: 20rpx;
		  padding: 24rpx 32rpx;	
		  margin-bottom: 48rpx;
		  
	.title{
		@include flex;
			margin-bottom: 6rpx;
		.title_text{
			color: $xw-black-dark;
			font-size: $xw-h3-font;
			font-weight: 700;
		}
	}
	.body{
		@include flex-column;
		align-items: flex-start;
	}
	}
	.text{
		color: $xw-color;
		font-size: $xw-font;
		margin: 6rpx 0;
	}
	.lines{
		background-color: #E9E9E9;
		height: 1px;
		width: 100%;
		margin: 6rpx 0;
	}
	.feedback{
		width: 100%;
		background-color: #E4E4E4;
		border-radius: 14rpx;
		padding:6rpx 16rpx;
		margin: 8rpx 0;
	}
</style>
