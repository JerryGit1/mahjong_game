/**
 * Created by JackerCao on 2018/5/4.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//聊天的文组视图;
var Chat_text_view = (function (_super) {
    __extends(Chat_text_view, _super);
    function Chat_text_view() {
        var _this = _super.call(this) || this;
        _this.content = new egret.Sprite();
        //初始化内容;
        _this.init_content();
        //初始化文字内容;
        _this.init_chat_text();
        return _this;
    }
    //初始化内容;
    Chat_text_view.prototype.init_content = function () {
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 420;
        this.scroll_view.height = 280;
        this.scroll_view.verticalScrollPolicy = "on";
        this.scroll_view.horizontalScrollPolicy = "off";
        this.scroll_view.setContent(this.content);
        // this.scroll_view.x=30;
        this.scroll_view.y = 10;
        this.content.y = -10;
        this.addChild(this.scroll_view);
    };
    Chat_text_view.prototype.init_chat_text = function () {
        for (var i = 0; i < 6; i++) {
            var text_str = "chat_text_" + (i + 1);
            var text = new egret.Bitmap(RES.getRes(text_str));
            text["index"] = i;
            text.x = 20;
            text.y = 28 + 56 * i;
            text.touchEnabled = true;
            text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.text_touch_back, this);
            this.content.addChild(text);
        }
    };
    Chat_text_view.prototype.text_touch_back = function (e) {
        var text = e.currentTarget;
    };
    return Chat_text_view;
}(Base_view));
__reflect(Chat_text_view.prototype, "Chat_text_view");
//# sourceMappingURL=Chat_text_view.js.map