<template>
	<view class="downLoad">
		<view style="margin-top: 80rpx; " title="" :border-bottom='false' >
			<view>
				<view class="title">
					<view class="slot-wrap" style="align-items: center;display: flex;flex-wrap: row;" @click="goback">
						<image  ref='handleBack' style="margin-right: 50rpx;width: 35rpx;height: 35rpx;" src="@/static/images/left.png" ></image>
						<text class="customer" style="font-size: 32rpx;font-weight: 400;margin-left: -20rpx;">下载管理</text>
					</view>
					<view class="slot-right">
						<view class="radius">
							<image @click="isActive=false"  style="font-weight: 400;font-size: 32rpx;width: 40rpx;height: 40rpx;" v-if="isActive" src="@/static/images/my/xxxx.png" mode=""></image>
							<image  @click="handleDelete"  style="font-weight: 400;font-size: 32rpx;width: 40rpx;height: 40rpx;" v-else src="@/static/images/my/rwzx-xgnc.png" mode=""></image>
							
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="Body">
			<view class="cards" v-for="(item,index) in pageList" :key='item.game_id'>
				<view class="" v-if="isActive" style="margin-right: 12rpx;width: 40rpx;height: 40rpx;"	@click="handleDel(index)">
					<view v-if="!item.noActive" style="width: 40rpx;height: 40rpx;border-radius: 40rpx;border: 1px solid #EFEFEF;"></view>
					<image v-else src="@/static/images/view/down_acitve.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="">
					<image  @click="toDetail(item)" @longpress='longpress(index)' :src="item.icon" mode="widthFix" :style="{height:isActive?'140rpx':'167rpx',width:isActive         ?'140rpx':'167rpx'}" style="margin-right: 12rpx;margin-bottom: 20rpx;"></image>
				</view>
				
				<view class="gameRight" >
					<view class="gameDetail" @longpress='longpress(index)'>
						<text class="gamename"  @click="toDetail(item)">{{item.gamename}}</text>
						<view class="" style="margin-bottom: 16rpx;">
							<text class="text" v-for="(v,i) in item.type" :key="i" v-if="i<3">{{v}}</text>
							<!-- <text class="text">|</text> -->
							<!-- <text class="text">{{item.popularity_cnt}}人在玩</text> -->
						</view>
						<view class="size"  @click="toDetail(item)">
							<text style="color: #FF5927;width: 140rpx;" v-if="item.myloading">{{item.myloading}}</text>
							<text style="margin: 0 12rpx;" v-if="item.myloading">/</text>
							<text>{{item.myTotalData}}</text>
						</view>
					</view>
					<xw-downLoadButton @getData='myGetData' :item='item' :sort='index' :getData='getData'></xw-downLoadButton>
				</view>

			</view>

		</view>
		<view class="bottom" v-if="isActive">
			<view class="Botradius" style="display: flex;align-items: center;">
				<image v-if="selectAll" src="@/static/images/view/down_acitve.png" mode="widthFix"	style="width: 40rpx;height: 40rpx;margin-right: 16rpx;"></image>
				<view v-else @click="handleAll"
					style="height: 40rpx;width: 40rpx;border-radius: 32rpx;border: 1rpx solid #efefef;margin-right: 16rpx;">
				</view>
				<text class="text" @click="handleNotall" v-if="selectAll">全不选</text>
				<text class="text" @click="handleAll" v-else>全选</text>
			</view>
			<view  class="button" @click="handleconfirm">已选择{{isNumber}}个游戏清除下载痕迹</view>
		</view>
		
		<nvue-loading v-if="pageList.length==0" :isNoData='pageList.length==0?true:false' style="margin-top: 400rpx;"></nvue-loading>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageList: [],
				isTrue: true,
				//总数据
				progress: 0,
				isActive: false,
				getData: 0,
				isNumber: 0,
				selectAll: false,
			}
		},
		computed: {
			myDownList() {
				return uni.getStorageSync('downList')
			}
		},
		methods: {
			goback(){
				uni.navigateBack({
					delta:1
				})
			},
			toDetail(item) {
				// uni.navigateTo({
				// 	url: "/pages/view/gamedetail/gamedetail?gameid=" + item.game_id
				// })
			},
			//删除
			handleDelete() {
				uni.vibrateShort({
					success: () => {
						this.isActive = true
						this.isNumber = this.pageList.filter(item => {
							return item.noActive == true
						}).length
					}
				})
			},
			//确认删除
			handleconfirm() {
				if (this.isNumber > 0) {
					// uni.showModal({
					// 	title: '删除任务',
					// 	content: '清除当前选择的任务？',
					// 	success: (res) => {
					// 		if (res.confirm) {
					let arrList = []
					let downList = []
					let array = []
					downList = this.$store.state.downTasksList
					arrList = this.pageList.filter((item) => {
						return !item.noActive
					})
					
					this.pageList = arrList
					if(arrList.length==0){
						this.isActive = false
						uni.setStorageSync('downList', [])
						this.$store.commit('setDownTasksList', [])
						return 
					}
					// console.log(this.pageList,'this.pageListthis.pageList')
					
					 downList.map(item => {
						arrList.map(v => {
							 if( item.game_id == v.game_id){
								 array.push(item)
							 }			
						})
						// console.log(array,'arrayarrayarrayarrayarray')
						return array

					})
					console.log(array,'listlistlist')
					this.$store.commit('setDownTasksList', [])
					this.$store.commit('setDownTasksList', array)
					uni.setStorageSync('downList', [])
					uni.setStorageSync('downList', arrList)

				}
				this.isActive = false
			},
			//全选
			handleAll() {
				this.isNumber = 0
				this.pageList.map(item => {
					item.noActive = true
					if (item.noActive) {
						this.isNumber++
					}
				})
				this.selectAll = true
				uni.setStorageSync('downList', [])
				uni.setStorageSync('downList', this.pageList)
				
			},
			//全不选
			handleNotall(){
				this.isNumber = this.pageList.length
					this.pageList.map(item => {
						item.noActive = false
						if (!item.noActive) {
							this.isNumber--
						}
					})
					this.selectAll = false
					uni.setStorageSync('downList', [])
					uni.setStorageSync('downList', this.pageList)
					
				},
			//筛选
			handleDel(i) {
				this.pageList[i].noActive = !this.pageList[i].noActive
				this.isNumber = this.pageList.filter(item => {
					return item.noActive == true
				}).length
				if (this.isNumber == this.pageList.length) {
					this.selectAll = true
				} else {
					this.selectAll = false
				}


			},

			handleStop() {
				this.isTrue = false
				this.downTasks.pause();

			},
			myGetData(list){
	
				this.pageList = list[0]
				this.$store.commit('setDownTasksList', list[1])
				
			},
			//长按删除
			longpress(i) {
				uni.vibrateShort({
					success: () => {
						this.isActive = true
						this.pageList.map(item => {
							item.noActive = false
						})
						this.pageList[i].noActive = true
						this.isNumber = this.pageList.filter(item => {
							return item.noActive == true
						}).length
					}
				});
			},
		},
		onLoad() {
			// uni.showToast({
			// 	title:'正在分包中，请耐心等待...',
			// 	icon:'none',
			// 	success: () => {
			// 		setTimeout(()=>{

			// 		},1000)
			// 	}
			// })

		},
		watch:{
			myDownList:{
				handler(val){
					this.pageList = val
					this.getData++
				},
				immediate:true
			}
		},

		onShow() {
			this.pageList = uni.getStorageSync('downList')
			this.getData++
			// console.log(this.pageList,'pageListpageListpageList')

		}
	}
