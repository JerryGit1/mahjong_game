var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
var Test_popup = (function (_super) {
    __extends(Test_popup, _super);
    function Test_popup() {
        var _this = _super.call(this, true, true) || this;
        _this.add_center_bg("b_p_comHitBg", 400, 400);
        _this.add_txt_title("我谁谁");
        _this.add_close_btn("b_p_closeBtn");
        _this.open_ani();
        return _this;
    }
    return Test_popup;
}(Base_popup));
__reflect(Test_popup.prototype, "Test_popup");
//# sourceMappingURL=Test_popup.js.map