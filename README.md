## xw_box_app

闲玩新版app盒子

找手游白金版
AppID: wx11272a3a63d9cad8
AppSecret: 43a95fa92ffe8170e6379d77fc28df6a
iOS平台
iPhone
应用下载地址：未填写
Bundle ID：com.sy12306.hziosxw
测试版本Bundle ID：com.sy12306.hziosxw
Universal Links：https://www.4000yx.com/app/ioshz/bjb/xw/

iPad 无
Android平台
应用下载地址：未填写
应用签名：b948dbc8938ac12238712e079fd369a1
包名：com.g3021491574.zscxw

   - 打包注意

     1. onLaunch

      ```js
     		onLaunch() {
     			this.globalData.$i18n = this.$i18n
     			this.globalData.$t = str => this.$t(str)
     			// 读取client_id
     			 this.channelIDSyncFunc()
     			// 数据初始化
     			this.dataInit();
     			//自动登录
     			this.autoLogin();
     			// 读取设备信息
     			 this.getEquipmentCode();
     			//下载
     			this.getDownLoad()
     			// 获取用户定制信息
     			this.userFormat();
     			setTimeout(() => {
     				// plus.navigator.closeSplashscreen();
     			}, 100)
     			//设置初始化
     			this.getSetting()
     		},  // 修改为这些
      ```

        2. channelIDSyncFunc

           ```js
           			channelIDSyncFunc() {
           				let ret;         
           				let udid;
           				switch (uni.getSystemInfoSync().platform) {
           					case "android":
           						let getXWID = uni.requireNativePlugin("GetXWID")
           						ret = getXWID.channelIDSyncFunc();
           						// console.log(ret,'retretretretrets')
           						if (ret.channelid != 0) {
           							this.$store.commit('setClientId', ret.channelid);
           						} else {
           							this.$store.commit('setClientId', 4231);
           						}
           						break;
           					case "ios":
           						let channelModule = uni.requireNativePlugin("DCChannelUniPlugin-ChannelModule");
           						ret = channelModule.channelIdSyncFunc({
           							'name': 'uni-app',
           							'age': 1
           						}) || 4231
           						this.$store.commit('setClientId', ret);
           						udid = channelModule.udidSyncFunc({
           							'name': 'uni-app',
           							'age': 1
           						}) || ''
           						this.$store.commit('setUdid', udid);       
           						console.log(udid,'udidudidudid')
           						break;
           					default:
           						break;
           				}
           			
           			},  // 修改为这些
           ```

           3. store

              ```js
              // 版本环境
              export default {
              	// api请求头
              	httpAPI: "https://api.sy12306.com/",   // sy12306.com
              	// httpAPI: "https://api.zzchaoyi.cn/", // zzchaoyi.cn
              	// app运行的平台
              	platform: uni.getSystemInfoSync().platform,
              	// 热更最后一位
              	sp: 2,
              	// 加载
              	isLoading: true,
              	// 首页顶部大图数组
              	images: [],
              	// 设备码
              	equipmentCode: "",
              	// client_id
              	client_id:'',
              	systemInfoSync: '',
              	//设备高度
              	myHeight: uni.getSystemInfoSync().windowHeight * (750 / uni.getSystemInfoSync().windowWidth),
              	//设备宽度
              	myWidth: uni.getSystemInfoSync().windowWidth,
              	// 导航栏高度
              	statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
              	//屏幕高度
              	mysHeight: uni.getSystemInfoSync().screenHeight * (750 / uni.getSystemInfoSync().windowWidth),
              	
              	// 网络状态
              	networkType: uni.getNetworkType().networkType,
              	//下载数据
              	downList: [],
              	// game_id
              	app_id: uni.getSystemInfoSync().platform=='android'?100:101,
              	// 初始化数据
              	init: {},
              	// 用户定制数据
              	userFormat: {},
              	// 登录数据
              	loginInfo: {},
              	// 用户信息
              	userInfo: {},
              	// 选择小号信息
              	selectedGame: {
              		game_id: "",
              		gamename: ""
              	},
              	udid:'',
              	//消息
              	newsCount: 0,
              	// 首页顶部大图信息
              	pageRecommendData: null,
              
              	// 记录下载的游戏状态 game_id  downStatus downStatusText
              	gameProgressList: [],
              	// 管理所有的下载任务
              	downTasksList: [],
              	// 管理客服回复
              	serviceList: []
              }  //需要改成如下
              ```

              

           