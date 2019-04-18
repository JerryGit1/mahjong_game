/**
 * Created by JackerCao on 2018/4/20.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Share_popup = (function (_super) {
    __extends(Share_popup, _super);
    function Share_popup() {
        var _this = _super.call(this, true, true) || this;
        _this.add_center_bg("share_bg_png", Main.stageWidth, Main.stageHeight);
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.close_click, _this);
        return _this;
    }
    return Share_popup;
}(Base_popup));
__reflect(Share_popup.prototype, "Share_popup");
//# sourceMappingURL=Share_popup.js.map