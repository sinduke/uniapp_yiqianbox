<template>
	<view class="xw-downLoadButton">
		<view class="" v-if="item">
			<view class="buttons"  v-if="downtype==3">
				<view class="button" @click="handleOpenApp">启 动</view>
			</view>
			<view class="buttons"  v-else-if="downtype==4">
				<view class="button" @click="installApp(item.filename)">未安装</view>
			</view>
			<view class="buttons" v-else-if="isTrue&&!downtype" @click="handleStop"	>
				<nvue-progress :loadLoading='progress' :mheight='8' :wNumber='2.5' :type='1'></nvue-progress>
			</view>
			<view class="buttons" v-else>
				<view class="button" @click="handleResume">继 续</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				downtype:0,
				isTrue: false,
				progress:0,   
			}
		},
		props:{
			item:{
				type:Object,
				default:()=>{}
			},
			sort:{
				type:Number,
				default:-1
			},
			getData:{
				type:Number,
				default:0
			}
		},
		computed: {
			downTasksItem() {
				return this.$store.state.downTasksList.length>0?this.$store.state.downTasksList[this.sort].downTasks:''
			}
		},
		methods:{
			//打开
			handleOpenApp(){
				plus.runtime.launchApplication( {pname:this.item.package_name}, err => {uni.showToast({ title:'打开失败',icon:'none'	})} );
				
			},
			//安装
			installApp(name){
				plus.runtime.openFile(name);
			},
			//暂停App
			handleStop(){
				this.isTrue = false
				// 
				if(this.downTasksItem){
					this.downTasksItem.pause()
				}else{
					this.downTasks.pause();
				}
			},
			//继续
			handleResume(){
				this.isTrue = true
				// 
				if(this.downTasksItem){
					this.downTasksItem.resume();
				}else{
					this.downTasks.resume();
				}
				
			},
			//开始下载
			startApp(){
				 this.downTasks.start();
			
			},
			// 创建下载任务函数
			createDownload() {
				
				// if(this.isTrue){
					
					let  isinstallGame = uni.getStorageSync('isinstallGame').status
					console.log(this.item.down_url,'down_url, indexdown_url, index')
					this.downTasks = plus.downloader.createDownload(this.item.down_url, {}, (downloadFile, status) => {
						// 下载完成后的回调函数，成功失败都会进来
						if(status == 200){
							let arrList = uni.getStorageSync('downList')
					            arrList.forEach(item=>{
									this.$store.state.downTasksList.forEach(value=>{
										if(item.game_id==value.game_id){
											if(value.downTasks.filename==downloadFile.filename){
												item.filename = downloadFile.filename
												item.myTotalData = this.item.myTotalData
												item.myloading = 0
											}
											
										}
										
										
										
									})
								})
							// arrList[this.sort].filename = downloadFile.filename 
							// arrList[this.sort].myTotalData = this.item.myTotalData
						    // arrList[this.sort].myloading = 0  
					        this.$emit('getData',[arrList,this.$store.state.downTasksList])	 
							// uni.setStorageSync('downList',[])
							uni.setStorageSync('downList',arrList)
							
						   console.log(arrList[this.sort],this.sort,this.$store.state.downTasksList,this.downTasksItem,'down_url, indexdown_url, index')
						   if(isinstallGame){
							this.installApp(downloadFile.filename)
						   }else{
							   uni.showToast({
							   	title:"下载完成",
								icon:'none'
							   })
							   this.downtype = 4
						   }
						}else{
							uni.showToast({
								title:'下载失败，请重新下载',
								icon:'none',
								success: () => {
									
								}
							})
						}
					})
					if(this.isTrue){
						this.startApp()
					}
					  
					  this.addEventList(this.downTasks)
					
					// if(this.sort){
					//     this.handleStop()
					// }
				// }
				
			   
			},
			//监听
	         addEventList(item){
				 console.log(666,this.isTrue)
				item.addEventListener("statechanged", (res, status)=>{
				     this.item.myloading =  (res.downloadedSize / 1024 / 1024) .toFixed(2)+ 'MB'
					 this.item.myTotalData = (res.totalSize / 1024 / 1024).toFixed(2) +'MB'
					 this.progress = Math.round(res.downloadedSize / res.totalSize * 100)  
                     console.log( this.item.myloading, this.item.myTotalData,'down_url, indexdown_url, index') 
					  
				}) 
				//如果是第一次进入
				 if(this.downTasks){
					let downList = []
					downList = this.$store.state.downTasksList
					downList[this.sort].downTasks = this.downTasks 
					this.$store.commit('setDownTasksList',[])
				    this.$store.commit('setDownTasksList',downList) 				 
				 }else{
					 this.downTasks = this.downTasksItem 
				 }
				 	
			
			 },
			//判断App是否存在
			checkApp(){	
				// console.log(this.item,this.downTasksItem ,'this.item.package_namethis.item.package_namethis.item.package_names')
				if(plus.runtime.isApplicationExist({pname:this.item.package_name})){
						this.downtype = 3
						plus.downloader.clear(4);
						let arrList = uni.getStorageSync('downList')
						arrList[this.sort].downs = 1
						uni.setStorageSync('downList',arrList)
						return true
					}else{
						if(this.item.downs==1){
						// console.log(this.item,'this.item.package_namethis.item.package_namethis.item.package_names')
					
						let arrList = uni.getStorageSync('downList')
						let a = arrList.filter(item=>{
								return item.game_id!=arrList[this.sort].game_id
							})
							let downList = this.$store.state.downTasksList
							let b  = downList.filter(item=>{
								return item.game_id!=downList[this.sort].game_id
							})						
						this.$emit('getData',[a,b])
						this.$store.commit('setDownTasksList',b) 		
						uni.setStorageSync('downList',a)
						}
						if(this.item.filename){
							this.downtype = 4
						}
						return false
					}	
			}
		},
		beforeDestroy() {
			let arrList = uni.getStorageSync('downList')
			arrList[this.sort].myTotalData = this.item.myTotalData
			arrList[this.sort].myloading = this.item.myloading
			arrList[this.sort].status = this.isTrue ? 1 : 0
			uni.setStorageSync('downList',[])
			uni.setStorageSync('downList',arrList)
	
		},
		mounted() {
			let arrList = uni.getStorageSync('downList')
			if(!this.checkApp()&&this.downtype!=4){
				if(this.downTasksItem){
					this.addEventList(this.downTasksItem)
					// this.isTrue=true
					this.item.status?this.isTrue=true:this.isTrue=false
				}else{
						
					this.createDownload()
				}
				
			}
			
		},
		watch:{
			getData:{
				handler(val){
	
					this.checkApp()
					
				},
            immediate: true
			}
		}
	}
</script>

<style scoped lang="scss">
	.buttons {
           @include flex;
		   justify-content: center;
			width: 140rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			// padding:0 32rpx; 
			border: 2rpx solid #efefef;
			border-radius: 48rpx;
			// @include button(32rpx, 10rpx, 32rpx);
		.button {
			white-space: nowrap;
			font-size: $xw-font;
			color: #FF5927;
		}
	}
</style>
