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
var Chat_btn_list_view = (function (_super) {
    __extends(Chat_btn_list_view, _super);
    function Chat_btn_list_view() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        return _this;
    }
    Chat_btn_list_view.prototype.init_view = function (w, h) {
        var btn = new MyButton("chat_btn_1");
        this.addChild(btn);
        btn.x = -w + 60;
        btn["str"] = "text";
        btn.y = btn.height / 2 + 8;
        btn.graphics.beginFill(0x00ff00, 0);
        btn.graphics.drawRect(-btn.width / 2, -btn.height / 2, btn.width, btn.height);
        btn.addTouchEvent();
        btn.addEventListener("click", this.set_btn, this);
    };
    Chat_btn_list_view.prototype.set_btn = function (e) {
        var btn = e.currentTarget;
        var tab = btn["str"];
        if (tab == "text") {
            btn["str"] = "face";
            btn.changTexture("chat_btn_2");
        }
        else {
            btn["str"] = "text";
            //显示当前
            btn.changTexture("chat_btn_1");
        }
    };
    //销毁
    Chat_btn_list_view.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return Chat_btn_list_view;
}(Base_view));
__reflect(Chat_btn_list_view.prototype, "Chat_btn_list_view");
//# sourceMappingURL=Chat_btn_list_view.js.map