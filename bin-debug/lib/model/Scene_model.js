var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 场景model
 */
var Scene_model = (function (_super) {
    __extends(Scene_model, _super);
    function Scene_model() {
        var _this = _super.call(this) || this;
        _this.PORT = Port_model.getInstance(); //zpb:接口定义
        //zpb
        _this._is_manager = false;
        return _this;
    }
    Scene_model.prototype.add_port_event = function (portInfo, backFun, self) {
        var eventName = this.PORT.SOCKET_DATA_EVENT + portInfo.interfaceId;
        //大接口做特殊处理 只有 managerModel能接收到
        if (portInfo.interfaceId == this.PORT.CONFIG.mainInfo.interfaceId) {
            if (!self._is_manager) {
                MyConsole.getInstance().trace("重大失误，大接口侦听只允许Manager_model操作-", 0);
                return;
            }
        }
        this.m_to_c_add_event(eventName, backFun, self);
    };
    Scene_model.prototype.remove_port_event = function (portInfo) {
        var eventName = this.PORT.SOCKET_DATA_EVENT + portInfo.interfaceId;
        this.m_to_c_dis_event(eventName);
    };
    return Scene_model;
}(Base_model));
__reflect(Scene_model.prototype, "Scene_model");
//# sourceMappingURL=Scene_model.js.map