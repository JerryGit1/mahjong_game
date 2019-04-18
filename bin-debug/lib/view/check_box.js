/**
 * Created by pc-20171125 on 2018/4/17.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Checkbox = (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(btn_url, img_url, posY) {
        if (btn_url === void 0) { btn_url = ""; }
        if (img_url === void 0) { img_url = ""; }
        if (posY === void 0) { posY = null; }
        var _this = _super.call(this) || this;
        _this.is_select = false; //是否是选择状态;
        _this.init_sprite(btn_url, img_url, posY);
        return _this;
    }
    Checkbox.prototype.init_sprite = function (btn_url, img_url, posY) {
        this.select_btn = new egret.Bitmap(RES.getRes(btn_url));
        this.select_btn.y = 5;
        this.addChild(this.select_btn);
        var img = new egret.Bitmap(RES.getRes(img_url));
        img.x = this.select_btn.x + this.select_btn.width + 10;
        this.addChild(img);
        if (posY) {
            img.y += posY;
        }
    };
    //添加选择图片;
    Checkbox.prototype.box_add_select_img = function (type) {
        var pos = { x: 0, y: 0 };
        if (type == 1) {
            pos.x = 3;
            pos.y = 7;
            this.add_box_img("h_single_icon", pos);
        }
        else if (type == 2) {
            if (this.select_img) {
                this.box_remove_select_img();
            }
            else {
                this.add_box_img("h_many_icon", pos);
            }
        }
    };
    //删除选择图片;
    Checkbox.prototype.box_remove_select_img = function () {
        if (this.select_img) {
            this.removeChild(this.select_img);
            this.select_img = null;
        }
        //没有被选中;
        this.is_select = false;
    };
    //添加box上面的图片;
    Checkbox.prototype.add_box_img = function (url, pos) {
        //添加;
        this.select_img = new egret.Bitmap(RES.getRes(url));
        this.select_img.x = pos.x;
        this.select_img.y = pos.y;
        this.addChild(this.select_img);
        //被选中;
        this.is_select = true;
    };
    //设置当前box状态;
    Checkbox.prototype.set_select_type = function (flag) {
        var pos = { x: 0, y: 0 };
        if (flag) {
            this.add_box_img("h_many_icon", pos);
            this.is_select = true;
        }
        else {
            this.box_remove_select_img();
            this.is_select = false;
        }
    };
    //获取选择状态;
    Checkbox.prototype.get_select_type = function () {
        return this.is_select;
    };
    return Checkbox;
}(egret.Sprite));
__reflect(Checkbox.prototype, "Checkbox");
//# sourceMappingURL=check_box.js.map