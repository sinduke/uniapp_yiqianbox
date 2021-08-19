<!-- 返利申请 -->
<template>
	<view class="">
	<u-navbar title="" :border-bottom='false' class="u-navbar">
		<slot>
			<view class="title">
				<view class="slot-wrap">
					<text class="customer" style="font-size: 32rpx;font-weight: 400;margin-left: -20rpx;">返利申请</text>
				</view>
				<view class="slot-right">
					<view class="radius" >
						<text class="iconfont" style="font-weight: 400;font-size: 32rpx;" @click="handleRouter({type:1 })" >&#xe645;</text>
					</view>
				</view>
			</view>
		</slot>
	</u-navbar>
	<view class="myshadowLine" style="margin-bottom: 32rpx;"/>
	<view class="rechargeRebate" :style="{height: $store.state.myHeight-184+'rpx'}">
		<view class="search">
			<u-icon color='#C1C1C1' style="margin-right: 10rpx;" name="search" size="28"></u-icon>
			<input type="text" v-model="formData.game_name" :placeholder="$t('my.ssyx')" @confirm="handleSearch" />
		</view>
		<view class="recharscroll" :style="{height: $store.state.myHeight-202+'rpx'}" v-if="list.length>0">
			<scroll-view scroll-y :style="{height: $store.state.myHeight-202+'rpx'}" lower-threshold="100" @scrolltolower="loadMore">
				<view class="cards" v-for="(item,index) in list" v-if="item.is_recycle!=1" :key='index'>
					<u-row style="margin-bottom: 40rpx;">
						<u-col span="11" style="display: flex;">
							<image :src="item.icon" mode="widthFix" @click="handleRouter(item)" style="width: 160rpx;width: 160rpx;margin-right: 24rpx;"></image>
							<view class="cardDetail" @click="handleRouter(item)">
								<text class="gameName">{{item.name}}</text>
								<text class="server text">{{$t('my.dqqf2')}} {{item.server_name}}</text>
								<view class="status text"> <text style="margin-right: 13rpx;">{{$t('my.dqzt2')}}</text>
									<text
										:style="{color:item.is_rebate==1?'#FC6170':item.is_rebate==2?'#2BC8F9':'#000'}">{{item.is_rebate==1?$t('my.ksq4'):item.is_rebate==2?$t('my.ysq4'):item.is_rebate==3?$t('my.bksq'):$t('my.flyff')}}</text>
								</view>
							</view>
						</u-col>
						<u-col span="1">
							<view class="" @click="handleRouter(item)">
								<u-icon color='#C1C1C1' name="arrow-right" size="28"></u-icon>
							</view>
						</u-col>
					</u-row>
					<view class="liner"></view>
				</view>
				<!-- <u-loadmore font-size="20" bg-color="#f5f5f5" :status="status" :icon-type="iconType" v-if="list.length>30" :load-text="loadText" @loadmore="loadMore" /> -->
                   <view style="width: 100%;height: 1rpx;margin-bottom: 80rpx;">
                   	
                   </view>
			</scroll-view>
		</view>
		<nvue-loading v-else></nvue-loading>
	</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					game_name: '',
					page: 1,
					list_rows: 15
				},
				list: [],
				isFliter: true,
				status: "loadmore",
				count: 0,
				formData1: {
					game_name: '',
					page: 1,
					list_rows: 15
				},
			}
		},
		onShow() {
			this.list = []
			this.formData.page = 1
			this.getPageData(this.formData)
		},
		methods: {
			getPageData(data = {}) {
				this.$api.get('rebate/list',{...data}).then(res => {
					if (res.data.code == 200) {
						this.list = this.list.concat(res.data.data.list)
						this.count = res.data.data.count
						if (res.data.data.list.length < this.formData.offset) {
							this.status = "nomore";
						} else {
							this.status = "loadmore";
						}

					}
				})
			},
			//跳转
			handleRouter(data) {
				if(data.is_rebate==1){
					uni.navigateTo({
						url: `/pages/customerService/children/rechargeRebate/children/applicationform?game_id=${data.app_id}&role_id=${data.role_id}&game_name=${data.name}`
					})
				}else if(data.type==1){
					uni.navigateTo({
						url: '/pages/customerService/children/rechargeRebate/children/applicatRecord'
					})
				}
			
			},
			//搜索
			handleSearch() {
				this.list = []
				this.formData.page = 1
				if (this.isFliter) {
					this.isFliter = false
					this.getPageData(this.formData)
					
					setTimeout(() => {
						this.isFliter = true
					}, 300)
					if(this.formData.game_name==null){
						
						this.getPageData(this.formData)
					}
					
				}
			},
			loadMore() {
				if (this.count > this.list.length) {
					this.status = "loading";
					this.formData.page++;
					this.getPageData(this.formData);
				} else {
					this.status = "nomore";
				}

			}

		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('rechargeRebate')
			})
		},

	}
</script>

<style lang="scss" scoped>
	@import '@/common/css/nvue-whith.css';
	.u-navbar {

		.title {
			flex: 1;
			padding: 0 $xw-padding;
			@include flex;
		}
		
		.customer {
			color: $xw-black-dark;
			
			font-weight: 400;
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
	
	
	
	
	.rechargeRebate {
		background-color: #fff;
		@include padding;
		overflow: hidden;
		.search {
			width: 100%;
			padding: 16rpx 30rpx;
			background-color: #f3f3f3;
			display: flex;
			align-items: center;
			border-radius: 40rpx;
			margin-bottom: 30rpx;
			input {
				width: 100%;
			}

		}

		.cardDetail {
			display: flex;
			flex-direction: column;
			width: 80%;

		}

		.cards {
			margin: 20rpx auto;
			border-radius: 30rpx;
			padding: 20rpx 15rpx;

			.gameName {
				font-weight: 700;
				font-size: $xw-h3-font;
				color: $xw-black-dark;
				
			}

			.text {
				color: $xw-color;
				font-size: $xw-font;
			}

			.server {
				margin: 10rpx 0;
			}

			.status {}
			.liner{
				@include border-box;
				width: 76%;
				height: 10rpx;
				float: right;
				// margin-left: 100rpx;
			}
		}


	}

	/deep/.uni-input-placeholder {
		font-size: 26rpx;
		color: #C1C1C1;
	}
</style>
