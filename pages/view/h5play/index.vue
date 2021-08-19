<!-- h5游戏开玩 -->
<template>
	<view class="container">
		<!-- <iframe :src="game_url" frameborder="0" scrolling="no"></iframe> -->
		<web-view :webview-styles="webviewStyles" :src="game_url" v-if="show"></web-view>
		<image src="@/static/images/myrefresh.gif" width="40%" mode="widthFix" class="image"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				game_url: "",
				show: true,
				webviewStyles: {
					width: "100%",
					height: "100%"
				},
			     istrue:true
			}
		},
		onLoad(options) {
			this.game_url = options.game_url +
				"&token=" +
				this.$store.state.loginInfo.user_token +
				"&link=uniapp&client_id=" +
				this.client_id;
		},

		// beforeRouteLeave(to, from, next) {
		// 	let _this =this
		// 	console.log(to, from, next)
		// 	uni.showModal({
		// 		title: '提示',
		// 		content: '确定要退出吗？',
		// 		success: function(res) {
		// 			if (res.confirm) {
		// 				_this.show = false
		// 				setTimeout(()=>{
		// 					next()
		// 				},200)

		// 				uni.navigateBack({
		// 					delta: 1,
		// 				})
		// 			} else if (res.cancel) {
		// 				next(false)
		// 			}
		// 		}
		// 	})
		// },

		//后退触发
		onBackPress(e) {
		 if (e.from === 'backbutton') {
			 uni.showModal({
			 	title: '提示',
			 	content: '确定要退出吗？',
			 	success: res =>{
			 	  if (res.confirm) {
			 			// this.istrue = false
						uni.navigateBack({
							delta:1
						})
						
			 		} else if (res.cancel) {
			 			// this.istrue = true
			 		}
			 	}
			 })
				return true
		 }
	
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		overflow: hidden;

		iframe {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 100;
		}

		.image {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
