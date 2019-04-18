var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by JackerCao on 2018/4/19.
 */
var Tip_popup = (function (_super) {
    __extends(Tip_popup, _super);
    function Tip_popup(str) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.init_content(str);
        return _this;
    }
    //坑爹啊，就那么几行代码;
    Tip_popup.prototype.init_content = function (str) {
        this.add_center_bg("p_popup_view_Bg_png", 700, 402);
        this.add_img_title("l_prompt_title", { x: 350, y: 0 });
        this.add_close_btn("l_close_btn", { x: 682, y: 10 });
        this.open_ani();
        var view_str = new egret.TextField();
        view_str.text = str;
        view_str.size = 28;
        view_str.textColor = 0x8b6141;
        view_str.anchorOffsetX = view_str.width / 2;
        view_str.lineSpacing = 5;
        view_str.x = 350;
        view_str.y = 166;
        this.center_sp.addChild(view_str);
        this.test_point(view_str);
    };
    return Tip_popup;
}(Base_popup));
__reflect(Tip_popup.prototype, "Tip_popup");
//# sourceMappingURL=Tip_popup.js.map