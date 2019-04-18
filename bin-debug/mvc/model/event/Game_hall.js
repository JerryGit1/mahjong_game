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
var Game_hall_event_model = (function (_super) {
    __extends(Game_hall_event_model, _super);
    function Game_hall_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hall = {};
        _this.hall_popup = {
            look_user_info: "look_user_info",
            pay_user_money: "pay_user_money",
            create_room: "create_room",
            join_room: "join_room",
            skip_club: "skip_club",
            setting: "setting",
            record: "record",
            issue: "issue",
            help: "help",
            share: "share",
        };
        return _this;
    }
    return Game_hall_event_model;
}(Game_event_model));
__reflect(Game_hall_event_model.prototype, "Game_hall_event_model");
//# sourceMappingURL=Game_hall.js.map