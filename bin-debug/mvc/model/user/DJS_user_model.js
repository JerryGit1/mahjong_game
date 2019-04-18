/**
 * Created by JackerCao on 2018/5/2.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DJS_user_model = (function (_super) {
    __extends(DJS_user_model, _super);
    function DJS_user_model() {
        var _this = _super.call(this) || this;
        _this.huNum = 0; //cj: 胡牌次数
        _this.dianNum = 0; //cj: 点炮次数
        _this.gangNum = 0; //tyq: 杠的次数
        _this.ziMoNum = 0; //cj: 自摸次数
        _this.is_big_win = false; //cj:是否是大赢家;
        _this.is_pao = false; //cj:是否是最佳炮手;
        return _this;
    }
    return DJS_user_model;
}(Base_user_model));
__reflect(DJS_user_model.prototype, "DJS_user_model");
//# sourceMappingURL=DJS_user_model.js.map