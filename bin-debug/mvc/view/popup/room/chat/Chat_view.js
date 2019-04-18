var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-01-28.
 */
var Chat_view = (function (_super) {
    __extends(Chat_view, _super);
    function Chat_view(w, h) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.view_list = [];
        _this.c_type = 1;
        //实例化可滑动的显示数据框
        _this.messageSprite = new egret.Sprite();
        _this.addChild(_this.messageSprite);
        _this.myscrollView = new egret.ScrollView();
        _this.myscrollView.setContent(_this.messageSprite);
        _this.myscrollView.horizontalScrollPolicy = "off";
        _this.myscrollView.x = 10;
        _this.myscrollView.y = 10;
        _this.myscrollView.width = w - _this.myscrollView.x * 2;
        _this.myscrollView.height = h - _this.myscrollView.y * 2;
        _this.addChild(_this.myscrollView);
        _this.init_view(w, h);
        return _this;
    }
    Chat_view.prototype.init_view = function (w, h) {
        if (w === void 0) { w = 0; }
        if (h === void 0) { h = 0; }
    };
    Chat_view.prototype.add_view = function (view, idx) {
        if (idx === void 0) { idx = 1; }
        this.messageSprite.addChild(view);
        view.touchEnabled = true;
        view["idx"] = idx;
        view.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        this.view_list.push(view);
    };
    Chat_view.prototype.create_one_chat_btn = function (btnStr) {
        var self = this;
        var chatBtn = new MyButton(btnStr);
        chatBtn.addTouchEvent();
        return chatBtn;
    };
    Chat_view.prototype.tap = function (e) {
        this.v_to_v_dis_event(this.EVENT.chat.click_sponsor_action, { type: this.c_type, idx: e.currentTarget["idx"] });
    };
    Chat_view.prototype.clear = function () {
        for (var i in this.view_list) {
            this.view_list[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap, this);
        }
        this.view_list = [];
        _super.prototype.clear.call(this);
    };
    return Chat_view;
}(Base_view));
__reflect(Chat_view.prototype, "Chat_view");
//# sourceMappingURL=Chat_view.js.map