var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
var Ani_control = (function (_super) {
    __extends(Ani_control, _super);
    function Ani_control(model, view) {
        var _this = _super.call(this, model, view) || this;
        _this.EVENT = new Ani_event_model(); //事件常量
        //清空所有动画层遗留
        _this.c_to_c_add_radio_event(_this.EVENT.base.clear_ani_scene, _this.clear_ani_scene, _this);
        //------------------游戏--------------------
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.start_ani, _this.start_ani, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.kai_hun_ani, _this.kai_hun_ani, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.tips_send_card_ani, _this.tips_send_card_ani, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.user_send_card, _this.game_user_send_card, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.max_card_tips, _this.game_max_card_tips, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.cpgh_ani, _this.cpgh_ani, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.liu_ju_ani, _this.liu_ju_ani, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.score_ani, _this.score_ani, _this);
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.play_chat_ani, _this.play_chat_ani, _this);
        //开局-补花动画--丹阳特有--不用合并
        _this.c_to_c_add_radio_event(_this.EVENT.room_ani.start_flower_ani, _this.start_flower_ani, _this);
        return _this;
    }
    //游戏开场动画
    Ani_control.prototype.start_ani = function (back_fun) {
        this.view.start_ani(back_fun);
    };
    //游戏开混动画
    Ani_control.prototype.kai_hun_ani = function (info) {
        if (info.hunPai_model) {
            this.view.kai_hun_ani(info.hunPai_model, info.back_fun);
        }
        else {
            if (info.back_fun)
                info.back_fun();
        }
    };
    //开局-补花动画--丹阳特有--不用合并
    Ani_control.prototype.start_flower_ani = function (info) {
        this.view.start_flower_ani(info);
    };
    //提示出牌动画
    Ani_control.prototype.tips_send_card_ani = function (bl) {
        if (bl)
            this.view.tips_send_card_ani();
    };
    //玩家出牌动画
    Ani_control.prototype.game_user_send_card = function (info) {
        this.view.game_user_send_card(info);
    };
    //玩家打出去的牌 放大提示动画
    Ani_control.prototype.game_max_card_tips = function (info) {
        this.view.game_max_card_tips(info);
    };
    //吃碰杠胡过
    Ani_control.prototype.cpgh_ani = function (info) {
        this.view.cpgh_ani(info);
    };
    //吃碰杠胡过
    Ani_control.prototype.liu_ju_ani = function (info) {
        this.view.liu_ju_ani(info);
    };
    //杠分数动画
    Ani_control.prototype.score_ani = function (info) {
        this.view.score_ani(info);
    };
    //聊天动画;
    Ani_control.prototype.play_chat_ani = function (info) {
        this.view.show_chat_ani(info);
    };
    //清空动画场景
    Ani_control.prototype.clear_ani_scene = function () {
        this.view.clear_ani_scene();
    };
    return Ani_control;
}(Base_control));
__reflect(Ani_control.prototype, "Ani_control");
//# sourceMappingURL=Ani_control.js.map