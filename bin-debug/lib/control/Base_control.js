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
 * 基础场景
 * 1.有一个自己的model
 *
 */
var Base_control = (function (_super) {
    __extends(Base_control, _super);
    function Base_control(model, view) {
        var _this = _super.call(this) || this;
        /*zpb:1-----常量*/
        _this.CONST = Const_model.getInstance(); //zpb:常量配置
        _this.radio_event = [];
        /****
         * 事件派发 model和他对应的 父级 （model,scene,view)
         * */
        _this.eventList = [];
        _this.model = model;
        _this.view = view;
        return _this;
    }
    //自定义事件，从父级添加视图
    Base_control.prototype.add_view = function () {
        if (this.view)
            this.c_to_c_dis_event(this.EVENT.base.parent_add_view, this.view);
    };
    //自定义事件，从父级移除视图
    Base_control.prototype.remove_view = function () {
        if (this.view) {
            this.view.clear();
            this.c_to_c_dis_event(this.EVENT.base.parent_remove_view, this.view);
        }
        this.view = null;
    };
    /*zpb:添加子类 view*/
    Base_control.prototype.add_child_view = function (c_view) {
        if (this.view && c_view) {
            this.view.addChild(c_view);
        }
    };
    // 删除子类 view
    Base_control.prototype.remove_child_view = function (c_view) {
        if (this.view && c_view) {
            this.view.removeChild(c_view);
            c_view = null;
        }
    };
    Base_control.prototype.c_to_c_event_radio = function (eventName, data) {
        if (data === void 0) { data = null; }
        Base_control.model_dispatch_model.dispatchEventWith(eventName, false, data);
    };
    Base_control.prototype.c_to_c_add_radio_event = function (eventName, backFun, self) {
        this.radio_event.push([eventName, fun, self]);
        Base_control.model_dispatch_model.addEventListener(eventName, fun, self);
        function fun(e) {
            /***
             * 第一参数 是数据
             * 第二个是  接口类型
             * */
            backFun = backFun.bind(self);
            backFun(e.data, eventName);
        }
    };
    Base_control.prototype.c_to_c_dis_event = function (eventName, data) {
        if (data === void 0) { data = null; }
        this.dispatchEventWith(eventName, false, data);
    };
    Base_control.prototype.c_to_c_add_event = function (eventName, backFun, self) {
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
    Base_control.prototype.c_to_c_remove_event = function (eventName, self, backFun) {
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
    return Base_control;
}(egret.EventDispatcher));
/***
 * zpb:2-----派发事件 model和model之间
 * 事件广播
 * 场景之间的事件不用移除侦听 一般一直存在
 * */
Base_control.model_dispatch_model = new egret.EventDispatcher();
__reflect(Base_control.prototype, "Base_control");
//# sourceMappingURL=Base_control.js.map