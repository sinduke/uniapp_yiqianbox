<template>
	    <view class="sticky-box">	        
		<!-- 滑动区域 -->
		        <scroll-view class="scroll-view_H"  scroll-x="true" scroll-with-animation :scroll-left="tabsScrollLeft" @scroll="scroll">
			            <view class="tab" id="tab_list">
				                <view  style="margin-left: 30px;font-size: 32rpx;color:#666666 ;" id="tab_item"
					v-for="(item, index) in listArr" :key="index" @click="clickSort(index)"                     >
					                    <text :class="{tabsColor:listActive==index}">{{item}}</text>
					                </view>
				            </view>      
			<!-- tabs下划线 -->
			            <view class="tab__line" style="margin-left: 30px;"               
				 :style="{background: lineColor, width: lineStyle.width, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}">
				            </view>
			        
		</scroll-view>
		    
	</view>
</template>


<script>
	export default {
		props: {
			listArr: {
				type: Array,
				default: () => []
			},
			listActive: {
				type: Number,
				default:1,
				//下划线选中项，默认0
			},
			lineColor: {
				type:String,
				default:'red',
				//滑块颜色
			},
			duration:{
				type:Number,
				default:0.2,
				//下滑线动画时长
			},
			tabsScrollLeft:{
				type:Number,
				default:0,
				//tas当前偏移量
			}
			
		},
		data() {
			return {
				
				scrollLeft: 0,
				lineStyle: {}, // 下划线位置--动态甲酸
			}
		},
		watch: {
			listActive(newVal) { // 监听当前选中项
				this.setTabList()
			}
		},

		mounted() {
			this.setTabList()
		},
		methods: {
			clickSort(index) {
				this.listActive = index
				this.$emit('changeTab',this.listActive)
				
			},
			// scroll-view滑动事件
				scroll(e) {
					this.scrollLeft = e.detail.scrollLeft;
				},

			setTabList() {
				this.$nextTick(() => {
					this.setLine()
					this.scrollIntoView()
				})
			},
			// 计算tabs位置
			scrollIntoView() { // item滚动
				let lineLeft = 0;
				this.getElementData('#tab_list', (data) => {
					let list = data[0]
					this.getElementData(`#tab_item`, (data) => {
						let el = data[this.listActive]
						lineLeft = el.width / 2 + (-list.left) + el.left - list.width / 2 - this.scrollLeft
						this.tabsScrollLeft = this.scrollLeft + lineLeft
					})
				})
			},
			//  计算下划线位置
			setLine() {
				let lineWidth = 0,
					lineLeft = 0
				this.getElementData(`#tab_item`, (data) => {
					let el = data[this.listActive]
					lineWidth = el.width / 2
					// lineLeft = el.width * (this.currentIndex + 0.5)  // 此种只能针对每个item长度一致的
					lineLeft = el.width / 2 + (-data[0].left) + el.left
					this.lineStyle = {
						width: `${lineWidth}px`,
						transform: `translateX(${lineLeft}px) translateX(-50%)`,
						transitionDuration: `${this.duration}s`
					};
				})
			},
			getElementData(el, callback) {
				uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
					callback(data[0]);
				});
			},
		},
	}
</script>

<style scoped lang="scss">
	.tabsColor {
		color: #1C1C1C;
		font-weight: bolder;
		font-family: PingFang SC;
		font-size: 36rpx;
	}

	.sticky-box {

		display: flex;
		position: -webkit-sticky;

		position: sticky;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;
		margin: 0px;
		border-top: 1px #f9f9f9 solid;
		border-bottom: 1px #f9f9f9 solid;
		background: #fff;
	}

	.listAll {
		width: 20%;
		text-indent: 62rpx;
		font-size: 30rpx;
		border-left: 1px #eee solid;
		margin: 1% 0;
		padding: 5rpx;
		position: relative;

		image {
			position: absolute;
			left: 20rpx;
			top: 8rpx;
		}
	}

	.tab {
		position: relative;
		display: flex;
		font-size: 28rpx;
		padding-bottom: 10rpx;
		white-space: nowrap;

		&__item {
			flex: 1;
			padding: 0 20rpx;
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
			color: #666;

			&.active {
				color: #09C2C9;
			}
		}
	}

	.tab__line {
		display: block;
		height: 6rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 1;
		border-radius: 3rpx;
		position: relative;
		background: #2FC6CD;
	}

	.scroll-view_H {
		/* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
		white-space: nowrap;
		width: 100%;
	}
</style>





						
					
						
						
						


	
	
	
	
	
	
	
	




						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						