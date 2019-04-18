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
var Game_event_model = (function (_super) {
    __extends(Game_event_model, _super);
    function Game_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game = {
            cut_hall_scene: "cut_hall_scene",
            cut_room_scene: "cut_room_scene",
            cut_club_scene: "cut_club_scene",
            game_back_hall_scene: "game_back_hall_scene",
            game_play_back_hall_scene: "game_play_back_hall_scene",
            update_main_info: "update_main_info",
            share_play_game_back: "share_id_play_game_back",
        };
        _this.popup = {
            float_alert: "float_alert",
            user_info_pop: "user_info_pop",
            create_room_update_money: "create_room_update_money",
            create_replace_update_money: "create_replace_update_money" //创建代开更新房卡
        };
        //大厅代开;
        _this.issue = {
            h_issue_delete_player: "h_issue_delete_player",
        };
        //回放功能-事件--丹阳特有-不用合并
        _this.playback = {
            handle_playback_data: "handle_playback_data",
            start_play_back: "start_play_back",
            update_step: "update_step",
            next_playback_info: "next_playback_info",
            xjs: "xjs",
            clear_operation_view_btn: "clear_operation_view_btn",
            back_ok: "back_ok",
        };
        return _this;
    }
    return Game_event_model;
}(Base_event_model));
__reflect(Game_event_model.prototype, "Game_event_model");
//# sourceMappingURL=Game.js.map