var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
var Chi_card_view = (function (_super) {
    __extends(Chi_card_view, _super);
    function Chi_card_view(card_model, w) {
        var _this = _super.call(this, card_model) || this;
        _this.add_three_card(w);
        return _this;
    }
    return Chi_card_view;
}(Cpg_base_card_view));
__reflect(Chi_card_view.prototype, "Chi_card_view");
//# sourceMappingURL=Chi_card_view.js.map