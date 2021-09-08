/*
 * 这里修改state中的数据
 */

export default {
	setPlatform(state, data) {
		state.platform = data;
	},
	setIsLoading(state, data) {
		state.isLoading = data;
	},
	setEquipmentCode(state, data) {
		state.equipmentCode = data;
	},
	setInit(state, data) {
		state.init = data;
	},
	setDownList(state, data){
		state.downList = data;
	},
	setUserFormat(state, data) {
		state.userFormat = data;
	},
	setLoginInfo(state, data) {
		state.loginInfo = data;
	},
	setUserInfo(state, data) {
		state.userInfo = data;
	},
	setSelectedGame(state, data) {
		state.selectedGame = data;
	},
	setPageRecommendData(state, data) {
		state.pageRecommendData = data;
	},
	setSystemInfoSync(state, data) {
		state.systemInfoSync = data;
	},
	setNewsCount(state, data){
		state.newsCount = data;
	},
	setServiceList(state, data){
		state.serviceList = data;
	},
	setNum(state, data){
		state.num = data;
	},
	setImages(state, data) {
		if (state.images.length > 0) {
			for (var key in state.images) {
				if (state.images.hasOwnProperty(key)) {
					if (state.images[key].game_id == data.game_id) {
						return state.images
					}
				} else {
					state.images.push(data)
				}
			}
		} else {
			state.images.push(data)
			
		}
		console.log(state.images ,'state.images',data)

	},
	setClientId(state, data) {
		state.client_id = data
	},
	setGameId(state, data) {
		state.game_id = data;
	},
	setGameProgressList(state, data) {
		state.gameProgressList = data;
	},
	setDownTasksList(state, data) {
		state.downTasksList = data;
	},
	setUdid(state, data){
		state.udid = data;
	},
	setCustom_name(state, data){
		state.custom_name = data;
	}
	
	
}
