<!-- 常见问题 -->
<template>
	<view class="myMessage">
		<u-navbar title="" :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="slot-wrap">
						<text class="customer">常见问题</text>
					</view>
					<view class="slot-right">
						<view class="radius">
							<text class="iconfont" style="font-weight: 700;font-size: 48rpx;" @click="clear">&#xe666;</text>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
		<view class="myshadowLine" />


		<view class="body">
			<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-360+'rpx'}" :scroll-top="scrollTop">
				<view class="" style="z-index: 1;">
					<!-- 客服回复 -->
					<view class="kfItem">
						<view class="kfItem_left">
							<image class="images" src="@/static/images/customerService/kf.png" mode="widthFix">
							</image>
						</view>
						<view class="kfItem_Right">
							<text class="kftext">
								HI，您好，请在底部选择你要咨询的问题！
							</text>
						</view>
					</view>
					
				<!-- 	<view class="cards" :style="{width:$store.state.myWidth-48+'px'}" >
						<view class="" v-for="(item,index) in mem_List" :key='index' >
							<view class="cardsItem" :style="{borderBottom:index<mem_List.length-1?'1px solid #efefef':'',marginBottom:index<mem_List.length-1?'24rpx':''}" @click="handleClik(item.name)">
							<text class="itemname">{{item.name}}</text> 
							<u-icon name="arrow-right" color="#666" size="28"></u-icon>			
							</view>
						</view>
					</view> -->

					<!-- 发送问题 -->
					<view v-for="(item,index) in serviceList" v-if="serviceList.length>0" @click="isStyle">
						<view class="yhItem" v-if="item.type==1">
							<view class="yhItem_Right">
								<text class="yhtext">
									{{item.content}}
								</text>
							</view>
							<view class="yhItem_left">
								<image class="images" :src="userInfo.avatar"></image>
							</view>
						</view>
						<view class="kfItem" v-if="item.type==2">
							<view class="kfItem_left">
								<image class="images" src="@/static/images/customerService/kf.png" mode="widthFix">
								</image>
							</view>
							<view class="kfItem_Right">
								<text class="kftitle">
									{{item.title}}
								</text>
								<text class="kftext">
									{{item.content}}
								</text>
							</view>
						</view>
						<view class="kfItem" v-if="item.type==3">
							<view class="kfItem_left">
								<image class="images" src="@/static/images/customerService/kf.png" mode="widthFix">
								</image>
							</view>
							<view class="kfItem_Right">
							<view class="" v-for="(v,i) in item.list" :key='i' >
								<view class="cardsItem" :style="{borderBottom:i<item.list.length-1?'1px solid #efefef':'',marginBottom:i<item.list.length-1?'24rpx':''}" @click="handleClik(v.title,v.id)">
								<text class="itemname" style="font-size: 30rpx;">{{v.title}}</text> 
								<u-icon name="arrow-right" color="#666" size="28"></u-icon>			
								</view>
							</view>

							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bottom" :class="{bottomStyle:isTrue==true}">
			<view class=""
				style="display: flex;align-items: center;margin-bottom: 20rpx;height: 60rpx;justify-content: space-between;">
				<view class="iconfont" style="font-size: 36rpx;margin-right: 20rpx;">&#xe7d3;</view>
				<input :auto-blur="true" @blur="isStyle" :adjust-position="false" class="input" @click="changeStyle" type="text"
					v-model="content" placeholder="请输入您的问题" @confirm='confirm' />
				<view class="" style="width: 60rpx;height: 60rpx;border-radius: 60rpx;padding: 4rpx; box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);display: flex;align-items: center;justify-content: center;">
					<image src="@/static/images/index/detail-button.png" mode="widthFix"
						style="width: 40rpx;height: 40rpx;" @click="confirm"></image>
				</view>
			</view>
			<view class="scroll" style="display: flex;align-items: center;">
				<view class="text">您可能想问</view>
				<scroll-view scroll-x="true" :style="{width:$store.state.myWidth-120+'px',marginLeft: '180rpx'}">
					<view style="display: flex;">
						<view class="problemItem" v-for="(item,index) in problemList" :key='index' @click="handleClik(item.name)">{{item.name}}</view>
					</view>
				</scroll-view>
			</view>

		</view>
	</view>
</template>

