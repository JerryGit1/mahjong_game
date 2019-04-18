var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
var Base_popup = (function (_super) {
    __extends(Base_popup, _super);
    /**
     * @param _is_add_mask 是否显示遮罩
     * @param _click_bg_is_close 点击背景遮罩是否关闭弹窗
     */
    function Base_popup(_is_add_mask, _click_bg_is_close) {
        if (_is_add_mask === void 0) { _is_add_mask = true; }
        if (_click_bg_is_close === void 0) { _click_bg_is_close = false; }
        var _this = _super.call(this) || this;
        _this.popup_name = ""; //弹窗名字 删除销毁用到
        //背景遮罩
        if (_is_add_mask)
            _this.add_back_mask(_click_bg_is_close);
        //中心区域
        _this.center_sp = new egret.Sprite();
        _this.center_sp.touchEnabled = true;
        _this.addChild(_this.center_sp);
        return _this;
    }
    /*----------------------继承类调用-------------------------*/
    /**背景图片
     * @param bg_hyh
     * @param w width
     * @param h height
     * @param rectangle 九宫格
     */
    Base_popup.prototype.add_center_bg = function (bg_hyh, w, h, rectangle) {
        if (bg_hyh === void 0) { bg_hyh = ""; }
        if (w === void 0) { w = 500; }
        if (h === void 0) { h = 500; }
        if (rectangle === void 0) { rectangle = new egret.Rectangle(10, 10, 20, 20); }
        //添加弹框背景
        var bg = new egret.Bitmap(RES.getRes(bg_hyh));
        //九宫格背景
        if (rectangle)
            bg.scale9Grid = rectangle;
        if (bg_hyh == "c_popup_bg") {
            bg.scale9Grid = new egret.Rectangle(95, 54, 572, 329);
        }
        else if (bg_hyh == "p_join_room_bg_png") {
            bg.scale9Grid = new egret.Rectangle(91, 67, 551, 404);
        }
        //大小
        bg.width = w;
        bg.height = h;
        //设置中心点
        this.set_center_point(w, h);
        this.center_sp.addChild(bg);
    };
    /**zwb:背景:白色底图
     * @param w 白色底图-宽
     * @param h 白色底图-高
     * @param bg_w 透明底图-宽
     * @param bg_h 透明底图-高
     */
    Base_popup.prototype.add_center_white_bg = function (w, h, bg_w, bg_h) {
        var no_info_white_bg = new egret.Shape();
        no_info_white_bg.graphics.beginFill(0xFDFDF9, 1);
        no_info_white_bg.graphics.drawRoundRect(0, 0, w, h, 30, 30);
        no_info_white_bg.graphics.endFill();
        this.center_sp.addChildAt(no_info_white_bg, 1);
        no_info_white_bg.x = bg_w / 2 - no_info_white_bg.width / 2;
        no_info_white_bg.y = bg_h / 2 - no_info_white_bg.height / 2 + 10;
    };
    Base_popup.prototype.remove_white_bg = function () {
        this.center_sp.removeChildAt(1);
    };
    /**
     * 关闭按钮
     * @param str
     * @param point
     */
    Base_popup.prototype.add_close_btn = function (str, point) {
        if (str === void 0) { str = ""; }
        if (point === void 0) { point = null; }
        if (!point)
            point = new egret.Point(this.center_sp.width, 0);
        this.close_btn = new MyButton(str);
        this.center_sp.addChild(this.close_btn);
        this.close_btn.addTouchEvent();
        this.close_btn.addEventListener("click", this.close_click, this);
        this.close_btn.x = point.x;
        this.close_btn.y = point.y;
        this.center_sp.addChild(this.close_btn);
    };
    /**
     * 图片----标题
     * @param str 图片
     * @param point 坐标
     */
    Base_popup.prototype.add_img_title = function (str, point) {
        if (str === void 0) { str = ""; }
        if (point === void 0) { point = null; }
        if (!point)
            point = new egret.Point(this.center_sp.width / 2, 0);
        var title = this.set_bit_center(str);
        title.touchEnabled = true;
        title.x = point.x;
        title.y = point.y;
        this.center_sp.addChild(title);
        return title;
    };
    /**
     * 文本----标题
     * @param txt 图片
     * @param point 坐标
     */
    Base_popup.prototype.add_txt_title = function (txt, point) {
        if (txt === void 0) { txt = ""; }
        if (point === void 0) { point = null; }
        if (!point)
            point = new egret.Point(this.center_sp.width / 2, 0);
        var title = new egret.TextField();
        title.textFlow = (new egret.HtmlTextParser()).parse(txt);
        title.size = 25;
        title.textColor = 0x4C4437;
        title.fontFamily = "微软雅黑";
        title.anchorOffsetX = title.width / 2;
        title.anchorOffsetY = title.height / 2;
        title.x = point.x;
        title.y = point.y;
        this.center_sp.addChild(title);
    };
    /**弹窗--动画
     * */
    Base_popup.prototype.open_ani = function () {
        this.center_sp.scaleX = this.center_sp.scaleY = .8;
        this.center_sp.alpha = 0;
        egret.Tween.get(this.center_sp).to({ scaleX: 1.1, scaleY: 1.1, alpha: 1 }, 200).to({ scaleX: .95, scaleY: .95 }, 100).to({ scaleX: 1, scaleY: 1 }, 100);
    };
    /*----------------------基础视图-------------------------*/
    /*设置中心区域中心*/
    Base_popup.prototype.set_center_point = function (w, h) {
        this.center_sp.anchorOffsetX = w / 2;
        this.center_sp.anchorOffsetY = h / 2;
        this.center_sp.x = Main.stageWidth / 2;
        this.center_sp.y = Main.stageHeight / 2;
    };
    /*显示遮罩*/
    Base_popup.prototype.add_back_mask = function (isEmptyClose) {
        //遮罩
        this.mask_shape = new egret.Shape();
        this.mask_shape.graphics.beginFill(0x000000, .9);
        this.mask_shape.graphics.drawRect(0, 0, Main.stageWidth, Main.stageHeight);
        this.mask_shape.graphics.endFill();
        this.mask_shape.touchEnabled = true;
        this.addChild(this.mask_shape);
        if (isEmptyClose) {
            this.mask_shape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_click, this);
        }
    };
    //设置背景的透明度;
    Base_popup.prototype.set_click_bg_apha = function () {
        if (this.mask_shape) {
            this.mask_shape.alpha = 0;
        }
    };
    /*---------------事件--------------------*/
    /*关闭按钮事件*/
    Base_popup.prototype.close_click = function () {
        this.dispatchEvent(new egret.Event("close"));
    };
    Base_popup.prototype.clear = function () {
        if (this.close_btn) {
            this.close_btn.clear();
            this.close_btn.removeEventListener("click", this.close_click, this);
        }
        _super.prototype.clear.call(this);
    };
    return Base_popup;
}(Base_view));
__reflect(Base_popup.prototype, "Base_popup");
//# sourceMappingURL=Base_popup.js.map