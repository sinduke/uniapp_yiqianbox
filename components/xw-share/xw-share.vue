<template>
	<view class="xw-share">
		<xw-popup v-model="show" mode="bottom" height='560' @close="close">
			<view class="share-btn">


				<view class="popup_grid" style="transform: translateY(10%);" v-if="isShow">


				</view>
				<view class="share1" v-if="isShow">
					<view class="share-btn-item" @click="share('WXSceneSession','weixin')">
						<u-image src="@/static/images/wx-icon.png" width="80rpx" mode="widthFix"
							style="margin: 0 auto;" />
						<text class="text">微信</text>
					</view>
					<view class="share-btn-item" @click="share('','sinaweibo')">
						<u-image src="@/static/images/weibo-share.png" width="80rpx" mode="widthFix"
							style="margin: 0 auto;" />
						<text class="text">微博</text>
					</view>
					<!-- <view class="share-btn-item">
						<u-image src="@/static/images/wb-login.png" width="80rpx" mode="widthFix"
							style="margin: 0 auto;" />
						<text class="text">微博</text>
					</view> -->
				</view>
				<view class="share2" v-if="isShow">
					<view class="share-btn-item" @click="share('','qq')">
						<u-image src="@/static/images/QQ-share.png" width="80rpx" mode="widthFix" />
						<text class="text">QQ</text>
					</view>
					<view class="share-btn-item" @click="share('WXSenceTimeline','weixin')">
						<u-image src="@/static/images/pengyouquan-share.png" width="80rpx" mode="widthFix"/>
						<text class="text">朋友圈</text>
					</view>
				</view>
				
				<view class="share3" v-if="isShow">
					<view class="share-btn-item" @click="copy">
						<u-image src="@/static/images/fzlj-share.png" width="80rpx" mode="widthFix" />
						<text class="text">复制链接</text>
					</view>
				</view>

				<view class="share" @click="isShow=!isShow">
					<view class="shareitem"	style="width: 80rpx;height: 80rpx;background-color: #f2f2f2f2;border-radius: 50%;margin-bottom: 12rpx;display: flex;justify-content: center;align-items: center;">
						<image src="@/static/images/fx-share.png" mode="widthFix" style="width: 60rpx;height: 60rpx">
						</image>
					</view>
					<text class="text">分享</text>
				</view>
				<view class="close" @click="close">
					<image src="@/static/images/comment-close.png" mode="widthFix" style="width: 40rpx;height: 40rpx;">
					</image>
				</view>

			</view>
		</xw-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				show: true,
				isShow: false,
			}

		},
		props:{
			shareData:{
				type:Object,
				default:()=>{}
			},
			type:{
				type:String,
				default:''
			}
		},
		computed: {
		...mapState({userFormat:'userFormat'})
		},
		methods: {
			share(type,status) {
				if(status=='qq'){
					uni.share({
						provider:status,
						scene:type,
						type: 1,
						href: this.shareData.url,
						title: this.shareData.title,
						summary: this.shareData.content,
						success: res=> {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
						}
					});
				}else{
					uni.share({
						provider:status,
						scene:type,
						type: 0,
						href: this.shareData.url,
						title: this.shareData.title,
						summary: this.shareData.content,
						imageUrl:this.userFormat.icon_share ? this.userFormat.icon_share : this.userFormat.icon,
						success: res=> {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
					      console.log(err,'ssssssssssssssssssss')
						  if(err.errCode==15){
							  uni.showToast({
							  	title:err.errMsg,
							  	icon:'none'
							  })
						  }
						 
						}
					});
				}
			},
			//复制
			copy(){
			this.$common.copyText(this.shareData.url)
			},
			close() {
				this.$emit('close', true)
			}
		},

	}
</script>

<style scoped lang="scss">
	/deep/.u-drawer-bottom[data-v-44d673c4] {
		background-color: transparent;
	}
   /deep/.uni-scroll-view{
	   overflow: hidden !important;
   }
	.share-btn {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-content: center;
		background: url(../../static/images/popup_whith.png) no-repeat center;
		background-size: 100%;
		background-position: 0 -20rpx;
	}
		.share-btn-item {
			width: 20%;
			@include flex-column;
			text {
				margin-top: 10prx;
			}
		}
		
	.popup_grid {
		z-index: -1;
		position: absolute;
		width: 100%;
		height: 100%;
		background: url(../../static/images/popup_grid.png) no-repeat center;
		background-size: 100%;
		background-position: 0 -20rpx;
	}


	.close {
		position: absolute;
		bottom: 30rpx;
		background-color: #F2F2F2;
		width: 80rpx;
		height: 80rpx;
		bottom: 40rpx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 50%;
		@include flex;
		justify-content: center;

	}

	.share {
		position: absolute;
		bottom: 160rpx;
		left: 50%;
		transform: translateX(-50%);

		@include flex-column;
		justify-content: center;

	}

	.text {
		font-size: $xw-small-font;
		color: $xw-black-dark;
		font-weight: 700;
		white-space: nowrap;

	}

	.share1 {
		display: flex;
		justify-content: space-between;
		width: 100%;
		position: absolute;
		top: 30%;
		z-index: 1;
	}
	.share2{
		z-index: 2;
		display: flex;
		position: absolute;
		justify-content: space-between;
		width: 56%;
		top: 20%;
	}
	.share3{
		z-index: 3;
		display: flex;
		justify-content: space-between;
		width: 20%;
		position: absolute;
		left: 58%;
		transform: translateX(-50%);
		top: 12%;
	}
</style>
