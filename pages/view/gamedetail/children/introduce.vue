<template>
	<view class="content">
		<view class="title">关于{{title}}</view>
		<view>{{content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				content:''
			};
		},
		onLoad(e){
			this.title = e.title
			this.content= e.content
		}
	}
</script>

<style lang="scss">
	.content{
		padding: 0 $xw-padding;
		.title{
			color: #1C1C1C;
			font-size: 44rpx;
			font-weight: 700;
			margin-bottom: 40rpx;
		}
	}

</style>
