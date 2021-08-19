<!-- 商品详情 -->
<template>
	<view class="">
	<view class="myshadowLine"/>
	<view  class="container" v-if="pageData">
		<u-row gutter="20" class="game" @click="handleRouter('/pages/view/gamedetail/gamedetail?gameid='+pageData.game_id)">
			<u-col span="3">
				<u-image :lazy-load="false" :src="pageData.game_icon||pageData.game_new_icon" width="176" height="176"></u-image>
			</u-col>
			<u-col span="6.5" class="h2 gamename" style="margin-left: 24rpx;">{{pageData.gamename}}</u-col>
			<u-col span="2" style="text-align: right;" >
				<u-icon name="arrow-right" color="#888" size="28"></u-icon>
			</u-col>
		</u-row>
		<view class="xiaohao" >
			<view style="margin-bottom: 24rpx;" class="text">区服：<text>{{pageData.server_id}}</text></view>
			<view style="margin-bottom: 24rpx;" class="text role_id">{{$t('trumpet')}}ID：<text class="fw">{{pageData.role_id}}</text></view>
			<view class="text" style="display: flex;justify-content: space-between;align-items: center;"> <text style="font-weight: 700;color: #1C1C1C;font-size: 32rpx;">￥{{pageData.price | keepOne(2)}}</text> <text class="buttons"  @click="show = true">购买</text></view>
		</view>
		<view class="leiji">
			 <view class="text" style="margin-bottom: 24rpx;"> {{$t('my.ljcz')}}：{{pageData.sum_money}}元</view>
			 <view class="text">{{$t('my.sjsj')}}：{{pageData.create_time | dateFormat("yyyy-MM-dd hh:mm")}} </view>
		</view>
		
		
		
		<u-row class="desc">
			<u-col class="h3">
				{{$t('my.mjms')}}
			</u-col>
			<u-col class="text" style="margin-bottom: 24rpx;">
				{{pageData.description}}
			</u-col>
			<u-col span="4" class="image" v-for="(item,index) in images" :key="index">
					<u-image :lazy-load="false" :src="item" width="100%" mode="widthFix" border-radius="20" height="146rpx" @click="$common.previewImage(index, images)"></u-image>
			</u-col>
		</u-row>

		<!-- 买家须知 -->
		<u-popup v-model="show" height="560rpx" length="80%" border-radius="60" mode="center">
		  <view class="" style="padding:32rpx;">
		  	<view class="" style="font-weight: 700; font-size: 32rpx;color: #1C1C1C;margin-bottom: 24rpx;">
		  		{{$t('my.mjxz')}}
		  	</view>
		  	<view class="slot-content">
		  		<view>1.{{$t('my.jsxxytg')}}；</view>
		  		<view>2.{{$t('my.gmjszjzr')}}。</view>
		  		<view>3.{{$t('my.ysjyszcd')}}；</view>
		  		<view>4.{{$t('my.gmhbkth')}}</view>
		  	</view>
			<view class="mybutton">
				<text class="buttonText h2"  @click="show=false">取 消</text>
				<text class="h2 buttonText1" @click="handleRouter(`/pages/view/payMethods/index?goods_id=${pageData.goods_id}`)">确 认</text>
			</view>
			
		  </view>
			
		</u-popup>
	</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				pageData: null,
				show: false,
				type:0,
			}
		},
		computed: {
			images() {
				if (JSON.parse(this.pageData.image).length == 1) {
					return JSON.parse(this.pageData.image)[0].split(",")
				} else {
					return JSON.parse(this.pageData.image)
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('Productdetails')
			})
		},
		methods: {
			getData(params) {
				this.$api.get( "account/goods/detail",{
					...params
				}).then(res => {
					this.pageData = res.data.data;
				})
			},
			handleRouter(url){
				uni.navigateTo({
					url
				})
			}
		},
		onLoad(options) {
			this.getData({
				goods_id: options.goods_id
			})
			// this.type = options.type
		}
	}
</script>


