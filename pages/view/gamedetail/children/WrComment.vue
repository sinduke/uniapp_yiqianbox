<!-- 写评论 -->
<template>
	<view>
		<view class="line"
			style="background: #FFFFFF;box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16);width: 100%;height: 1rpx;">

		</view>
		<view class="comment">
			<view style="color: #1C1C1C;font-size: 32rpx;font-weight: 600;">请评分 </view>
			<u-rate inactive-icon="star-fill" :count="rate.count" v-model="rate.value" inactive-color="#C1C1C1"
				active-color="#FF5927" gutter="48" min-count="1" size="43" class="rate"></u-rate>
			<view class="line1" style="border: 1px solid #EFEFEF;height: 1rpx;">

			</view>
			<u-input v-model="rate.comment" type="textarea" :border="false" placeholder="写下你的想法..." height="280">
			</u-input>
			<view class="border-text">可输入 <text
					style="font-size: 32rpx;margin-left: 10rpx;color: #1C1C1C;">{{140-rate.comment.length}}</text><text>字</text>
			</view>
			<view class="border"></view>
			<u-upload ref="uUpload" :action="action" max-count="3" @on-success="uploadSuccess" @on-remove="uploadRemove"
				style="background-color: #fff;"></u-upload>
			<view class="btn" @click="publicComment">

				提交

			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 评分
				rate: {
					count: 5,
					value: 5,
					comment: ""
				},
				isTrue: true,

				// 评论
				commentParams: {
					page: 1,
					offset: 10,
					type_name: "game",
					object_id: 0
				},
				commentData: [],
				status: "loadmore",
				action: 'https://api.sy12306.com/asset/upload',
				fileList: []
			}
		},
		methods: {
			// 提交评论
			publicComment() {
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

					if (this.isTrue) {
						this.isTrue = false
						this.$api.get("v8/comments/add", {
							...this.commentParams,
							star_cnt: this.rate.value * 2,
							...content,
						}).then(res => {
							this.$refs.uToast.show({
								title: '发表成功',
								type: 'success',
								callback: () => {
									uni.navigateBack({
										delta:1
									})
									// 重置输入框
									this.rate.comment = "";
									this.isTrue = true
								}
							})

						})
					}

				}

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
			}
		},
		onLoad(option) {
			this.commentParams.object_id = option.gameid
		},
		onShow() {
			// this.commentParams.object_id = this.$route.query.object_id
			// console.log(this.$route.query.object_id);
			// this.getCommentData(this.commentParams)
		},
	}
</script>

<style lang="scss" scoped>
	.comment {
		// text-align: center;
		padding: 0 30rpx;
		padding-top: 20rpx;

		.text {
			padding: 10rpx;
			color: #666;
		}

		.rate {
			margin: 32rpx 0;
			color: #C1C1C1;
			margin-left: -20rpx;
		}

		.border {
			border-bottom: 1px solid #ccc;
			margin-bottom: 48rpx;
		}

		.border-text {
			margin-top: 10rpx;
			text-align: right;
			font-size: 32rpx;
			color: #C1C1C1;
			font-weight: 500;
		}

		.btn {
			position: fixed;
			bottom: 92rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 92%;
			border: 1rpx solid #E4E4E4;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			color: #FF5927;
			font-size: 28rpx;
			font-weight: 500;
			border-radius: 40rpx;
		}

		.commentList {
			padding: 120rpx 0;
			color: #666;
			text-align: center;

		}
	}
</style>
