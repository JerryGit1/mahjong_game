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
 *
 * 基础model
 */
var Base_model = (function (_super) {
    __extends(Base_model, _super);
    function Base_model() {
        var _this = _super.call(this) || this;
        _this.CONST = Const_model.getInstance(); //zpb:常量配置
        /****
         * 事件派发 model和他对应的 父级 （model,scene,view)
         * */
        _this.eventList = [];
        return _this;
    }
    /*批量设置属性*/
    Base_model.prototype.setParams = function (data) {
        for (var i in data) {
            this[i] = data[i];
        }
    };
    Base_model.prototype.m_to_c_dis_event = function (eventName, data) {
        if (data === void 0) { data = null; }
        this.dispatchEventWith(eventName, false, data);
    };
    Base_model.prototype.m_to_c_add_event = function (eventName, backFun, self) {
        this.eventList.push([eventName, fun, self]);
        this.addEventListener(eventName, fun, self);
        function fun(e) {
            /***
             * 第一参数 是数据
             * 第二个是  接口类型
             * */
            backFun = backFun.bind(self);
            backFun(e.data, eventName);
        }
    };
    Base_model.prototype.m_to_c_remove_event = function (eventName, self, backFun) {
        if (self === void 0) { self = null; }
        if (backFun === void 0) { backFun = null; }
        if (!backFun) {
            var i = this.eventList.length - 1;
            for (i; i >= 0; i--) {
                if (eventName == this.eventList[i][0]) {
                    this.removeEventListener(this.eventList[i][0], this.eventList[i][1], this.eventList[i][2]);
                    this.eventList.splice(i, 1);
                }
            }
        }
        else {
            this.removeEventListener(eventName, backFun, self);
        }
    };
    /*清理*/
    Base_model.prototype.clear = function () {
        /*清理事件*/
        for (var i in this.eventList) {
            this.m_to_c_remove_event(this.eventList[i][0], this.eventList[i][2], this.eventList[i][1]);
        }
        this.eventList = null;
    };
    return Base_model;
}(egret.EventDispatcher));
__reflect(Base_model.prototype, "Base_model");
//# sourceMappingURL=Base_model.js.map