<style lang="scss" scoped>
	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 60rpx;
	
	}
	.container {
		@include padding;
		position: relative;

		.game {
			width: 100%;
			margin-bottom: 32rpx;

			.gamename {
				@include overflow;
				font-size: $xw-h2-font;
				font-weight: 700;
			}
		}

		.xiaohao {
			
			@include border-box;
			padding-bottom: 48rpx;
               .text{
				   font-size: $xw-font;
				   color: $xw-color;
				   
			   }
			   .buttons{
				   @include button(32rpx,8rpx,32rpx);
				   font-weight: 300;
				   font-size: $xw-font;
			   }
			.id {
				line-height: 40rpx;

				.role_id {
					@include overflow;
				}

				.fw {
					font-weight: 700;
				}
			}

		}
		.leiji{
			margin-top: 48rpx;
			padding-bottom: 48rpx;
			@include border-box;
		}

		.desc {
			margin-top: 48rpx;
			.h3{
				margin: 24rpx 0;
				font-size: $xw-h2-font;
				font-weight: 700;
				color: $xw-black-dark;
			}
			.image {
				// margin-top: $xw-margin-base;
				margin-bottom: 40rpx;
			}
		}

		.btn {
			width: 100%;
			position: fixed;
			bottom: 10rpx;
			left: 0;
		}

		// 弹出窗口
		.slot-content {
			// padding: $xw-padding-base;
			font-size: $xw-font;
			color: $xw-color;
			line-height: 40rpx;
			margin-bottom: 72rpx;
			view{
				margin-bottom: 4rpx;
			}
		}
	}
	.text {
		font-size: $xw-font;
		color: $xw-color;
		line-height: 40rpx;
	}
	.mybutton {
		/* flex: 1; */
		height: 88rpx;
		@include flex;
		margin-bottom: 24rpx;
		border-radius: 46rpx;
		background-color: #EFEFEF;
		overflow:hidden;
		.buttonText {
			display: inline-block;
			color: #666;
			padding: 18rpx 90rpx;
			border-radius: 46rpx;
			white-space: nowrap;
		
		}
		.buttonText1 {
			display: inline-block;
			white-space: nowrap;
			color: #FF5927;
			padding: 18rpx 100rpx 18rpx 100rpx;
			background-color: #FFFFFF;
			border: 1px solid #FF5927;
			border-bottom-right-radius: 46rpx;
			border-bottom-left-radius: 46rpx;
			border-top-right-radius: 46rpx;

		}
	}
		

	

</style>
			</u-col>
			<u-col span="6.5" class="h2 gamename" style="margin-left: 24rpx;">{{pageData.gamename}}</u-col>
			<u-col span="2" style="text-align: right;" >
				<u-icon name="arrow-right" color="#888" size="28"></u-icon>
			</u-col>
		</u-row>
		<view class="xiaohao" >
			<view style="margin-bottom: 24rpx;" class="text">区服：<text>{{pageData.server_id}}</text></view>
			<view style="margin-bottom: 24rpx;" class="text role_id">{{$t('trumpet')}}ID：<text class="fw">{{pageData.role_id}}</text></view>
			<view class="text" style="display: flex;justify-content: space-between;align-items: center;"> <text style="font-weight: 700;color: #1C1C1C;font-size: 32rpx;">￥{{pageData.price | keepOne(2)}}</text> <text class="buttons"  @click="show = true">购买</text></view>
		</view>
		<view class="leiji">
			 <view class="text" style="margin-bottom: 24rpx;"> {{$t('my.ljcz')}}：{{pageData.sum_money}}元</view>
			 <view class="text">{{$t('my.sjsj')}}：{{pageData.create_time | dateFormat("yyyy-MM-dd hh:mm")}} </view>
		</view>
		
		
		
		<u-row class="desc">
			<u-col class="h3">
				{{$t('my.mjms')}}
			</u-col>
			<u-col class="text" style="margin-bottom: 24rpx;">
				{{pageData.description}}
			</u-col>
			<u-col span="4" class="image" v-for="(item,index) in images" :key="index">
					<u-image :lazy-load="false" :src="item" width="100%" mode="widthFix" border-radius="20" height="146rpx" @click="$common.previewImage(index, images)"></u-image>
			</u-col>
		</u-row>

		<!-- 买家须知 -->
		<u-popup v-model="show" height="560rpx" length="80%" border-radius="60" mode="center">
		  <view class="" style="padding:32rpx;">
		  	<view class="" style="font-weight: 700; font-size: 32rpx;color: #1C1C1C;margin-bottom: 24rpx;">
		  		{{$t('my.mjxz')}}
		  	</view>
		  	<view class="slot-content">
		  		<view>1.{{$t('my.jsxxytg')}}；</view>
		  		<view>2.{{$t('my.gmjszjzr')}}。</view>
		  		<view>3.{{$t('my.ysjyszcd')}}；</view>
		  		<view>4.{{$t('my.gmhbkth')}}</view>
		  	</view>
			<view class="mybutton">
				<text class="buttonText h2"  @click="show=false">取 消</text>
				<text class="h2 buttonText1" @click="handleRouter(`/pages/view/payMethods/index?goods_id=${pageData.goods_id}`)">确 认</text>
			</view>
			
		  </view>
			
		</u-popup>
	</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				pageData: null,
				show: false,
				type:0,
			}
		},
		computed: {
			images() {
				if (JSON.parse(this.pageData.image).length == 1) {
					return JSON.parse(this.pageData.image)[0].split(",")
				} else {
					return JSON.parse(this.pageData.image)
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('Productdetails')
			})
		},
		methods: {
			getData(params) {
				this.$api.get( "account/goods/detail",{
					...params
				}).then(res => {
					this.pageData = res.data.data;
				})
			},
			handleRouter(url){
				uni.navigateTo({
					url
				})
			}
		},
		onLoad(options) {
			this.getData({
				goods_id: options.goods_id
			})
			// this.type = options.type
		}
	}
