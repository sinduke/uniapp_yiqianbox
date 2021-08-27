<!-- 充值页面 -->
<template>
	<view class="container">
		<iframe :src="url" frameborder="0" scrolling="no" seamless>暂无数据</iframe>
		
		<u-modal v-model="show" :content="content" confirm-color="#ff8500"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				
				show: false,
				content: ""
			}
		},
		onLoad(options) {
			switch (options.ret) {
				case 1:
					this.show = true;
					this.content = "充值成功";
					break;
				case 0:
					this.show = true;
					this.content = "充值未成功";
					break;
				default:
					return;
			}
		},
		created() {
			this.url =
				"https://api.sy12306.com/app/wap/ptb/recharge?client_id=" +
				this.$store.state.client_id +
				"&token=" +
				this.$store.state.loginInfo.user_token +
				"&isBox=true"
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		iframe {
			width:100%;
			height: 99vh;
		}
	}
</style>
