<template>
	<view class="box" style="width: 100%;">
		<!-- <view class="" @click="toClick">
			点击跳转
		</view> -->
		<view style="width: 100%; height: 4rpx; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.16); background: #FFFFFF;">
		</view>
		<u-cell-group :border='false' style="padding: 0 16rpx; margin-top: 4rpx;">
			<u-cell-item @click='toSet' :value-style='valueStyle' :title-style='titleStyle' title="通用设置"></u-cell-item>
			<u-cell-item @click='showModal' :value-style='valueStyle' :title-style='titleStyle' :value="fileSizeString" title="清除缓存" :arrow="false"></u-cell-item>
			<u-cell-item :value-style='valueStyle' :title-style='titleStyle' :arrow="false" title="当前版本" :value="version+'.'+sp+'.'+client_id"></u-cell-item>
			<u-cell-item :value-style='valueStyle' :title-style='titleStyle' :arrow="false" title="设备码" :value="$store.state.equipmentCode||0"></u-cell-item>
		</u-cell-group>
		<view class="btn" @click="loginOut" v-if="Object.keys($store.state.userInfo).length">
			<text class="buttons">退出登录</text>
		</view>
		<u-popup v-model="show"  height="300rpx" mode="center" top width="600" border-radius="40">
			<view class="custom_style">
				<view class="" style="color: #000000; font-size: 32rpx;font-family: PingFang SC;">确定要清除缓存？</view>
				<view class="" style="color: #666666;font-size: 28rpx;font-family: PingFang SC;margin-top: 40rpx;">
					下载，图片缓存将被清空
				</view>
				<view class="modalBtn">
					<view  style="width: 50%;text-align: center;color: #666666;"@click="noModal">
						取消
					</view>
					<view @click="clearStorage"  style="width: 50%;background: #fff;text-align: center;color: #FF4810;border: 1rpx solid #FF4810;border-radius: 0px 30px 30px 30px;">
						确认
					</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				fileSizeString:0,
				content: '1313',
				titleStyle: {
					'font-size': '32rpx',
					'color': '#000000',
					'font-family': 'PingFang SC',
					'font-weight': '600',
				},
				valueStyle: {
					'font-size': '28rpx',
					'color': '#666666',
					'font-family': 'PingFang SC',
				},
				modelStyle: {
					'color': '#000000',
					'font-size': '32rpx',
					'font-family': 'PingFang SC',
				},
				customStyle: {
					'padding': '32rpx 32rpx',
				}
			}
		},
	computed: {
			sp() {
				return this.$store.state.sp
			},
			version() {
		
				return plus.runtime.version

			},
			client_id() {
				return this.$store.state.client_id;
			},
			couponCount() {
				return this.$store.state.couponCount;
			},

		},
		onLoad(){
			this.formatSize()
		},
		methods: {
			toClick(){
				uni.navigateTo({
					url:'/pages/my/mySetting/Setting'
				})
			},
			// 显示弹出层
			showModal() {
				this.show = true
			},
			// 隐藏弹出层
			noModal(){
				this.show = false
			},
			// 清除缓存
			clearStorage(){
				this.show = false
			 this.clearCache()
			 plus.downloader.clear();

		
			},
			//清除缓存
		   clearCache() {  
                let that = this;  
                let os = plus.os.name;  
                if (os == 'Android') {  
                    let main = plus.android.runtimeMainActivity();  
                    let sdRoot = main.getCacheDir();  
                    let files = plus.android.invoke(sdRoot, "listFiles");  
                    let len = files.length;  
                    for (let i = 0; i < len; i++) {  
                        let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
                        plus.io.resolveLocalFileSystemURL(filePath, function(entry) {  
                            if (entry.isDirectory) {  
                                entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
                                    uni.showToast({  
                                        title: '缓存清理完成',  
										icon:'none',
                                        duration: 2000  
                                    });  
                                    that.formatSize(); // 重新计算缓存  
                                }, function(e) {  
                                    console.log(e.message)  
                                });  
                            } else {  
                                entry.remove();  
                            }  
                        }, function(e) {  
                            console.log('文件路径读取失败')  
                        });  
                    }  
                } else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
                    plus.cache.clear(function() {  
                        uni.showToast({  
                            title: '缓存清理完成',  
							icon:'none',
                            duration: 2000  
                        });  
                        that.formatSize();  
                    });  
                }  
            
			},
			
			//缓存
			formatSize() {
			    let that = this;  
			    plus.cache.calculate(function(size) {  
			        let sizeCache = parseInt(size);  
			        if (sizeCache == 0) {  
			            that.fileSizeString = "0B";  
			        } else if (sizeCache < 1024) {  
			            that.fileSizeString = sizeCache + "B";  
			        } else if (sizeCache < 1048576) {  
			            that.fileSizeString = (sizeCache / 1024).toFixed(2) + "KB";  
			        } else if (sizeCache < 1073741824) {  
			            that.fileSizeString = (sizeCache / 1048576).toFixed(2) + "MB";  
			        } else {  
			            that.fileSizeString = (sizeCache / 1073741824).toFixed(2) + "GB";  
			        }  
			    });  
			},
			//跳转通用设置
			toSet(){
				uni.navigateTo({
					url: `/pages/my/mySetting/tySetting`
					
				})
			},
			//退出登录
			loginOut() {
				this.$api.get("/user/logout", {}).then(res => {
					// 返回上一页
					uni.navigateBack({
							delta: 1
						}),
					// 清空本地存储的登录数据
					uni.setStorageSync('mem-username', '')
					uni.setStorageSync('mem-password', '')
					uni.setStorageSync('sms-mobile', '')
					this.$store.commit('setInit', {});
					this.$store.commit('setLoginInfo', {});
					this.$store.commit('setUserInfo', {});
					uni.setStorageSync('mem-openid','')
					this.$store.commit('setSelectedGame','')
				})
			}             
		}
	}
</script>

<style scoped lang="scss">
	.cell-hover-class {
		background-color: rgb(235, 237, 238);
	}

	/* 或者单是设置透明度 */
	.cell-hover-class {
		opacity: 0.5;
	}

	.btn {
		margin-top: 120rpx;
		@include flex;
		justify-content: center;
		.buttons{
			@include button(48rpx,16rpx,120rpx);
			font-size: $xw-h2-font;
		}
	
	}

	.custom_style {
		padding: 32rpx 32rpx;
		
	}
	.modalBtn{
		width: 80%;
		height: 60rpx;
		margin: 35rpx 0 0 10%;
		background: #F0F0F0;
		border-radius: 30rpx;
		display: flex;
		line-height: 56rpx;
		flex-flow: row;
	}
</style>
