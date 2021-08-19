<!-- 实名认证 -->
<template>
	<view class="">
		<view class="myshadowLine" style="margin-bottom: 32rpx;"/>
	<view class="container">
		
		<view class="text" style="display: flex;flex-direction: column;align-items: center;">
			<view class="h3" style="font-weight: 700;">{{$t('my.gjgjgd')}}</view>
			<view>{{$t('my.xxjyy')}}</view>
			<view>{{$t('my.wcnryxzf')}}</view>
		</view>
		
		<!-- 已认证 -->
		<view v-if="hasIdentify && pageData" style="display: flex;flex-direction: column;align-items: center;">
			<view class="info">{{$t('my.xm')}}：{{pageData.real_name}}</view>
			<view class="info">{{$t('my.sfzh')}}：{{pageData.id_card}}</view>
			<text class="again">已认证</text>
		</view>
		<view v-else>
			<u-form :model="form" ref="uForm">
				<u-form-item>
					<u-input v-model="form.realname" :border="true" :placeholder="$t('my.qsrndxm')" style="border: none;" />
				</u-form-item>
				<u-form-item>
					<u-input type="select" v-model="form.label" :border="true" :placeholder="$t('my.qxzzj')" @click="select.show = true" style="border: none;" />
					<u-select v-model="select.show" :list="select.list" @confirm="handleSelect"></u-select>
				</u-form-item>
				<u-form-item>
					<u-input v-model="form.idcard" :border="true" :placeholder="$t('my.qsrndzj')" style="border: none;"/>
				</u-form-item>
			</u-form>
			
			<u-toast ref="uToast" />
			
			<view class="" style="display: flex; justify-content: center;">
			<view class="buttons" @click="getPageData">{{$t('confirm')}}</view>
			</view>
		</view>
		
	</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				hasIdentify: false,
				
				pageData: null,
				
				form: {
					realname: "",
					type: "",
					label: "",
					idcard: ""
				},

				select: {
					show: false,
					list: [{
						value: 1,
						label: this.$t('my.dljmsfz')
					}, {
						value: 2,
						label:this.$t('my.tbz')
					}]
				}
			}
		},
		computed: {
			...mapState({
				userInfo: "userInfo",
				client_id: "client_id",
			}),
		},
		// onReady() {
		// 	uni.setNavigationBarTitle({
		// 		title: this.$t('Realnameauthentication')
		// 	})
		// },
		methods: {
			getPageData() {
				this.$api.get("wap/identify/set",{
					...this.form
				}).then(res => {
					if(res.data.code){
						this.$refs.uToast.show({
							title: '认证成功',
							type: 'success',
							back: true
						})
						this.$common.getuserInfo();
					}else{
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						})
					}
				})
			},
			handleSelect(arr) {
				this.form.label = arr[0].label;
				this.form.type = arr[0].value;
			},
			// 获取认证信息
			getIdentify(){
				this.$api.get("wap/identify/info").then(res=>{
					this.pageData = res.data.data
				})
			}
		},
		created(){
			console.log(666,this.userInfo)
			if(this.userInfo.has_identify == 2){
				this.hasIdentify = true;
				this.getIdentify();
			}else{
				this.hasIdentify = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
    background-color: #fff;
		@include padding;

		.text {
			color: $xw-color;
			line-height: 1.7;
			margin-bottom: 30rpx;

			.h3 {
				color: $xw-black-dark;
			}
		}
		
		.info {
			font-size: 32rpx;
			line-height: 50rpx;
			margin-bottom: 10rpx;
			font-weight: 700;
		}
		
		.again {
			color: #ff8500;
			line-height: 50rpx;
		}
	}
	.myshadowLine {
		width: 100%;
		height: 10rpx;
		box-shadow: 0px 0px 8rpx 0px rgba(210, 210, 210, 0.8);
		margin-bottom: 60rpx;
	
	}
	.buttons{
		margin-top: 48rpx;
		@include button(60rpx,20rpx,146rpx);
		 font-size:36rpx;
		 display: inline-block;
	
	
	}
	
</style>
