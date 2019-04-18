var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 伟大的周鹏斌大王 on 2017/7/22.
 * 微信分享服务类.
 * 丹阳特有-不用合并
 * http://res.wx.qq.com/open/js/jweixin-1.2.0.js
 */
var Weixin_JSSDK_model = (function (_super) {
    __extends(Weixin_JSSDK_model, _super);
    function Weixin_JSSDK_model() {
        var _this = _super.call(this) || this;
        _this.share_icon_url = ""; //分享图片基础地址
        _this.weixinJSDKUrl = ""; /*授权信息获取地址*/
        _this.SDKAuth = false; /*是否授权过了*/
        _this.gameLink = ""; /*游戏登录链接*/
        /*----------------------语音接口-------------------------*/
        /*开始录音*/
        _this.startRecording = -1;
        _this.weixin = window["wx"];
        if (!_this.weixin) {
            MyConsole.getInstance().trace("没有加载微信jssdk js文件", 0);
        }
        return _this;
    }
    Weixin_JSSDK_model.getInstance = function () {
        if (!this.service) {
            this.service = new Weixin_JSSDK_model();
        }
        return this.service;
    };
    //进行基础配置
    Weixin_JSSDK_model.prototype.set_config = function (http_host, cId, mId, game_folder) {
        //微信授权地址配置
        this.weixinJSDKUrl = http_host + "login/open/us.share.index.html";
        //游戏登陆/分享地址配置
        this.gameLink = http_host + "login/open/us.login.index.html";
        //分享图片基础地址配置
        this.share_icon_url = http_host + "game/" + game_folder + "/";
        this.cId = cId;
        this.mId = mId;
        this.icon_name = Main.pro_name;
    };
    /*------关闭当前页面------*/
    Weixin_JSSDK_model.prototype.closeWindow = function () {
        this.sdkAuthorization(function () {
            this.weixin.closeWindow();
        }.bind(this));
    };
    /*----------------------分享接口-------------------------*/
    //游戏大厅分享
    //分享icon用(icon_g/通用分享ICON icon_d/代开分享ICON icon_h/回放分享ICON)
    Weixin_JSSDK_model.prototype.hallShare = function () {
        var data = {
            title: "【" + this.CONST.GAME_NAME + "】",
            link: this.gameLink + "?cId=" + this.cId,
            imgUrl: this.share_icon_url + "icon.png",
            desc: "原汁原味本地打法。无需下载，分享好友，直接组局！"
        };
        this.weixinShare(data);
    };
    /*
     * tyq-游戏中分享
     * @params roomId：房间号
     * @params totalNum：总（局/圈）数
     * @params ruleText：玩法信息（计分方式）
     * @params cur_user_num：已有玩家数
     * @params last_user_num：所缺玩家数
     * @params house_own_name：房主昵称
     * @params type：分享类型（original-房主模式 replace-代开模式）
     * */
    Weixin_JSSDK_model.prototype.gameShare = function (roomId, ruleText, last_user_num, house_own_name, type) {
        if (house_own_name === void 0) { house_own_name = "未知"; }
        if (type === void 0) { type = "original"; }
        //分享Icon
        var img_url = "";
        if (type == "original") {
            img_url = this.share_icon_url + "icon.png";
        }
        else {
            img_url = this.share_icon_url + "icon_2.png";
        }
        var last_str = "缺" + last_user_num;
        if (!last_user_num) {
            last_str = "已满";
        }
        var data = {
            title: this.CONST.GAME_NAME + "　房间号:" + roomId + "　" + last_str,
            link: this.gameLink + "?cId=" + this.cId + "&state=1_" + roomId,
            imgUrl: img_url,
            desc: "房主:" + house_own_name + " 玩法:" + ruleText
        };
        this.weixinShare(data);
    };
    /*
    * 大结算分享
    * 代开历史分享
    *
    * */
    Weixin_JSSDK_model.prototype.settlementShare = function (roomId, userList, type) {
        if (type === void 0) { type = "original"; }
        //分数 排序
        userList.sort(function (a, b) {
            return b.score - a.score;
        });
        //根据数据处理文本
        var title_str = "大赢家-" + getName(userList[0], 6) + ":" + userList[0].score + "分";
        var desc_str = "";
        for (var j = 1; j < userList.length; j++) {
            var str = getName(userList[j]) + "：" + userList[j].score + "分";
            var temp_str = j == userList.lengh - 1 ? str : str + "  \n";
            desc_str += temp_str;
        }
        //分享Icon
        var img_url;
        if (type == "original") {
            img_url = this.share_icon_url + "icon.png";
        }
        else {
            img_url = this.share_icon_url + "icon_2.png";
        }
        //最终分享文本
        var data = {
            title: title_str,
            link: this.gameLink + "?cId=" + this.cId + "&state=1_" + roomId,
            imgUrl: img_url,
            desc: desc_str
        };
        //处理超出长度的名字方法
        function getName(model, len) {
            if (len === void 0) { len = 5; }
            if (!model)
                return "";
            var name = decodeURIComponent(model.userName);
            if (model.user_model)
                name = model.user_model.userName;
            if (name.length > len) {
                name = name.substr(0, len) + "..";
            }
            return name;
        }
        this.weixinShare(data);
    };
    /**
     * 回放分享-----------------------------------
    * roomId:房间ID
    * number:第几局
    * timer:当前时间
    * url:整个路径
    * */
    Weixin_JSSDK_model.prototype.playbackShare = function (roomId, number, timer, url, userName, userId) {
        var data = {
            title: "牌局回放-【" + Const_model.getInstance().GAME_NAME + "】",
            link: this.gameLink + "?cId=" + this.cId + "&state=2_" + roomId + "_" + number + "_" + url + "_" + userId,
            imgUrl: this.share_icon_url + "icon_3.png",
            desc: "来自:" + userName + ",时间:" + timer
        };
        this.weixinShare(data);
    };
    Weixin_JSSDK_model.prototype.startRecord = function () {
        this.stopRecord(null);
        if (this.startRecording == -1) {
            Sound_model.setBackSoundVolume(0);
            this.startRecording = 1;
            this.sdkAuthorization(function () {
                this.weixin.startRecord();
            }.bind(this));
        }
    };
    /*停止录音*/
    Weixin_JSSDK_model.prototype.stopRecord = function (backFun) {
        // var self=this;
        // if(this.startRecording==1){
        //     this.startRecording=2;
        //     Sound_model.setBackSoundVolume(1);
        //     this.sdkAuthorization(function () {
        //         self.weixin.stopRecord({
        //             success: function (res) {
        //                 self.startRecording=-1;
        //                 if(backFun){
        //                     self.uploadVoice(res.localId,function (localId) {
        //                         //传递语音消息
        //                         BaseModel.getInstance().eventRadio("changeChatStatus",{
        //                             "type":4,
        //                             "idx":localId,
        //                             "local":true//本地语音直接播放不下载
        //                         });
        //                     });
        //                 }
        //             }
        //         });
        //     }.bind(this));
        // }
        if (backFun === void 0) { backFun = null; }
    };
    /*监听录音自动停止接口*/
    Weixin_JSSDK_model.prototype.onVoiceRecordEnd = function (backFun) {
        this.sdkAuthorization(function () {
            this.weixin.onVoiceRecordEnd({
                complete: function (res) {
                    backFun(res.localId);
                }
            });
        }.bind(this));
    };
    /*播放语音接口*/
    Weixin_JSSDK_model.prototype.playVoice = function (id, userId) {
        // this.sdkAuthorization(function () {
        //     MyConsole.getInstance().trace("播放录音");
        //     Sound_model.setBackSoundVolume(0);
        //     BaseModel.getInstance().eventRadio("isVoicing",{Id:userId,_isVoicing:true});
        //     this.weixin.playVoice({
        //         localId: id // 需要播放的音频的本地ID，由stopRecord接口获得
        //     });
        //     this.weixin.onVoicePlayEnd({
        //         success: function (res) {
        //             Sound_model.setBackSoundVolume(1);
        //             BaseModel.getInstance().eventRadio("isVoicing",{Id:userId,_isVoicing:false});
        //         }
        //     });
        // }.bind(this));
    };
    /*上传语音接口*/
    Weixin_JSSDK_model.prototype.uploadVoice = function (id, backFun) {
        var self = this;
        this.sdkAuthorization(function () {
            self.startRecording = 101;
            this.weixin.uploadVoice({
                localId: id,
                isShowProgressTips: 0,
                success: function (res) {
                    self.startRecording = -1;
                    backFun(res.serverId); // 返回音频的服务器端ID
                }
            });
        }.bind(this));
    };
    /*下载语音接口*/
    Weixin_JSSDK_model.prototype.downloadVoice = function (id, userId, backFun) {
        var self = this;
        this.sdkAuthorization(function () {
            self.startRecording = 100;
            this.weixin.downloadVoice({
                serverId: id,
                isShowProgressTips: 0,
                success: function (res) {
                    self.startRecording = -1;
                    backFun(res.localId, userId); // 返回音频的服务器端ID
                }
            });
        }.bind(this));
    };
    /*-----------------------定位接口------------------------*/
    Weixin_JSSDK_model.prototype.get_position = function (backFun) {
        if (this.weixin) {
            var self = this;
            self.sdkAuthorization(function () {
                self.weixin.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        //坐标转换
                        Http_service_model.getInstance().position_return(longitude, latitude, function (x, y) {
                            backFun(Math.ceil(x), Math.ceil(y));
                        });
                    }
                });
            });
        }
    };
    /*-----------------------基础接口------------------------*/
    //基础分析设置
    Weixin_JSSDK_model.prototype.weixinShare = function (shareData, _shareOk) {
        if (_shareOk === void 0) { _shareOk = null; }
        var wx = this.weixin;
        this.sdkAuthorization(setWeiXinShare);
        /*设置分享*/
        function setWeiXinShare() {
            wx.onMenuShareTimeline({
                title: shareData["title"],
                link: shareData["link"],
                imgUrl: shareData["imgUrl"],
                success: function () {
                    // 用户确认分享后执行的回调函数
                    shareOk(1);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: shareData["title"],
                desc: shareData["desc"],
                link: shareData["link"],
                imgUrl: shareData["imgUrl"],
                success: function () {
                    // 用户确认分享后执行的回调函数
                    shareOk(2);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareQQ({
                title: shareData["title"],
                desc: shareData["desc"],
                link: shareData["link"],
                imgUrl: shareData["imgUrl"],
                success: function () {
                    // 用户确认分享后执行的回调函数
                    shareOk(3);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareWeibo({
                title: shareData["title"],
                desc: shareData["desc"],
                link: shareData["link"],
                imgUrl: shareData["imgUrl"],
                success: function () {
                    // 用户确认分享后执行的回调函数
                    shareOk(4);
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            // /*隐藏按钮*/
            // wx.hideMenuItems({
            //     menuList: ["menuItem:copyUrl","menuItem:setFont","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:QZone","menuItem:editTag","menuItem:readMode","menuItem:openWithQQBrowser","menuItem:openWithSafari","menuItem:share:email"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            // });
        }
        /*分享成功*/
        function shareOk(num) {
            //统计信息
            Statistic_service_model.getInstance().share(null);
            if (_shareOk)
                _shareOk(num);
        }
    };
    /*授权jsdk*/
    Weixin_JSSDK_model.prototype.sdkAuthorization = function (authOKBackFun) {
        var configData, self = this, wx = this.weixin;
        if (self.SDKAuth) {
            authOKBackFun();
            return;
        }
        else if (!wx)
            return;
        function getJSSDKData(backFun) {
            self.http(self.weixinJSDKUrl, { gUrl: window.location.href, mId: self.mId }, function (data) {
                self.SDKAuth = true;
                configData = data;
                backFun();
            }, false);
        }
        getJSSDKData(function () {
            wx.config({
                debug: false,
                appId: configData.appId,
                timestamp: configData.timestamp,
                nonceStr: configData.nonceStr,
                signature: configData.signature,
                jsApiList: ["uploadImage", "chooseImage", "hideMenuItems", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "startRecord", "stopRecord", "playVoice", "uploadVoice", "downloadVoice", "getLocation"
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
                self.SDKAuth = true;
                authOKBackFun();
            });
            wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        }.bind(this));
    };
    /**向 服务器 发送数据*/
    Weixin_JSSDK_model.prototype.selectSendInfoTips = function (data) {
        /*微信数据*/
        MyConsole.getInstance().trace("微信相关接口返回数据");
        MyConsole.getInstance().trace(data, 100001); //打印日志
    };
    return Weixin_JSSDK_model;
}(Base_service_model));
__reflect(Weixin_JSSDK_model.prototype, "Weixin_JSSDK_model");
//# sourceMappingURL=weixinJSSDKService.js.map