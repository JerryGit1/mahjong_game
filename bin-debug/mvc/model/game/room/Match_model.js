var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-18.
 */
var Match_model = (function (_super) {
    __extends(Match_model, _super);
    function Match_model() {
        return _super.call(this) || this;
    }
    return Match_model;
}(Base_model));
__reflect(Match_model.prototype, "Match_model");
//# sourceMappingURL=Match_model.js.map