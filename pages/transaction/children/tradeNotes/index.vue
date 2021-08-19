<!-- 交易须知 -->
<template>
	<view class="tradeNotes">
		<view class="shadow"/>
		<view class="body">
			<view class="title">
				<text class="title_text">抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防受骗上当。适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。</text>
			</view>
			<view class="purchase" style="margin-bottom: 64rpx;">
				<view class="my_title" style="margin-bottom: 64rpx;">购买流程</view>
			    <view class="purchase_body">
					<view class="purchase_Back">选择商品</view>
					<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(180deg);"></image>
					<view class="purchase_Back"> 浏览或搜索角色</view>
					<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(180deg);"></image>
					<view class="purchase_Back">下单购买</view>
					<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(180deg);"></image>
					<view class="purchase_Back">支付完成</view>
			    </view>
				<view class="purchase_bottom">
					<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(-90deg);margin-bottom: 12rpx;"></image>
					<view class="text purchase_but" style="color: #FF5927;">选择购买的小号登录游戏</view>
				</view>
			</view>
			<view class="nodes" style="margin-bottom: 32rpx;">
				<view class="my_title" style="margin-bottom: 32rpx;">买家须知</view>
			    <view class="nodes_body">
			    	<view class="nodes_tlt"> <view class="nodes_raidus">1</view> <text class="text">购买后，角色小号自动转入你的app账号，登录游戏即可查收角色。</text></view>
			    	<view class="nodes_tlt"> <view class="nodes_raidus">2</view> <text class="text">交易账号审核时间一般是工作日24小时之内，节假日可能会有延时。</text></view>
			    	<view class="nodes_tlt"> <view class="nodes_raidus">3</view> <text class="text">交易账号所获取的金额为平台币（平台币不支持提现），卖家可在《我的》-《平台币》-《我的钱包》-查看明细。</text></view>
			    	<view class="nodes_tlt"> <view class="nodes_raidus">4</view> <text class="text">因为平台币的特殊性和各方面的因素，决定了平台币不能购买账号，请悉知。</text></view>
			    </view>
			</view>
			<view class="purchase" style="margin-bottom: 32rpx;">
				<view class="my_title" style="margin-bottom: 32rpx;">出售流程</view>
			    	<view class="purchase_body">
			    		<view class="purchase_Back">进入交易</view>
			    		<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(180deg);"></image>
			    		<view class="purchase_Back"> 选择游戏</view>
			    		<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(180deg);"></image>
			    		<view class="purchase_Back">选中小号</view>
			    		<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(180deg);"></image>
			    		<view class="purchase_Back">填写角色信息</view>
			    	</view>
					<view class=""style="width: 100%;display: flex;justify-content: flex-end;">
						
					<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" style="transform:rotate(-90deg);margin: 12rpx 62rpx;"></image>
					</view>
					<view class="purchase_body" >
						<view class="purchase_Back">收到平台币</view>
						<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" ></image>
						<view class="purchase_Back"> 买家购买</view>
						<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" ></image>
						<view class="purchase_Back">上架出售</view>
						<image src="@/static/images/transaction/nodes_left.png" mode="widthFix" class="purchase_image" ></image>
						<view class="purchase_Back">提交审核</view>
					</view>
			
			</view>
		    <view class="nodes" style="margin-bottom: 12rpx;">
		    	<view class="my_title" style="margin-bottom: 32rpx;">回收须知</view>
		        <view class="nodes_body">
		        	<view class="nodes_tlt"> <view class="nodes_raidus">1</view> <text class="text">具有实际充值记录的小号，可按照实际充值5%金额回收平台币，平台币可用于其他游戏充值。</text></view>
		        	<view class="nodes_tlt"> <view class="nodes_raidus">2</view> <text class="text">部分较老或者已经关服很久的游戏不支持回收功能，回收后24小时可赎回，逾期不可赎回。</text></view>
		        	<view class="nodes_tlt"> <view style="width: 60rpx;margin-right: 24rpx;"></view> <text class="text" style="color:#FF4810">仅支持平台币赎回，回收后，请手动退出游戏，切勿再往角色充值！</text></view>
		    
		        </view>
		    </view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
  .tradeNotes{
	  width: 100%;
	  // height: 100%;
	  background-color: #FFFFFF;
	  overflow-y: scroll;
	 
	  .shadow{
		  width: 100%;
		  height: 10rpx;
		  // background-color: #FF0000;
		  box-shadow: 0px 0px 8rpx 0px rgba(210, 210,210, 0.8);
		  margin-bottom: 60rpx;
		
	  }
	  .body{
		  @include padding;
	  }
	  .title{
		  background-color: #fff;
		  padding-bottom: 40rpx;
		  margin-bottom: 32rpx;
		  @include border_box;
		  .title_text{
			  font-size: $xw-h4-font;
			  font-weight: 700;
		  }
	  }
	  .my_title{
		font-size: $xw-h4-font;
		font-weight: 700;
	  }
	  .purchase_body{
		  @include flex;
		  flex-wrap: nowrap;
		  .purchase_Back{
			  width: 160rpx;
			  height: 160rpx;
			  background: url(../../../../static/images/transaction/nodes_background.png) no-repeat center;
			  background-size: 100%;
			  @include flex;
			  justify-content: center;
			  font-size: $xw-font;
			  color: $xw-color-z;
			  padding:0 24rpx;
		  }
		 
	  }
	  .purchase_bottom{
          @include flex-column;
		  .purchase_but{
			 @include button(60rpx,20rpx,64rpx);
			 font-size: $xw-h4-font;
			 font-weight:600;
		
		  }
		  
	  }
	  .purchase_image{
	  	 width: 32rpx;
	     height: 32rpx;
	  }
	  .nodes_body{
		  @include border_box;
		  padding-bottom:14rpx;
		  .nodes_raidus{
			  color: $xw-color-z;
			  display: inline-block;
			  margin-right: 24rpx;
			  padding: 3rpx 15.5rpx;
			  border-radius: 50rpx;
			  border: 1px solid #EFEFEF;
		  }
		  .nodes_tlt{
			  margin-bottom: 24rpx;
			  @include flex;
			  align-items: flex-start;
		  }
	  }
	  .text{
		 font-size: $xw-h5-font;
		  font-weight: 400;
		  color: $xw-color;
	  }
  }
</style>
