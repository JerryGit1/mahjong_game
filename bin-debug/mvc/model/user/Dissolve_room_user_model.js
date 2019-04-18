/**
 * Created by JackerCao on 2018/5/7.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dissolve_room_user_model = (function (_super) {
    __extends(Dissolve_room_user_model, _super);
    function Dissolve_room_user_model() {
        var _this = _super.call(this) || this;
        _this.isInitiator = false; //tyq: 是否是发起人
        _this.isHandle = false; //tyq: 是否有过操作了
        _this.agree = 0; //tyq: 解散房间的整体情况 0-还没定 1-解散成功 2-解散失败
        return _this;
    }
    return Dissolve_room_user_model;
}(User_model));
__reflect(Dissolve_room_user_model.prototype, "Dissolve_room_user_model");
//# sourceMappingURL=Dissolve_room_user_model.js.map