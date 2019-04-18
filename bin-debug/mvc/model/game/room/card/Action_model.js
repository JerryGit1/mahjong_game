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
var Action_model = (function (_super) {
    __extends(Action_model, _super);
    function Action_model(action_data, position) {
        var _this = _super.call(this) || this;
        var action_info;
        if (typeof action_data == "number") {
            action_info = Base_card_model.act_code_get_info(action_data);
            _this._code = action_data;
        }
        else {
            action_info = Base_card_model.act_code_get_info(action_data.action);
            _this._code = action_info.action;
            //吃的具体那张牌
            if (action_data.extra)
                _this._action_card = new Base_card_model(action_data.extra, _this.CONST.CARD_TYPE.base_stop, 1);
        }
        //类型
        _this._type = action_info.type;
        //操作的牌 列表
        if (action_info.card_list) {
            _this._card_list = [];
            for (var i in action_info.card_list) {
                _this._card_list.push(new Base_card_model(action_info.card_list[i], _this.CONST.CARD_TYPE.base_stop, 1));
            }
        }
        //方位
        _this.position = position;
        return _this;
    }
    Object.defineProperty(Action_model.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action_model.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Action_model.prototype, "card_list", {
        get: function () {
            return this._card_list;
        },
        enumerable: true,
        configurable: true
    });
    Action_model.prototype.get_card_code_with_card_list = function (key) {
        if (this._card_list && this._card_list.length > key) {
            return this._card_list[key].act_code;
        }
    };
    Object.defineProperty(Action_model.prototype, "action_card", {
        get: function () {
            return this._action_card;
        },
        set: function (code) {
            this._action_card = new Base_card_model(code, this.CONST.CARD_TYPE.base_stop, 1);
        },
        enumerable: true,
        configurable: true
    });
    //-----------------------吃碰杠胡 整理手牌时候用-----------------------
    //吃的动作牌列表中 获取他自己有的牌
    Action_model.prototype.get_chi_card_list = function (extra) {
        var arr = [];
        if (extra)
            this._action_card = new Base_card_model(extra, this.CONST.CARD_TYPE.base_stop, 1);
        for (var i in this._card_list) {
            if (Number(this._card_list[i].act_code) != Number(extra)) {
                arr.push(Number(this._card_list[i].act_code));
            }
        }
        if (arr.length != 2) {
            MyConsole.getInstance().trace("重大失误,在某个吃的行为ID对应牌列表,没有找到吃的那张牌", 0);
        }
        return arr;
    };
    //碰的动作牌列表中 获取他自己有的牌
    Action_model.prototype.get_peng_card_list = function () {
        var act_code = Number(this._card_list[0].act_code); //单牌数值
        return [act_code, act_code];
    };
    //明杠的动作牌列表中 获取他自己有的牌
    Action_model.prototype.get_gang_card_list = function (cpg_card_list) {
        if (cpg_card_list === void 0) { cpg_card_list = null; }
        var act_code = this.get_gang_card_code(); //单牌数值
        var _is_peng_gang = this.handle_is_peng_gang(cpg_card_list, act_code);
        if (_is_peng_gang)
            return [act_code];
        else
            return [act_code, act_code, act_code];
    };
    //判断是否为碰杠
    Action_model.prototype.handle_is_peng_gang = function (cpg_card_list, act_code) {
        var is_peng_gang = false;
        for (var i = 0; i < cpg_card_list.length; i++) {
            if (cpg_card_list[i] && cpg_card_list[i].action_type == this.CONST.PLAYER_ACTION.peng) {
                var peng_card = cpg_card_list[i].card_model_list[0].act_code; //找到碰的那张牌
                var gang_card = act_code; //找到杠的那张牌
                if (peng_card == gang_card) {
                    is_peng_gang = true;
                    break;
                }
            }
        }
        return is_peng_gang;
    };
    //单牌数值
    Action_model.prototype.get_gang_card_code = function () {
        return Number(this._card_list[0].act_code); //单牌数值
    };
    //长毛的动作牌列表中 获取他自己有的牌
    Action_model.prototype.get_zhang_mao_card_list = function () {
        var arr = [];
        for (var i in this._card_list) {
            arr.push(Number(this._card_list[i].act_code));
        }
        return arr;
    };
    //暗杠的动作牌列表中 获取他自己有的牌
    Action_model.prototype.get_an_gang_card_list = function (extra) {
        if (!extra) {
            //其他人视角
            return [-1, -1, -1, -1];
        }
        else {
            //自己视角
            var action_info = Base_card_model.act_code_get_info(extra);
            return action_info.card_list;
        }
    };
    return Action_model;
}(Base_model));
__reflect(Action_model.prototype, "Action_model");
//# sourceMappingURL=Action_model.js.map