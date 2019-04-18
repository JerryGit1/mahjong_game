var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
var Cpg_base_card_view = (function (_super) {
    __extends(Cpg_base_card_view, _super);
    function Cpg_base_card_view(model) {
        var _this = _super.call(this) || this;
        _this.h = 0;
        _this.w = 0;
        _this.model = model;
        return _this;
    }
    /*显示前3张牌 吃 碰 杠都一样*/
    Cpg_base_card_view.prototype.add_three_card = function (card_w, num) {
        if (num === void 0) { num = 3; }
        var cardView, i, x = 0;
        var w = 0;
        for (i = 0; i < num; i++) {
            cardView = this.create_card(this.model.card_model_list[i], card_w);
            this.addChild(cardView);
            switch (this.model.position) {
                case 1:
                    w = Math.floor(cardView.w * .86);
                    cardView.x = i * w;
                    this.w += w;
                    break;
                case 2:
                    w = Math.floor(cardView.w * .57);
                    cardView.y = (-i) * w;
                    this.w += w;
                    cardView.x -= Math.floor(w * .25) * i;
                    this.addChildAt(cardView, 0);
                    break;
                case 3:
                    w = Math.floor(cardView.w * .8);
                    cardView.x = (i) * w;
                    this.w += w;
                    this.addChildAt(cardView, 0);
                    break;
                case 4:
                    w = Math.floor(cardView.w * .57);
                    cardView.y = (i) * w;
                    this.w += w;
                    cardView.x -= Math.floor(w * .25) * i;
                    break;
            }
            //提示吃的那张牌
            if (this.model.action_type == this.CONST.PLAYER_ACTION.chi && i == 1) {
                cardView.add_chi_float();
            }
        }
    };
    /*创建一张牌*/
    Cpg_base_card_view.prototype.create_card = function (c_m, w) {
        var cardView = new Base_card_view(c_m, w);
        this.h = cardView.h;
        return cardView;
    };
    return Cpg_base_card_view;
}(Base_view));
__reflect(Cpg_base_card_view.prototype, "Cpg_base_card_view");
//# sourceMappingURL=Cpg_base_card_view.js.map