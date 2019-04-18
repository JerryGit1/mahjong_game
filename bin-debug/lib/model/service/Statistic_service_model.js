var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 伟大的周鹏斌大王 on 2017/8/10.
 */
var Statistic_service_model = (function (_super) {
    __extends(Statistic_service_model, _super);
    function Statistic_service_model() {
        var _this = _super.call(this) || this;
        //private host="http://www.aoh5.com/";
        //private host="http://192.168.1.21:8080/";
        _this.host = "";
        _this.url = "gmserver/open/us.statistic.index.html";
        // this.url=AH_baseService.host+"gmserver/open/us.statistic.index.html";
        var type = _this.CONST.version_type;
        switch (type) {
            case "alpha":
                _this.host = "http://47.93.61.29:8999/";
                break;
            case "release":
                _this.host = "http://39.106.67.236:8999/";
                break;
            default: break;
        }
        _this.p_name = Main.pro_name;
        _this.url = _this.host + "gmserver/open/us.statistic.index.html";
        return _this;
    }
    Statistic_service_model.getInstance = function () {
        if (!this.service) {
            this.service = new Statistic_service_model();
        }
        return this.service;
    };
    /*统计*/
    /*登录统计*/
    Statistic_service_model.prototype.login = function () {
        /*统计*/
        if (!this.CONST.login_statistic) {
            this.CONST.login_statistic = true;
            this.http({
                p_name: this.p_name,
                o_name: "login"
            });
        }
    };
    /*房主房间统计*/
    Statistic_service_model.prototype.createRoomTypeOne = function () {
        this.http({
            p_name: this.p_name,
            o_name: "fang_room"
        });
        // MyConsole.getInstance().trace("房主房间次数统计**","custom3");
    };
    /*代开房间统计*/
    Statistic_service_model.prototype.createRoomTypeTwo = function () {
        this.http({
            p_name: this.p_name,
            o_name: "dai_room"
        });
        // MyConsole.getInstance().trace("代开房间次数统计**","custom3");
    };
    /*小结算次数统计*/
    Statistic_service_model.prototype.smallSettleTimes = function () {
        this.http({
            p_name: this.p_name,
            o_name: "xjs"
        });
        // MyConsole.getInstance().trace("小结算次数统计**","custom3");
    };
    /*大结算次数统计*/
    Statistic_service_model.prototype.maxSettleTimes = function () {
        this.http({
            p_name: this.p_name,
            o_name: "djs"
        });
        // MyConsole.getInstance().trace("大结算次数统计**","custom3");
    };
    /*2圈开房类型次数统计*/
    Statistic_service_model.prototype.createRoomCircleTwo = function () {
        this.http({
            p_name: this.p_name,
            o_name: "two_room_type"
        });
        // MyConsole.getInstance().trace("8局创建房間次数统计**","custom3");
    };
    /*4圈开房类型次数统计*/
    Statistic_service_model.prototype.createRoomCircleFour = function () {
        this.http({
            p_name: this.p_name,
            o_name: "four_room_type"
        });
        // MyConsole.getInstance().trace("16局创建房間次数统计**","custom3");
    };
    /*6圈开房类型次数统计*/
    Statistic_service_model.prototype.createRoomCircleSix = function () {
        this.http({
            p_name: this.p_name,
            o_name: "six_room_type"
        });
        // MyConsole.getInstance().trace("24局创建房間次数统计**","custom3");
    };
    /*游戏中-解散房間次数统计*/
    Statistic_service_model.prototype.dissolveRoomTimes = function () {
        this.http({
            p_name: this.p_name,
            o_name: "dissolveRoom"
        });
        // MyConsole.getInstance().trace("游戏中-解散房間次数统计**","custom3");
    };
    /*
    * level:  <=0.1s ---0.1  <=0.5s ---0.5  <=1s ---1  <=3s ---3  <=5s ---0.5  >5s ---6
    * */
    /*吃的反应时间*/
    Statistic_service_model.prototype.chiActionTime = function (level) {
        this.http({
            p_name: this.p_name,
            o_name: "chi",
            p_children: level
        });
    };
    /*碰的反应时间*/
    Statistic_service_model.prototype.pengActionTime = function (level) {
        this.http({
            p_name: this.p_name,
            o_name: "peng",
            p_children: level
        });
    };
    /*杠的反应时间*/
    Statistic_service_model.prototype.gangActionTime = function (level) {
        this.http({
            p_name: this.p_name,
            o_name: "gang",
            p_children: level
        });
    };
    /*打牌的反应时间*/
    Statistic_service_model.prototype.chuPaiActionTime = function (level) {
        this.http({
            p_name: this.p_name,
            o_name: "dapai",
            p_children: level
        });
    };
    /*发牌的反应时间*/
    Statistic_service_model.prototype.faPaiActionTime = function (level) {
        this.http({
            p_name: this.p_name,
            o_name: "fapai",
            p_children: level
        });
    };
    /*一小局结束需要的时间
     * level:  <=5m ---5  <=10m ---10  <=15m ---15  <=20m ---20  <=30m ---30  >30m ---31
     * */
    Statistic_service_model.prototype.oneRoundOverTime = function (level) {
        this.http({
            p_name: this.p_name,
            o_name: "xjs_time",
            p_children: level
        });
    };
    /*大结算结束需要的时间
    * level:  <=20m ---20  <=30m ---30  <=40m ---40  <=60m ---60  <=80m ---80  >80m ---90
    * */
    Statistic_service_model.prototype.allOverTime = function (level) {
        this.http({
            p_name: this.p_name,
            o_name: "djs_time",
            p_children: level
        });
    };
    /* 大结算时总局数
     * num:  <=2 ---2  <=4 ---4  <=6 ---6  <=8 ---8  <=12 ---12  >12 ---13
     * */
    Statistic_service_model.prototype.roundCount = function (num) {
        this.http({
            p_name: this.p_name,
            o_name: "every_djx_time",
            p_children: "" + num
        });
    };
    /*分享统计*/
    Statistic_service_model.prototype.share = function (u_id) {
        this.http({
            p_name: this.p_name,
            o_name: "u_share",
            u_id: u_id
        });
    };
    /*查询记录*/
    Statistic_service_model.prototype.inquiryRecord = function (o_name, s_type, s_date, e_date) {
        if (s_type === void 0) { s_type = null; }
        if (s_date === void 0) { s_date = null; }
        if (e_date === void 0) { e_date = null; }
        this.http({
            p_name: this.p_name,
            o_name: o_name,
            s_type: s_type,
            s_date: s_date,
            e_date: e_date
        });
        var o_str = "";
        switch (o_name) {
            case "login":
                o_str = "访问量统计";
                break;
            case "fang_room":
                o_str = "房主类型开房统计";
                break;
            case "dai_room":
                o_str = "代开类型开房统计";
                break;
            case "xjs":
                o_str = "小结算次数统计";
                break;
            case "djs":
                o_str = "大结算次数统计";
                break;
            case "two_room_type":
                o_str = "2-圈开房类型次数统计";
                break;
            case "four_room_type":
                o_str = "4-圈开房类型次数统计";
                break;
            case "die":
                o_str = "掉线次数统计";
                break;
            case "chi":
                o_str = "吃的反应时间";
                break;
            case "peng":
                o_str = "碰的反应时间";
                break;
            case "gang":
                o_str = "杠的反应时间";
                break;
            case "dapai":
                o_str = "打牌的反应时间";
                break;
            case "fapai":
                o_str = "系统发牌的反应时间";
                break;
            case "xjs_time":
                o_str = "一小局结束所需时间";
                break;
            case "djs_time":
                o_str = "大结算结束所需时间";
                break;
            case "every_djx_time":
                o_str = "大结算前总小局数";
                break;
            default: break;
        }
        // MyConsole.getInstance().trace("====用户查询记录===》"+o_str,"custom1");
    };
    /*---------------------------http*-------------------------------------*/
    Statistic_service_model.prototype.http = function (data) {
        if (this.CONST.version_type == "demo")
            return;
        var urlLoader = new egret.URLLoader(), urlreq, urlVari, data;
        urlreq = new egret.URLRequest();
        urlreq.url = this.url; //地址
        urlreq.method = egret.URLRequestMethod.POST;
        urlVari = new egret.URLVariables();
        urlVari.variables = data;
        urlreq.data = urlVari; //数据
        //成功获取数据
        function onComplete(info) {
            urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, this);
            urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onLoadError, this);
        }
        //获取数据失败
        function onLoadError(e) {
            urlLoader.removeEventListener(egret.Event.COMPLETE, onComplete, this);
            urlLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onLoadError, this);
        }
        urlLoader.addEventListener(egret.Event.COMPLETE, onComplete, this);
        urlLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, onLoadError, this);
        urlLoader.load(urlreq);
    };
    return Statistic_service_model;
}(Base_service_model));
__reflect(Statistic_service_model.prototype, "Statistic_service_model");
//# sourceMappingURL=Statistic_service_model.js.map