<script>
	// const dom = weex.requireModule('dom')
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				scrollTop: 999999,
				old: {
					scrollTop: 0
				},
				isTrue: false,
				content: '',
				istrue: true,
				mem_List: [{
						type: 1,
						name: '什么是游戏返利？'
					},
					{
						type: 2,
						name: '哪些游戏可以申请返利？'
					},
					{
						type: 3,
						name: '返利是返还到哪里？'
					},
					{
						type: 4,
						name: '返利多久会到？'
					},
					{
						type: 5,
						name: '充值了，但是返利申请没有可以申请的东西？'
					},
					{
						type: 6,
						name: '怎么知道会返还多少元宝？'
					},
					{
						type: 8,
						name: '角色ID怎么查看？'
					},
					{
						type: 9,
						name: '道具奖励去哪里申请？'
					}
				],
				problemList: [{
						type: 1,
						name: '返利问题'
					},
					{
						type: 2,
						name: '道具奖励'
					},
					{
						type: 3,
						name: '账号安全'
					},
					{
						type: 4,
						name: '防沉迷'
					},
					{
						type: 5,
						name: '其他问题'
					}
				]

			}
		},
		computed: {
			...mapState({
				userInfo: "userInfo",
				client_id: "client_id",
				serviceList: 'serviceList'
			}),
		},
		methods: {
			isStyle() {
				this.isTrue = false
				// this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					setTimeout(()=>{
						this.scrollTop += 300
					},100)
				});
			},
			changeStyle() {
				this.isTrue = true
			},
			handleRouter(url) {
				uni.navigateTo({
					url
				})
			},
			//点击回复
			handleClik(content) {
				if (this.istrue) {
					this.istrue = false
					setTimeout(() => {
						this.istrue = true
					}, 600)

					let arrlist = this.serviceList
					arrlist.push({
						type: 1,
						title: '',
						content
					})
					this.$store.commit('setServiceList', arrlist)
					this.getServeData(content)
				}
				this.$nextTick(function() {
					setTimeout(()=>{
						this.scrollTop += 300
					},200)
				});

			},
			//获取客服数据
			getServeData(content) {
				this.$api.get("/service/service_message", {
					content
				}).then(res => {
			
					if (res.data.code == 200) {
						if (res.data.data) {
						 let list = res.data.data[0]
					     let arrlist = this.serviceList
							if(res.data.data.length==1){
								arrlist.push({
									type: 2,
									title: list.title,
									content: list.content
							})
							}else{
								arrlist.push({
								  type: 3,
							      list: res.data.data
								})
								
							}
							
							this.$store.commit('setServiceList', arrlist)

						
						} else {
							let arrlist = this.serviceList
							arrlist.push({
								type: 2,
								title: '',
								content: '这个问题小闲暂时还没有学会，请联系人工客服！'
							})
							this.$store.commit('setServiceList', arrlist)

						}

					}

				})
			},
			//清空问题
			clear(){
				uni.showModal({
					title: '清空',
					content: '确定清空对话？',
					success: res=>{
						if (res.confirm) {

							this.$store.commit('setServiceList', [])
							
						} else if (res.cancel) {
							return
						}
					}
				})
			},
			//提交问题
			confirm() {
				if(this.content==false){
					uni.showToast({
						title: '提出问题不能为空',
						icon:"none",
					})
				}else{
					let arrlist = this.serviceList
					arrlist.push({
						type: 1,
						title: '',
						content: this.content
					})
					this.$store.commit('setServiceList', arrlist)
					this.getServeData(this.content)
					this.content = ''
				}	
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myMessage {
		height: 100vh;
		overflow: hidden;
	}
	.cards{
        padding: 24rpx;
		margin:0 auto;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
		border-radius: 20rpx;
		margin-bottom: 48rpx;
	}
	.cardsItem{
		@include flex;
		padding-bottom: 24rpx;
	}

	.u-navbar {

		.title {
			flex: 1;
			padding: 0 $xw-padding;
			@include flex;
		}

		.customer {
			color: $xw-black-dark;
			font-size: $xw-h4-font;
			font-weight: 400;
			margin-left: -12rpx;
			
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

	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 20rpx;

	}

	.body {
		padding: 12rpx 32rpx;

		.kfItem {
			@include flex;
			align-items: flex-start;
			justify-content: flex-start;
			padding: 10rpx 2rpx;
			margin-bottom: 40rpx;

			.kfItem_left {
				margin-right: 24rpx;
				@include flex;
				justify-content: center;

				.images {
					box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
					width: 90rpx;
					height: 90rpx;
					border-radius: 90rpx;

				}
			}

			.kfItem_Right {
				max-width: 75%;
				box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
				border-radius: 20rpx;
				padding: 16rpx 32rpx;

				.kftitle {
					font-size: $xw-h2-font;
					color: $xw-black-dark;
					line-height: 1.5;
					font-weight: 700;
					margin-bottom: 20rpx;
					display: block;
				}

				text {
					font-size: $xw-h3-font;
					color: $xw-black-dark;
					line-height: 1.5;
				}
			}
		}

		.yhItem {
			@include flex;
			align-items: flex-start;
			justify-content: flex-end;
			margin-bottom: 40rpx;

			.yhItem_left {
				margin-left: 24rpx;
				@include flex;
				justify-content: center;

				.images {
					width: 100rpx;
					height: 100rpx;
					border-radius: 100rpx;
					box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);

				}
			}

			.yhItem_Right {
				max-width: 75%;
				box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
				border-radius: 20rpx;
				padding: 16rpx 32rpx;

				text {
					font-size: $xw-h3-font;
					color: $xw-color-z;
					line-height: 1.5;
				}
			}
		}


	}

	.bottom {
		padding: 20rpx 32rpx;
		position: fixed;
		width: 100%;
		background-color: #FcFcFc;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);

		.input {
			font-size: $xw-h4-font;
			width: 480rpx;
		}

		.problemItem {
			border: 1px solid #E4E4E4;
			border-radius: 30rpx;
			padding: 6rpx 18rpx;
			margin-right: 24rpx;
			white-space: nowrap;
		}

		.text {
			position: absolute;
			color: $xw-color;
			font-size: $xw-font;
			white-space: nowrap;
		}
	}

	.bottomStyle {
		bottom: 580rpx;
	}
</style>
