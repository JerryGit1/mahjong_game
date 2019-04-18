var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
var Base_event_model = (function () {
    function Base_event_model() {
        //基础事件--------------切记这块很少用到在这定义 要慎重思考
        //其他层的事件 有自己各自的
        this.base = {
            parent_add_view: "parent_add_view",
            parent_remove_view: "parent_remove_view",
            load_resource_start: "load_resource_start",
            load_resource_ok: "load_resource_ok",
            //俱乐部
            base_float_alert: "base_float_alert",
            create_club_room_popup: "create_club_room_popup",
            join_club_room_popup: "join_club_room_popup",
            hall_to_club_join_id: "hall_to_club_join_id",
            hall_to_club_cut_scene: "hall_to_club_cut_scene",
            club_back_hall_scene: "club_back_hall_scene",
            sure_club_join_room: "sure_club_join_room",
            sure_club_create_room: "sure_club_create_room",
            club_my_info_popup: "club_my_info_popup",
            club_get_my_info: "club_get_my_info",
            club_update_my_info: "club_update_my_info",
            club_request_leave_popup: "club_request_leave_popup",
            popup_create_room_ok: "popup_create_room_ok",
            issue_success: "issue_success",
            popup_join_room_ok: "popup_join_room_ok",
            popup_join_room_fail: "popup_join_room_fail",
            update_main_info: "update_main_info",
            DJS_back_hall: "DJS_back_hall",
            playback_cut_game: "playback_cut_game",
            playback_half_over: "playback_half_over",
            clear_ani_scene: "clear_ani_scene",
            clear_popup_scene: "clear_popup_scene",
            is_show_player_back_pop: "is_show_player_back_pop",
        };
        //弹窗
        this.base_popup = {
            look_user_info: "look_user_info",
            pay_user_info: "pay_user_info",
            add_create_room_pop: "add_create_room_pop",
            add_join_room_pop: "add_join_room_pop",
            pay_user_money: "pay_user_money",
            record: "record",
            club_request_join: "club_request_join",
            suqare_leave_popup: "suqare_leave_popup",
            add_my_info: "add_my_info",
            club_add_my_info: "club_add_my_info",
            club_play_back_info: "club_play_back_info",
            issue: "issue",
            hint: "hint",
            add_user_Agree_pop: "add_user_Agree_pop",
            help: "help",
            setting: "setting",
            share: "share",
        };
        //user_model
        this.user = {
            set_tiren_btn: "set_tiren_btn",
            update_online_status: "update_online_status",
        };
        this.hall_issue = {
            hall_issue_delete_player: "hall_issue_delete_player"
        };
        //pop广播到hall的按钮回调;
        this.pop_to_hall = {
            game_create_room_back: "game_create_room_back",
            user_agree_back: "user_agree_back",
            join_room_back: "join_room_back",
            pop_change_money: "pop_change_money",
        };
        this.room_to_hall = {
            room_change_money: "room_change_money",
        };
        this.room_to_pop = {
            add_setting_pop: "add_setting_pop",
            add_rule_pop: "add_rule_pop",
            add_location_pop: "add_location_pop",
            add_chitchat_pop: "add_chitchat_pop",
            add_djs_pop: "add_djs_pop",
            add_xjs_pop: "add_xjs_pop",
            xjs_wait_ok: "xjs_wait_ok",
            r_room_dissolution_room: "r_room_dissolution_room",
        };
        this.pop_to_room = {
            room_dissolution_room: "room_dissolution_room",
            is_agree_diss_room: "is_agree_diss_room",
            pop_sponsor_DJS: "pop_sponsor_DJS",
            chat_status: "chat_status",
        };
        this.pop_to_game = {
            show_player_back: "show_player_back"
        };
        //动画
        this.room_ani = {
            start_ani: "start_ani",
            kai_hun_ani: "kai_hun_ani",
            tips_send_card_ani: "tips_send_card_ani",
            user_send_card: "user_send_card",
            max_card_tips: "max_card_tips",
            cpgh_ani: "cpgh_ani",
            liu_ju_ani: "liu_ju_ani",
            score_ani: "score_ani",
            play_chat_ani: "play_chat_ani",
            start_flower_ani: "start_flower_ani",
        };
    }
    return Base_event_model;
}());
__reflect(Base_event_model.prototype, "Base_event_model");
//# sourceMappingURL=Base_event_model.js.map