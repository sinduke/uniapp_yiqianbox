<template>
	<view>
		<!-- 自定义导航栏 -->
		<u-navbar title="" :is-back='false' :border-bottom='false' class="u-navbar">
			<slot>
				<view class="title">
					<view class="iconfont left" @click="toRouter">&#xe633;</view>
					<image v-if="type" class="title-img" :src="pageData.new_icon?pageData.new_icon:pageData.icon">
					</image>
					<view v-if="type" class="title-text">{{pageData.gamename}}</view>
				</view>
			</slot>
		</u-navbar>
		<!-- 父评论 -->
		<scroll-view scroll-y :style="{height:myHeight-270+'rpx'}">
		<view class="container" :style="{height:myHeight-270+'rpx'}">
		
		
		<view class="fa-box">
			<view class="fa-box-item1" style="">
				<view class="fa-box-item1-left">
					<image :src="commentData.mem_avatar" mode="" style="border: 1rpx solid #C1C1C1;"></image>
					<view class="fa-box-item1-left-box">
						<view class="name">{{commentData.mem_name}}</view>
						<view class="time">游戏时长{{50}}分钟</view>
					</view>
				</view>
				<uni-rate v-if='commentData.star_cnt>0' :value="commentData.star_cnt/2" :margin="6" :readonly="true"
					color="#DADADA" :size="12" active-color="#FF5927" />
			</view>
			
			<view class="fa-box-item2" >
				<view class="fa-box-item2-content contents">{{commentData.content}}</view>
				<view class="fa-box-item2-img" v-if="commentData.content_img">
					<image  :src="item" @click="handleImage(index,commentData.content_img)" mode="widthFix"
						v-for="(item,index) in commentData.content_img" :key="index"
						style="width: 100%;border-radius: 40rpx;margin-bottom: 10rpx;"></image>
				</view>
			</view>
			<view class="fa-box-item3" v-if="type">
				<view class="title" style="width: 50%;">{{commentData.time_str}}</view>
				<view class="" style="width: 50%;">
					<text style="margin-left: 14rpx;float: right;margin-top: -4rpx;">{{commentData.hate_cnt}}</text>
					<text @click="noSupport(commentData)" :style="{color:commentData.is_hate == 2 ? '#FF5927' : '#666'}"
						class="iconfont" style="transform:rotate(180deg);float: right">&#xe607;</text>
					<text
						style="margin-left: 14rpx;float: right;margin-right: 16%;margin-top: -4rpx;">{{commentData.like_cnt}}</text>
					<text @click="handleSupport(commentData)" class="iconfont" style="float: right"
						:style="{color:commentData.is_like == 2 ? '#FF5927' : '#666'}">
						&#xe607;
					</text>
				</view>
			</view>
		</view>

		<!-- 回复 -->
		<view class="reply">
			<text class="reply-text" style="">回复</text>
			<text class="reply-count">当前{{soncomment.count}}条评论</text>
		</view>

		<!-- 子回复 -->
		<view class="reply-item" v-for="(item,index) in soncomment.list" :key='index' v-if="soncomment.count>0" >
			<view class="reply-item-header">
				<image :src="item.mem_avatar" style="border: 1rpx solid #C1C1C1;"></image>
				<view style="margin-left: 24rpx;">
					<view class="name">{{item.mem_name}}</view>
					<view class="time">{{item.time_str}}</view>
				</view>
			</view>
			<view class="reply-item-content" @click="isShow(item)">
				<view class="">
					<!-- {{item.add}}
					<view v-if="item.add">
						<view class="">
							{{isTrue}}
						</view>
						<view class="" v-if="isTrue">
							<text>{{item.add}}</text>
							<text>回复 :{{placeholder}}</text>
							<text class="content contents">{{item.content}}</text>
						</view>
						
						
					</view> -->
					<view class="content contents">{{item.content}}</view>
				</view>
				
				<view class="img" v-if="item.content_img.length">
					<image mode="widthFix" :src="item" v-for="(item,index) in item.content_img" :key='index'></image>
				</view>
			</view>
			<view class="reply-item-like">
				<view @click="handleSupport(item,index)" class="iconfont"
					:style="{marginRight: '100rpx',color:item.is_like == 2 ? '#FF5927' : '#666'}">
					&#xe607;
					{{item.like_cnt}}
				</view>
				<view @click="noSupport(item, index)" class="iconfont" style="transform:rotate(180deg);"
					:style="{color:item.is_hate == 2 ? '#FF5927' : '#666'}">&#xe607;</view>
				<text style="margin-left: 10rpx;color: #666;font-size: 32rpx;">{{item.hate_cnt}}</text>
			</view>
		</view>

		<view style="height: 600rpx;" v-if="soncomment.count==0">
			<image src="../../../static/images/sf-background.png" mode="widthFix" style="width: 100%;"></image>
			<view style="text-align: center;">
				暂无评论，快去评论吧！
			</view>
		</view>
		
		</view>
		</scroll-view>
		<!-- 输入框 -->
		<view 
			style="position: fixed;bottom: 0;background-color: #FFFFFF;width: 100%;z-index: 99;box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);padding: 0 32rpx;">
			<view style="width: 100%;display: flex;flex-flow: row;margin-top: 16rpx;">
				<u-input @click="imgShow" v-model="rate.comment" :auto-height="true" type="textarea"
					:placeholder="placeholder"
					style="width: 60%;background-color: #F4F4F4;border-radius: 32rpx;padding: 0 32rpx;" height="50" />
				<view class="iconfont" @click="publicComment"
					style="font-size: 60rpx;width: 64rpx;height: 64rpx;border-radius: 50%;background-color: #FFFFFF;margin: 0 0 0 48rpx;box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);">
					&#xe60f;
				</view>
			</view>
			
			<!-- 图片上传 -->
			<u-upload v-if="isImg" :custom-btn="true" ref="uUpload" :action="action" max-count="3"
				@on-success="uploadSuccess" @on-remove="uploadRemove" style="background-color: #fff; ">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<view class="" style="display: flex; justify-content: center;">
						<view class=""
							style="width: 0rpx;height: 60rpx;border: 2rpx solid #666666;position: relative;left: 34rpx; margin-top: 60rpx;">
						</view>
						<view class="" style="width: 60rpx;height: 0rpx;border: 2rpx solid #666666;margin-top: 86rpx;">
						</view>
					</view>
				</view>
			</u-upload>
			<view class="" style="width: 100%;height: 48rpx;background-color: #fff;">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				commentparams: {
					page: 1,
					offset: 10,
					object_id: 0,
					parent_id: "",
					type_name: "game",
				},
				pageData: {},
				commentData: {},
				soncomment: [],
				
				isImg: false,
				rate: {
					comment: ""
				},
				placeholder:"请输入回复内容...",
				action: 'https://api.sy12306.com/asset/upload',
				isTrue: false,
				fileList: [],
				isdata: true,
				nodata: true,
				type: true,
			}
		},
		computed: {
			myHeight() {
				return uni.getSystemInfoSync().windowHeight * (750 / uni.getSystemInfoSync().screenWidth)
			},
			myWidth() {
				return uni.getSystemInfoSync().windowWidth
			},
		},
		methods: {
			isShow(item){
				// this.placeholder = '@'+item.mem_name
				// item.add = true 
				// this.isImg = true
				// this.rate.comment
			},
			//查看图片
			handleImage(i, imglist) {
				this.$common.previewImage(i, imglist)
			},
			gameData(params) {
				this.$api.get("/game/detail", {
					...params
				}).then(res => {
					this.pageData = res.data.data
					this.commentparams.object_id = this.pageData.game_id
					this.getEvaluate()
				})

			},
			//获取子评论
			getEvaluate() {
				this.$api.get('v8/comments/sub_list', {
					...this.commentparams
				}).then(res => {
					if (res.data.code == 200) {
						this.soncomment = res.data.data
						// this.soncomment.list.forEach(item=>{
						// 	item.add = false
						// })
						
					}
				})
			},
			//返回上一级目录
			toRouter() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 图片上传
			uploadSuccess(data) {
				this.fileList.push(data.data.url);
				// this.form.image = JSON.stringify(this.fileList);
			},
			// 图片删除
			uploadRemove(index) {
				this.fileList.splice(index, 1)
				// this.form.image = JSON.stringify(this.fileList);
			},
			//弹出添加图片框
			imgShow() {
				this.isImg = true
			},
			// 隐藏图片框
			imgnoShow() {
				this.$refs.uUpload.clear()
				this.rate.comment = ''
				this.isImg = false
			},
			// 提交评论
			publicComment() {
				if(this.$common.isLogin()){
					if (!this.rate.comment) {
						return uni.showToast({
							icon: 'none',
							title: '请输入评论'
						})
					} else {
						let content = {
							content: this.rate.comment,
							content_img: this.fileList.toString()
						}
						
							this.$api.get("v8/comments/add", {
								...this.commentparams,
								...content,
							}).then(res => {
								this.isTrue = true
								uni.showToast({
									title: '发表成功',
									icon: 'none',
								})
								this.imgnoShow()
								this.getEvaluate()
							})
						
					
					}
				}
			},
			// 点赞或取消
			handleSupport(item) {
				if (this.$common.isLogin()) {
					let params = {
						game_id: this.pageData.game_id,
						comment_id: item.id,
					};
					if (item.is_like == 2) {
						params["type"] = 1
					} else {
						params["type"] = 2
					}
					this.$api.get("v8/comments/like", {
						...params
					}).then(res => {
						if (res.data.code == 200) {
							if (item.is_like == 1 && item.is_hate == 1) {
								item.like_cnt++;
								item.is_like = 2
							} else if (item.is_like == 1 && item.is_hate == 2) {
								item.like_cnt++;
								item.is_like = 2;
								item.hate_cnt--;
								item.is_hate = 1;
							} else if (item.is_like == 2 && item.is_hate == 1) {
								item.like_cnt--;
								item.is_like = 1;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				}
			},
			//踩评论
			noSupport(item, index) {
				if (this.$common.isLogin()) {
					let params = {
						game_id: this.pageData.game_id,
						comment_id: item.id,
						comment_type: 2,
					};
					if (item.is_hate == 2) {
						params["type"] = 1
					} else {
						params["type"] = 2
					}
					this.$api.get("v8/comments/like", {
						...params
					}).then(res => {
						if (res.data.code == 200) {
							if (item.is_like == 1 && item.is_hate == 1) {
								item.hate_cnt++;
								item.is_hate = 2
							} else if (item.is_like == 2 && item.is_hate == 1) {
								item.hate_cnt++;
								item.is_hate = 2;
								item.like_cnt--;
								item.is_like = 1;
							} else if (item.is_like == 1 && item.is_hate == 2) {
								item.hate_cnt--;
								item.is_hate = 1;
							}
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					})
				}
			},

		},
		onLoad(option) {
			let itemobj = JSON.parse(option.item)
			this.commentData = itemobj
			if (option.type) {
				this.type = false
				this.commentparams.parent_id = itemobj.id
				this.commentparams.object_id = itemobj.id
			} else {
				this.commentparams.parent_id = itemobj.id
				this.commentparams.object_id = itemobj.id
			}
			this.gameData({
				game_id: option.gameid
			})

		}
	}
</script>

<style lang="scss" scoped>
	.contents {
		white-space: normal;
		word-break: break-all;
	}

	/* 自定义导航栏 */
	.u-navbar {
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);
		// padding: 50rpx 32rpx 0 32rpx;

		.title {
			display: flex;
			flex-flow: row;
			align-items: center;
			// margin-top: 60rpx;

			.left {
				transform: rotate(180deg);
				font-size: 60rpx;
				margin-right: 24rpx;
				// margin-left: -20rpx;
			}

			.title-img {
				width: 70rpx;
				height: 70rpx;
				margin-right: 24rpx;
				// margin-bottom: 4rpx;
			}

			.title-text {
				color: #1C1C1C;
				font-size: 30rpx;
				font-weight: 600;
				font-family: PingFang SC;
			}
		}
	}

	// 父评论
	.fa-box {
		padding: 40rpx 32rpx;
		margin-top: 40rpx;
		border-bottom: 8px solid #F4F4F4;

		.fa-box-item1 {
			margin-bottom: 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&-left {
				display: flex;

				image {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				&-box {
					margin-left: 24rpx;

					.name {
						font-size: 32rpx;
						color: #1C1C1C;
						font-family: PingFang SC;
						font-weight: bold;
						line-height: 45rpx;
					}

					.time {
						font-size: 20rpx;
						color: #666666;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 36rpx;
					}
				}

			}
		}

		.fa-box-item2 {
			&-content {
				font-size: 28rpx;
				line-height: 40rpx;
				color: #666;
				letter-spacing: 4rpx;
				margin-bottom: 20rpx;
			}

			&-img {
				border-radius: 40rpx;
				margin-bottom: 20rpx;
			}
		}

		.fa-box-item3 {
			color: #666666;
			display: flex;

			.title {
				color: #C1C1C1;
				font-size: 24rpx;
				font-weight: 400;
				font-family: PingFang SC;
				margin-top: 5rpx;
			}

		}
	}

	//回复
	.reply {
		padding: 48rpx 32rpx;
		padding-bottom: 0;

		&-text {
			font-family: PingFang SC;
			font-size: 40rpx;
			color: #000000;
			font-weight: 600;
			margin-right: 16rpx;
		}

		&-count {
			color: #666666;
			font-size: 24rpx;
		}
	}

	.reply-item {
		margin: 10rpx 32rpx;
		border-bottom: 1px solid #EFEFEF;

		&-header {
			margin-top: 50rpx;
			margin-bottom: 28rpx;
			display: flex;

			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}

			.name {
				font-size: 24rpx;
				color: #1C1C1C;
				font-family: PingFang SC;
				font-weight: bold;
				line-height: 45rpx;
			}

			.time {
				font-size: 20rpx;
				color: #666666;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 36rpx;
			}
		}

		&-content {

			.content {
				font-size: 28rpx;
				margin-bottom: 20rpx;
			}

			.img {
				margin-bottom: 20rpx;
				display: flex;

				// justify-content: space-between;
				image {
					width: 30%;
					border-radius: 20rpx;
					margin: 0 10rpx;

				}
			}
		}

		&-like {
			display: flex;
			margin-bottom: 40rpx;
		}
	}

	// 自定义上传按钮
	.slot-btn {
		margin-top: 24rpx;
		width: 170rpx;
		height: 170rpx;
		background: rgb(244, 245, 246);
		border-radius: 40rpx;
	}
</style>
