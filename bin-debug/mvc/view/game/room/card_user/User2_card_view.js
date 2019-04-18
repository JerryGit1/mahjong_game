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
var User2_card_view = (function (_super) {
    __extends(User2_card_view, _super);
    function User2_card_view(model) {
        var _this = _super.call(this, model) || this;
        if (_this.CONST.PLAYBACK_MODEL) {
            //回放模式下
            _this.stop_card_w = _this.CONST.CARD_INFO.base_stop_w_p2 * .8;
            _this.stop_card_dis = Math.floor(_this.stop_card_w * .56);
        }
        else {
            //普通模式下
            _this.stop_card_w = _this.CONST.CARD_INFO.base_stop_w_p2;
            _this.stop_card_dis = Math.floor(_this.stop_card_w * .42);
        }
        _this.stop_cpg_card_w = Math.floor(_this.stop_card_w * .8);
        _this.stop_start_point = new egret.Point(Main.stageWidth - 145, _this.CONST.CARD_INFO.base_stop_w_p2_start_Y);
        _this.play_card_w = Math.floor(_this.stop_card_w * .8);
        //出牌动画信息
        _this.model.send_stop_card_info.w = _this.stop_card_w;
        _this.model.send_stop_card_info.x = _this.stop_start_point.x - 100;
        _this.model.send_stop_card_info.y = Main.stageHeight * .45;
        _this.model.max_play_card_point.x = Main.stageWidth / 2 + 240;
        _this.model.max_play_card_point.y = _this.CONST.LOCATION_POINT.y;
        return _this;
    }
    //渲染全部桌牌
    User2_card_view.prototype.set_play_cards_point = function () {
        var arr = [6, 8, 10, 12];
        var play_card_dis_w = Math.floor(this.play_card_w * 1.05);
        var play_card_dis_h = Math.floor(this.play_card_w * .605);
        for (var i in arr) {
            var num = arr[i], vy = this.CONST.LOCATION_POINT.y + (num * play_card_dis_h / 2), point;
            for (var s = 0; s < num; s++) {
                var skx_2 = Math.floor(play_card_dis_w * .13) * s;
                point = new egret.Point();
                point.x = Number(i) * play_card_dis_w + this.CONST.LOCATION_POINT.x + 150 - skx_2;
                point.y = vy - s * play_card_dis_h;
                this.play_cards_point.push(point);
            }
        }
    };
    //更新吃碰杠的手牌
    User2_card_view.prototype.update_cpg_stop_card = function () {
        this.cpg_card_max_w = this.stop_start_point.y;
        this.x_sk = 0;
        if (this.model.cpg_stop_card && this.model.cpg_stop_card.length) {
            this.cpg_card_max_w += 10 * this.model.cpg_stop_card.length;
        }
        _super.prototype.update_cpg_stop_card.call(this);
        //吃碰杠牌和基础手牌 间距
        if (this.model.cpg_stop_card && this.model.cpg_stop_card.length) {
            this.cpg_card_max_w += 15;
            this.x_sk += 6;
            if (this.CONST.PLAYBACK_MODEL) {
                //回放模式下
                this.cpg_card_max_w -= 15;
                this.x_sk -= 6;
            }
        }
    };
    //设置单组吃碰杠坐标
    User2_card_view.prototype.set_cpg_stop_card_view_point = function (card_view, i) {
        card_view.x = this.stop_start_point.x - this.x_sk;
        card_view.y = this.cpg_card_max_w;
        this.cpg_card_max_w -= (card_view.w + 15); //y轴偏移量
        this.x_sk += Math.floor(card_view.w * .3); //x轴偏移量
        this.addChildAt(card_view, 0);
    };
    //设置单张手牌坐标
    User2_card_view.prototype.set_base_stop_card_view_point = function (card_view, i) {
        card_view.x = this.stop_start_point.x - Math.floor(card_view.w * .115) * i - this.x_sk;
        card_view.y = this.cpg_card_max_w - i * this.stop_card_dis;
        //系统牌
        if (this.model.last_action && this.model.last_action.type == this.CONST.PLAYER_ACTION.system_deal_card && i == this.model.stop_card.length - 1) {
            card_view.y -= 20;
            card_view.alpha = 0;
            egret.Tween.get(card_view).to({ alpha: 1 }, 300);
        }
        this.addChildAt(card_view, 0);
    };
    //tyq: 设置单张花牌的坐标
    User2_card_view.prototype.set_hua_card_point = function (card, i) {
        var start_X = this.CONST.HUA_CARD_START_POINT[1].x;
        var start_Y = this.CONST.HUA_CARD_START_POINT[1].y;
        card.x = start_X - this.x_sk;
        card.y = start_Y - this.CONST.HUA_CARD_DIS * i;
        this.x_sk += 10;
    };
    //设置单张桌牌坐标
    User2_card_view.prototype.set_play_card_view_point = function (card_view, i) {
        this.addChildAt(card_view, 0);
    };
    //设置最新打出去的那张牌箭头提示坐标
    User2_card_view.prototype.set_new_play_card_point = function (card_view) {
        this.new_play_card_point = {
            x: card_view.x + this.play_card_w * .7,
            y: card_view.y - this.play_card_w * .7
        };
    };
    return User2_card_view;
}(Base_user_card_view));
__reflect(User2_card_view.prototype, "User2_card_view");
//# sourceMappingURL=User2_card_view.js.map