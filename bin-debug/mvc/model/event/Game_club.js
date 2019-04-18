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
var Game_club_event_model = (function (_super) {
    __extends(Game_club_event_model, _super);
    function Game_club_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.club_popup = {
            look_user_info: "look_user_info",
        };
        //俱乐部
        _this.club = {
            float_alert: "float_alert",
            cut_scene: "cut_scene",
            get_square_info: "get_square_info",
            update_square_info: "update_square_info",
            add_my_info: "add_my_info",
            request_leave: "request_leave",
            request_join: "request_join",
            back_hall: "back_hall",
            create_room: "create_room",
            join_room: "join_room",
            cut_club_scene: "cut_club_scene",
            cut_club_square: "cut_club_square",
        };
        return _this;
    }
    return Game_club_event_model;
}(Base_event_model));
__reflect(Game_club_event_model.prototype, "Game_club_event_model");
//# sourceMappingURL=Game_club.js.map