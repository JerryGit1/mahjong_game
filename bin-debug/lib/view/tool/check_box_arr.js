/**
 * Created by JackerCao on 2018/4/17.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CheckboxArr = (function (_super) {
    __extends(CheckboxArr, _super);
    //CJ:PosY:美术切图的时候感觉上下位置有点偏差，所以弄了一个y更改一点坐标;
    function CheckboxArr(arrInfo, posY) {
        if (posY === void 0) { posY = null; }
        var _this = _super.call(this) || this;
        _this.box_arr = [];
        _this.resolve_info(arrInfo, posY);
        return _this;
    }
    CheckboxArr.prototype.resolve_info = function (checkBox_arr, posY) {
        if (posY === void 0) { posY = null; }
        //type:1 单选   2多选;
        this.box_type = checkBox_arr.type;
        var box_url = "";
        if (this.box_type == 1) {
            box_url = "h_single_btn";
        }
        else if (this.box_type == 2) {
            box_url = "h_many_btn";
        }
        var arr = checkBox_arr.checkBox_arr;
        //box数量；
        var checkBox_leng = arr.length;
        for (var i = 0; i < checkBox_leng; i++) {
            var box = new Checkbox(box_url, arr[i].img, posY);
            box.x = 160 * (i % 4 + 1);
            box["index"] = i;
            box.y = 60 * Math.floor(i / 4);
            this.addChild(box);
            this.box_arr.push(box);
            box.touchEnabled = true;
            box.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch_box_back, this);
        }
    };
    //box的点击事件;
    CheckboxArr.prototype.touch_box_back = function (e) {
        var box = e.currentTarget;
        //单选;
        if (this.box_type == 1) {
            for (var i = 0; i < this.box_arr.length; i++) {
                this.box_arr[i].box_remove_select_img();
            }
        }
        box.box_add_select_img(this.box_type);
    };
    //设置默认选择;
    CheckboxArr.prototype.set_default_select = function (default_arr) {
        for (var i = 0; i < default_arr.length; i++) {
            if (this.box_arr[default_arr[i]])
                this.box_arr[default_arr[i]].box_add_select_img(this.box_type);
        }
    };
    //获取当前选择;
    CheckboxArr.prototype.get_arr_select_index_select = function () {
        if (this.box_type == 1) {
            for (var i = 0; i < this.box_arr.length; i++) {
                if (this.box_arr[i].is_select) {
                    return i + 1;
                }
            }
        }
        else if (this.box_type == 2) {
            var arr = {};
            for (var i = 0; i < this.box_arr.length; i++) {
                if (this.box_arr[i].is_select) {
                    arr[i] = "1";
                }
                else {
                    arr[i] = "0";
                }
            }
            return arr;
        }
    };
    return CheckboxArr;
}(egret.Sprite));
__reflect(CheckboxArr.prototype, "CheckboxArr");
//# sourceMappingURL=check_box_arr.js.map