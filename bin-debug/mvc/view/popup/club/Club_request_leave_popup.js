var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zwb on 2018-05-15.
 * 申请离开俱乐部
 */
var Club_request_leave_popup = (function (_super) {
    __extends(Club_request_leave_popup, _super);
    function Club_request_leave_popup(data) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_club_event_model(); //事件常量
        //弹框
        _this.add_center_bg("c_popup_bg", 762, 437);
        //标题
        _this.add_img_title("l_prompt_title", { x: 385, y: -5 });
        _this.open_ani();
        //提示语
        var str = "确认申请离开 <font color='#ff7f00'>" + data.clubName + "</font>?";
        _this.addText(550, 280, str);
        //按钮[确认退出]
        _this.sure_btn = new MyButton("c_confirm_quit_btn");
        _this.center_sp.addChild(_this.sure_btn);
        _this.sure_btn.x = 244;
        _this.sure_btn.y = 326;
        _this.sure_btn.addTouchEvent();
        _this.sure_btn.addEventListener("click", function () {
            this.v_to_v_dis_event(this.EVENT.base.club_request_leave_popup, this); //申请离开-[确定]按钮-事件派发
            this.close_click(); //清除弹框
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
    Club_request_leave_popup.prototype.addText = function (w, h, str) {
        var tt = new egret.TextField();
        tt.touchEnabled = true;
        tt.textColor = 0x6A665B;
        tt.textAlign = "center";
        tt.lineSpacing = 10;
        tt.width = w * .75;
        tt.height = h * .8;
        tt.multiline = true;
        tt.verticalAlign = "middle";
        tt.fontFamily = "微软雅黑";
        tt.size = 30;
        tt.x = w * .32;
        tt.y = h * .32;
        tt.textFlow = (new egret.HtmlTextParser()).parse(str);
        this.center_sp.addChild(tt);
        return tt;
    };
    Club_request_leave_popup.prototype.clear = function () {
        // this.cancel_btn.clear();
        // this.cancel_btn.removeEventListener("click",this.close_popup_view,this);
        _super.prototype.clear.call(this);
    };
    return Club_request_leave_popup;
}(Base_popup));
__reflect(Club_request_leave_popup.prototype, "Club_request_leave_popup");
//# sourceMappingURL=Club_request_leave_popup.js.map