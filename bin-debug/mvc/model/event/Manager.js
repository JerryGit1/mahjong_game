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
var Manager_event_model = (function (_super) {
    __extends(Manager_event_model, _super);
    function Manager_event_model() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.manager = {
            scene_set_model: "scene_set_model",
            web_socket_open: "web_socket_open",
            update_main_info: "update_main_info",
            onfocus: "onfocus",
            onblur: "onblur",
        };
        return _this;
    }
    return Manager_event_model;
}(Base_event_model));
__reflect(Manager_event_model.prototype, "Manager_event_model");
//# sourceMappingURL=Manager.js.map