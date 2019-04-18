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
 * 基础view scene
 */
var Base_view = (function (_super) {
    __extends(Base_view, _super);
    function Base_view(config) {
        if (config === void 0) { config = true; }
        var _this = _super.call(this) || this;
        /****
         * 事件派发 view和他对应的 父级 （scene,view)
         * */
        _this.eventList = [];
        if (config) {
            _this.CONST = Const_model.getInstance();
        }
        return _this;
    }
    /*调整y坐标适配*/
    Base_view.prototype.set_point_y = function (sp) {
        sp.y = sp.y / (Main.stageHeight / 640);
    };
    /*创建一个居中的bit对象*/
    Base_view.prototype.set_bit_center = function (str, _isCenter) {
        if (_isCenter === void 0) { _isCenter = true; }
        var bit = new egret.Bitmap(RES.getRes(str));
        if (_isCenter) {
            bit.anchorOffsetX = bit.width / 2;
            bit.anchorOffsetY = bit.height / 2;
        }
        return bit;
    };
    Base_view.prototype.v_to_v_dis_event = function (eventName, data) {
        this.dispatchEventWith(eventName, false, data);
    };
    Base_view.prototype.v_to_v_add_event = function (eventName, backFun, self) {
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
    Base_view.prototype.v_to_v_remove_event = function (eventName, self, backFun) {
        if (self === void 0) { self = null; }
        if (backFun === void 0) { backFun = null; }
        if (!backFun) {
            //循环移除
            for (var i in this.eventList) {
                if (eventName == this.eventList[i][0])
                    this.removeEventListener(this.eventList[i][0], this.eventList[i][1], this.eventList[i][2]);
            }
        }
        else {
            //单个移除
            this.removeEventListener(eventName, backFun, self);
        }
    };
    /*清理*/
    Base_view.prototype.clear = function () {
        /*清理事件*/
        for (var i in this.eventList) {
            this.v_to_v_remove_event(this.eventList[i][0]);
        }
        this.eventList = null;
    };
    Base_view.prototype.test_point = function (sp, speed) {
        if (speed === void 0) { speed = 2; }
        document.addEventListener("keydown", function (e) {
            switch (e.keyCode) {
                case 39:
                    sp.x += speed;
                    break;
                case 37:
                    sp.x -= speed;
                    break;
                case 38:
                    sp.y -= speed;
                    break;
                case 40:
                    sp.y += speed;
                    break;
            }
            MyConsole.getInstance().trace(sp.x + "--------------()" + sp.y, 5);
        });
    };
    //四号机----测试用
    Base_view.prototype.test_pos = function (view) {
        view.touchEnabled = true;
    };
    return Base_view;
}(egret.Sprite));
__reflect(Base_view.prototype, "Base_view");
//# sourceMappingURL=Base_view.js.map