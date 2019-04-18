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
var Game_room_control = (function (_super) {
    __extends(Game_room_control, _super);
    function Game_room_control(model) {
        var _this = _super.call(this, model, null) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        //更新视图
        _this.model.m_to_c_add_event(_this.EVENT.room.update_room_view, _this.cut_room_scene, _this);
        //新玩家加入
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_join, _this.flow_join, _this);
        //有人离开/解散/踢出房间
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_leave_room, _this.flow_leave_respond, _this);
        //动作回应-系统发牌
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_system_deal_card, _this.flow_action_system_deal, _this);
        //动作回应-玩家出牌
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_send_card, _this.flow_action_play_card, _this);
        //动作回应-玩家吃
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_chi_card, _this.flow_action_chi, _this);
        //动作回应-玩家碰
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_peng_card, _this.flow_action_peng, _this);
        //动作回应-玩家杠
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_gang_card, _this.flow_action_gang, _this);
        //动作回应-玩家胡
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_hu_card, _this.flow_action_hu, _this);
        //动作回应-玩家过
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_guo_card, _this.flow_action_guo, _this);
        //动作回应-流局
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_lj_card, _this.flow_action_liuju, _this);
        //小结算回应
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_xjs, _this.flow_account, _this);
        //大结算回应
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_djs, _this.flow_over, _this);
        //小结算准备回应
        _this.model.m_to_c_add_event(_this.EVENT.room.m_c_user_prepared, _this.flow_account_wait, _this);
        //在线状态变化
        _this.model.m_to_c_add_event(_this.EVENT.room.user_line_status_change, _this.float_alert, _this);
        //房间申请解散房间回应
        _this.model.m_to_c_add_event(_this.EVENT.room.r_room_dissolution_room, _this.dissolution_room_pop, _this);
        //获取到定位数据
        _this.model.m_to_c_add_event(_this.EVENT.room_popup.location, _this.add_room_location_pop, _this);
        //获取接收到的聊天数据
        _this.model.m_to_c_add_event(_this.EVENT.room.r_player_chat_status, _this.r_player_chat_status, _this);
        //改变房卡数量;
        _this.model.m_to_c_add_event(_this.EVENT.room.r_change_money, _this.change_money, _this);
        //回放中途结束
        _this.model.m_to_c_add_event(_this.EVENT.base.playback_half_over, _this.play_back_half_over, _this);
        //解散房间-》同意or拒绝
        _this.c_to_c_add_radio_event(_this.EVENT.room_popup.is_agree_diss_room, _this.dissolution_room_responses, _this);
        //解散房间成功-》请求大结算
        _this.c_to_c_add_radio_event(_this.EVENT.room_popup.sponsor_DJS, _this.dissolution_room_ok, _this);
        //设置弹框-》申请解散房间
        _this.c_to_c_add_radio_event(_this.EVENT.room_popup.sponsor_dissolve_room, _this.dissolution_room_request, _this);
        //聊天弹框-》发送聊天
        _this.c_to_c_add_radio_event(_this.EVENT.room_popup.sponsor_chat, _this.sponsor_chat, _this);
        //小结算弹框-》发起准备
        _this.c_to_c_add_radio_event(_this.EVENT.room_popup.XJS_wait_ok, _this.flow_account_wait_request, _this);
        return _this;
    }
    //-------------------------------初始化视图/断线重连渲染视图---------------------------
    //添加视图
    Game_room_control.prototype.add_view = function () {
        this.remove_view();
        this.view = new Room_view(this.model.user_group_model);
        _super.prototype.add_view.call(this);
        //离开/解散房间
        this.view.v_to_v_add_event(this.EVENT.room.leave_room, this.flow_leave, this);
        //房主踢人
        this.view.v_to_v_add_event(this.EVENT.room_popup.kicking_user, this.kicking_user_popup, this);
        //发起开局
        this.view.v_to_v_add_event(this.EVENT.room.start_game, this.flow_sponsor_start, this);
        //发起动作
        this.view.v_to_v_add_event(this.EVENT.room.initiate_action, this.initiate_action, this);
        //分享弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.share, this.add_share_pop, this);
        //个人信息弹框
        this.view.v_to_v_add_event(this.EVENT.popup.user_info_pop, this.add_user_info_pop, this);
        //设置弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.setup_popup, this.add_room_setting_pop, this);
        //聊天弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.chitchat, this.add_room_chitchat_pop, this);
        //规则弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.rule, this.add_room_rule_pop, this);
        //定位弹框
        this.view.v_to_v_add_event(this.EVENT.room_popup.location, this.get_location_info, this);
        //回放返回大厅
        this.view.v_to_v_add_event(this.EVENT.room.play_back_home, this.play_back_home, this);
        this.cut_room_scene("loadingOk");
        //回放开始表演
        if (this.CONST.PLAYBACK_MODEL) {
            this.model.start_play_back();
        }
    };
    //创建回放
    Game_room_control.prototype.set_play_back_info = function (file_url, share_user_id, back_fun) {
        this.model.set_play_back_info(file_url, share_user_id, back_fun);
    };
    /***
     * 切换场景
     * tyq: 直接去切换场景---》 *缺人场景 *牌局中（打牌过程中）场景   *等待（一小局结束）场景
     * type=relink 大接口刷新
     * type=loadingOk 资源加载完成的时候
     * type=pufen  从准备界面 流程化跳转铺分
     * type=play 从铺分/准备/等待界面 流程化跳转游戏
     * type=prepare  从游戏界面 流程化跳转等待
     * @param type
     */
    Game_room_control.prototype.cut_room_scene = function (type) {
        if (type === void 0) { type = "relink"; }
        //判断加载完毕 再去切换场景
        if (this.model.room_load_state == this.CONST.ROOM_LOAD_STATUS.LOAD_OK) {
            //不同场景静态视图
            switch (this.model.room_state) {
                case this.CONST.ROOM_STATUS.SHORT_BOARD:
                    MyConsole.getInstance().trace("-----》切换-缺人场景视图-room_control", "custom1");
                    this.view.init_wait_scene(this.model.get_wait_state_info()); //切换场景
                    break;
                case this.CONST.ROOM_STATUS.PLAY:
                    MyConsole.getInstance().trace("-----》切换-牌局场景视图-room_control", "custom1");
                    this.view.init_game_scene(this.model.user_group_model); //切换场景
                    break;
                case this.CONST.ROOM_STATUS.PREPARE:
                    MyConsole.getInstance().trace("-----》切换-等待场景视图-room_control", "custom1");
                    this.view.init_prepare_scene(); //切换场景
                    break;
                case this.CONST.ROOM_STATUS.INIT:
                    MyConsole.getInstance().trace("-----》切换-room-初始场景视图-不做处理", "custom1");
                    break;
                default:
                    MyConsole.getInstance().trace("重大失误，当前房间状态没有这个奇葩状态" + this.model.room_state, 0);
                    break;
            }
            //更新动态视图
            this.change_view(type);
        }
    };
    /**更新场景
     * zpb:切换场景完毕后 处理动态视图
     * type=relink 大接口刷新   type=loadingOk 资源加载完成的时候
     **/
    Game_room_control.prototype.change_view = function (type) {
        if (!this.checkout_room_state())
            return;
        //----根据不同场景 处理各自需要处理的数据
        var base_info = this.model.get_base_info();
        switch (this.model.room_state) {
            case this.CONST.ROOM_STATUS.SHORT_BOARD:
                MyConsole.getInstance().trace("-----》检测-缺人场景--动态视图-room_control-" + type, "custom1");
                //第1步----更新桌面基础信息
                this.view.update_bg_base_view(base_info.room_id, base_info.game_num, base_info.game_max_num, null); //1.0版本
                //第2步----更新玩家基础信息
                //this.model.set_zhuang_player();//设置庄玩家   //tyq：临时屏蔽看效果  1.0版本
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第3步-----新加入的玩家 状态从 in切换到 PREPARED
                this.model.shoart_board_loading_ok_change_player_status();
                //第4步-----更新开局按钮
                this.view.update_start_btn(this.model.judge_player_together());
                //第5步-----更新房主踢人按钮
                this.model.set_houseOwner_tiren();
                //第6步-----检测IP冲突
                this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                //第7步-----发送定位信息
                this.model.send_location_info();
                //第8步----设置分享
                this.model.set_game_share();
                break;
            case this.CONST.ROOM_STATUS.PLAY:
                MyConsole.getInstance().trace("-----》检测-牌局场景--动态视图-room_control-" + type, "custom1");
                //第1步----更新桌面基础信息
                this.view.update_bg_base_view(base_info.room_id, base_info.game_num, base_info.game_max_num, base_info.self_location);
                //第2步----更新玩家基础信息
                this.model.set_zhuang_player(); //设置庄玩家
                this.model.set_new_deal_card_user(); //tyq: 设置最新的发牌人
                this.model.set_new_send_card_user(); //设置最新出牌人
                this.view.update_user_base_view();
                //第3步----更新当前动作人/上个动作人 信息
                this.model.set_action_info();
                if (type == "play") {
                    //房主踢人按钮--隐藏
                    this.model.set_houseOwner_tiren();
                    //动画
                    this.gameing_ani();
                }
                else if (type == "relink" || type == "loadingOk") {
                    //小1----更新混牌显示--此时玩家的手牌才进行排序
                    this.view.update_kai_hun_card(this.model.get_kai_hun_info());
                    //小2----更新玩家牌显示---手牌 吃碰杠牌 桌牌 最新手牌 最新桌牌
                    this.view.update_all_user_card(true);
                    //小3----更新当前动作人风向
                    this.view.update_current_location(this.model.get_current_action_user_position("relink"));
                    //小4----更新剩余牌
                    this.view.update_surplus_card_num(this.model.get_residue_pai_num());
                    //小5-----回放
                    if (this.CONST.PLAYBACK_MODEL)
                        this.view.game_start_playback(this.model.play_back_model);
                    //小6----检索自己动作人操作视图
                    this.view.update_self_action_btn_list(this.model.get_self_current_action());
                    if (type == "loadingOk") {
                        //小5-----解散房间检测
                        this.dissolution_room_pop();
                        //小6-----检测IP冲突
                        this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                        //小7-----发送定位信息
                        this.model.send_location_info();
                        //小8----设置分享
                        this.model.set_game_share();
                    }
                }
                break;
            case this.CONST.ROOM_STATUS.PREPARE:
                MyConsole.getInstance().trace("-----》检测-等待场景--动态视图-room_control-" + type, "custom1");
                //第1步----更新桌面基础信息
                this.view.update_bg_base_view(base_info.room_id, base_info.game_num, base_info.game_max_num, base_info.self_location);
                //第2步----更新玩家基础信息
                this.model.set_zhuang_player(); //设置不显示庄玩家
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第3步----更新风向-不显示风向
                this.view.update_current_location(5);
                //第4步---更新剩余牌
                this.view.update_surplus_card_num("0");
                //第5步-----如果玩家在小结算弹窗 刷新那么断线重连后 要主动发起一次准备ok 状态从 game切换到 PREPARED
                this.model.prepare_loading_ok_change_player_status();
                if (type == "loadingOk") {
                    //小5-----解散房间检测
                    this.dissolution_room_pop();
                    //小6-----检测IP冲突
                    this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                    //小7-----发送定位信息
                    this.model.send_location_info();
                }
                break;
            default:
                MyConsole.getInstance().trace("重大失误,没有奇葩状态游戏层->房间场景->房间状态" + this.model.room_state, 0);
                break;
        }
    };
    //牌局中-----动画
    Game_room_control.prototype.gameing_ani = function () {
        //开场动画
        MyConsole.getInstance().trace("->>开场动画");
        this.c_to_c_event_radio(this.EVENT.room_ani.start_ani, function () {
            //发牌动画
            MyConsole.getInstance().trace("->>发牌动画");
            this.view.game_send_card_ani(function () {
                //开混动画
                MyConsole.getInstance().trace("->>开混动画");
                this.c_to_c_event_radio(this.EVENT.room_ani.kai_hun_ani, {
                    hunPai_model: this.model.get_kai_hun_info(),
                    back_fun: function () {
                        //正式开局
                        this.flow_game_start();
                    }.bind(this)
                });
            }.bind(this));
        }.bind(this));
    };
    //牌局中-----开局补花动画
    Game_room_control.prototype.start_flower_ani = function () {
        var ani_info = {};
        ani_info["ani_list"] = this.model.get_hua_ani_info();
        if (ani_info["ani_list"]) {
            setTimeout(function () {
                MyConsole.getInstance().trace("->>开局补花动画");
                this.view.update_all_user_card(false, this.CONST.CARD_TYPE.base_stop);
                ani_info["back_func"] = function () {
                    this.view.update_all_user_card(false, this.CONST.CARD_TYPE.hua_card);
                    this.model.reset_all_user_real_card();
                    this.view.update_all_user_card(false, this.CONST.CARD_TYPE.base_stop);
                    //第4步---更新剩余牌
                    this.view.update_surplus_card_num(this.model.get_residue_pai_num());
                    //小5----检索自己动作人操作视图
                    this.view.update_self_action_btn_list(this.model.get_self_current_action());
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.start_flower_ani, ani_info);
            }.bind(this), 2000);
        }
        else {
            //小5----检索自己动作人操作视图
            this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    };
    //-------------------------------游戏整体流程---------------------------
    //1.1新人加入房间
    Game_room_control.prototype.flow_join = function (info) {
        if (!this.checkout_room_state())
            return;
        if (info.type == 1) {
            //第1步---更新新玩家头像信息
            this.view.update_user_base_view(this.model.get_user_wait_info_list());
            //第2步---IP冲突提示
            this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
            //第3步----设置分享
            this.model.set_game_share();
            //第4步---加入房间提示
            this.float_alert({ type: "join", name: info.user_name });
        }
        else if (info.type == 2) {
            //第1步----更新玩家基础信息
            this.view.update_user_base_view(this.model.get_user_wait_info_list());
            //第2步---房主踢人按钮显示
            this.model.set_houseOwner_tiren();
            //第3步-----更新开局按钮
            this.view.update_start_btn(this.model.judge_player_together());
        }
    };
    //2.退出/离开房间---发起
    Game_room_control.prototype.flow_leave = function () {
        if (!this.checkout_room_state())
            return;
        if (this.model.get_user_is_hose()) {
            //解散房间
            this.c_to_c_event_radio(this.EVENT.base_popup.hint, { str: "当前解散房间，不消耗房卡,!", back_fun: function () {
                    //第2步---回大厅
                    this.model.leave_room();
                }.bind(this), _isAddCloseBtn: true });
        }
        else {
            this.model.leave_room(); //离开房间
        }
    };
    //2.1退出/离开/解散房间---回应
    Game_room_control.prototype.flow_leave_respond = function (info) {
        switch (Number(info.type)) {
            case 1:
                this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                break;
            case 3:
                this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                break;
            case 7:
                this.c_to_c_event_radio(this.EVENT.base_popup.hint, { str: "该房间已被房主解散!", back_fun: function () {
                        //第2步---回大厅
                        this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                    }.bind(this), _isAddCloseBtn: false });
                break;
            case 2:
                if (!this.checkout_room_state())
                    return;
                //第1步---更新新玩家头像信息
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第2步---房主踢人按钮显示
                this.model.set_houseOwner_tiren();
                //第3步-----更新开局按钮
                this.view.update_start_btn(this.model.judge_player_together());
                //第4步---IP冲突提示
                this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                //第5步----设置分享
                this.model.set_game_share();
                //第6步---提示玩家离开 info.user_name
                this.float_alert({ type: "leave", name: info.user_name });
                break;
            case 4:
                //第1步---弹窗提示
                this.c_to_c_event_radio(this.EVENT.base_popup.hint, { str: "该房间已被房主解散!", back_fun: function () {
                        //第2步---回大厅
                        this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                    }.bind(this), _isAddCloseBtn: false });
                break;
            case 5:
                //第1步---弹窗提示
                this.c_to_c_event_radio(this.EVENT.base_popup.hint, { str: "您已被房主踢出本房间!", back_fun: function () {
                        //第2步---回大厅
                        this.c_to_c_dis_event(this.EVENT.game.game_back_hall_scene);
                    }.bind(this), _isAddCloseBtn: false });
                break;
            case 6:
                if (!this.checkout_room_state())
                    return;
                //第1步---更新新玩家头像信息
                this.view.update_user_base_view(this.model.get_user_wait_info_list());
                //第2步---房主踢人按钮显示
                this.model.set_houseOwner_tiren();
                //第3步-----更新开局按钮
                this.view.update_start_btn(this.model.judge_player_together());
                //第4步---IP冲突提示
                this.view.update_ip_conflict_tip(this.model.get_ip_conflict_tip());
                //第5步----设置分享
                this.model.set_game_share();
                //第6步---提示玩家离开 info.user_name
                this.float_alert({ type: "kickout", name: info.user_name });
                break;
            default:
                MyConsole.getInstance().trace("重大失误 解散房间最终结果 类型不存在" + info.type, 0);
                break;
        }
    };
    //3.房主开局---发起---回应之后--切换铺分/游戏场景
    Game_room_control.prototype.flow_sponsor_start = function () {
        if (!this.checkout_room_state())
            return;
        this.model.user_sponsor_wait();
    };
    //4.开局
    Game_room_control.prototype.flow_game_start = function () {
        if (!this.checkout_room_state())
            return;
        //小1----更新混牌显示
        this.view.update_kai_hun_card(this.model.get_kai_hun_info());
        //小2----更新玩家牌显示---手牌 吃碰杠牌 桌牌 最新手牌 最新桌牌
        this.view.update_all_user_card(true, 0, this.CONST.CARD_TYPE.hua_card);
        //小3----更新当前动作人风向
        this.view.update_current_location(this.model.get_current_action_user_position());
        //小4----更新剩余牌
        this.view.update_surplus_card_num(this.model.get_residue_pai_num());
        //小5----开局补花动画
        this.start_flower_ani();
    };
    //5.动作-发起
    Game_room_control.prototype.initiate_action = function (action_info) {
        MyConsole.getInstance().trace("--->发起动作");
        switch (action_info.player_action) {
            case this.CONST.PLAYER_ACTION.system_deal_card:
                //直接请求数据
                this.model.request_system_deal_card();
                break;
            case this.CONST.PLAYER_ACTION.play_card:
                MyConsole.getInstance().trace("--->出牌");
                //第1步----处理牌数据
                var _is_hua = Base_card_model.act_code_get_info(action_info.action).type == this.CONST.PLAYER_ACTION.hua;
                this.model.delete_user_card(null, action_info.action, action_info.action, _is_hua);
                //第2步----更新自己为上个动作人
                this.model.set_self_last_chuPai_user(); //预设最新出牌人
                this.model.set_self_last_action(action_info.action);
                //第3步----提前处理视图
                this.flow_action_play_card({ type: "self", card_start_point: action_info.point, act_code: action_info.action, is_hua: _is_hua });
                //第4步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.chi:
                MyConsole.getInstance().trace("--->吃");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_chi({ type: "self" });
                //第3步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.peng:
                MyConsole.getInstance().trace("--->碰");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_peng({ type: "self" });
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.gang: //杠
            case this.CONST.PLAYER_ACTION.an_gang:
                MyConsole.getInstance().trace("--->杠");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_gang({ type: "self" });
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.guo:
                MyConsole.getInstance().trace("--->过");
                //第1步----更新自己为上个动作人
                this.model.set_self_last_action(action_info.action);
                //第2步----提前处理视图
                this.flow_action_guo({ type: "self" });
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            case this.CONST.PLAYER_ACTION.hu:
                MyConsole.getInstance().trace("--->胡");
                //第2步----请求
                this.model.request_player_action(action_info.action);
                break;
            default:
                MyConsole.getInstance().trace("--->当前动作还没做处理，game_room_control" + action_info.player_action, 0);
                break;
        }
    };
    //5.1动作-系统发牌
    Game_room_control.prototype.flow_action_system_deal = function (info) {
        if (!this.checkout_room_state())
            return;
        var deal_user_is_self = info.deal_user_is_self; //被发牌人是否是自己
        //第1步----更新当前动作人/上个动作人 信息
        this.model.set_action_info();
        //第2步---更新玩家牌信息
        this.view.update_all_user_card();
        //第3步---更新当前动作人风向
        this.view.update_current_location(this.model.get_current_action_user_position());
        //第4步---更新剩余牌
        this.view.update_surplus_card_num(this.model.get_residue_pai_num());
        //第5步---检索自己动作人操作视图
        if (!info._is_liu_ju)
            this.view.update_self_action_btn_list(this.model.get_self_current_action());
        if (!info.is_hua && deal_user_is_self) {
            //第6步---提示出牌操作动画
            this.c_to_c_event_radio(this.EVENT.room_ani.tips_send_card_ani, this.model.get_tips_card_ani_bl());
            //更新系统剩余牌---测试系统用
            this.model.update_systemSendCard();
        }
    };
    //5.2动作-玩家出牌
    Game_room_control.prototype.flow_action_play_card = function (info) {
        if (!this.checkout_room_state())
            return;
        var type = info.type;
        var act_code = info.act_code; //牌
        if (type == "self") {
            MyConsole.getInstance().trace("--->自己_出牌1");
            //为了达到良好的交互体验
            //其他玩家的动作视图刷新在收到动作回应之后  自己发起的动作在发起之前就开始做视图处理了
            //小1设置最新出牌人
            this.model.set_new_send_card_user();
            //小2更新手牌
            this.view.update_all_user_card(false, this.CONST.CARD_TYPE.base_stop);
            if (!info.is_hua) {
                //小3播放出牌动画
                var send_card_info = this.model.get_last_action_send_card_info(act_code);
                send_card_info.back_fun = function () {
                    //小3更新桌牌
                    this.view.update_all_user_card(false, this.CONST.CARD_TYPE.play);
                    //他自己出牌后自己不会有任何动作 所以不用检索
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.user_send_card, send_card_info);
            }
            else {
                var info = this.model.get_last_action_cpgh_ani_info();
                info.back_fun = function () {
                    this.view.update_all_user_card(false, this.CONST.CARD_TYPE.hua_card);
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, info);
            }
        }
        else if (type == "accept_self") {
            MyConsole.getInstance().trace("--->自己_出牌2");
            //小1立即删除老的提示动画
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips, null);
            //小2更新风向
            this.view.update_current_location(this.model.get_current_action_user_position()); //小7---检索自己动作人操作视图
            if (!info._is_liu_ju)
                this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
        else {
            MyConsole.getInstance().trace("--->别人_出牌");
            //小1---更新手牌
            this.view.update_all_user_card(false, this.CONST.CARD_TYPE.base_stop);
            //小2---立即删除老的提示动画
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips, null);
            //tyq: 动画结束后
            if (!info.is_hua) {
                //小3---播放出牌动画
                var send_card_info = this.model.get_last_action_send_card_info(act_code);
                send_card_info.back_fun = function () {
                    //小3------设置最新出牌人
                    this.model.set_new_send_card_user();
                    //小4-----更新当前动作人手牌和桌牌
                    this.view.update_all_user_card(false, this.CONST.CARD_TYPE.play);
                    //小5---更新风向
                    this.view.update_current_location(this.model.get_current_action_user_position());
                    //小6----提示牌动画  -1当前玩家有操作 不消失
                    if (!info.is_hua) {
                        send_card_info.remove_time = this.model.get_self__is_cpg_action() ? -1 : 2000; //消失时间
                        this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips, send_card_info);
                    }
                    //小7---检索自己动作人操作视图
                    if (!info._is_liu_ju)
                        this.view.update_self_action_btn_list(this.model.get_self_current_action());
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.user_send_card, send_card_info);
            }
            else {
                var info = this.model.get_last_action_cpgh_ani_info();
                info.back_fun = function () {
                    //小3------设置最新出牌人
                    this.model.set_new_send_card_user();
                    //小4-----更新当前动作人手牌和桌牌
                    this.view.update_all_user_card(false, this.CONST.CARD_TYPE.hua_card);
                    //小5---更新风向
                    this.view.update_current_location(this.model.get_current_action_user_position());
                    //小7---检索自己动作人操作视图
                    if (!info._is_liu_ju)
                        this.view.update_self_action_btn_list(this.model.get_self_current_action());
                }.bind(this);
                this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, info);
            }
        }
    };
    //5.3动作-玩家吃
    Game_room_control.prototype.flow_action_chi = function (info) {
        if (!this.checkout_room_state())
            return;
        var type = info.type;
        if (type == "self") {
            MyConsole.getInstance().trace("--->自己_吃1");
            //大牌提示动画消失
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, this.model.get_last_action_cpgh_ani_info());
        }
        else if (type == "accept_self") {
            MyConsole.getInstance().trace("--->自己_吃2");
            //小1设置最新出牌人
            this.model.set_new_send_card_user();
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图
            if (!info._is_liu_ju)
                this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
        else {
            //小1-----播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, this.model.get_last_action_cpgh_ani_info());
            //小2设置最新出牌人
            this.model.set_new_send_card_user();
            //小3-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小4---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
        }
    };
    //5.4动作-玩家碰
    Game_room_control.prototype.flow_action_peng = function (info) {
        if (!this.checkout_room_state())
            return;
        var type = info.type;
        var position = info.position; //方位
        if (type == "self") {
            MyConsole.getInstance().trace("--->自己_碰1");
            //大牌提示动画消失
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, this.model.get_last_action_cpgh_ani_info());
        }
        else if (type == "accept_self") {
            MyConsole.getInstance().trace("--->自己_碰2");
            //小1设置最新出牌人
            this.model.set_new_send_card_user();
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图
            if (!info._is_liu_ju)
                this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
        else {
            MyConsole.getInstance().trace("--->别人_碰");
            //小1-----播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, this.model.get_last_action_cpgh_ani_info());
            //小2设置最新出牌人
            this.model.set_new_send_card_user(); //设置最新出牌人
            //小3-----更新当前动作人手牌和 上个出牌人桌牌
            this.view.update_all_user_card(false);
            //小4---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小5---检索自己动作人操作视图---别人不会有动作--回放恢复
            this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    };
    //5.5.动作-玩家杠
    Game_room_control.prototype.flow_action_gang = function (info) {
        if (!this.checkout_room_state())
            return;
        var type = info.type;
        var position = info.position; //方位
        if (type == "self") {
            MyConsole.getInstance().trace("--->自己_杠1");
            //大牌提示动画消失
            this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, this.model.get_last_action_cpgh_ani_info());
        }
        else if (type == "accept_self") {
            MyConsole.getInstance().trace("--->自己_杠2");
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.model.set_new_send_card_user(); //设置最新出牌人
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图
            if (!info._is_liu_ju)
                this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
        else {
            MyConsole.getInstance().trace("--->别人_杠");
            //小1-----播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, this.model.get_last_action_cpgh_ani_info());
            //小2-----更新当前动作人手牌和 上个出牌人桌牌
            this.model.set_new_send_card_user(); //设置最新出牌人
            this.view.update_all_user_card(false);
            //小3---更新当前动作人风向
            this.view.update_current_location(this.model.get_current_action_user_position());
            //小4---检索自己动作人操作视图----抢杠胡
            if (!info._is_liu_ju)
                this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    };
    //5.6.动作-玩家胡--------衔接发起小结算
    Game_room_control.prototype.flow_action_hu = function (info) {
        if (!this.checkout_room_state())
            return;
        //大牌提示动画消失
        this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips);
        //播放动画
        var ani_info = this.model.get_last_action_cpgh_ani_info();
        ani_info.hu_base_type = info.hu_base_type;
        ani_info.position = info.position; //点炮和自摸风向不固定
        ani_info.back_fun = function () {
            //请求小结算
            if (info.state && info.state == this.CONST.ROOM_STATUS.PREPARE)
                this.model.request_account();
            else
                MyConsole.getInstance().trace("胡动画之后没有请求小结算,因为state不对", 0);
        }.bind(this);
        this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, ani_info);
    };
    //5.7动作-过
    Game_room_control.prototype.flow_action_guo = function (info) {
        if (!this.checkout_room_state())
            return;
        var type = info.type;
        if (type == "self") {
            MyConsole.getInstance().trace("--->自己_过1");
            //播放动画
            this.c_to_c_event_radio(this.EVENT.room_ani.cpgh_ani, this.model.get_last_action_cpgh_ani_info());
        }
        else if (type == "accept_self") {
            MyConsole.getInstance().trace("--->自己_过2");
            //小4---检索自己动作人操作视图
            if (!info._is_liu_ju)
                this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
        else {
            MyConsole.getInstance().trace("--->别人_过");
            //小4---检索自己动作人操作视图
            if (!info._is_liu_ju)
                this.view.update_self_action_btn_list(this.model.get_self_current_action());
        }
    };
    //5.8流局
    Game_room_control.prototype.flow_action_liuju = function () {
        if (!this.checkout_room_state())
            return;
        MyConsole.getInstance().trace("--->流局");
        //立即删除老的提示大牌动画
        this.c_to_c_event_radio(this.EVENT.room_ani.max_card_tips, null);
        //播放动画
        this.c_to_c_event_radio(this.EVENT.room_ani.liu_ju_ani, {
            back_fun: function () {
                //请求小结算
                this.model.request_account();
            }.bind(this)
        });
    };
    //6.小结算---回应
    Game_room_control.prototype.flow_account = function (model) {
        if (!this.checkout_room_state())
            return;
        //第1步----更新桌面基础信息
        var base_info = this.model.get_base_info();
        this.view.update_bg_base_view(null, base_info.game_num, base_info.game_max_num, null);
        //第2步----更新风向-不显示风向
        this.view.update_current_location(-1);
        //第3步----更新剩余牌
        this.view.update_surplus_card_num(0);
        //弹出窗
        this.c_to_c_event_radio(this.EVENT.room_to_pop.add_xjs_pop, model);
    };
    //6.1小结算准备---发起----衔接发起大结算  ---回放结束 点击继续结束 点击home返回大厅
    Game_room_control.prototype.flow_account_wait_request = function () {
        if (this.CONST.PLAYBACK_MODEL) {
            this.play_back_home();
        }
        else {
            if (this.model.get_last_game_num() > 0) {
                if (this.model.room_state == this.CONST.ROOM_STATUS.PLAY || this.model.room_state == this.CONST.ROOM_STATUS.PREPARE) {
                    this.model.user_sponsor_wait("cut_scene");
                }
                else {
                    MyConsole.getInstance().trace("小结算发起准备,此时房间状态不对-" + this.model.room_state, 0);
                }
            }
            else {
                //发起大结算
                this.flow_DJS_request();
            }
        }
    };
    //6.2.小结算准备
    Game_room_control.prototype.flow_account_wait = function () {
        if (!this.checkout_room_state())
            return;
        //第1步----更新玩家基础信息
        this.model.set_zhuang_player(); //设置庄玩家
        this.view.update_user_base_view(this.model.get_user_wait_info_list());
    };
    //7.1大结算----发起
    Game_room_control.prototype.flow_DJS_request = function () {
        this.model.request_djs();
    };
    //7.2大结算----回应
    Game_room_control.prototype.flow_over = function (DJS_model) {
        if (!this.checkout_room_state())
            return;
        this.c_to_c_event_radio(this.EVENT.room_popup.add_djs_pop, DJS_model);
    };
    //回放结束-返回大厅
    Game_room_control.prototype.play_back_home = function () {
        this.model.clear_play_back_info();
        //返回大厅
        setTimeout(function () {
            this.c_to_c_event_radio(this.EVENT.game.game_play_back_hall_scene);
        }.bind(this), 100);
    };
    //回放中途停止
    Game_room_control.prototype.play_back_half_over = function () {
        this.c_to_c_event_radio(this.EVENT.base_popup.hint, { str: "回放已结束，请返回大厅!", back_fun: function () {
                this.play_back_home();
            }.bind(this), _isAddCloseBtn: false });
    };
    //-------------------------------弹窗---------------------------
    //分享弹框
    Game_room_control.prototype.add_share_pop = function () {
        this.c_to_c_event_radio(this.EVENT.room_popup.share_popup);
    };
    //设置弹框
    Game_room_control.prototype.add_room_setting_pop = function () {
        //tyq: 只有开局后，才能通过设置弹框发起解散
        var _is_show_kill_btn = (this.model.room_state != this.CONST.ROOM_STATUS.SHORT_BOARD && this.model.room_state != this.CONST.ROOM_STATUS.INIT);
        this.c_to_c_event_radio(this.EVENT.room_popup.setup_popup, _is_show_kill_btn);
    };
    //聊天弹框
    Game_room_control.prototype.add_room_chitchat_pop = function () {
        if (!this.checkout_room_state())
            return; //zwb修改:需求说开局前也开放聊天功能  2018.5.15.19:47
        this.c_to_c_event_radio(this.EVENT.room_popup.chitchat);
        // //tyq: 开局后，再开放聊天功能
        // if(this.model.room_state!=this.CONST.ROOM_STATUS.SHORT_BOARD && this.model.room_state!=this.CONST.ROOM_STATUS.INIT){
        //     this.c_to_c_event_radio(this.EVENT.room_popup.chitchat);
        // }
    };
    //发起聊天
    Game_room_control.prototype.sponsor_chat = function (data) {
        this.model.send_player_chat_status(data);
    };
    //接受---》聊天数据
    Game_room_control.prototype.r_player_chat_status = function (info) {
        this.c_to_c_event_radio(this.EVENT.room_ani.play_chat_ani, info);
    };
    //规则-弹框
    Game_room_control.prototype.add_room_rule_pop = function (info) {
        if (!this.checkout_room_state())
            return;
        var rule_str = this.model.get_wait_state_info().rule_tips;
        info.str = rule_str.replace(/,/g, "\r\n");
        this.c_to_c_event_radio(this.EVENT.room_popup.add_rule_pop, info);
    };
    //获取定位信息
    Game_room_control.prototype.get_location_info = function () {
        this.model.get_location_info();
    };
    //定位弹框
    Game_room_control.prototype.add_room_location_pop = function (location_model) {
        if (!this.checkout_room_state())
            return;
        this.c_to_c_event_radio(this.EVENT.room_popup.location, location_model);
    };
    //解散房间pop1.1-----发起
    Game_room_control.prototype.dissolution_room_request = function () {
        //在这里获取roomId和userId;
        var data = { roomId: this.model.get_roomId(), userId: this.CONST.USERID };
        this.model.send_room_dissolution_room(data);
    };
    //解散房间pop1.2-----回应
    Game_room_control.prototype.dissolution_room_pop = function () {
        var dis_model = this.model.get_dissolveRoom_model();
        if (dis_model && this.model.room_state != this.CONST.ROOM_STATUS.SHORT_BOARD) {
            this.c_to_c_event_radio(this.EVENT.room_popup.r_room_dissolution_room, dis_model);
        }
    };
    //解散房间pop1.3----同意or拒绝
    Game_room_control.prototype.dissolution_room_responses = function (num) {
        this.model.send_room_is_diss_room(num);
    };
    //解散房间pop1.4----成功
    Game_room_control.prototype.dissolution_room_ok = function () {
        //发起大结算
        this.flow_DJS_request();
    };
    //个人信息pop
    Game_room_control.prototype.add_user_info_pop = function (user_id) {
        var model = this.model.room_user_id_get_user_model(user_id);
        // 获取个人信息所需要的数据;
        var user_info = {
            "userId": model.userId,
            "userName": model.userName,
            "userImg": model.userImg,
            "userIp": model.ip,
            "userMoney": model.money,
            "gender": model.gender
        };
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.look_user_info, user_info);
    };
    //改变房卡数量;
    Game_room_control.prototype.change_money = function (num) {
        this.c_to_c_event_radio(this.EVENT.room_to_hall.room_change_money, num);
    };
    //房主踢人
    Game_room_control.prototype.kicking_user_popup = function (info) {
        //1.第一步弹窗框
        this.c_to_c_event_radio(this.EVENT.base_popup.hint, { str: "确定要移出" + info.user_name + "吗!", back_fun: function () {
                //2.走接口
                this.model.kicking_user(info.userId);
            }.bind(this), _isAddCloseBtn: true });
    };
    //zpb:浮层提示框
    Game_room_control.prototype.float_alert = function (info) {
        var tipStr;
        switch (info.type) {
            case "leave":
                tipStr = "玩家 <font color='#ff0000'>" + info.name + "</font> 离开房间";
                break;
            case "kickout":
                tipStr = "玩家 <font color='#ff0000'>" + info.name + "</font> 被踢出房间";
                break;
            case "join":
                tipStr = "玩家 <font color='#ffff00'>" + info.name + "</font> 加入房间";
                break;
            case "online_2":
                tipStr = "玩家 <font color='#ff0000'>" + info.name + "</font> 掉线";
                break;
            case "online_1":
                tipStr = "玩家 <font color='#ffff00'>" + info.name + "</font> 上线";
                break;
        }
        if (tipStr)
            this.c_to_c_event_radio(this.EVENT.base.base_float_alert, { str: tipStr });
    };
    //--------------------------------------------------------------------
    //校验视图场景
    Game_room_control.prototype.checkout_room_state = function () {
        if (this.model.room_load_state == this.CONST.ROOM_LOAD_STATUS.LOAD_OK)
            return true;
        return false;
    };
    //移除视图
    Game_room_control.prototype.remove_view = function () {
        _super.prototype.remove_view.call(this);
    };
    return Game_room_control;
}(Base_control));
__reflect(Game_room_control.prototype, "Game_room_control");
//# sourceMappingURL=Game_room_control.js.map