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
var Load_event_model = (function (_super) {
    __extends(Load_event_model, _super);
    function Load_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.load = {
            add_loading_data: "add_loading_data",
            remove_loading_data: "remove_loading_data"
        };
        return _this;
    }
    return Load_event_model;
}(Base_event_model));
__reflect(Load_event_model.prototype, "Load_event_model");
//# sourceMappingURL=Load.js.map