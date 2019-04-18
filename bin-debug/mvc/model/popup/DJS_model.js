var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-05-05.
 */
var DJS_model = (function (_super) {
    __extends(DJS_model, _super);
    function DJS_model() {
        var _this = _super.call(this) || this;
        _this.time = "2015-09-09 18:09"; //时间
        _this.time = _this.CONST.formatting_timestamp(0, 1);
        return _this;
    }
    //设置大赢家;
    DJS_model.prototype.set_big_win = function () {
        var num = 1;
        for (var i = 0; i < this.user_list_model.length; i++) {
            if (this.user_list_model[i].score > num) {
                num = this.user_list_model[i].score;
            }
        }
        for (var j = 0; j < this.user_list_model.length; j++) {
            if (num == this.user_list_model[j].score) {
                this.user_list_model[j].is_big_win = true;
            }
        }
    };
    //设置最佳炮手;
    DJS_model.prototype.set_pao_player = function () {
        var num = 1;
        for (var i = 0; i < this.user_list_model.length; i++) {
            if (this.user_list_model[i].dianNum > num) {
                num = this.user_list_model[i].dianNum;
            }
        }
        for (var j = 0; j < this.user_list_model.length; j++) {
            if (num == this.user_list_model[j].dianNum) {
                this.user_list_model[j].is_pao = true;
            }
        }
    };
    return DJS_model;
}(Base_model));
__reflect(DJS_model.prototype, "DJS_model");
//# sourceMappingURL=DJS_model.js.map