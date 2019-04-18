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
var Chat_layer_view = (function (_super) {
    __extends(Chat_layer_view, _super);
    function Chat_layer_view(w, h) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.current_tab = "";
        _this.layer_1 = new Chat_2_view(w, h);
        _this.addChild(_this.layer_1);
        _this.layer_1.v_to_v_add_event(_this.EVENT.chat.click_sponsor_action, _this.tap, _this);
        _this.layer_2 = new Chat_3_view(w, h);
        _this.addChild(_this.layer_2);
        _this.layer_2.v_to_v_add_event(_this.EVENT.chat.click_sponsor_action, _this.tap, _this);
        _this.cut_layer();
        return _this;
    }
    Chat_layer_view.prototype.cut_layer = function (num) {
        if (num === void 0) { num = 1; }
        this.layer_1.visible = false;
        this.layer_2.visible = false;
        this["layer_" + num].visible = true;
    };
    Chat_layer_view.prototype.tap = function (info) {
        this.v_to_v_dis_event(this.EVENT.chat.click_sponsor_action, info);
    };
    return Chat_layer_view;
}(Base_view));
__reflect(Chat_layer_view.prototype, "Chat_layer_view");
//# sourceMappingURL=Chat_layer_view.js.map