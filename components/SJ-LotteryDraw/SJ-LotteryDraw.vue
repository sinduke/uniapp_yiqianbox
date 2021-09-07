<template>
	<view class="lottery_container">
		<view class="grid_wrap">
			<view class="lottery_wrap">
				<view class="lottery_grid">
					<view v-for="(item, index) in grid_info_arr" :class="{ active: current_index == index && index != 8 }" :key="index" @click="luck_draw" :data-index="index">
						<image v-if="index != 8" class="grid_img" mode='widthFix' style="width: 100rpx;" :src="item.prize_img" alt=""/>
						<text>{{ index == 8 ? '抽奖' : item.prize_name }}</text>
						 
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import LotteryDraw from './SJ-LotteryDraw.js';
	export default {
		data() {
			return {
				current_index: -1,
			};
		},
		props: {
			grid_info_arr: {
				type: Array,
				default: []
			},
			type: {
				type: Number,
				default: 1
			},
			order: {

			},
		},
		onLoad() {},

		methods: {
			luck_draw(event) {
				let index = event.currentTarget.dataset.index;
				let that = this
				if (index == 8) {
				this.$emit("click")
				}
			}
		},
		watch: {
			type: {
				handler(val) {
					if (val == 2) {
						let that = this;
						// 点击抽奖之后知道获奖位置，修改父组件中lottery_draw_param的值
						this.$emit('get_winingIndex', function(res) {
							console.log(res,'resres');
							let lottery_draw_param = res;
							let win = new LotteryDraw({
									// domData: that.lottery_draw_param.domData,
									...lottery_draw_param
								},
								function(index, count) {
									that.current_index = index;
								}
							);

						});
					}
				},
				immediate: true,
				
				
			},
			order: {
				handler(val) {
				},

			}


		}
	};
</script>

<style scoped>
	/* @import './SJ-LotteryDraw.css'; */
</style>
