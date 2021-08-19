'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	// event为客户端上传的参数
	console.log('event : ',typeof event)
	   let req = event// post请求的请求体被包含在event.body中
	   console.log(req,'reqreqreqreqreq')
	// let req = event.queryStringParameters; // 该参数为获取后端传递的access_token和openid，具体变量可以通过console.log打印查看
	    const res = await uniCloud.getPhoneNumber({
	        appid: '__UNI__94481FE', // 替换成自己开通一键登录的应用的DCloud appid，使用callFunction方式调用时可以不传（会自动取当前客户端的appid），如果使用云函数URL化的方式访问必须传此参数
	        provider: 'univerify',
	        apiKey: '59d860a9d11c65165d83fcecdaf01e5a', // 在开发者中心开通服务并获取apiKey
	        apiSecret: '1acca48ec581035831a29bb83bab8014', // 在开发者中心开通服务并获取apiSecret
	        access_token: req.access_token,
	        openid: req.openid
	    })
     // 执行入库等操作，正常情况下不要把完整手机号返回给前端
	
	console.log(res,'resresresresresres')
	
	
	//返回数据给客户端
	return {
        code: 0,
        message: '获取手机号成功',
        content: res // res里面包含了成功获取的真实手机号码
    }
};
