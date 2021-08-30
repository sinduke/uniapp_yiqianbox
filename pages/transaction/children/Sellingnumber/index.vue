<!-- 卖号 -->
<template>
	<view class="container">
		<view class="main">
			<scroll-view scroll-y="true" :style="{height:$store.state.myHeight-200+'rpx'}">
				<view>
					<u-cell-group :border='false'>
						<u-cell-item :title="$t('my.tjyx')" :border-top='false' :value="form.gamename" bg-color="#ffffff"
							@click="addxh"></u-cell-item>
						<u-cell-item :title="$t('my.tjxh')" :border-top='false' :value="form.role_name" bg-color="#ffffff"
							@click="handleRouter('/pages/transaction/children/Sellingnumber/someNumber/someNumber?game_id='+game_id,1)">
						</u-cell-item>
						<u-cell-item title="区服" :border-top='false' :arrow="false" :value="form.server_name" bg-color="#ffffff">
						</u-cell-item>
						<u-cell-item :title="$t('title')" :arrow="false" bg-color="#ffffff">
							<u-input v-model="form.title" type="text" :placeholder="$t('my.qsrhxmd')"
								placeholder-style="text-align:right;color:#E1E1E1" slot="right-icon" input-align="right" />
						</u-cell-item>
						<view style="padding:20rpx 30rpx;margin-bottom:30rpx;">
							<u-input v-model="form.description" type="textarea" :placeholder="$t('my.kmsjsdjzbd')"
								placeholder-style="color:#E1E1E1"></u-input>
						</view>
						<u-cell-item border-top title="售价" :arrow="false" bg-color="#ffffff">
							<u-input v-model="form.price" type="number" :placeholder="$t('my.qtxjezd')+'6元'"
								placeholder-style="text-align:right;color:#E1E1E1" slot="right-icon" input-align="right" />
						</u-cell-item>
					</u-cell-group>
					
					<view>
						<view class="yxjt" style="margin:24rpx 32rpx; font-weight: 600;">
							游戏截图
						</view>
						<view style="padding:0 32rpx;display: flex;justify-content: space-between;">
							<u-upload ref="uUpload" :action="action" upload-text="最多上传三张" max-count="3"	@on-success="uploadSuccess" @on-remove="uploadRemove"	style="background-color: #fff;border-radius:20rpx;color: #E6E6E6;"></u-upload>
