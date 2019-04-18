var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-03-29.
 */
var Club_room_model = (function (_super) {
    __extends(Club_room_model, _super);
    function Club_room_model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Club_room_model.prototype, "userInfo", {
        set: function (list) {
            this.user_list = [];
            for (var i in list) {
                this.user_list.push({
                    headImg: list[i].userImg,
                    userName: list[i].userName,
                    state: list[i].state,
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    return Club_room_model;
}(Base_model));
__reflect(Club_room_model.prototype, "Club_room_model");
//# sourceMappingURL=Club_room_model.js.map