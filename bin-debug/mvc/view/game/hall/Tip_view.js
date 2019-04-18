var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var tr = egret.sys.tr;
/**
 * Created by Tang on 2018/3/14.
 * 文字提示框（小型）
 */
var Tip_view = (function (_super) {
    __extends(Tip_view, _super);
    function Tip_view(string, width, height, x, y) {
        if (width === void 0) { width = 110; }
        if (height === void 0) { height = 10; }
        var _this = _super.call(this) || this;
        // this.name="H_tipView";
        _this.add_bg(); //添加背景
        _this.messageTxt = new egret.TextField();
        _this.messageTxt.size = 16;
        _this.messageTxt.textColor = 0xf7f0df;
        _this.messageTxt.multiline = true;
        _this.messageTxt.wordWrap = true;
        _this.messageTxt.textAlign = "left";
        _this.messageTxt.verticalAlign = "middle";
        _this.messageTxt.lineSpacing = 10;
        _this.addChild(_this.messageTxt);
        _this.add_txt(string, width, height); //添加文字提示
        return _this;
    }
    //添加背景
    Tip_view.prototype.add_bg = function () {
        var tipBg = new egret.Bitmap(RES.getRes("l_rule_bg"));
        this.addChild(tipBg);
        this.bg = tipBg;
    };
    //添加文字提示
    Tip_view.prototype.add_txt = function (str, width, height) {
        this.messageTxt.width = width;
        this.messageTxt.x = -90;
        this.messageTxt.y = 15;
        if (width)
            this.messageTxt.width = width;
        this.messageTxt.text = str;
        if (this.messageTxt.height > this.bg.height) {
            this.bg.scale9Grid = new egret.Rectangle(34, 11, 210, 66);
        }
        else {
            this.bg.scale9Grid = new egret.Rectangle(24, 19, 245, 102);
        }
        this.bg.width = this.messageTxt.width + 30; //+10;
        this.bg.height = this.messageTxt.height + height + 20;
        this.bg.x = -110;
    };
    return Tip_view;
}(Base_view));
__reflect(Tip_view.prototype, "Tip_view");
//# sourceMappingURL=Tip_view.js.map