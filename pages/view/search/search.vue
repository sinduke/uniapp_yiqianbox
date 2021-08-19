<template>
	<!-- 搜索页面 -->
	<view class="search_page" :style="{backgrounColor:isSearch?'#F4F4F4':'#fff'}">
		<!-- 自定义导航 -->
		<u-navbar>
			<slot>
				<u-search placeholder="去找你要看到的" v-model="keyword" @search="handleSearch(keyword)" :show-action='false'
					class="search_page__header__serch"> </u-search>
				<view class="search_page__header__text" @click="handleSearch(keyword)">搜索</view>
			</slot>
		</u-navbar>

		<view class="" v-if="isSearch">
			<!-- 历史记录 -->
			<view class="history">
				<view class="history__item" v-for="(v,i) in historyData" :key='i' v-if="i<number">
					<u-icon name="clock" color="#C1C1C1" size="30"></u-icon>
					<text @click="handleSearch(v)">{{v}}</text>
					<u-icon name="close" color="#C1C1C1" size="30" @click="close(i)"></u-icon>
				</view>
				<view class="showall" v-if="historyData.length>2&&isshow" @click="showall">
					显示全部
				</view>
			</view>
			<!-- 热门搜索 -->
			<view class="hot"  v-if="$store.state.platform=='android'">
				<view class="title">热门搜索</view>
				<view class="hotList" v-if="userFormat.hotSearch&&userFormat.hotSearch.split(',').length<4">
					<view class="hotItem" v-for="(v,i) in userFormat.hotSearch.split(',')"	style="width: 50%;margin-bottom: 48rpx;" :key='i' @click="handleSearch(v)">
						<text class="text" style="color: #FF5927;margin-right: 16rpx;">{{i+1}}</text>
						<text class="text">{{v}}</text>
					</view>
				</view>
				<view class="" v-else>
					<view class="hotList"  v-if="userFormat.hotSearch">
						<view class="hotItem" v-for="(v,i) in userFormat.hotSearch.split(',')" v-if="i<number1"	style="width: 50%;margin-bottom: 48rpx;" :key='i' @click="handleSearch(v)">
							<text class="text" style="color: #FF5927;margin-right: 16rpx;">{{i+1}}</text>
							<text class="text">{{v}}</text>
						</view>
					</view>
					<view class="showall" style="display: flex;justify-content: center;" @click="allShow" v-if="userFormat.hotSearch.split(',').length<4">
						显示全部
					</view>
				</view>
				
				
			</view>
			<!-- 热门游戏标签 -->
			<view class="hot">
				<view class="title">热门游戏标签</view>
				<view class="cate" v-if="userFormat.hotSearch"
					style="display: flex;align-items: center; justify-content: flex-start;flex-wrap: wrap;">
					<view class="hotItem" v-for="v in tagsList" style="margin-bottom: 48rpx;"  :key='v.id'
						@click="handleList('tags',v.id,v.name)">
						<text class="text"
							style="background-color: #F4F4F4;border-radius: 30rpx; padding: 6rpx 24rpx;color: #666;margin-right: 24rpx;">{{v.name}}</text>
					</view>
					<view class="hotItem" v-for="(v,i) in cateList" style="margin-bottom: 48rpx;" v-if="i<6" :key='i'
						@click="handleGames(v.id,v.name)">
						<text class="text"
							style="background-color: #F4F4F4;border-radius: 30rpx; padding: 6rpx 24rpx;color: #666;margin-right: 24rpx;">{{v.name}}</text>
					</view>
				</view>
			</view>
			<!-- 热门功能 -->
			<view class="hot">
				<view class="title">热门功能</view>
				<view class="cate" v-if="userFormat.hotSearch"
					style="display: flex;align-items: center; justify-content: flex-start;">
					<view class="hotItem" v-for="(item,index) in commonList" style="margin-bottom: 48rpx;"
						v-if="index<3" :key='index' @click="handleRouter(item.router)">
						<view class=""
							style="background-color: #F4F4F4;border-radius: 40rpx; padding: 20rpx 24rpx;margin-right: 20rpx;align-items: center;display: flex;">
							<image :src="item.url" mode="widthFix"
								style="width: 40rpx;height: 40rpx;margin-right: 16rpx;"></image>
							<text class="text" style="color: #666;white-space: nowrap;">{{item.name}}</text>
						</view>
					</view>
				</view>
				<view class="cate" v-if="userFormat.hotSearch"
					style="display: flex;align-items: center; justify-content: flex-start;">
					<view class="hotItem" v-for="(item,index) in commonList" style="margin-bottom: 48rpx;"
						v-if="index>2" :key='index' @click="handleRouter(item.router)">
						<view class=""
							style="background-color: #F4F4F4;border-radius: 40rpx; padding: 20rpx 24rpx;margin-right: 20rpx;align-items: center;display: flex;">
							<image :src="item.url" mode="widthFix"
								style="width: 40rpx;height: 40rpx;margin-right: 16rpx;"></image>
							<text class="text" style="color: #666;white-space: nowrap;">{{item.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="" v-else style="background-color: #fff;">
		
			<scroll-view scroll-y="true" :style="{height:$store.state.mysHeight-152+'rpx',width:'100%'}" v-if="pageData">
				<view v-for="(item,index) in pageData.list" :key='index' >
					<view class="box" style="padding: 32rpx 32rpx;display: flex;flex-flow:row">
						<view class="left" style="width: 144rpx;height: 144rpx;border-radius: 40rpx;">
							<image :src="item.new_icon||item.icon" mode="widthFix" style="width: 144rpx;height: 144rpx;" @click="handRouter(item.game_id)"></image>
						</view>
						<view class="right" style="display: flex;flex-flow: column;margin-left: 24rpx;" @click="handRouter(item.game_id)">
							
							<view class="right1" style="font-size: 32rpx;font-weight: 500;color: #1C1C1C;">
								{{item.gamename.length>12?item.gamename.slice(0,10)+'..':item.gamename}}
							</view>
							<view class="right2" style="line-height: 28rpx;margin-top: 15rpx;position:relative;width: 425rpx;">
								<image src="@/static/images/index/tagst.png" mode="widthFix" style="width: 20rpx;height: 20rpx;position: absolute;top: 6rpx;left: 12rpx;" class="tagImage"></image>
								<text style="font-size: 22rpx;color: #666666;font-weight: 400;background-color: #F4F4F4;border-radius: 20rpx;padding: 4rpx  16rpx 4rpx 40rpx;">#{{item.one_word.length>13?item.one_word.slice(0,12)+'..':item.one_word}}</text>
							</view>
							<view class="right3" style="color:#666666;font-size: 22rpx;font-weight: 400;margin-top: 20rpx;">
								<!-- <text style="color: #FF5927;" v-if="typeof item.start_time=='number'">{{item.start_time|dateFormat('hh:mm')}}</text>
								<text style="color: #FF5927;" v-else >{{item.start_time[0]|dateFormat('hh:mm')}}</text> -->
								<!-- <text style="margin-left: 5rpx;margin-right: 16rpx;">开服</text>| -->
								<text style="margin-left: 16rpx;" v-if="item.classify==5">H5</text>
								<text style="margin-left: 16rpx;"  v-for="(v,i) in item.type" :key="i" v-if="i<3">{{v}}</text>
								<text style="margin-right: 16rpx;"></text>|
								<text style="margin-left: 16rpx;">{{item.popularity_cnt}}在玩</text>
							</view>
						</view>
						<view class="rates" style="margin-top:50rpx;">
							<view class="rate_item" v-if="item.rate<1" style="height: 48rpx;border: 1rpx solid #E4E4E4;color: #FF5927;border-radius: 32rpx;line-height: 42rpx;padding: 9rpx 18rpx;line-height: 28rpx; white-space: nowrap;">
								<text style="font-size: 32rpx;font-weight: 600;">{{(item.rate*10).toFixed(1)}} </text>
								<text style="font-size: 20rpx;margin-left: 15rpx;"> 折</text>
							</view>
							<text v-else-if="item.has_coupons" style="color:#19BFFF;height: 48rpx;border: 1rpx solid #E4E4E4;border-radius: 32rpx;white-space: nowrap;padding: 4rpx 18rpx;line-height: 28rpx;">优惠券</text>
						</view>
					</view>
					<view class="line" style="width: 550rpx;height: 2rpx;border-bottom: 1px solid;color: #EFEFEF;margin-left: 200rpx;">
						
					</view>
				</view>
				<view style="margin-top: 400rpx;" v-if="pageData.list.length==0">
					<nvue-loading ></nvue-loading>
				</view>
				
			</scroll-view>
		</view>



	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				keyword: '',
				historyData: [],
				number: 2,
				number1:4,
				isshow: true,
				
				isSearch: true,
				pageData: null,
				cateList: [],
				tagsList: [],
				commonList: [{
						url: '../../../static/images/view/swyx.png',
						router: '/pages/my/children/demoGame/index',
						name: '试玩游戏',
						type: '1'
					},
					{
						url: '../../../static/images/view/jfsc.png',
						name: '积分商城',
						router: '/pages/my/children/pointMall/index',
						type: 1
					},
					{
						url: '../../../static/images/view/qmtg.png',
						name: '全民推广',
						router: '/pages/my/children/share/index',
						type: 1
					},

					{
						url: '../../../static/images/view/xyzp.png',
						name: '幸运转盘',
						router: '/pages/my/children/bigTurntable/index',
						type: 1
					},
			
					{
						url: '../../../static/images/view/lqzx.png',
						name: '领券中心',
						router: '/pages/my/children/couponsCore/index',
						type: 1
					},
					
					{
						url: '../../../static/images/view/rwzx.png',
						name: '任务中心',
						router: '/pages/my/children/taskCenter/index',
						type: 1,
					},

				],
			}

		},
		computed: {
			...mapState({
				userFormat: "userFormat",
			}),
		},
		methods: {
			//路由跳转
			handleList(type, id, name) {
				uni.navigateTo({
					url: `/pages/game/children/gameList?id=${id}&type=${type}&name=${name}`
				})
			},
			handRouter(id) {
				uni.navigateTo({
					url: `/pages/view/gamedetail/gamedetail?gameid=${id}`
				})
			},
			backpage() {
				uni.navigateBack()
			},
			// 获取搜索历史
			getHistory() {
				this.historyData = uni.getStorageSync("history") || [];
				console.log(this.historyData)
			},
			// 设置搜索历史
			setHistory(keywords) {
				this.historyData.unshift(keywords);
				this.historyData = [...new Set(this.historyData)];
				// console.log(this.historyData)
				if (this.historyData.length > 5) {
					this.historyData.splice(5, 1)
					this.number = 2
					this.isshow = true
				}
				uni.setStorageSync("history", this.historyData);
			},
			// 清除搜索历史
			removeHistory() {
				uni.removeStorageSync('history');
				this.getHistory();
			},
			//清除记录
			close(i) {
				console.log(i)
				this.historyData.splice(i, 1)
				uni.setStorageSync("history", this.historyData);
			},
			// 搜索
			handleSearch(keyword) {
				if (!keyword) {
					return;
				}
				this.isSearch = false
				this.keyword = keyword
				// 数据存入本地
				this.setHistory(this.keyword);
				// 关键字搜索
				this.params = {
					page: 1,
					offset: 30,
					keywords: ""
				}
				this.params.keywords = this.keyword;
				this.getGameData(this.params)
			},
			showall() {
				this.number = 5
				this.isshow = false
			},
			allShow(){
				if(this.userFormat.hotSearch.split(",").length==4){
					uni.showToast({
						title:"没有更多了",
						icon:"none"
					})
				}
				this.number1 = 10
			},
			// 热门分类
			getInitData() {
				
				this.$api.get('/game/getcategorynew').then(res => {
					this.cateList = res.data.data.cate;
					this.tagsList = res.data.data.tags;
				})

			},
			handleGames(id, name) {
				uni.navigateTo({
					url: `/pages/game/children/gameList?id=${id}&type=${0}&name=${name}`
				})
			},
			getGameData(data = {}) {
				this.$api.get("game/search", {
					...data
				}).then(res => {
					if (res.data.code == 200) {
						this.pageData = res.data.data;
						// console.log(this.pageData, 'this.pageDatathis.pageDatathis.pageData')
					}
				})
			},
			//跳转
			handleRouter(url) {
				if (this.$common.isLogin()) {
					uni.navigateTo({
						url
					})
				}
			}



		},
		onLoad() {
			this.getInitData()
			this.getHistory();
			 
		}

	}
