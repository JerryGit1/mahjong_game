var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 游戏中（房间内）场景
 */
var Room_view = (function (_super) {
    __extends(Room_view, _super);
    function Room_view(user_group_model) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        _this.init_view(user_group_model);
        return _this;
    }
    //初始化视图
    Room_view.prototype.init_view = function (user_group_model) {
        //-------------背景层
        this.bg_layer_view = new Room_bg_view();
        this.addChild(this.bg_layer_view);
        //-------------场景层
        this.scene_layer_sp = new egret.Sprite();
        this.addChild(this.scene_layer_sp);
        //-------------头像层
        this.up_layer_view = new Room_heads_view(user_group_model);
        this.addChild(this.up_layer_view);
        //事件
        this.up_layer_view.v_to_v_add_event(this.EVENT.room_popup.setup_popup, this.add_setting_popup, this);
        this.up_layer_view.v_to_v_add_event(this.EVENT.room_popup.location, this.add_location_popup, this);
        this.up_layer_view.v_to_v_add_event(this.EVENT.room_popup.chitchat, this.add_chitchat_popup, this);
        this.up_layer_view.v_to_v_add_event(this.EVENT.room_popup.rule, this.add_rule_popup, this); //规则按钮回调;
        this.up_layer_view.v_to_v_add_event(this.EVENT.room_popup.kicking_user, this.add_kicking_user_popup, this);
        this.up_layer_view.v_to_v_add_event(this.EVENT.room_popup.look_user_info, this.add_look_user_info_popup, this);
        //zwb: 播放背景音效
        Sound_model.playBackSound("bg_game");
    };
    //初始化----准备场景
    Room_view.prototype.init_wait_scene = function (info) {
        MyConsole.getInstance().trace("-----》渲染准备场景-room_view");
        this.clear_scene(); //清理场景
        this.wait_view = new Wait_view(info.house_owner, info.rule_tips);
        this.scene_layer_sp.addChild(this.wait_view);
        //事件
        this.wait_view.v_to_v_add_event(this.EVENT.room_popup.share, this.add_share_popup, this); //显示分享弹窗
        this.wait_view.v_to_v_add_event(this.EVENT.room.leave_room, this.leave_room, this); //离开房间
        this.wait_view.v_to_v_add_event(this.EVENT.room.start_game, this.start_game, this); //开局
        //规则按钮去掉
        this.up_layer_view.set_rule_btn();
    };
    //初始化----游戏中场景
    Room_view.prototype.init_game_scene = function (user_group_model) {
        MyConsole.getInstance().trace("-----》渲染游戏中场景-room_view");
        this.clear_scene(); //清理场景
        this.match_view = new Match_view(user_group_model);
        this.scene_layer_sp.addChild(this.match_view);
        //事件
        this.match_view.v_to_v_add_event(this.EVENT.room.initiate_action, this.initiate_action, this);
        //消除顶层事件
        this.match_view.v_to_v_add_event(this.EVENT.room.set_up_layer_touch_event, this.set_up_layer_touch_event, this);
        //回放返回大厅
        this.match_view.v_to_v_add_event(this.EVENT.room.play_back_home, this.play_back_home, this);
        //规则按钮显示
        this.up_layer_view.set_rule_btn(true);
        //更新头像坐标
        this.up_layer_view.update_head_pos(this.CONST.HEAD_POS_game);
    };
    //初始化----等待场景
    Room_view.prototype.init_prepare_scene = function () {
        MyConsole.getInstance().trace("-----》渲染等待场景-room_view");
        this.clear_scene(); //清理场景
        this.prepare_view = new Prepare_view();
        this.scene_layer_sp.addChild(this.prepare_view);
        //规则按钮去掉
        this.up_layer_view.set_rule_btn(false);
        //更新头像坐标
        this.up_layer_view.update_head_pos(this.CONST.HEAD_POS_game);
    };
    //清空场景
    Room_view.prototype.clear_scene = function () {
        if (this.wait_view) {
            this.wait_view.v_to_v_remove_event(this.EVENT.room_popup.share, this.add_share_popup, this);
            this.wait_view.v_to_v_remove_event(this.EVENT.room.leave_room, this.leave_room, this);
            this.wait_view.clear();
            this.scene_layer_sp.removeChild(this.wait_view);
            this.wait_view = null;
        }
        if (this.match_view) {
            this.match_view.v_to_v_remove_event(this.EVENT.room_popup.rule, this.add_rule_popup, this);
            this.match_view.v_to_v_remove_event(this.EVENT.room.initiate_action, this.leave_room, this);
            this.match_view.clear();
            this.scene_layer_sp.removeChild(this.match_view);
            this.match_view = null;
        }
        if (this.prepare_view) {
            this.prepare_view.clear();
            this.scene_layer_sp.removeChild(this.prepare_view);
            this.prepare_view = null;
        }
    };
    //---------------------------更新视图---------------------------
    //等待/准备游戏/场景---更新桌面基础信息
    Room_view.prototype.update_bg_base_view = function (room_id, game_num, game_max_num, self_location) {
        if (room_id === void 0) { room_id = null; }
        if (game_num === void 0) { game_num = null; }
        if (game_max_num === void 0) { game_max_num = null; }
        if (self_location === void 0) { self_location = null; }
        //房间号
        if (room_id)
            this.bg_layer_view.update_room_id(room_id);
        //游戏次数 总次数
        if (game_max_num)
            this.bg_layer_view.update_game_num(game_num, game_max_num);
        //玩家方位
        if (self_location)
            this.bg_layer_view.set_self_location(self_location);
    };
    //等待/准备游戏/场景---玩家基础信息
    Room_view.prototype.update_user_base_view = function (list) {
        if (list === void 0) { list = null; }
        //更新头像信息
        this.up_layer_view.update_base_view();
        //更新准备icon信息
        if (list)
            for (var i in list) {
                this.update_wait_icon(Number(i) + 1, list[i]);
            }
    };
    //等待/准备场景---更新玩家准备状态ICON
    Room_view.prototype.update_wait_icon = function (position, type) {
        if (this.wait_view)
            this.wait_view.update_tips_icon(position, type);
        if (this.prepare_view)
            this.prepare_view.update_tips_icon(position, type);
    };
    //等待/准备场景---更新IP冲突提示
    Room_view.prototype.update_ip_conflict_tip = function (conflict_tip) {
        if (this.wait_view)
            this.wait_view.update_ip_txt(conflict_tip);
        if (this.prepare_view)
            this.prepare_view.update_ip_txt(conflict_tip);
    };
    //等待场景--------更新开局按钮 0 1
    Room_view.prototype.update_start_btn = function (type) {
        console.log("*************");
        console.log(type);
        this.wait_view.update_start_btn(type);
    };
    //准备/游戏场景---当前操作人风向
    Room_view.prototype.update_current_location = function (position) {
        if (position)
            this.bg_layer_view.update_current_location(position);
    };
    //游戏场景--------更新开混牌
    Room_view.prototype.update_kai_hun_card = function (card_model) {
        if (card_model)
            this.match_view.update_kai_hun_card(card_model);
    };
    //游戏场景--------更新剩余牌数
    Room_view.prototype.update_surplus_card_num = function (num) {
        this.bg_layer_view.update_residue_card_num(num);
    };
    //游戏场景--------更新玩家实时分数
    Room_view.prototype.update_user_score = function () {
        //更新头像信息
        this.up_layer_view.update_score();
    };
    //游戏场景--------更新当前玩家动作按钮列表
    Room_view.prototype.update_self_action_btn_list = function (action_model_list) {
        if (this.CONST.PLAYBACK_MODEL) {
            //回放模式下
            this.match_view.update_play_back_user_action_info(action_model_list);
        }
        else {
            this.match_view.update_self_action_info(action_model_list);
        }
    };
    /***游戏场景--------更新所有人桌牌/手牌信息
     * constraint_update 强制更新
     *card_type 只更新桌牌[this.CONST.CARD_TYPE.play] 或者 手牌 [this.CONST.CARD_TYPE.base_stop]
     * except_card_type  更新除某种牌外的牌信息
     * */
    Room_view.prototype.update_all_user_card = function (constraint_update, card_type, except_card_type) {
        if (constraint_update === void 0) { constraint_update = false; }
        if (card_type === void 0) { card_type = 0; }
        if (except_card_type === void 0) { except_card_type = 0; }
        MyConsole.getInstance().trace("更新所有人牌视图");
        this.match_view.update_card_info(constraint_update, card_type, except_card_type);
    };
    //发牌动画
    Room_view.prototype.game_send_card_ani = function (back_fun) {
        this.match_view.game_send_card_ani(back_fun);
    };
    //回放开始
    Room_view.prototype.game_start_playback = function (play_back_model) {
        this.up_layer_view.set_playback();
        this.match_view.add_playback(play_back_model);
    };
    //回放返回大厅
    Room_view.prototype.play_back_home = function () {
        this.v_to_v_dis_event(this.EVENT.room.play_back_home);
    };
    //---------------------------事件-------------------------------
    Room_view.prototype.leave_room = function () {
        //离开房间
        this.v_to_v_dis_event(this.EVENT.room.leave_room);
    };
    Room_view.prototype.start_game = function () {
        //发起开局
        this.v_to_v_dis_event(this.EVENT.room.start_game);
    };
    Room_view.prototype.initiate_action = function (action_info) {
        //发起动作
        this.v_to_v_dis_event(this.EVENT.room.initiate_action, action_info);
    };
    Room_view.prototype.set_up_layer_touch_event = function (bl) {
        //玩家拖动牌的时候消除顶层事件
        this.up_layer_view.touchEnabled = bl;
        this.up_layer_view.set_touch_event(bl);
    };
    //--------------------------弹窗--------------------------------
    Room_view.prototype.add_setting_popup = function () {
        //设置弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.setup_popup);
    };
    Room_view.prototype.add_location_popup = function () {
        //定位弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.location);
    };
    Room_view.prototype.add_chitchat_popup = function () {
        //聊天弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.chitchat);
    };
    //规则按钮回调;
    Room_view.prototype.add_rule_popup = function (point) {
        //规则弹窗
        //规则按钮回调派发control;
        var data = { str: "", position: point };
        this.v_to_v_dis_event(this.EVENT.room_popup.rule, data);
    };
    Room_view.prototype.add_kicking_user_popup = function (info) {
        //房主踢人弹窗
        MyConsole.getInstance().trace("房主踢人弹窗", 0);
        this.v_to_v_dis_event(this.EVENT.room_popup.kicking_user, info);
    };
    //分享弹窗
    Room_view.prototype.add_share_popup = function () {
        this.v_to_v_dis_event(this.EVENT.room_popup.share);
    };
    //个人信息弹窗
    Room_view.prototype.add_look_user_info_popup = function (user_id) {
        this.v_to_v_dis_event(this.EVENT.popup.user_info_pop, user_id);
    };
    //规则tip;
    Room_view.prototype.add_rule_tip_view = function (point) {
        // if(this.rule_tip_view){
        //     this.removeChild(this.rule_tip_view);
        //     this.rule_tip_view=null;
        // }else {
        //     // var info="";                        //规则数据;
        //     // var str=this.CONST.get_game_rule(info);
        //     var str="打扫房间啥都快放假圣诞快乐附近是断开连接";
        //     this.rule_tip_view=new Tip_view(str);
        //     this.addChild(this.rule_tip_view);
        //     this.rule_tip_view.x=point.x;
        //     this.rule_tip_view.y=point.y;
        // }
    };
    Room_view.prototype.clear = function () {
        this.bg_layer_view.clear();
        this.up_layer_view.v_to_v_remove_event(this.EVENT.room_popup.setup_popup, this.add_setting_popup, this);
        this.up_layer_view.v_to_v_remove_event(this.EVENT.room_popup.location, this.add_location_popup, this);
        this.up_layer_view.v_to_v_remove_event(this.EVENT.room_popup.chitchat, this.add_chitchat_popup, this);
        this.up_layer_view.v_to_v_remove_event(this.EVENT.room_popup.rule, this.add_rule_popup, this);
        this.up_layer_view.v_to_v_remove_event(this.EVENT.room_popup.kicking_user, this.add_kicking_user_popup, this);
        this.up_layer_view.v_to_v_remove_event(this.EVENT.room_popup.look_user_info, this.add_look_user_info_popup, this);
        this.up_layer_view.clear();
        this.clear_scene();
        _super.prototype.clear.call(this);
    };
    return Room_view;
}(Base_view));
__reflect(Room_view.prototype, "Room_view");
//# sourceMappingURL=Room_view.js.map