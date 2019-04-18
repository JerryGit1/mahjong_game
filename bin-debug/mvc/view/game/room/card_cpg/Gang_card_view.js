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
var Gang_card_view = (function (_super) {
    __extends(Gang_card_view, _super);
    function Gang_card_view(model, w) {
        var _this = _super.call(this, model) || this;
        _this.add_three_card(w);
        //上边那张牌
        var cardView = _this.create_card(_this.model.card_model_list[0], w);
        _this.addChild(cardView);
        switch (_this.model.position) {
            case 1:
                cardView.x = _this.w / 3;
                cardView.y = -w * .3;
                if (model.is_ding_hun_pai)
                    cardView.y = 0;
                break;
            case 2:
                cardView.y = -_this.w * .53;
                cardView.x = -w * .07;
                if (model.is_ding_hun_pai)
                    cardView.visible = false;
                break;
            case 3:
                cardView.x = _this.w / 3;
                cardView.y = -w * .3;
                if (model.is_ding_hun_pai)
                    cardView.visible = false;
                break;
            case 4:
                cardView.y = _this.w * .13;
                cardView.x = -w * .15;
                if (model.is_ding_hun_pai)
                    cardView.visible = false;
                break;
        }
        return _this;
        // this.graphics.beginFill(0x00ff00,.1);
        // this.graphics.drawRect(0,0,this.w,this.h)
    }
    return Gang_card_view;
}(Cpg_base_card_view));
__reflect(Gang_card_view.prototype, "Gang_card_view");
//# sourceMappingURL=Gang_card_view.js.map