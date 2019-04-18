var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-26.
 */
var CPG_card_model = (function (_super) {
    __extends(CPG_card_model, _super);
    function CPG_card_model(code, extra, position) {
        var _this = _super.call(this) || this;
        _this.card_model_list = [];
        _this.is_ding_hun_pai = false; //tyq 是否是定混牌的杠
        _this.action_code = Number(code); //动作码
        _this.action_card = extra; //操作的那张牌
        _this.position = position; //相对方位
        _this.act_code(_this.action_code); //动作类型
        return _this;
    }
    //设置类型
    CPG_card_model.prototype.act_code = function (value) {
        var cpg_info = Base_card_model.act_code_get_info(value);
        this.action_type = cpg_info.type;
        switch (this.action_type) {
            case this.CONST.PLAYER_ACTION.an_gang:
                if (!this.action_card) {
                    this.action_card = -2;
                    this.set_card_list([-1, -1, -1, -1]); //牌列表 别人视角
                }
                else {
                    var an_gang_card_info = Base_card_model.act_code_get_info(this.action_card);
                    this.action_card = an_gang_card_info.card_list[0];
                    if (an_gang_card_info) {
                        this.set_card_list([-1, -1, -1, this.action_card]); //牌列表
                    }
                }
                break;
            case this.CONST.PLAYER_ACTION.chi:
                //吃的牌放中间
                for (var i in cpg_info.card_list) {
                    if (Number(cpg_info.card_list[i]) == Number(this.action_card)) {
                        cpg_info.card_list.splice(i, 1);
                        break;
                    }
                }
                cpg_info.card_list.splice(1, 0, this.action_card);
                this.set_card_list(cpg_info.card_list); //牌列表
                break;
            case this.CONST.PLAYER_ACTION.peng:
                this.set_card_list(cpg_info.card_list); //牌列表
                this.peng_card_code = this.card_model_list[0].act_code; //碰的牌code
                break;
            case this.CONST.PLAYER_ACTION.gang:
                this.set_card_list(cpg_info.card_list); //牌列表
                break;
        }
    };
    //获取牌列表
    CPG_card_model.prototype.set_card_list = function (action_route_info) {
        if (action_route_info) {
            for (var i in action_route_info) {
                //牌的类型
                var type = this.CONST.CARD_TYPE.cpg_stop; //普通吃碰杠
                if (action_route_info[i] == -1)
                    type = this.CONST.CARD_TYPE.an_g_stop; //暗杠
                var card = new Base_card_model(action_route_info[i], type, this.position);
                this.card_model_list.push(card);
            }
        }
        else {
            MyConsole.getInstance().trace("重大失误,没有这ID 牌行为编码-" + this.action_code, 0);
        }
    };
    return CPG_card_model;
}(Base_model));
__reflect(CPG_card_model.prototype, "CPG_card_model");
//# sourceMappingURL=CPG_card_model.js.map