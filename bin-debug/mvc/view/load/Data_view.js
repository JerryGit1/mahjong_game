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
 */
var Data_view = (function (_super) {
    __extends(Data_view, _super);
    function Data_view(str) {
        var _this = _super.call(this) || this;
        //遮罩
        _this.loadingBg = new egret.Sprite();
        _this.loadingBg.width = Main.stageWidth;
        _this.loadingBg.height = Main.stageHeight;
        _this.loadingBg.graphics.beginFill(0x000000, .2);
        _this.loadingBg.graphics.drawRect(0, 0, Main.stageWidth, Main.stageHeight);
        _this.loadingBg.graphics.endFill();
        // 旋转的图片
        // this.loadingPic = new egret.Bitmap(RES.getRes("h_loading"));
        // this.loadingPic.x = Main.stageWidth/2;
        // this.loadingPic.y = Main.stageHeight/2;
        // this.loadingPic.anchorOffsetX = this.loadingPic.$getWidth()/2;
        // this.loadingPic.anchorOffsetY = this.loadingPic.$getHeight()/2;
        // 提示的文字
        // this.loadingTxt = new egret.TextField();
        // this.loadingTxt.text = str;
        // this.loadingTxt.x = Main.stageWidth/2 - this.loadingTxt.$getWidth()/3 ;
        // this.loadingTxt.y = this.loadingPic.y+this.loadingPic.height/2 + 20;
        // this.loadingTxt.fontFamily = "微软雅黑";
        // this.loadingTxt.size = 18;
        // this.loadingBg.addChild(this.loadingTxt);
        // this.loadingBg.addChild(this.loadingPic);
        _this.addChild(_this.loadingBg);
        return _this;
        // egret.Tween.get(this.loadingPic,{loop:true}).to({rotation:360},2000);
        // this.touchEnabled = true;
    }
    Data_view.prototype.clear = function () {
        // egret.Tween.removeTweens(this.loadingPic);
    };
    return Data_view;
}(Base_view));
__reflect(Data_view.prototype, "Data_view");
//# sourceMappingURL=Data_view.js.map