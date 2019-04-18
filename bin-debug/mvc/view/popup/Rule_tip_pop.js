/**
 * Created by JackerCao on 2018/5/4.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Rule_tip_pop = (function (_super) {
    __extends(Rule_tip_pop, _super);
    function Rule_tip_pop(info) {
        var _this = _super.call(this, true, true) || this;
        //初始化内容;
        _this.init_content(info);
        _this.set_click_bg_apha();
        return _this;
    }
    Rule_tip_pop.prototype.init_content = function (info) {
        var str = info.str;
        var pos = info.position;
        var rule_tip = new Tip_view(str);
        rule_tip.x = pos.x - 80;
        rule_tip.y = pos.y - 40;
        this.addChild(rule_tip);
    };
    return Rule_tip_pop;
}(Base_popup));
__reflect(Rule_tip_pop.prototype, "Rule_tip_pop");
//# sourceMappingURL=Rule_tip_pop.js.map