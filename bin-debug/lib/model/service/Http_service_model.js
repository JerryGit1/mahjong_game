var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌 on 2016/9/7.
 * 丹阳特有-不用合并
 */
var Http_service_model = (function (_super) {
    __extends(Http_service_model, _super);
    function Http_service_model() {
        var _this = _super.call(this) || this;
        _this.rechargeUrl = "http://192.168.1.156:8082/clubServer";
        return _this;
    }
    Http_service_model.getInstance = function () {
        if (!this.service) {
            this.service = new Http_service_model();
        }
        return this.service;
    };
    /*获取回放数据 2.1.4*/
    Http_service_model.prototype.get_play_back_data = function (url, backFun) {
        this.http(url, null, backFun);
    };
    //zpb:经纬度 转坐标
    Http_service_model.prototype.position_return = function (j, w, backFun) {
        MyConsole.getInstance().trace("经:" + j + ",纬" + w);
        this.http("http://www.flfy58.cn:8086/get_game_position.php?J=" + j + "&W=" + w, null, function (data) {
            MyConsole.getInstance().trace("X:" + data.x + ",Y:" + data.y);
            backFun(data.x, data.y);
        }, false);
    };
    return Http_service_model;
}(Base_service_model));
__reflect(Http_service_model.prototype, "Http_service_model");
//# sourceMappingURL=Http_service_model.js.map