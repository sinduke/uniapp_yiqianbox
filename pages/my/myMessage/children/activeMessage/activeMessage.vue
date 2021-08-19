<template>
	<view>
		<!-- 自定义导航栏 -->
			<u-navbar title="" :border-bottom='false' class="u-navbar">
				<slot>
					<view class="title">
						<view class="slot-wrap">
							<text class="customer">互动消息</text>
						</view>
						<view class="slot-right">
							<view class="radius">
								<text class="iconfont" style="font-weight: 400;font-size: 34rpx;" @click="isActive=false"	v-if="isActive">&#xe608;</text>
								<text class="iconfont" style="font-weight: 400;font-size: 34rpx;" @click="handleDelete" v-else>&#xe8b0;</text>
							</view>
						</view>
					</view>
				</slot>
			</u-navbar>
			
		<view class="line" style="box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);background: #FFFFFF;height: 12rpx;"></view>
		<view class="container">
			<view class="head" @click="tozan" v-if="likeDate.is_like_read">
				<view class="icon">
					<text class="iconfont"  style="color: #FF5927;font-weight:600;">&#xe607;</text>
				</view>
				<view class="text">
					当前有{{likeDate.is_like_read}}条新点赞
				</view>
				<view class="iconfont" style="width: 40%;">
					<text style="color: #C1C1C1;float: right;">&#xe633;</text>
				</view>
			</view>
			
			<view class="" v-if="pageDate" v-for="(item,index) in pageDate" :key="index" style="display: flex;flex-flow: row;align-items: center;margin-bottom: 40rpx;" >
				<view class="cars" v-if="isActive" style="margin-right: 12rpx;width: 40rpx;height: 40rpx;"	@click="handleDel(index)">
					<view v-if="!item.noActive" style="width: 40rpx;height: 40rpx;border-radius: 40rpx;border: 1px solid #EFEFEF;"></view>
					<image v-else src="@/static/images/view/down_acitve.png" mode="widthFix" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="itemlist" >	
					<view class="box_1">
						<view>
							<image :src="item.mem_avatar" mode="" class="left"></image>
						</view>
						<view class="middle">
							<view style="color: #1C1C1C;font-weight: 600;font-size: 32rpx;margin-top: -4rpx;">
								{{item.mem_name}}
							</view>
							<view style="color: #666666;font-weight: 400;font-size: 24rpx;margin-top: 6rpx;">
								{{item.time_str}} · {{item.game_name}}
							</view>
						</view>
						<view class="bottom" style="color: #666666;font-size: 26rpx;font-weight: 400;width: 20%;margin-top: 10rpx;">
							<text style="float: right;" @click="toDetail(item)">回复</text>
						</view>
					</view>
					<view class="box_2" @click="toDetail(item)">
						{{item.content}}
					</view>
					<view class="box_3" @click="toDetail(item)" v-if="item.parent_comment">
						<text>{{item.parent_comment.content}}</text>
					</view>
				</view>
			</view>
			<nvue-loading v-if="!likeDate.is_like_read&&!pageDate"></nvue-loading>
		</view>
		<view class="bottom2" v-if="isActive">
			<view class="Botradius" style="display: flex;align-items: center;">
				<image @click="handleNotall" v-if="selectAll" src="@/static/images/view/down_acitve.png" mode="widthFix"	style="width: 50rpx;height: 40rpx;margin-right: 16rpx;"></image>
				<view v-else @click="handleAll"
					style="height: 40rpx;width: 54rpx;border-radius:50%;border: 1rpx solid #efefef;margin-right: 16rpx;">
				</view>
				<text class="text" @click="handleNotall" v-if="selectAll">全不选</text>
				<text class="text" @click="handleAll" v-else>全选</text>
			</view>
			<view class="button" @click="getDelDate">删除当前{{isNumber}}条评论</view>
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
				type:true,
				likeDate:[],
				params:{
					read_type: "comment"
				}
				
				
				
					
				
			}
		},
		methods: {
			//回复评论
			toDetail(item){
				let itemstr = JSON.stringify(item.parent_comment)
				uni.navigateTo({
					url: `/pages/view/gamedetail/commentDetail?gameid=${item.game_id}&item=${itemstr}&type=${this.type}`
				})
			},
			//消息数据
			getPageDate(){
				this.$api.get("v8/comments/message_list",{	
				}).then(res=> {
					this.pageDate = res.data.data.list
					this.likeDate = res.data.data
				})
			},
			//消息已读
			getDate(){
				this.$api.get("v8/comments/message_read",{	
					...this.params
				}).then(res=> {
				})
			},
			tozan(){
				uni.navigateTo({
					url:"/pages/my/myMessage/children/activeMessage/Myzan"
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
					del_type: "comment",
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
		onShow(){
			this.getPageDate()
		},
		onLoad(){
			this.getDate()
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 32rpx 32rpx;
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
			font-weight: 400;
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
	//头部CSS
	.head{
		width: 100%;
		background-color: #F4F4F4;
		height: 128rpx;
		border-radius: 40rpx;
		padding: 30rpx 24rpx;
		display: flex;
		flex-flow: row;
		align-items: center;
		margin-bottom: 40rpx;
	}
	.icon{
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		background-color: #fff;
		padding: 14rpx 16rpx;
	}
	.text{
		width: 60%;
		font-size: 28rpx;
		font-weight: 400;
		color: #666666;
		margin-left: 24rpx;
	}
	//渲染部分
	.itemlist{
		width: 100%;
		padding: 24rpx 24rpx;
		border-radius: 40rpx;
		background-color: #F4F4F4;
		
	}
	.box_1{
		display: flex;
		flex-flow: row;
	}
	.left{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 24rpx;
		border: 1rpx solid #E4E4E4;
	}
	.middle{
		width: 65%;
	}
	.box_2{
		color: #1C1C1C;
		font-size: 28rpx;
		font-weight: 400;
		margin-bottom: 16rpx;
		margin-top: 16rpx;
	}
	.box_3{
		width: 100%;
		background-color:#E4E4E4;
		border-radius: 16rpx;
		padding: 12rpx 24rpx;
	}
	.box_3 text {
		color: #666666;
		font-size: 24rpx;
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
	.text {
		font-size: $xw-font;
		color: $xw-color;
		margin-right: 8rpx;
	}
</style>
