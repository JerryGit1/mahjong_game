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
var XJS_model = (function (_super) {
    __extends(XJS_model, _super);
    function XJS_model() {
        var _this = _super.call(this) || this;
        _this.time = "2015-09-09 18:09"; //时间
        _this.time = _this.CONST.formatting_timestamp();
        return _this;
    }
    XJS_model.prototype.set_hu_type = function (self_user_id) {
        var win_user_id; //赢的人
        var dianpao_user_id; //输的人
        for (var i in this.user_list_model) {
            if (this.user_list_model[i].hu_type == 1) {
                win_user_id = this.user_list_model[i].userId;
            }
            else if (this.user_list_model[i].hu_type == 2) {
                dianpao_user_id = this.user_list_model[i].userId;
            }
        }
        //自摸类型
        if (win_user_id) {
            if (!dianpao_user_id) {
                for (var i in this.user_list_model) {
                    if (this.user_list_model[i].userId == win_user_id) {
                        this.user_list_model[i].hu_type = 3; //自摸
                        break;
                    }
                }
            }
            if (win_user_id == self_user_id) {
                this.hu_type = 1; //胜利
            }
            else {
                this.hu_type = 2; //失败
            }
        }
        else {
            this.hu_type = 3; //流局
        }
    };
    return XJS_model;
}(Base_model));
__reflect(XJS_model.prototype, "XJS_model");
//# sourceMappingURL=XJS_model.js.map