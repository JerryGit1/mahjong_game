var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zwb on 2018/5/15.
 * 申请加入俱乐部
 */
var Club_request_join_popup = (function (_super) {
    __extends(Club_request_join_popup, _super);
    function Club_request_join_popup(model) {
        var _this = _super.call(this) || this;
        //弹框
        _this.add_center_bg("p_popup_view_Bg_png", 762, 437);
        //标题
        _this.add_img_title("l_prompt_title", { x: 380, y: -5 });
        _this.open_ani();
        //提示语
        var str = "\n\n\n<font color='#ff7f00'>您准备申请加入由" + String(decodeURIComponent(model.clubUserName)) + "创建的" + String(decodeURIComponent(model.clubName)) + "俱乐部吗?";
        str += "\n人数:" + model.allNums + "</font>";
        str += "\n\n\n\n注:每个人最多加入3个俱乐部";
        _this.addText(810, 496, str);
        //按钮[确定]
        _this.sure_btn = new MyButton("l_confirm_join_btn");
        _this.center_sp.addChild(_this.sure_btn);
        _this.sure_btn.x = 250;
        _this.sure_btn.y = 350;
        _this.sure_btn.addTouchEvent();
        _this.sure_btn.addEventListener("click", function () {
            if (model["back_fun"]) {
                model["back_fun"](model.clubId);
                this.close_click();
            }
        }.bind(_this), _this);
        //按钮[我再想想]
        _this.cancel_btn = new MyButton("l_think_btn");
        _this.center_sp.addChild(_this.cancel_btn);
        _this.cancel_btn.x = _this.sure_btn.x + _this.cancel_btn.width * 2 - 52;
        _this.cancel_btn.y = _this.sure_btn.y;
        _this.cancel_btn.addTouchEvent();
        _this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.close_click, _this);
        return _this;
    }
    // 通用文本
    Club_request_join_popup.prototype.addText = function (w, h, str) {
        var tt = new egret.TextField();
        tt.textColor = 0x6A665B;
        tt.textAlign = "center";
        tt.lineSpacing = 10;
        tt.width = w * .75;
        tt.height = h * .8;
        tt.multiline = true;
        tt.verticalAlign = "middle";
        tt.fontFamily = "微软雅黑";
        tt.size = 23;
        tt.x = w * .1;
        tt.y = h * .11 - 100;
        tt.textFlow = (new egret.HtmlTextParser()).parse(str);
        this.center_sp.addChild(tt);
        return tt;
    };
    Club_request_join_popup.prototype.clear = function () {
        // this.cancel_btn.clear();
        // this.cancel_btn.removeEventListener("click",this.close_popup_view,this);
        _super.prototype.clear.call(this);
    };
    return Club_request_join_popup;
}(Base_popup));
__reflect(Club_request_join_popup.prototype, "Club_request_join_popup");
//# sourceMappingURL=Club_request_join_popup.js.map