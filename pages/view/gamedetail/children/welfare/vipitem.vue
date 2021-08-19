<template>
	<view v-if="pageData.viptable.list.length>0">
		<view class="title">{{pageData.viptable.list[0].title}}</view>
		<view class="time">{{pageData.viptable.list[0].pub_time}}</view>
		<view class="content" v-html="pageData.viptable.list[0].content"></view>
	</view>
	<nvue-loading v-else ></nvue-loading>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			pageData: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	.title {
		font-weight: 700;
		margin-bottom: 10rpx;
	}

	.time {
		color: $xw-color;
		margin-bottom: 30rpx;
		margin-left: 30rpx;
	}

	//格式
	.content /deep/ table {
		margin: auto;
		width: 95% !important;
		// border: 1rpx solid #ddd;
		border-collapse: separate !important;
		border-spacing: 0;
		/*去掉单元格间隙*/
		border-top: 1px solid #ddd;
		border-left: 1px solid #ddd;
		// border-radius:20px;
		margin-bottom: 60rpx;

		tr {
			border: 1rpx solid #ddd;

			td {
				text-align: center;
				border-bottom: 1px solid #ddd;

				border-right: 1px solid #ddd;
				height: 35px !important;
				p {
					width: 100%;
				}
			}
		}

		// th:last-child {
		// 	border-top-right-radius: 12px;
		// }

		// th:first-child {
		// 	border-top-left-radius: 12px;
		// }

		// td:first-child {
		// 	border-bottom-left-radius: 12px;
		// }

		// td:last-child {
		// 	border-bottom-right-radius: 12px;
		// }

		tr:nth-child(even) {
			background-color: #f2f4f7;
		}
	}
</style>
