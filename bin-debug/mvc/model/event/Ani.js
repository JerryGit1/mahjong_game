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
var Ani_event_model = (function (_super) {
    __extends(Ani_event_model, _super);
    function Ani_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.ani = {};
        return _this;
    }
    return Ani_event_model;
}(Base_event_model));
__reflect(Ani_event_model.prototype, "Ani_event_model");
//# sourceMappingURL=Ani.js.map