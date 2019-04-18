/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Help_popup = (function (_super) {
    __extends(Help_popup, _super);
    function Help_popup() {
        var _this = _super.call(this, true, true) || this;
        _this.init_view();
        _this.init_centent();
        return _this;
    }
    Help_popup.prototype.init_view = function () {
        this.add_center_bg("p_popup_view_Bg_png", 919, 527);
        this.add_img_title("l_help_title", { x: 460, y: 10 });
        this.add_close_btn("l_close_btn", { x: 910, y: 10 });
        this.open_ani();
    };
    Help_popup.prototype.init_centent = function () {
        var content = new egret.DisplayObjectContainer();
        var myscrollView = new egret.ScrollView();
        myscrollView.horizontalScrollPolicy = "off";
        myscrollView.setContent(content);
        myscrollView.width = 900;
        myscrollView.height = 380;
        myscrollView.y = 80;
        myscrollView.x = 50;
        this.center_sp.addChild(myscrollView);
        //图片;
        var help_png = new egret.Bitmap(RES.getRes("h_help_img_png"));
        content.addChild(help_png);
    };
    return Help_popup;
}(Base_popup));
__reflect(Help_popup.prototype, "Help_popup");
//# sourceMappingURL=Help_popup.js.map