<!-- 							<u-upload ref="uUpload1" :action="action" upload-text="" max-count="1"
								@on-success="uploadSuccess" @on-remove="uploadRemove"
								style="background-color: #fff;border-radius:20rpx;color: #E6E6E6;"></u-upload>
							<u-upload ref="uUpload2" :action="action" upload-text="" max-count="1"
								@on-success="uploadSuccess" @on-remove="uploadRemove"
								style="background-color: #fff;border-radius:20rpx;color: #E6E6E6;"></u-upload> -->
						</view>
					
					</view>
					
					<!-- 卖家须知 -->
					<u-modal v-model="showNotice" :title="$t('my.mjxz2')" :show-cancel-button="true"
						:confirm-text="$t('confirm1')+'出售'" confirm-color="#ff5927" :cancel-text="$t('my.fqcs')"
						@confirm="verification">
						<view class="slot-content">
							<view>1.{{$t('my.tjcssqh')}}；</view>
							<view>2.{{$t('my.sjdxhkyz')}}。</view>
							<view>3.{{$t('my.kfzshgcz')}}。</view>
							<view>4.{{$t('my.ydscbkhs')}}。</view>
							<view>5.{{$t('my.scjhdptb')}}。</view>
						</view>
					</u-modal>
					
					<!-- 短信验证 -->
					<u-modal v-model="showVerification" :title="$t('my.mjxz2')" :show-cancel-button="true"
						confirm-color="#ff5927" @confirm="handleSellOut">
						<view class="slot-content">
							<view>{{$t('my.yjxndsjh')}}：{{userInfo.mobile}}{{$t('sendout')+$t('verificationCode')}}</view>
							<view>
								<u-field v-model="form['sms-code']" :placeholder="$t('pleaseInput')+$t('verificationCode')"
									placeholder-style="color: #c0c4d4;" label-width="0">
									<text size="mini" slot="right" type="warning" @click="getCode">{{codeText}}</text>
								</u-field>
								<u-verification-code style="background: #FF5927;" ref="uCode" @change="codeChange"
									unique-key="page-2" :start-text="$t('get')+$t('verificationCode')"
									:end-text="$t('get')+$t('verificationCode')"></u-verification-code>
							</view>
						</view>
					</u-modal>
					<view class="btns">
						<text class="mybutton" @click="submitReview">{{$t('my.tjsh')}}</text>
					</view>
				</view>
				<view class="" style="width: 100%;height: 100rpx;">
					
				</view>
			</scroll-view>

			
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
				form: {
					gamename: '选择游戏',
					role_name: '选择小号',
					mg_mem_id: "",
					mg_role_id: "",
					server_name: "",
					server_id: "",
					price: "",
					title: "",
					description: "",
					image: "",
					"sms-code": "",
					account_id: ""
				},
				game_id: 0,
				action: 'https://api.sy12306.com/asset/upload',
				fileList: [],
				showNotice: false,
				showVerification: false,

				codeText: "",
			}
		},
		computed: {
			selectedGame() {
				return this.$store.state.selectedGame;
			},
			...mapState({
				userInfo: "userInfo",
				client_id: "client_id",
			}),

		},
		methods: {
			// 图片上传
			uploadSuccess(data) {
				this.fileList.push(data.data.url);
				this.form.image = JSON.stringify(this.fileList);
			},
			// 图片删除
			uploadRemove(index) {
				this.fileList.splice(index, 1)
				this.form.image = JSON.stringify(this.fileList);
			},
			// 卖家须知
			submitReview() {
				let title;
				switch (true) {
					case this.form.gamename == '选择游戏':
						title = "请添加游戏";

						break;
					case this.form.role_name == '选择小号':
						title = "请添加小号";

						break;
					case !this.form.server_name:
						title = "请添加区服";

						break;
					case Number(this.form.price) < 6:
						title = "出售最小金额6元";

						break;
					case !this.form.description:
						title = "请输入描述信息";

						break;
					case this.fileList.length < 3:
						title = "图片数量不足";

						break;
					case this.$store.state.userInfo.mobile.length == 0:
						uni.showModal({
							title: "请先绑定手机号",
							complete() {
								uni.navigateTo({
									url: '/pages/view/changeMobile/changeMobile'
								})

							}
						})
						return;
					default:
						this.showNotice = true;
						return;
				}
				uni.showToast({
					title,
					icon: 'none'
				})
			},
			// 短信验证
			verification() {
				this.showNotice = false;
				this.showVerification = true;
			},
			codeChange(text) {
				this.codeText = text;
			},
			//跳转
			handleRouter(url, type) {
				if (!type) {
					uni.navigateTo({
						url
					})
				} else if (!this.game_id) {
					uni.showToast({
						title: '请选择游戏',
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url
					})
				}

			},
			// 发送短信验证码
			getCode() {
				let that = this;
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码',
						success() {
							that.$api.get("v8/sms/send", {
								"sms-type": 4,
								"sms-mobile": that.userInfo.mobile

							}).then(res => {
								uni.showToast({
									title: res.data.msg,
									icon: "none"
								})

								if (res.data.code == 200) {
									uni.hideLoading();
									that.$refs.uCode.start();
								}
							})
						}
					})
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			// 确认出售
			handleSellOut() {
				console.log(this.form);
				this.$api.get("account/goods/sell", {
					...this.form,
					"sms-type": 4,
					"sms-mobile": this.$store.state.userInfo.mobile,

				}).then(res => {
					if (res.data.code == 200) {
						console.log(res, 'resresresresresres')
						
						this.showVerification = false;
						uni.showToast({
							title: "出售成功"
						})
						this.resetForm();
						this.clear()
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}

				})
			},
			// 重置表单
			resetForm() {
				this.form = {
					gamename: "选择游戏",
					role_name: "选择小号",
					mg_mem_id: "",
					mg_role_id: "",
					server_name: "",
					server_id: "",
					price: "",
					title: "",
					description: "",
					image: "",
					"sms-code": ""
				};

			},
			clear() {
				this.$refs.uUpload.clear()
			},
			addxh() {
				this.resetForm()
				this.clear()
				this.handleRouter('/pages/transaction/children/Sellingnumber/addGame/addGame')
			}
		},

		watch: {
			selectedGame: {
				handler(val) {
					this.resetForm();
					if (val.game_id) {
						this.form.gamename = val.gamename;
						this.form.role_name = val.role_name || '选择小号';
						this.form.server_name = val.server_name;
						this.game_id = val.game_id
						this.form.account_id = val.id
						this.form.mg_mem_id = val.id
						this.form.mg_role_id = val.mg_id
					}
				},
				immediate: true
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container {

		.btns {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.mybutton {
				@include button(60rpx, 20rpx, 120rpx);
				font-size: 34rpx;
				margin: 20rpx 0;
			}
		}

		// 弹出窗口
		.slot-content {
			line-height: 40rpx;
			@include padding;
		}
	}
</style>
