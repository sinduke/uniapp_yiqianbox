<template>
    <view class="content">
        <view>
            <image class="logo" src="/static/logo.png"></image>
        </view>
        <view class="uni-list-cell-db">
            <picker @change="bindPickerChange" :value="index" :range="info" :range-key="'saveName'">
                <view class="uni-input">{{info[index].saveName}}</view>
            </picker>
        </view>
        <view style="margin-top: 50px;">
            <button @click="start">创建下载</button>
        </view>
        <view>
            <button @click="queryAll">查询下载列表</button>
        </view>
        <view>
            <button @click="recoverAll">开始所有下载</button>
        </view>
        <view>
            <button @click="pauseAll">暂停所有下载</button>
        </view>
        <view>
            <button @click="listener">开始监听</button>
        </view>
        <view>
            <button @click="stopListener">停止监听</button>
        </view>
        <view>
            <button @click="deleteAll">删除全部</button>
        </view>
        <view v-for="(item,index) in downloadList" :key="index">
            <text>{{item.name}}</text>
            <text>{{item.status}}</text>
            <text>{{item.currentLength}}/{{item.totalLength}}</text>
            <progress :percent="(item.currentLength / item.totalLength) * 100" :active="false" stroke-width="3" />
            <button type="primary" @click="pauseById(item.id)">暂停</button>
            <button type="primary" @click="resumeById(item.id)">恢复</button>
            <button type="primary" @click="cancelById(item.id)">取消</button>
            <button type="primary" @click="deleteById(item.id)">删除</button>
        </view>
    </view>
</template>

