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
var User3_card_view = (function (_super) {
    __extends(User3_card_view, _super);
    function User3_card_view(model) {
        var _this = _super.call(this, model) || this;
        if (_this.CONST.PLAYBACK_MODEL) {
            //回放模式下
            _this.stop_card_w = _this.CONST.CARD_INFO.base_stop_w_p3;
            _this.stop_card_dis = Math.floor(_this.stop_card_w * .8);
        }
        else {
            //普通模式下
            _this.stop_card_w = _this.CONST.CARD_INFO.base_stop_w_p3;
            _this.stop_card_dis = Math.floor(_this.stop_card_w * .86);
        }
        _this.stop_cpg_card_w = Math.floor(_this.stop_card_w);
        _this.stop_start_point = new egret.Point(Main.stageWidth - 300, 110);
        _this.play_card_w = Math.floor(_this.stop_card_w * .98);
        //出牌动画信息
        _this.model.send_stop_card_info.w = Math.floor(_this.stop_card_w * 1.3);
        _this.model.send_stop_card_info.x = Main.stageWidth / 2;
        _this.model.max_play_card_point.x = Main.stageWidth / 2;
        _this.model.max_play_card_point.y = Main.stageHeight / 2 - 220;
        return _this;
    }
    //渲染全部桌牌
    User3_card_view.prototype.set_play_cards_point = function () {
        var arr = [6, 8, 10, 12];
        var play_card_dis_w = Math.floor(this.play_card_w * .78);
        var play_card_dis_h = Math.floor(this.play_card_w * .78);
        for (var i in arr) {
            var num = arr[i], vx = Main.stageWidth / 2 + (num * play_card_dis_w / 2) - play_card_dis_w, point;
            for (var s = 0; s < num; s++) {
                point = new egret.Point();
                point.x = vx - s * play_card_dis_w;
                point.y = -(Number(i) + 1) * play_card_dis_h + this.CONST.LOCATION_POINT.y - 80;
                this.play_cards_point.push(point);
            }
        }
        this.stop_start_point.y = point.y;
        this.model.send_stop_card_info.y = this.stop_start_point.y - 50;
    };
    //更新吃碰杠的手牌
    User3_card_view.prototype.update_cpg_stop_card = function () {
        this.cpg_card_max_w = this.stop_start_point.x;
        if (this.model.cpg_stop_card && this.model.cpg_stop_card.length) {
            this.cpg_card_max_w += 6 * this.model.cpg_stop_card.length;
        }
        _super.prototype.update_cpg_stop_card.call(this);
        //吃碰杠牌和基础手牌 间距
        if (this.model.cpg_stop_card && this.model.cpg_stop_card.length) {
            this.cpg_card_max_w -= 15;
            if (this.CONST.PLAYBACK_MODEL) {
                //回放模式下
                this.cpg_card_max_w -= 30;
            }
        }
    };
    //设置单组吃碰杠坐标
    User3_card_view.prototype.set_cpg_stop_card_view_point = function (card_view, i) {
        this.cpg_card_max_w -= (card_view.w + 10);
        card_view.x = this.cpg_card_max_w; //x轴偏移量
        card_view.y = this.stop_start_point.y - card_view.h - 3;
    };
    //设置单张手牌坐标
    User3_card_view.prototype.set_base_stop_card_view_point = function (card_view, i) {
        card_view.x = this.cpg_card_max_w - (i * this.stop_card_dis);
        card_view.y = this.stop_start_point.y - card_view.h;
        //系统牌间距
        if (this.model.last_action && this.model.last_action.type == this.CONST.PLAYER_ACTION.system_deal_card && i == this.model.stop_card.length - 1) {
            card_view.x -= 15;
            card_view.alpha = 0;
            egret.Tween.get(card_view).to({ alpha: 1 }, 300);
        }
        if (this.CONST.PLAYBACK_MODEL) {
            //回放模式下
            card_view.y -= 3;
        }
    };
    //tyq: 设置单张花牌的坐标
    User3_card_view.prototype.set_hua_card_point = function (card, i) {
        var start_X = this.CONST.HUA_CARD_START_POINT[2].x;
        var start_Y = this.CONST.HUA_CARD_START_POINT[2].y;
        card.x = start_X - this.CONST.HUA_CARD_DIS * i;
        card.y = start_Y;
    };
    //设置单张桌牌坐标
    User3_card_view.prototype.set_play_card_view_point = function (card_view, i) {
        this.addChildAt(card_view, 0);
    };
    //设置最新打出去的那张牌箭头提示坐标
    User3_card_view.prototype.set_new_play_card_point = function (card_view) {
        this.new_play_card_point = {
            x: card_view.x + this.play_card_w / 2,
            y: card_view.y
        };
    };
    return User3_card_view;
}(Base_user_card_view));
__reflect(User3_card_view.prototype, "User3_card_view");
//# sourceMappingURL=User3_card_view.js.map