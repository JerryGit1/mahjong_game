var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
var Popup_event_model = (function (_super) {
    __extends(Popup_event_model, _super);
    function Popup_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.popup = {
            create_room: "create_room",
            join_room: "join_room",
            create_room_ok: "create_room_ok",
            join_room_ok: "join_room_ok",
            join_room_fail: "join_room_fail",
            hall_achievement: "hall_achievement",
            share_achievement: "share_achievement",
            play_back_info: "play_back_info",
            issue_info: "issue_info",
            delete_user: "delete_user",
            dissolution_room: "dissolution_room",
            qz_dissolution_room: "qz_dissolution_room",
            issue_history: "issue_history",
            user_agree: "user_agree",
            change_score: "change_score",
            XJS_wait_ok: "XJS_wait_ok",
            sponsor_DJS: "sponsor_DJS",
            share: "share",
            room_dissolution_room: "room_dissolution_room",
            back_hall: "back_hall",
            float_alert: "float_alert",
            get_history_info: "get_history_info",
            issue_room_star_game: "issue_room_star_game",
            create_room_update_money: "create_room_update_money",
            create_replace_update_money: "create_replace_update_money",
        };
        _this.socket = {
            socket_close: "socket_close",
            socket_unusual: "socket_unusual",
        };
        /*--------------------tyq: 房间内------------------------*/
        _this.popup_room = {
            sponsor_dissolve_room: "sponsor_dissolve_room",
            sponsor_DJS: "sponsor_DJS",
            chitchat: "chitchat",
            location: "location",
            setup_popup: "setup_popup",
            share_popup: "share_popup",
            add_rule_pop: "add_rule_pop",
            sponsor_chat: "sponsor_chat",
            add_djs_pop: "add_djs_pop",
            clear_btns: "clear_btns",
            add_xjs_pop: "add_xjs_pop",
            r_room_dissolution_room: "r_room_dissolution_room",
            XJS_wait_ok: "XJS_wait_ok",
            is_agree_dissolve_room: "is_agree_dissolve_room",
        };
        _this.dissolution_room = {
            is_agree_diss_room: "is_agree_diss_room",
        };
        _this.chat = {
            click_sponsor_action: "click_sponsor_action",
            send_chat_status: "send_chat_status",
        };
        _this.player_back = {
            show_player: "show_player",
        };
        return _this;
    }
    return Popup_event_model;
}(Base_event_model));
__reflect(Popup_event_model.prototype, "Popup_event_model");
//# sourceMappingURL=Popup.js.map