/*
 * 这里存放公共数据状态
 */
// 版本环境
export default {
	// api请求头
	// httpAPI: "https://api.sy12306.com/",   // sy12306.com
	httpAPI: "https://api.zzchaoyi.cn/", // zzchaoyi.cn
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
	client_id:4231,
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
}