</script>


<style lang="scss" scoped>
	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 60rpx;
	
	}
	.container {
		@include padding;
		position: relative;

		.game {
			width: 100%;
			margin-bottom: 32rpx;

			.gamename {
				@include overflow;
				font-size: $xw-h2-font;
				font-weight: 700;
			}
		}

		.xiaohao {
			
			@include border-box;
			padding-bottom: 48rpx;
               .text{
				   font-size: $xw-font;
				   color: $xw-color;
				   
			   }
			   .buttons{
				   @include button(32rpx,8rpx,32rpx);
				   font-weight: 300;
				   font-size: $xw-font;
			   }
			.id {
				line-height: 40rpx;

				.role_id {
					@include overflow;
				}

				.fw {
					font-weight: 700;
				}
			}

		}
		.leiji{
			margin-top: 48rpx;
			padding-bottom: 48rpx;
			@include border-box;
		}

		.desc {
			margin-top: 48rpx;
			.h3{
				margin: 24rpx 0;
				font-size: $xw-h2-font;
				font-weight: 700;
				color: $xw-black-dark;
			}
			.image {
				// margin-top: $xw-margin-base;
				margin-bottom: 40rpx;
			}
		}

		.btn {
			width: 100%;
			position: fixed;
			bottom: 10rpx;
			left: 0;
		}

		// 弹出窗口
		.slot-content {
			// padding: $xw-padding-base;
			font-size: $xw-font;
			color: $xw-color;
			line-height: 40rpx;
			margin-bottom: 72rpx;
			view{
				margin-bottom: 4rpx;
			}
		}
	}
	.text {
		font-size: $xw-font;
		color: $xw-color;
		line-height: 40rpx;
	}
	.mybutton {
		/* flex: 1; */
		height: 88rpx;
		@include flex;
		margin-bottom: 24rpx;
		border-radius: 46rpx;
		background-color: #EFEFEF;
		overflow:hidden;
		.buttonText {
			display: inline-block;
			color: #666;
			padding: 18rpx 90rpx;
			border-radius: 46rpx;
			white-space: nowrap;
		
		}
		.buttonText1 {
			display: inline-block;
			white-space: nowrap;
			color: #FF5927;
			padding: 18rpx 100rpx 18rpx 100rpx;
			background-color: #FFFFFF;
			border: 1px solid #FF5927;
			border-bottom-right-radius: 46rpx;
			border-bottom-left-radius: 46rpx;
			border-top-right-radius: 46rpx;

		}
	}
		

	

</style>
