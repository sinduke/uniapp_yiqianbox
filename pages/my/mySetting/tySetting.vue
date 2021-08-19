<template>
	<view>
		<view
			style="width: 100%; height: 4rpx; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16); background: #FFFFFF;margin-bottom: 6rpx;">
		</view>
		<u-cell-group :border="false">
			<!-- <u-cell-item :border-bottom="false" title="开启消息通知" arrow-direction="down" :arrow="false">
				<u-switch size="43" slot="right-icon" active-color="#FF4810" inactive-color="#E1E1E1"
					v-model="isMessage"></u-switch>
			</u-cell-item> -->
			<u-cell-item :border-bottom="false" title="仅使用WiFi下载" arrow-direction="down" :arrow="false">
				<u-switch size="43" slot="right-icon" active-color="#FF4810" inactive-color="#E1E1E1"
					v-model="isWifiDown"></u-switch>
			</u-cell-item>
			<u-cell-item :border-bottom="false" title="非WIFI下自动播放视频" arrow-direction="down" :arrow="false">
				<u-switch size="43" slot="right-icon" active-color="#FF4810" inactive-color="#E1E1E1" v-model="isWifi">
				</u-switch>
			</u-cell-item>
			<u-cell-item :border-bottom="false" title="下载完成自动打开安装包" arrow-direction="down" :arrow="false">
				<u-switch size="43" slot="right-icon" active-color="#FF4810" inactive-color="#E1E1E1"
					v-model="isinstallGame"></u-switch>
			</u-cell-item>
			<u-cell-item :border-bottom="false" title="安装完成后自动清除安装包" arrow-direction="down" :arrow="false">
				<u-switch size="43" slot="right-icon" active-color="#FF4810" inactive-color="#E1E1E1"
					v-model="isClearPackage"></u-switch>
			</u-cell-item>

		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMessage: uni.getStorageSync('isMessage').status,
				isWifiDown: uni.getStorageSync('isWifiDown').status,
				isWifi: uni.getStorageSync('isWifi').status,
				isinstallGame: uni.getStorageSync('isinstallGame').status,
				isClearPackage: uni.getStorageSync('isClearPackage').status,
				checked5: true,
				titleStyle: {
					'font-size': '32rpx',
					'color': '#000000',
					'font-family': 'PingFang SC',
					'font-weight': '600',
				},
			}

		},
		computed: {

		},
		onLoad() {

		},
		watch: {
			isMessage(val) {
				if (val) {
					uni.setStorageSync('isMessage', {
						type: 1,
						status: true
					})
					uni.showToast({
						title: '消息推送已开启',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})
					// plus.push.setAutoNotification(true);
				} else {
					uni.setStorageSync('isMessage', {
						type: 2,
						status: false
					})
					// plus.push.setAutoNotification(false)

					uni.showToast({
						title: '消息推送已关闭',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})


				}

			},
			isWifi(val) {
				if (val) {
					uni.setStorageSync('isWifi', {
						type: 1,
						status: true
					})
					uni.showToast({
						title: '非Wifi下自动播放视频',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})
				} else {
					uni.setStorageSync('isWifi', {
						type: 2,
						status: false
					})
					uni.showToast({
						title: '非Wifi下不自动播放视频',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})


				}



			},
			/* wifi下载 */
			isWifiDown(val) {
				if (val) {
					uni.setStorageSync('isWifiDown', {
						type: 1,
						status: true
					})
					uni.showToast({
						title: '仅使用Wifi下载',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})
				} else {
					uni.setStorageSync('isWifiDown', {
						type: 2,
						status: false
					})
					uni.showToast({
						title: '仅使用Wifi下载已关闭',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})


				}
			},
	/* 自动安装安装包 */
			isinstallGame(val) {
				if (val) {
					uni.setStorageSync('isinstallGame', {
						type: 1,
						status: true
					})
					uni.showToast({
						title: '自动打开安装包已开启',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})
				} else {
					uni.setStorageSync('isinstallGame', {
						type: 2,
						status: false
					})
					uni.showToast({
						title: '自动打开安装包已关闭',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})


				}
			},
	/* 自动删除安装包 */
			isClearPackage(val) {
				if (val) {
					uni.setStorageSync('isClearPackage', {
						type: 1,
						status: true
					})
					uni.showToast({
						title: '自动删除安装包已开启',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})
				} else {
					uni.setStorageSync('isClearPackage', {
						type: 2,
						status: false
					})
					uni.showToast({
						title: '自动删除安装包已关闭',
						icon: 'none',
						success: () => {
							setTimeout(() => {}, 1200)
						}
					})


				}
			}



		},
	}
</script>

<style>

</style>
