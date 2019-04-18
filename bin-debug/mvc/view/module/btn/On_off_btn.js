/**
 * Created by 周鹏斌大王 on 2018-05-10.
 */
//开关按钮
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var On_off_btn = (function (_super) {
    __extends(On_off_btn, _super);
    function On_off_btn(on_str, off_str, chang_fun) {
        if (chang_fun === void 0) { chang_fun = null; }
        var _this = _super.call(this, on_str) || this;
        _this._bl = true; //true开启状态 false关闭状态
        _this.off_str = off_str;
        _this.on_str = on_str;
        _this.chang_fun = chang_fun;
        return _this;
    }
    Object.defineProperty(On_off_btn.prototype, "bl", {
        get: function () {
            return this._bl;
        },
        set: function (bl) {
            this._bl = bl;
            if (this._bl) {
                this.changTexture(this.on_str);
            }
            else {
                this.changTexture(this.off_str);
            }
        },
        enumerable: true,
        configurable: true
    });
    //鼠标弹起
    On_off_btn.prototype.touchEnd = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        if (this.isChangeTexture)
            this.changTexture(this.str1);
        egret.Tween.get(this).to({ scaleX: this.sX, scaleY: this.sY }, 70).call(function () {
            if (e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_TAP) {
                //派发点击事件
                this.bl = !this.bl;
                if (this.chang_fun)
                    this.chang_fun(this.bl);
                this.dispatchEvent(new egret.Event("click"));
            }
        }.bind(this));
        //2.1.0 解决苹果点击后声音还不出来问题
        if (e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_TAP) {
            //播放音效
            Sound_model.playSoundEffect("btn_click");
        }
    };
    return On_off_btn;
}(MyButton));
__reflect(On_off_btn.prototype, "On_off_btn");
//# sourceMappingURL=On_off_btn.js.map