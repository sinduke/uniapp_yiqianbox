import Vue from 'vue'
import VueI18n from 'vue-i18n'
import langEn from './en'
import langZhCN from './zh-CN'

Vue.use(VueI18n)

let currentLang = uni.getStorageSync('CURRENT_LANG')
if (!currentLang) {
	// 获取设备信息
	uni.getSystemInfo({
		success: function (res) {
			uni.setStorageSync('CURRENT_LANG','zh-CN')
			currentLang = res.language
		}
	})
}
const i18n = new VueI18n({
	// 默认选择的语言
	locale: 'zh-CN',
	messages: {
		'en': langEn,
		'zh-CN': langZhCN
	}
})
export default i18n