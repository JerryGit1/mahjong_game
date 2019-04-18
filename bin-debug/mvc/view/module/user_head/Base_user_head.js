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
//用户头像
var User_head_view = (function (_super) {
    __extends(User_head_view, _super);
    function User_head_view() {
        return _super.call(this) || this;
    }
    /***
     * 方形头像
     *w,h
     * _is_border 是否需要边框
     * */
    User_head_view.prototype.create_rect_head = function (w, h, bg_str, _is_border) {
        if (bg_str === void 0) { bg_str = ""; }
        if (_is_border === void 0) { _is_border = false; }
        //玩家头像遮罩
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x00ff00, 4);
        var mw = Math.floor(w * .9), mh = Math.floor(h * .9);
        mask.graphics.drawRoundRect(-mw / 2, -mh / 2, mw, mh, 18, 18);
        mask.graphics.endFill();
        this.add_head(w, h, bg_str, _is_border, mask);
    };
    //圆形头像
    User_head_view.prototype.create_circe_head = function (w, h, bg_str, _is_border) {
        if (bg_str === void 0) { bg_str = ""; }
        if (_is_border === void 0) { _is_border = false; }
        //玩家头像遮罩
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x00ff00, 4);
        mask.graphics.drawCircle(0, 0, w / 2);
        mask.graphics.endFill();
        this.add_head(w, h, bg_str, _is_border, mask);
    };
    /*更新头像信息  headImgUrl为空隐藏头像*/
    User_head_view.prototype.update_head_url = function (headImgUrl) {
        if (headImgUrl === void 0) { headImgUrl = null; }
        this.head_img.visible = false;
        if (headImgUrl) {
            this.head_img.visible = true;
            Load_control.loadExternalBit(this.head_img, headImgUrl);
        }
        else {
        }
    };
    /**
     * 渲染显示头像
     *w,h
     * _is_border 是否需要边框
     **/
    User_head_view.prototype.add_head = function (w, h, bg_str, _is_border, mask) {
        if (bg_str === void 0) { bg_str = ""; }
        if (_is_border === void 0) { _is_border = false; }
        //头像背景
        if (bg_str)
            this.add_bg(bg_str, w, h);
        //边框
        if (_is_border)
            this.add_border(w, h);
        //头像
        this.head_img = new egret.Bitmap();
        this.addChild(this.head_img);
        this.head_img.width = w;
        this.head_img.height = h;
        this.head_img.anchorOffsetX = this.head_img.width / 2;
        this.head_img.anchorOffsetY = this.head_img.height / 2;
        //遮罩
        this.addChild(mask);
        this.head_img.mask = mask;
    };
    //背景
    User_head_view.prototype.add_bg = function (str, w, h) {
        this.head_bg = this.set_bit_center(str);
        this.head_bg.width = w;
        this.head_bg.height = h;
        this.head_bg.anchorOffsetX = this.head_bg.width / 2;
        this.head_bg.anchorOffsetY = this.head_bg.height / 2;
        this.addChild(this.head_bg);
    };
    //边框
    User_head_view.prototype.add_border = function (w, h) {
        this.head_border_img = this.set_bit_center("headImgBar");
        this.head_border_img.width = w;
        this.head_border_img.height = h;
        this.head_border_img.anchorOffsetX = this.head_border_img.width / 2;
        this.head_border_img.anchorOffsetY = this.head_border_img.height / 2;
        this.addChild(this.head_border_img);
    };
    return User_head_view;
}(Base_view));
__reflect(User_head_view.prototype, "User_head_view");
//# sourceMappingURL=Base_user_head.js.map