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
var Club_base_model = (function (_super) {
    __extends(Club_base_model, _super);
    function Club_base_model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Club_base_model;
}(Base_model));
__reflect(Club_base_model.prototype, "Club_base_model");
//# sourceMappingURL=Club_base_model.js.map