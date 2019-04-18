var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
/**
 * Created by 伟大的周鹏斌大王 on 2017/7/14.
 * url post参数信息
 */
var Url_data_model = (function (_super) {
    __extends(Url_data_model, _super);
    function Url_data_model() {
        var _this = _super.call(this) || this;
        _this._cId = 0; /*商品ID*/
        _this.testVId = 3; /*那个版本一下可以接入测试信息 3可以进入 2不可以进入*/
        _this.shareJoining = 0; /*分享房间号 加入房间中  1还没加入 2加入中 3加入过了 4回放模式下*/
        _this._sound = false; /*音量控制*/
        _this.integration_param();
        return _this;
    }
    Object.defineProperty(Url_data_model.prototype, "cId", {
        get: function () {
            return this._cId;
        },
        set: function (value) {
            this._cId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url_data_model.prototype, "gId", {
        get: function () {
            return this._gId;
        },
        set: function (value) {
            this._gId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url_data_model.prototype, "mId", {
        get: function () {
            return this._mId;
        },
        set: function (value) {
            this._mId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url_data_model.prototype, "openId", {
        get: function () {
            if (this._vId <= this.testVId && this.urlParam["openId"]) {
                return this.urlParam["openId"];
            }
            return this._openId;
        },
        set: function (value) {
            this._openId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url_data_model.prototype, "vId", {
        get: function () {
            return this._vId;
        },
        set: function (value) {
            if (value <= this.testVId && this.urlParam["vId"]) {
                this._vId = Number(this.urlParam["vId"]);
            }
            else {
                this._vId = Number(value);
            }
            Url_data_model.vId = this.vId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url_data_model.prototype, "state", {
        get: function () {
            return Number(this._state);
        },
        set: function (value) {
            if (this._vId <= this.testVId && this.urlParam["state"]) {
                value = this.urlParam["state"];
            }
            this.shareJoining = 0;
            if (value) {
                var arr = String(value).split("_");
                if (Number(arr[0]) == 1) {
                    //分享
                    this.shareJoining = 1;
                    this._state = Number(arr[1]);
                }
                else if (Number(arr[0]) == 2 && arr.length >= 3) {
                    //分享回放
                    this.shareJoining = 4;
                    this.playbackInfo = {
                        index: arr[2],
                        file_url: arr[3],
                        share_user_id: arr[4],
                    };
                    if (arr[4]) {
                        this.CONST.PLAYBACK_SHARE_USERID = arr[4];
                    }
                }
                else if (Number(arr[0]) == 3) {
                    //加入俱乐部
                    this.shareJoining = 5;
                    this.CONST.CLUB_SHARE_ID = Number(arr[1]);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url_data_model.prototype, "roomIp", {
        get: function () {
            return this._roomIp;
        },
        set: function (value) {
            if (this._roomIp != value)
                this._roomIp = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Url_data_model.prototype, "service_id", {
        get: function () {
            return this._service_id;
        },
        set: function (value) {
            if (this.urlParam["service_id"]) {
                this._service_id = this.urlParam["service_id"];
            }
            else {
                this._service_id = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Url_data_model.prototype.set_console_sound = function () {
        if (this.vId <= this.testVId && this.urlParam["openId"]) {
            egret.localStorage.setItem("effectSound_isPlay", this.urlParam["sound"]);
            egret.localStorage.setItem("bgSound_isPlay", this.urlParam["sound"]);
        }
    };
    /*获取url参数配置*/
    //整合配置参数
    Url_data_model.prototype.integration_param = function () {
        var aQuery = window.location.href.split("?"); //取得Get参数
        var urlDataInfo = new Array();
        if (aQuery.length > 1) {
            var aBuf = aQuery[1].split("&");
            for (var i = 0, iLoop = aBuf.length; i < iLoop; i++) {
                var aTmp = aBuf[i].split("=");
                urlDataInfo[aTmp[0]] = aTmp[1];
            }
        }
        this.urlParam = urlDataInfo;
    };
    return Url_data_model;
}(Base_model));
__reflect(Url_data_model.prototype, "Url_data_model");
//# sourceMappingURL=Url_data_model.js.map