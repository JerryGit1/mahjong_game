var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Tang on 2018/1/8.
 */
var Double_btn = (function (_super) {
    __extends(Double_btn, _super);
    function Double_btn(bgstr, str) {
        var _this = _super.call(this, bgstr) || this;
        _this.addUpImg(str);
        return _this;
    }
    Double_btn.prototype.addUpImg = function (str) {
        var upImg = new egret.Bitmap(RES.getRes(str));
        upImg.x = -upImg.width / 2;
        upImg.y = -upImg.height / 2;
        upImg.touchEnabled = false;
        this.upImg = upImg;
        this.addChild(upImg);
    };
    Double_btn.prototype.changeSize = function (scaleX, scaleY) {
        _super.prototype.changeSize.call(this, scaleX, scaleY);
        this.upImg.scaleX = scaleX;
        this.upImg.scaleY = scaleY;
        this.upImg.x += this.upImg.width * ((1 - scaleX) / 2);
        this.upImg.y += this.upImg.height * ((1 - scaleY) / 2);
    };
    return Double_btn;
}(MyButton));
__reflect(Double_btn.prototype, "Double_btn");
//# sourceMappingURL=Double_btn_tyq.js.map