<!-- 交易 -->
<template>
	<view class="transaction">
		<view :style="{height:$store.state.statusBarHeight+'px',width:'100%'}" />
		<view class="title">
			<view class="titleLeft">
				<view class="titleItem" v-for="(item,index) in transaList" :key='index' @click="handleClick(index)">
					<text class="titlename" :class="{titlenames:active==index}">{{item}}</text>
					<view class="lines" :class="{line:active==index}"></view>
				</view>
			</view>
			<view class="titleRight">
				<view class="Righticon">
				<view class="iconfont" @click="handleRouter('/pages/transaction/children/transactionRecords/index')">&#xe645;</view>
				</view>
				<view class="Righticon" style="margin:0 9rpx 0 24rpx;">
				<text class="iconfont" @click="handleRouter('/pages/transaction/children/tradeNotes/index')">&#xe788;</text>
				</view>
			</view>
		</view>
		<view class="list">
			<swiper @change='swiperChange' @transition='transition' :current="active" :style="{height:$store.state.myHeight-280+'rpx',width:'100%'}">
				<swiper-item>
					<!-- 买号 -->
					<view class="swiper-item">
						<buynumber ref="buynumber"></buynumber>
					</view>
				</swiper-item>
				<swiper-item>
					<!-- 卖号 -->
					<view class="swiper-item">
						<Sellingnumber ref="Sellingnumber" :actives='active'></Sellingnumber>
					</view>
				</swiper-item>
				<swiper-item>
					<!-- 回收 -->
					<view class="swiper-item">
						<recovery  ref='recovery' :actives='active' :activs="activ1"></recovery>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>

<script>
	import buynumber from './children/buynumber'
	import Sellingnumber from './children/Sellingnumber'
	import recovery from './children/recovery'
	
	export default {
		components:{
			buynumber,
			Sellingnumber,
			recovery
		},
		data() {
			return {
				transaList: [
					'买号',
					'卖号',
					'回收'

				],
				active: 0,
				myinput: '',
				activ1:-1,
				
			}
		},
		methods: {
			//切换
			handleClick(index) {
				console.log(this.active)
				this.active = index
				this.$refs.buynumber.getData()
			},
			swiperChange(e) {
				this.active = e.detail.current
				this.$refs.Sellingnumber.clear()
				

			},
			transition(){
				
			},
			//路由跳转
			handleRouter(url){
				uni.navigateTo({
					url
				})
			},

		},
		onShow() {
			if(this.active==2){
				this.$refs.recovery.getData()
			      this.activ1--
				  console.log(   this.activ1,'   this.activ1   this.activ1   this.activ1')
			}
			
		},
		mounted() {
			this.$refs.buynumber.getData()
		},
	}
</script>

<style lang="scss" scoped>
	.Righticon {
		margin-left: 20rpx;
		height: 64rpx;
		width: 64rpx;
		border-radius: 64rpx;
		background-color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
	}
	.transaction {
		width: 100%;
		height: 100%;
		overflow: hidden;
		.title {
			width: 100%;
			padding: 0 32rpx;
			margin-top: 26rpx;
			@include flex;
			// box-shadow: -2px 4rpx 8rpx rgba(0, 0, 0, 0.16);

			.titleLeft {
				@include flex;
			}

			.titleItem {
				@include flex-column;
				margin-right: 64rpx;
			}

			.titletext {}

			.titleRight {
				@include flex;
				.iconfont {
					font-weight: 400;
					font-size: 42rpx;

				}
			}
		}



	}
	
	
	
</style>
<style>
	@import '@/common/css/nvue-whith.css';
</style>
