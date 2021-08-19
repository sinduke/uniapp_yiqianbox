<!-- 兑换平台币 -->
<template>
	<view class="container">
		<u-cell-group :border="false">
			<u-cell-item title="我的积分" :value="userInfo.my_integral"  :border-bottom="false" :arrow="false"  :value-style="{'color': '#ff8500'}"
			 style="padding: 30rpx 0;"></u-cell-item>
			<u-cell-item title="兑换平台币" value="(100积分 = 1平台币)"  :border-bottom="false" :arrow="false"  style="padding: 30rpx 0;"></u-cell-item>
			<u-input v-model="ptb_cnt" type="number"   placeholder="请输入平台币数量" class="input"></u-input>
			<u-cell-item title="需消耗：" :value="integral+'积分'"  :border-bottom="false" :arrow="false"  :value-style="{'color': '#ff8500'}"
			 style="padding: 30rpx 0;">
				
			 </u-cell-item>
		</u-cell-group>
		<view class="btn" @click="exchangePtb">
			兑换平台币
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		data() {
			return {
				ptb_cnt: ""
			}
		},
		computed: {
			integral() {
				return this.ptb_cnt * 100 || 0;
			},
			...mapState({
				userInfo: "userInfo"
			})
		},
		methods: {
			exchangePtb() {
				this.$api.get( "app/shop/goods/exchange_ptb",{
					ptb_cnt: this.ptb_cnt
				}).then(res => {
					if(res.data.code==200){
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
						this.ptb_cnt=""
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}	
				})
			}
				
			
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 32rpx;

		.input {
			margin: 30rpx auto;
		}

		.text {
			text-align: left;
			margin-bottom: 20rpx;
			color: #909399;

			.jifen {
				color: #ff8500;
			}
		}
	}
	.btn{
		margin-top: 40rpx;
		width: 100%;
		height: 80rpx;
		border-radius: 40rpx;
		border: solid 1px #E4E4E4;
		color: rgb(255, 72, 16);
		text-align: center;
		line-height: 76rpx;
		font-size: 30rpx;
		font-weight: 600;
	}
</style>
