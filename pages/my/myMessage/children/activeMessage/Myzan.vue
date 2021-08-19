<template>
	<view class="">
		<!-- 自定义导航栏 -->
			<u-navbar title="" :border-bottom='false' class="u-navbar">
				<slot>
					<view class="title">
						<view class="slot-wrap">
							<text class="customer">消息互动</text>
						</view>
						<view class="slot-right">
							<view class="radius">
								<text class="iconfont" style="font-weight: 600;font-size: 34rpx;" @click="isActive=false"
									v-if="isActive">&#xe608;</text>
								<text class="iconfont" style="font-weight: 600;font-size: 34rpx;" @click="handleDelete"
									v-else>&#xe8b0;</text>
							</view>
						</view>
					</view>
				</slot>
			</u-navbar>
			
		<view class="line" style="box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);background: #FFFFFF;height: 12rpx;"></view>
		<view class="box">
			<view class="" v-for="(item,index) in pageDate" :key="index"  style="display: flex;flex-flow: row;align-items: center;margin-bottom: 40rpx;">
				<view class="cars" v-if="isActive" style="margin-right: 12rpx;width: 40rpx;height: 40rpx;"	@click="handleDel(index)">
					<view v-if="!item.noActive" style="width: 40rpx;height: 40rpx;border-radius: 40rpx;border: 1px solid #EFEFEF;"></view>
					<image v-else src="@/static/images/view/down_acitve.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="itemlist">
					<view>
						<image :src="item.mem_avatar" class="left"></image>
					</view>
					<view class="right">
						<view class="head">
							<text style="color: #1C1C1C;font-weight: 600;font-size: 32rpx;margin-top: -10rpx;">{{item.mem_name}}</text>
							<text style="color: #C1C1C1;font-size: 24rpx;font-weight: 400;float: right;">{{item.time_str}}点赞</text>
						</view>
						<view class="bottom">
							<text>{{item.parent_comment.content}}</text>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="bottom2" v-if="isActive">
			<view class="Botradius" style="display: flex;align-items: center;">
				<image @click="handleNotall" v-if="selectAll" src="@/static/images/view/down_acitve.png" mode="widthFix"	style="width: 40rpx;height: 40rpx;margin-right: 16rpx;"></image>
				<view v-else @click="handleAll"
					style="height: 40rpx;width: 40rpx;border-radius:50%;border: 1rpx solid #efefef;margin-right: 16rpx;">
				</view>
				<text class="text" @click="handleNotall" v-if="selectAll">全不选</text>
				<text class="text" @click="handleAll" v-else>全选</text>
			</view>
			<view class="button" @click="getDelDate">删除当前{{isNumber}}条点赞</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageDate:[],
				selectAll: false,
				isActive: false,
				isNumber:0,
			}
		},
		methods: {
			getPageDate(){
				this.$api.get("v8/comments/my_like",{	
					offset:10,
				}).then(res=> {
					this.pageDate = res.data.data.list
					console.log(this.pageDate)
				})
			},
			//点赞已读
			getDate(){
				this.$api.get("v8/comments/message_read",{	
					read_type:"like"
				}).then(res=> {
					
				})
			},
			handleDelete() {
				uni.vibrateShort({
					success: () => {
						this.isActive = true
						this.isNumber = this.pageDate.filter(item => {
							return item.noActive == true
						}).length
					}
				})
			},
			//确认删除
			getDelDate(){
				let comment_ids = []
				this.pageDate.map(item => {
					if (item.noActive) {
						comment_ids.push(item.id)
					}
				})
				this.$api.get("v8/comments/del_message",{
					del_type:"like",
					comment_ids
				}).then(res=>{
					if(res.data.code==200){
						this.getPageDate()
						this.isActive = false
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
					
				})
			},
			//全选
			handleAll() {
				this.isNumber = 0
				this.pageDate.map(item => {
					item.noActive = true
					if (item.noActive) {
						this.isNumber++
					}
				})
				this.selectAll = true	
			},
			//全不选
			handleNotall(){
				this.isNumber = this.pageDate.length
					this.pageDate.map(item => {
						item.noActive = false
						if (!item.noActive) {
							this.isNumber--
						}
					})
				this.selectAll = false			
			},
			//筛选
			handleDel(i) {
				this.pageDate[i].noActive = !this.pageDate[i].noActive
				this.isNumber = this.pageDate.filter(item => {
					return item.noActive == true
				}).length
				if (this.isNumber == this.pageDate.length) {
					this.selectAll = true
				} else {
					this.selectAll = false
				}
			},
		},
		onLoad(){
			this.getPageDate()
			this.getDate()
		}
	}
</script>

<style scoped lang="scss">
	.box{
		padding: 50rpx 32rpx;
	}
	.u-navbar {
	
		.title {
			flex: 1;
			padding: 0 $xw-padding;
			@include flex;
		}
		.customer {
			color: $xw-black-dark;
			font-size: 32rpx;
			font-weight: 600;
			margin-left: -20rpx;
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
	.itemlist{
		width: 100%;
		padding: 24rpx 24rpx;
		border-radius: 40rpx;
		background-color: #F4F4F4;
		display: flex;
		flex-flow: row;
	}
	.left{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		border: 1rpx solid #E4E4E4;
	}
	.right{
		width: 82%;
		margin-left: 24rpx;
	}
	.bottom text{
		color: #666666;
		font-size: 24rpx;
		font-weight: 400;
		display:block; 
		white-space:nowrap;
		overflow:hidden; 
		text-overflow:ellipsis; 
	}
	.bottom2 {
		position: fixed;
		bottom: 0;
		height: 120rpx;
		width: 100%;
		@include padding;
		@include flex;
		background-color: #fff;
	
		.button {
			@include button(32rpx, 12rpx, 140rpx);
			font-size: $xw-font;
			font-weight: 500;
			@include overflow;
		}
	}
</style>