</script>

<style lang="scss" scoped>
	.downLoad {

		.u-navbar {
			box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);

		}

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

		.Body {
			@include padding;

		}

		.cards {
			@include flex;
			margin: 48rpx auto;

			.gameRight {
				@include flex;
				justify-content: space-between;
				@include border_box;
				padding-bottom: 40rpx;

				.buttons {
					
					.button {
						white-space: nowrap;
						@include button(32rpx, 10rpx, 32rpx);
						font-size: $xw-font;
					}
				}
			}

			.gameDetail {
				width:350rpx;
				@include flex-column;
				align-items: flex-start;


				.gamename {
					color: $xw-black-dark;
					font-size: $xw-h3-font;
					font-weight: 700;
					margin-bottom: 8rpx;
					@include overflow;
					max-width: 350rpx;

				}

				.size {
					text {
						font-size: $xw-font;
						color: $xw-color;
					}
				}
			}

		}

		.text {
			font-size: $xw-font;
			color: $xw-color;
			margin-right: 8rpx;
		}

		.bottom {
			position: fixed;
			bottom: 0;
			height: 120rpx;
			width: 100%;
			@include padding;
			@include flex;
			background-color: #fff;

			.button {
				@include button(32rpx, 12rpx, 100rpx);
				font-size: $xw-font;
				font-weight: 500;
				@include overflow;
				margin-right: 80rpx;
			}
		}
		.img_left{
			margin-left: 1rpx;
		}
	}
</style>