</script>

<style lang="scss" scoped>
	.search_page {
		/deep/.u-navbar-inner {
			margin-left: 20rpx;
		}

		background-color: $xw-page-backgrouncolor;
		height: 100vh;

		&__header {
			&__text {
				font-size: 32rpx;
				margin: 0 $xw-padding;
				color: $xw-color;
			}
		}

		.history {
			background-color: #fff;
			// height: 20000px;
			width: 100%;
			overflow-y: auto;
			padding: 0 $xw-padding;

			&__item {
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid $xw-page-backgrouncolor;

				text {
					display: block;
					width: 90%;
					margin-left: 24rpx;
				}
			}
		}

		.hot {
			background-color: #fff;
			width: 100%;
			overflow-y: auto;
			padding: 0 $xw-padding;
			margin-top: 20rpx;

			.hotList {
				@include flex;
				flex-wrap: wrap;
				@include border-box;
			}
		}

		.showall {
			text-align: center;
			color: $xw-color;
			font-weight: 700;
			padding: 20rpx $xw-padding;
		}

		.text {
			font-size: $xw-h4-font;
			color: $xw-black-dark;

		}

	}

	.title {
		font-size: $xw-h2-font;
		font-weight: 700;
		color: $xw-black-dark;
		margin: 48rpx 0;
	}
</style>
