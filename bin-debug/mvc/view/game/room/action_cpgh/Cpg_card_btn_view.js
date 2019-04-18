var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-05-02.
 */
var Cpg_card_btn_view = (function (_super) {
    __extends(Cpg_card_btn_view, _super);
    function Cpg_card_btn_view(model) {
        var _this = _super.call(this, "g_more_cg_bg") || this;
        _this.model = model;
        var sp = new egret.Sprite();
        _this.addChild(sp);
        //icon
        var bg_str = "";
        if (_this.model.type == _this.CONST.PLAYER_ACTION.chi) {
            bg_str = "g_c_icon"; //吃
        }
        else if (_this.model.type == _this.CONST.PLAYER_ACTION.an_gang) {
            bg_str = "g_g_icon"; //杠
        }
        else {
            MyConsole.getInstance().trace("重大失误,渲染多个吃杠遇到未知类型" + _this.model.type, 0);
        }
        var title = _this.set_bit_center(bg_str, false);
        title.x = 10;
        sp.addChild(title);
        //列出牌
        for (var i in _this.model.card_list) {
            var card_view = new Base_card_view(_this.model.card_list[i], 70);
            sp.addChild(card_view);
            card_view.x = Number(i) * Math.floor(card_view.w * .9) + title.width + 25;
            //显示吃的牌
            if (_this.model.action_card && _this.model.type == _this.CONST.PLAYER_ACTION.chi)
                if (_this.model.card_list[i].act_code == _this.model.action_card.act_code) {
                    //特殊标记
                    card_view.set_jian_tou_icon(true);
                }
        }
        sp.x = -sp.width / 2;
        sp.y = -card_view.h / 2;
        title.y = sp.height / 2 - title.height / 2;
        //背景适配
        _this.card.scale9Grid = new egret.Rectangle(17, 14, 245, 86);
        _this.card.width = sp.width + 20;
        _this.card.anchorOffsetX = _this.card.width / 2;
        _this.card.anchorOffsetY = _this.card.height / 2;
        return _this;
    }
    return Cpg_card_btn_view;
}(MyButton));
__reflect(Cpg_card_btn_view.prototype, "Cpg_card_btn_view");
//# sourceMappingURL=Cpg_card_btn_view.js.map