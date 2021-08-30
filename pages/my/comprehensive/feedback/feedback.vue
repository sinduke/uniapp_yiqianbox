<template>
	<!-- 意见反馈 -->
	<view class="feedback">
		<!-- 自定义导航栏 -->
		<u-navbar title="" :is-back='false' :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="iconfont" style="transform: rotate(180deg);font-size: 48rpx;margin-left: -10rpx;" @click="toRouter">
						&#xe633;
					</view>
					<view class="slot-wrap" style="margin-left: -420rpx;">
						<text class="customer" style="font-weight: 400;font-size: 32rpx;">意见反馈</text>
					</view>
					<view class="slot-right">
						<view class="radius" @click="popClick">
							<view class="iconfont" style="font-weight: 600;font-size: 32rpx;">&#xe788;</view>
						</view>
					</view>
				</view>
			</slot>
		</u-navbar>
		<!-- 内容部分 -->
		<view class="line" style="width:100%; height: 4rpx; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16); background: #FFFFFF;"></view>
		<view class="feedback_box" style="padding: 32rpx 32rpx;">
			<!-- 头部 -->
			<view class="head">
				<view class="head_1"
					style="color: #1C1C1C; font-size: 32rpx; font-weight: bold; font-family: PingFang SC; margin-bottom: 32rpx;font-weight: 400;">
					请选择问题的类型</view>
				<view class="button_list"
					style="display: flex; flex: 1; margin-bottom: 28rpx; justify-content: space-between">
					<view class="button_box" v-for="(item,index) in typeList" :key="index" @click="buttonClick(item.id)" :class=" {buttonColor:item.id==feedbackData.flag}">
						{{item.name}}
					</view>

				</view>
			</view>
			<!-- 中间 -->
			<view class="middle">
				<u-input v-model="feedbackData.content" height="165" :custom-style="{borderRadius:'20rpx'}"
					placeholder-style="text-align: center; color: #E4E4E4; font-size: 26rpx;" type="textarea" value=""
					placeholder='提出您宝贵的意见或建议有助于我们为您提供更好的服务' />
				</u-input>
				<!-- 图片上传 -->
				<u-upload :custom-btn="true" :form-data='{mem_id:$store.state.userInfo.mem_id}' ref="uUpload"
					:action="action" max-count="3" @on-success="uploadSuccess" @on-remove="uploadRemove"
					style="background-color: #fff; ">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<view class="" style="display: flex; justify-content: center;">
							<view class=""
								style="width: 0rpx;height: 76rpx;border: 2rpx solid #666666;position: relative;left: 41rpx; margin-top: 50rpx;">
							</view>
							<view class=""
								style="width: 76rpx;height: 0rpx;border: 2rpx solid #666666;margin-top: 86rpx;">
							</view>
						</view>

						<view class="" style="text-align: center; margin-top: 50rpx;color: #E4E4E4;">
							最多可放3张图片
						</view>

					</view>
				</u-upload>
			</view>
			<!-- 结尾 -->
			<view class="bottom">
				<u-input class="input" v-model="feedbackData.linkman" type="number" :border="true"
					placeholder="请留下您的手机号">
				</u-input>
				<u-input class="input" v-model="feedbackData.qq" type="number" :border="true" placeholder="请留下您的QQ号">
				</u-input>
				<view class="btn" @click="submit">提交</view>
			</view>
			<!-- 弹出层 -->
			<view>
				<u-popup v-model="show" mode="center" border-radius="20" width="80%" height="700rpx"
					:mask-custom-style="{background: 'rgba(211,211,211, 0.8)'}">
					<view class="box-center">
						<view class="box-center-bz">
							<view class="iconfont"
								style="font-size: 34rpx;background-color: #FF5927; color: #fff; border-radius: 50%; border: none;">
								&#xe788;</view>
							<text
								style="margin-left:25rpx; color: #1C1C1C; font-size: 32rpx;  font-weight: bold;">帮助</text>
						</view>
						<view class="box-center-text">想要：想要APP上搭载怎样的新功能？</view>
						<view class="box-center-text">体验：APP使用中，有遇到哪些问题/疑惑？</view>
						<view class="box-center-text">心情：你喜欢APP哪里？想要得到怎样的延伸？</view>
						<view class="box-center-text">感想：你不喜欢APP哪里，想要得到怎样的改善？</view>
						<view class="box-center-text">建议：随时说说，你对APP有哪些好建议？</view>
						<view class="box-center-text">推荐：你用过哪些功能或体验较好的游戏APP？好在哪里？</view>
						<u-button @click="noPopClick" class="butt" hover-class="none"
							style=" height: 72rpx; color: #FF4810;margin-top: 30rpx; border: solid #E3E3E3 2rpx; width: 40%;"
							shape="circle" plain>我知道了</u-button>
					</view>
				</u-popup>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				typeList: [{
					id: 1,
					name: '盒子建议'
				}, {
					id: 2,
					name: '游戏反馈'
				}, {
					id: 3,
					name: '其他建议'
				}],
				action: 'https://api.sy12306.com/asset/feedback_upload',
				fileList: [],
				feedbackData: {
					qq: '',
					linkman: '',
					content: '',
					flag: 1
				},
				show: false
			}
		},
		methods: {
			//显示弹出层
			popClick() {
				this.show = true
			},
			//隐藏弹出层
			noPopClick() {
				this.show = false
			},
			//按钮点击
			buttonClick(id) {
				this.feedbackData.flag = id
			},
			// 图片上传
			uploadSuccess(data) {
				console.log(666, data)
				this.fileList.push(data.data.url);
			},
			// 图片删除
			uploadRemove(index) {
				this.fileList.splice(index, 1)
			},
			// 返回上一级
			toRouter() {
				uni.navigateBack()
			},
			// 提交数据
			submit() {
				if (!this.feedbackData.linkman && !this.feedbackData.qq) {
					return uni.showToast({
						icon: 'none',
						title: '手机号和qq必须填一个'
					})
				} else if (this.feedbackData.content == false) {
					return uni.showToast({
						icon: 'none',
						title: '请填写内容'
					})
				}
				let data = {
					image: this.fileList.toString(),
					...this.feedbackData
				}
				// console.log(8888, data, typeof data.image)
				this.$api.get('/game/feedback', {
					...data
				}).then(res => {
					console.log(data)
					if (res.data.code == 200) {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.data.msg
						})
					}
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 自定义导航栏 */
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

	//去除button默认样式
	.butt::after {
		border: none;
	}

	.nonebut::after {
		border: none;
	}


	.middle {
		width: 100%;
		border: 2rpx solid #E4E4E4;
		border-radius: 40rpx;
		padding: 24rpx;
	}

	.bottom {
		.input {
			margin-top: 40rpx;
			border-radius: 40rpx;
		}

		.btn {
			margin-top: 40rpx;
			border: solid 2rpx #E4E4E4;
			border-radius: 40rpx;
			color: #FF5927;
			text-align: center;
			padding: 20rpx 0;
			font-family: PingFang SC;
			font-weight: 700;
		}
	}

	.box-center {
		background-color: #fff;
		position: relative;
		width: 100%;
		background-size: contain;
		padding: 26rpx 26rpx;
	}

	.box-center-bz {
		color: #707071;
		padding: 0 10rpx;
		margin-left: 15rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}

	.box-center-text {
		color: #666666;
		padding: 0 10rpx;
		margin-top: 20rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
	}

	// 自定义上传按钮
	.slot-btn {
		width: 235rpx;
		height: 235rpx;

		background: rgb(244, 245, 246);
		border-radius: 30rpx;
	}

	.button_box {
		border: 1rpx solid #f4f4f4;
		background: #F4F4F4;
		color: #666666;
		font-size: $xw-h5-font; 
		font-weight: 400;
		border-radius: 32rpx;
		padding: 12rpx 24rpx;
	}
	
	.buttonColor {
		color: #FF5927;
		background-color: #fff;
		border: 2rpx solid #FF5927;
		font-weight: 700;
	}
</style>