<script>
    const DownloaderManager = uni.requireNativePlugin('Karma617-DownloaderManager');
    export default {
        data() {
            return {
                downUrl: "http://dldir1.qq.com/weixin/android/weixin708android1540.apk",
                saveName: "微信.apk",
                downloadList:[],
                info: [
                    {
                        downUrl: "http://dldir1.qq.com/weixin/android/weixin708android1540.apk",
                        saveName: "微信.apk",
                    },
                    {
                        downUrl: "http://issuecdn.baidupcs.com/issue/netdisk/yunguanjia/BaiduNetdisk_6.8.4.1.exe",
                        saveName: "百度网盘.exe",
                    },
                    {
                        downUrl: "http://issuecdn.baidupcs.com/issue/netdisk/apk/BaiduNetdisk_10.0.101.apk",
                        saveName: "百度网盘.apk",
                    },
                    {
                        downUrl: "https://dldir1.qq.com/weixin/Windows/WeChatSetup.exe",
                        saveName: "微信.exe",
                    },
                    {
                        downUrl: "https://qd.myapp.com/myapp/qqteam/AndroidQQ/mobileqq_android.apk",
                        saveName: "qq.apk",
                    }
                ],
                index: 0,
                isListener: false,
                taskList: [],
                taskIdList: [],
                taskStart:false
            }
        },
        onReady() {
            var _this = this;
            DownloaderManager.init({
                maxDownloadTasks: 3,        // 最大同时下载任务数
                downloadDir: '/storage/emulated/0/Android/data/com.qdapi.downloader/cache/myDownloader', // 下载文件路径
                maxDownloadThreads: 3,      // 最大下载线程数
                autoRecovery: false,        // 是否自动恢复下载
                openRetry: true,            // 下载失败是否打开重试
                maxRetryCount: 2,           // 重试次数
                retryIntervalMillis: 1000   // 每次重试时间间隔（毫秒）
            }, function(res){
                if(0 == res.code){
                    uni.showToast({
                        title: res.msg,
                        icon: "none"
                    })
                    // 显示下载列表
                    _this.queryAll();
                }
            });
        },
        methods: {
            bindPickerChange (e){
                this.downUrl = this.info[e.target.value].downUrl;
                this.saveName = this.info[e.target.value].saveName;
                this.index = e.target.value;
            },
            start () {
                var _this = this;
                // 文件保存目录，应用目录下的cache/quietDownload/this.saveName
                DownloaderManager.createDownloadTask({
                    downUrl: 'http://xwweb.sy12306.com/game/down_apk?id=66wg',
                    saveName: 'this.saveName'  // 此处可改成根据下载地址自动获取文件名及文件格式
                }, function(res){
                    if(0 == res.code){
                        _this.listener();
                    }
                });
            },
            queryAll () {
                var _this = this;
                DownloaderManager.queryAll(function(res){
                    _this.downloadList = JSON.parse(res.data);
                });
            },
            recoverAll () {
                DownloaderManager.recoverAll();
                this.queryAll();
            },
            pauseAll () {
                DownloaderManager.pauseAll();
            },
            listener () {
                var _this = this;
                if(!_this.isListener){
                    // 如果有正在进行中的下载任务，此方法将返回下载中的任务信息
                    // 回调频率为 1秒
                    DownloaderManager.listener(function(res){
						console.log(res,'resresresres')
                        _this.isListener = true;
                        // 注意 res.data 这个是字符串，需要手动转为object
                        // 观察者模式监听下载状态，需手动赋值，
                        // 小弟才疏学浅~写的很混乱，希望大佬能优化一下这个方法，感激不尽
                        let _res = JSON.parse(res.data);
                        if (_res instanceof Object) {
                            let obj = {
                                id: _res.id,
                                name: _res.save_name,
                                status: _res.status,
                                currentLength: _res.current_size,
                                totalLength: _res.total_size
                            };
                            // 添加进下载队列
                            _this.taskList.push(obj);
                            // 查询队列id里是否已有此任务id，没有则在下载列表里追加一条任务
                            if (_this.taskIdList.indexOf(obj.id) == -1) {
                                _this.taskIdList.push(_res.id);
                                _this.downloadList.push(obj);
                            }
                            // 渲染列表
                            if(!_this.taskStart){
                                _this.taskStart = true;
                                _this.doTask();
                            }
                        }
                    });
                }
            },
            stopListener () {
                this.isListener = false;
                DownloaderManager.stopListener();
            },
            deleteAll() {
                // 删除之前若有任务在进行中，请先暂停全部任务再进行删除操作
                DownloaderManager.deleteAll(true);
                this.queryAll();
                this.taskList = [];
                this.taskIdList= [];
                this.taskStart= false;
            },
            deleteById(id) {
                // 删除之前若任务在进行中，请先暂停任务再进行删除操作
                // deleteById 参数1：任务id 参数2：是否同时删除文件 参数3：要删除的文件名
                DownloaderManager.deleteById(id, true, "微信.apk");
                this.queryAll();
            },
            pauseById(id) {
                DownloaderManager.pauseById(id);
            },
            resumeById(id) {
                DownloaderManager.resumeById(id);
            },
            cancelById(id) {
                DownloaderManager.cancelById(id);
            },
            doTask () {
                var _this = this;
                let taskTimer = setInterval(function(){
                    let obj = _this.taskList[0];
                    // 查询任务id列表内是否有下载id并返回索引
                    let index = _this.taskIdList.indexOf(obj.id);
                    // 更新下载列表数据
                    _this.downloadList.find(function(value, index){
                        if (value.id == obj.id) {
                            _this.$set(_this.downloadList, index, obj);
                        }
                    })
                    // 剔除一条下载任务
                    _this.taskList.shift();
                    // 下载任务列表为空，停止数据更新
                    if(_this.taskList.length == 0){
                        _this.taskStart = false;
                        // 从数据库中查询任务列表，保证下载任务是最新并准确的
                        _this.queryAll();
                        clearInterval(taskTimer);
                    }
                }, 400);
            }
        }
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .logo {
        height: 200rpx;
        width: 200rpx;
        margin-top: 200rpx;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50rpx;
    }

    .text-area {
        display: flex;
        justify-content: center;
    }

    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }
</style>