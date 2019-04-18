/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
//聊天
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Chitchat_popup = (function (_super) {
    __extends(Chitchat_popup, _super);
    function Chitchat_popup() {
        var _this = _super.call(this, false, true) || this;
        _this.btn_type = "chat_text"; //默认为文字状态；
        //初始化内容;
        _this.init_content();
        return _this;
    }
    Chitchat_popup.prototype.init_content = function () {
        //背景;
        var chat_bg = new egret.Bitmap(RES.getRes("chat_bg"));
        chat_bg.x = Main.stageWidth - chat_bg.width;
        chat_bg.y = Main.stageHeight - chat_bg.height;
        this.center_sp.addChild(chat_bg);
        //按钮;
        var chat_btn = new MyButton("chat_btn_1");
        chat_btn.x = chat_bg.x + chat_btn.width / 2 + 6;
        chat_btn.y = chat_bg.y + chat_btn.height / 2 + 10;
        chat_btn.addTouchEvent();
        chat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change_btn_type, this);
        this.center_sp.addChild(chat_btn);
        var text_view = new Chat_text_view();
        text_view.x = chat_bg.x + 60;
        text_view.y = chat_bg.y;
        this.addChild(text_view);
        var chat_facr_view;
    };
    Chitchat_popup.prototype.change_btn_type = function (e) {
        var btn = e.currentTarget;
        //文字状态;
        if (this.btn_type == "chat_text") {
            this.btn_type = "chat_face";
            btn.changTexture("chat_btn_2");
        }
        else {
            this.btn_type = "chat_text";
            btn.changTexture("chat_btn_1");
        }
    };
    return Chitchat_popup;
}(Base_popup));
__reflect(Chitchat_popup.prototype, "Chitchat_popup");
//# sourceMappingURL=Chitchat_popup.js.map