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
var Dissolve_room_model = (function (_super) {
    __extends(Dissolve_room_model, _super);
    function Dissolve_room_model() {
        return _super.call(this) || this;
    }
    Object.defineProperty(Dissolve_room_model.prototype, "dissolveTime", {
        get: function () {
            return this._dissolveTime;
        },
        set: function (num) {
            this._dissolveTime = num;
            //格式化时间
            // this._dissolveTime=this.CONST.formatting_timestamp(num);
        },
        enumerable: true,
        configurable: true
    });
    return Dissolve_room_model;
}(Base_model));
__reflect(Dissolve_room_model.prototype, "Dissolve_room_model");
//# sourceMappingURL=Dissolve_room_model.js.map