var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-26.
 */
var Play_card_model = (function (_super) {
    __extends(Play_card_model, _super);
    function Play_card_model(code, position, hun_code) {
        return _super.call(this, code, 1, position, hun_code) || this;
    }
    return Play_card_model;
}(Base_card_model));
__reflect(Play_card_model.prototype, "Play_card_model");
//# sourceMappingURL=Play_card_model.js.map