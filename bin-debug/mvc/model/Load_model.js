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
var Load_model = (function (_super) {
    __extends(Load_model, _super);
    function Load_model() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Load_event_model(); //事件常量
        _this.loadGroupList = [];
        return _this;
    }
    //显示资源加载 _is是否显示图形
    Load_model.prototype.add_loading_data = function (_is) {
        this.m_to_c_dis_event(this.EVENT.load.add_loading_data, _is);
    };
    //移除资源加载
    Load_model.prototype.remove_loading_data = function () {
        this.m_to_c_dis_event(this.EVENT.load.add_loading_data);
    };
    /*zpb:判断资源是否加载过*/
    Load_model.prototype.judge_load_data = function (loadName) {
        this.loadName = loadName;
        for (var i in this.loadGroupList) {
            if (this.loadGroupList[i] == loadName) {
                MyConsole.getInstance().trace("资源组[" + this.loadName + "]已加载过", 2);
                return true;
            }
        }
        this.loadGroupList.push(loadName); /*加载资源组*/
        return false;
    };
    return Load_model;
}(Scene_model));
__reflect(Load_model.prototype, "Load_model");
//# sourceMappingURL=Load_model.js.map