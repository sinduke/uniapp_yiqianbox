<template>
	<view class="collapse">
		<view class="collapse-item" v-for="(item, index) in itemList" :key="index">
			<view class="collapse-title">
				<u-row>
					<u-col span="1">
						<text class="Number">{{index+1}}</text>
					</u-col>
					<u-col span="10">
						<text @click="handleClick(index)" class="title">{{item.head}}</text>
					</u-col>
					<u-col span="1">
						<u-icon @click="handleClick(index)" color='#C1C1C1' :class="{icon:item.open}" :name="'arrow-right'" size="28"></u-icon>
					</u-col>
				</u-row>

				<view :class="{collapseBody:item.open}" class="collapse-body" >
					<view v-html="item.body"> </view>
				</view>



			</view>


		</view>

	</view>
</template>

<script>
	name: 'xw-collapse'
	export default {
		props: {
			itemList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			}
		},
		methods: {
			handleClick(index) {
				// this.itemList.forEach(item => {
				// 	item.open = false
				// })
				this.itemList[index].open = !this.itemList[index].open
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collapse {
		.icon {
			transform: rotate(90deg);
			transition-property: transform;
			transition-duration: 0.3s;
			transition-timing-function: ease;

		}

		.collapse-item {
			padding: 10rpx 20rpx;

			.collapse-title {
				margin: 10rpx auto;
				padding: 20rpx 0;
				box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
				border-radius: 40rpx;


				.Number {
					padding: 0 12rpx;
					border-radius: 50%;
					background-color: $xw-color-z;
					color: #fff;
					margin-left: 6rpx;
				}

				.title {
					color: $xw-black-dark;
					font-size: 28rpx;
					font-weight: 700;
					white-space: nowrap;
				}
			}

		}

		.collapse-body {
			height: 0;
			overflow: hidden;
			transition-property: transform;
			transition-duration: 0.2s;
			opacity: .8;
			transition-timing-function: ease;
		}

		.collapseBody {
			height: auto;
			padding: 10rpx 25rpx;
			color: #1C1C1C;
			font-size: 26rpx;
		

		}


	}
</style>
