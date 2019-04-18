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
var Chat_1_view = (function (_super) {
    __extends(Chat_1_view, _super);
    function Chat_1_view(w, h) {
        var _this = _super.call(this, w, h) || this;
        _this.c_type = 1;
        return _this;
    }
    Chat_1_view.prototype.init_view = function (w) {
        var len = 6, base1Y = 20, i, line, btnStr, chatBtn1, dis = 40;
        for (i = 1; i <= len; i++) {
            btnStr = "g_chat_local_sp" + i;
            //按钮
            chatBtn1 = this.create_one_chat_btn(btnStr);
            base1Y += chatBtn1.height / 2;
            chatBtn1.y = base1Y;
            base1Y += chatBtn1.height / 2;
            chatBtn1.x = w / 2;
            this.add_view(chatBtn1, i);
            //线
            line = this.set_bit_center("g_chat_line");
            base1Y += line.height / 2 + dis / 2;
            line.y = base1Y;
            line.x = chatBtn1.x;
            base1Y += line.height / 2 + dis / 2;
            chatBtn1.graphics.beginFill(0x00ff00, 0);
            chatBtn1.graphics.drawRect(-w / 2, -(chatBtn1.height + dis) / 2, w, chatBtn1.height + dis);
            this.messageSprite.addChild(line);
        }
    };
    return Chat_1_view;
}(Chat_view));
__reflect(Chat_1_view.prototype, "Chat_1_view");
//# sourceMappingURL=Chat_1_view.js.map