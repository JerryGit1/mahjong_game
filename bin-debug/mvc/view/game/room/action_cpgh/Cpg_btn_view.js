var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-05-01.
 */
var Cpg_btn_view = (function (_super) {
    __extends(Cpg_btn_view, _super);
    function Cpg_btn_view(str, model_list) {
        var _this = _super.call(this, str) || this;
        _this.model_list = model_list;
        return _this;
    }
    return Cpg_btn_view;
}(MyButton));
__reflect(Cpg_btn_view.prototype, "Cpg_btn_view");
//# sourceMappingURL=Cpg_btn_view.js.map