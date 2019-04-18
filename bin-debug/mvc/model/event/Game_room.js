var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
var Game_room_event_model = (function (_super) {
    __extends(Game_room_event_model, _super);
    function Game_room_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.room = {
            update_room_view: "update_room_view",
            leave_room: "leave_room",
            start_game: "start_game",
            initiate_action: "initiate_action",
            player_Enough_No: "player_Enough_No",
            player_Enough_Yes: "player_Enough_Yes",
            choose_pufen: "choose_pufen",
            set_up_layer_touch_event: "set_up_layer_touch_event",
            tips_self_choose_base_stop_card_num: "tips_self_choose_base_stop_card",
            self_send_card: "self_send_card",
            m_c_user_join: "m_c_user_join",
            m_c_leave_room: "m_c_leave_room",
            m_c_system_deal_card: "m_c_system_deal_card",
            m_c_user_send_card: "m_c_user_send_card",
            m_c_user_chi_card: "m_c_user_chi_card",
            m_c_user_peng_card: "m_c_user_peng_card",
            m_c_user_gang_card: "m_c_user_gang_card",
            m_c_user_guo_card: "m_c_user_guo_card",
            m_c_user_hu_card: "m_c_user_hu_card",
            m_c_user_lj_card: "m_c_user_lj_card",
            m_c_user_xjs: "m_c_user_xjs",
            m_c_user_djs: "m_c_user_djs",
            m_c_user_prepared: "m_c_user_prepared_card",
            r_room_dissolution_room: "r_room_dissolution_room",
            r_player_chat_status: "r_player_chat_status",
            r_change_money: "r_change_money",
            play_back_home: "play_back_home",
            user_line_status_change: "user_line_status_change",
        };
        _this.room_popup = {
            look_user_info: "look_user_info",
            dissolve_room: "dissolve_room",
            kicking_user: "kicking_user",
            float_tips: "float_tips",
            r_room_dissolution_room: "r_room_dissolution_room",
            is_agree_diss_room: "is_agree_diss_room",
            sponsor_DJS: "sponsor_DJS",
            add_xjs_pop: "add_xjs_pop",
            add_djs_pop: "add_djs_pop",
            show_user_info_popup: "show_user_info_popup",
            share: "share",
            share_popup: "share_popup",
            setup_popup: "setup_popup",
            rule: "rule",
            add_rule_pop: "add_rule_pop",
            chitchat: "chitchat",
            location: "location",
            sponsor_chat: "sponsor_chat",
            sponsor_dissolve_room: "sponsor_dissolve_room",
            XJS_wait_ok: "XJS_wait_ok",
        };
        return _this;
    }
    return Game_room_event_model;
}(Game_event_model));
__reflect(Game_room_event_model.prototype, "Game_room_event_model");
//# sourceMappingURL=Game_room.js.map