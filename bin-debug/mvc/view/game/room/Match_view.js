var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
var Match_view = (function (_super) {
    __extends(Match_view, _super);
    function Match_view(user_group_model) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        //tyq: 每个玩家的手牌
        _this.user_card_list_views = [];
        //初始化牌层
        _this.init_cards(user_group_model);
        //吃碰杠胡层
        _this.init_cpgh_view();
        return _this;
    }
    /*------------------------------------牌层---------------------------------*/
    Match_view.prototype.init_cards = function (user_group_model) {
        this.user_card_list_views = [];
        for (var i = 1; i <= user_group_model.user_max_num; i++) {
            var user_model = user_group_model.position_id_get_user_model(i), card_list_view;
            if (!user_model || user_model.playStatus == this.CONST.USER_PLAY_STATUS.NONE)
                continue;
            switch (i) {
                case 1:
                    card_list_view = new User1_card_view(user_model);
                    break;
                case 2:
                    card_list_view = new User2_card_view(user_model);
                    break;
                case 3:
                    card_list_view = new User3_card_view(user_model);
                    break;
                case 4:
                    card_list_view = new User4_card_view(user_model);
                    break;
                default:
                    MyConsole.getInstance().trace("重大失误,用户牌层出现未知位置玩家", 0);
                    break;
            }
            if (card_list_view) {
                this.addChildAt(card_list_view, 0);
                if (i == 1) {
                    //提示所有桌牌和手牌中 某张一样的牌
                    card_list_view.v_to_v_add_event(this.EVENT.room.tips_self_choose_base_stop_card_num, this.tips_self_choose_base_stop_card_num, this);
                    //玩家出牌动作
                    card_list_view.v_to_v_add_event(this.EVENT.room.self_send_card, this.self_send_card, this);
                    //拖动牌时顶层事件消失
                    card_list_view.v_to_v_add_event(this.EVENT.room.set_up_layer_touch_event, this.set_up_layer_touch_event, this);
                }
                this.user_card_list_views.push(card_list_view);
            }
        }
        //箭头
        this.new_send_play_card_g_pointer = this.set_bit_center("g_pointer");
        this.new_send_play_card_g_pointer.anchorOffsetY = this.new_send_play_card_g_pointer.height;
        this.addChild(this.new_send_play_card_g_pointer);
        this.new_send_play_card_g_pointer.visible = false;
    };
    //发牌动画
    Match_view.prototype.game_send_card_ani = function (back_fun) {
        for (var i in this.user_card_list_views) {
            this.user_card_list_views[i].send_card_ani(back_fun);
        }
    };
    //更新玩家牌层  card_type
    Match_view.prototype.update_card_info = function (constraint_update, card_type, except_card_type) {
        //不显示箭头
        if (!card_type || card_type == this.CONST.CARD_TYPE.play)
            this.new_send_play_card_g_pointer.visible = false;
        for (var i in this.user_card_list_views) {
            this.user_card_list_views[i].update_card_info(constraint_update, card_type, except_card_type);
            //更新最新出的牌的箭头
            if (!card_type || card_type == this.CONST.CARD_TYPE.play)
                if (this.user_card_list_views[i].new_play_card_point) {
                    this.new_send_play_card_g_pointer.visible = true;
                    this.new_send_play_card_g_pointer.x = this.user_card_list_views[i].new_play_card_point.x;
                    this.new_send_play_card_g_pointer.y = this.user_card_list_views[i].new_play_card_point.y;
                    egret.Tween.removeTweens(this.new_send_play_card_g_pointer);
                    egret.Tween.get(this.new_send_play_card_g_pointer, { loop: true }).to({ y: this.new_send_play_card_g_pointer.y + 10 }, 400).to({ scaleY: .8, scaleX: 1.2 }, 100).wait(100).to({ y: this.new_send_play_card_g_pointer.y, scaleY: 1.1, scaleX: .9 }, 400).to({ y: this.new_send_play_card_g_pointer.y, scaleY: 1, scaleX: 1 }, 100);
                }
        }
    };
    //高亮提示某张牌
    Match_view.prototype.tips_self_choose_base_stop_card_num = function (code) {
        for (var i in this.user_card_list_views) {
            this.user_card_list_views[i].play_highlight(code);
        }
    };
    //顶部层 事件
    Match_view.prototype.set_up_layer_touch_event = function (bl) {
        this.v_to_v_dis_event(this.EVENT.room.set_up_layer_touch_event, bl);
    };
    /*------------------------------------操作层---------------------------------*/
    Match_view.prototype.init_cpgh_view = function () {
        this.cpgh_btn_view = new Cpgh_btn_list_view();
        this.addChild(this.cpgh_btn_view);
        this.cpgh_btn_view.v_to_v_add_event(this.EVENT.room.initiate_action, this.self_cpgh_card, this);
    };
    //更新玩家动作操作层
    Match_view.prototype.update_self_action_info = function (action_model_list) {
        //消除顶层事件
        this.set_up_layer_touch_event(true);
        //消除操作层事件
        this.cpgh_btn_view.clear_event();
        if (action_model_list) {
            if (action_model_list.length == 1) {
                if (Number(action_model_list[0].type) == this.CONST.PLAYER_ACTION.system_deal_card) {
                    //请求系统发牌
                    this.self_system_deal_card();
                }
                else if (Number(action_model_list[0].type) == this.CONST.PLAYER_ACTION.play_card) {
                    //玩家出牌
                    this.user_card_list_views[0]._is_send_card = true;
                }
                else if (Number(action_model_list[0].type) == this.CONST.PLAYER_ACTION.hua) {
                    //玩家自动出牌
                    this.user_card_list_views[0]._is_send_card = true;
                    this.auto_send_card();
                }
                else if (Number(action_model_list[0].type) == this.CONST.PLAYER_ACTION.hu) {
                    //海捞操作
                    this.cpgh_btn_view.update_btn_list(action_model_list);
                }
                else {
                    MyConsole.getInstance().trace("重大失误,未知的基础操作动作", 0);
                }
            }
            else if (action_model_list.length > 1) {
                //吃碰杠胡过操作
                this.cpgh_btn_view.update_btn_list(action_model_list);
                //牌层提示操作的牌
                this.user_card_list_views[0].tip_current_action_cpg_card(true);
            }
            else {
                MyConsole.getInstance().trace("重大失误,当前动作列表为空", 0);
            }
        }
    };
    //操作1-系统发牌操作
    Match_view.prototype.self_system_deal_card = function () {
        this.v_to_v_dis_event(this.EVENT.room.initiate_action, { player_action: this.CONST.PLAYER_ACTION.system_deal_card });
    };
    //操作2-玩家出牌操作
    Match_view.prototype.self_send_card = function (info) {
        this.user_card_list_views[0]._is_send_card = false;
        this.v_to_v_dis_event(this.EVENT.room.initiate_action, {
            player_action: this.CONST.PLAYER_ACTION.play_card,
            action: info.act_code
        });
    };
    //操作3-玩家执行吃碰杠操作
    Match_view.prototype.self_cpgh_card = function (action_model) {
        //消除----操作层事件
        this.cpgh_btn_view.clear_event();
        //消除---牌层提示操作的牌
        this.user_card_list_views[0].tip_current_action_cpg_card(false);
        //发起动作
        this.v_to_v_dis_event(this.EVENT.room.initiate_action, {
            player_action: action_model.type,
            action: action_model.code
        });
    };
    //tyq: 操作4-当前玩家自动出牌
    Match_view.prototype.auto_send_card = function () {
        this.user_card_list_views[0].auto_send_card();
    };
    /*------------------------------------混牌层---------------------------------*/
    Match_view.prototype.update_kai_hun_card = function (card_model) {
        if (card_model) {
            this.init_hun_card();
            this.hun_card_sp = new egret.Sprite();
            this.addChild(this.hun_card_sp);
            this.hun_card_view = new Base_card_view(card_model, 55);
            this.hun_card_sp.addChild(this.hun_card_view);
            this.hun_card_view.x = 15;
            this.hun_card_view.y = 74;
            //亮牌字
            var liang_txt = new egret.TextField();
            liang_txt.text = "亮\n牌";
            liang_txt.size = 22;
            liang_txt.x = 75;
            liang_txt.y = 89;
            this.hun_card_sp.addChild(liang_txt);
        }
    };
    Match_view.prototype.init_hun_card = function () {
        if (this.hun_card_sp) {
            this.removeChild(this.hun_card_sp);
        }
    };
    /*-------------------------------------回放层---------------------------------*/
    Match_view.prototype.add_playback = function (play_back_model) {
        //开始回放
        this.playback_view = new Playback_view(play_back_model);
        this.addChild(this.playback_view);
        this.playback_view.v_to_v_add_event(this.EVENT.room.play_back_home, this.play_back_home, this);
    };
    //渲染玩家动作
    Match_view.prototype.update_play_back_user_action_info = function (action_model_list) {
        this.playback_view.add_user_action_btn_icon(action_model_list);
    };
    //返回大厅
    Match_view.prototype.play_back_home = function () {
        this.playback_view.v_to_v_remove_event(this.EVENT.room.play_back_home, this.play_back_home, this);
        this.v_to_v_dis_event(this.EVENT.room.play_back_home);
    };
    return Match_view;
}(Base_view));
__reflect(Match_view.prototype, "Match_view");
//# sourceMappingURL=Match_view.js.map