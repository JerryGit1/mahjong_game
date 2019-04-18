var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by hyh on 2018/1/3.
 */
var Sound_btn_hyh = (function (_super) {
    __extends(Sound_btn_hyh, _super);
    function Sound_btn_hyh(titleTexture, openTexture, closeTexture, volume) {
        var _this = _super.call(this) || this;
        _this.openTexture = openTexture;
        _this.closeTexture = closeTexture;
        _this.initContent(titleTexture, volume);
        return _this;
    }
    Sound_btn_hyh.prototype.initContent = function (titleTexture, volume) {
        /*文字标题*/
        var title = new egret.Bitmap(RES.getRes(titleTexture));
        title.x = -80;
        this.addChild(title);
        /*加载条背景*/
        var barBg = new egret.Bitmap(RES.getRes("l_load_bar_bg"));
        barBg.x = 20;
        barBg.y = -5;
        this.addChild(barBg);
        this.barWidth = barBg.width;
        this.backBg = new egret.Shape();
        this.backBg.graphics.beginFill(0x00ff00, 0);
        this.backBg.graphics.drawRect(barBg.x, barBg.y - barBg.height * 3 / 2, barBg.width, barBg.height * 3);
        this.backBg.graphics.endFill();
        this.addChildAt(this.backBg, 0);
        this.backBg.touchEnabled = true;
        /*加载条*/
        this.bar1 = new egret.Bitmap(RES.getRes("l_pro_bar_img"));
        this.bar1.x = 24;
        this.bar1.y = -5;
        this.bar1.width = this.barWidth * volume;
        this.addChild(this.bar1);
        /*进度按钮*/
        this.volumeBtn = this.set_bit_center("h_strip_btn");
        this.volumeBtn.x = -2 + volume * this.barWidth + 20;
        this.volumeBtn.y = barBg.y + 10;
        this.addChild(this.volumeBtn);
        this.backBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeVolumeBegin, this);
        /*开关按钮*/
        this.btn = new egret.Bitmap();
        this.btn.touchEnabled = true;
        this.addChild(this.btn);
        this.btn.x = 400;
        this.btn.y = -14;
        this.changeTexture();
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.click, this);
    };
    Sound_btn_hyh.prototype.click = function (e) {
        this.changeTexture();
    };
    //改变纹理
    Sound_btn_hyh.prototype.changeTexture = function (_is) {
        if (_is === void 0) { _is = null; }
        if (_is != null)
            this.bar1.visible = this.volumeBtn.visible = _is;
    };
    Sound_btn_hyh.prototype.changeVolumeBegin = function (e) {
        this.changeEnd(null);
        this.backBg.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeVolume, this);
        this.backBg.addEventListener(egret.TouchEvent.TOUCH_END, this.changeEnd, this);
        this.moveBeginX = e.stageX;
        this.currentX = e.localX;
        this.changeVolume(e);
    };
    //改变音量
    Sound_btn_hyh.prototype.changeVolume = function (e) {
        var moveTarget = this.volumeBtn;
        var X1 = this.currentX + Math.floor(e.stageX - this.moveBeginX);
        var left_x = 20;
        var right_x = 362;
        if (X1 >= left_x && X1 <= right_x) {
            moveTarget.x = X1;
        }
        else {
            if (X1 < left_x)
                moveTarget.x = left_x;
            if (X1 > right_x)
                moveTarget.x = right_x;
        }
        var current = moveTarget.x - left_x;
        var volume = current / this.barWidth;
        this.setVolume(volume);
        this.setProgress(current);
    };
    Sound_btn_hyh.prototype.changeEnd = function (e) {
        this.backBg.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.changeVolume, this);
        this.backBg.removeEventListener(egret.TouchEvent.TOUCH_END, this.changeEnd, this);
    };
    //设置音量
    Sound_btn_hyh.prototype.setVolume = function (volume) {
    };
    //设置进度条宽度
    Sound_btn_hyh.prototype.setProgress = function (current) {
        this.bar1.width = current;
    };
    Sound_btn_hyh.prototype.clear = function () {
        this.changeEnd(null);
        this.backBg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.changeVolumeBegin, this);
    };
    return Sound_btn_hyh;
}(Base_view));
__reflect(Sound_btn_hyh.prototype, "Sound_btn_hyh");
//# sourceMappingURL=Sound_btn.js.map