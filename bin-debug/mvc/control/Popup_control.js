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
var Popup_control = (function (_super) {
    __extends(Popup_control, _super);
    function Popup_control(model, view) {
        var _this = _super.call(this, model, view) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.model = model;
        //接收的广播;
        _this.add_radio();
        //view接收的广播;
        _this.view_add_event();
        //对model的监听;
        _this.model_add_event();
        return _this;
    }
    //接收的广播;
    Popup_control.prototype.add_radio = function () {
        //清空弹窗场景
        this.c_to_c_add_radio_event(this.EVENT.base.clear_popup_scene, this.clear_all_popup, this);
        //通用弹框;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.hint, this.add_hint_view, this);
        //-通用浮层提示框
        this.c_to_c_add_radio_event(this.EVENT.base.base_float_alert, this.popup_float_alert, this);
        //分享弹框;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.share, this.add_share_view, this);
        //接收查看用户信息广播;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.look_user_info, this.look_user_info, this);
        /*---------大厅---------*/
        //创建用户协议弹窗;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.add_user_Agree_pop, this.create_user_Agree, this);
        //接收创建房间广播;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.add_create_room_pop, this.create_room_pop, this);
        //接收加入房间广播;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.add_join_room_pop, this.join_room_pop, this);
        //充值;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.pay_user_money, this.pay_user_money, this);
        //战绩;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.record, this.add_record_view, this);
        //代开;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.issue, this.add_issue_view, this);
        //设置弹框;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.setting, this.add_setting_view, this);
        //帮助弹框;
        this.c_to_c_add_radio_event(this.EVENT.base_popup.help, this.add_help_view, this);
        //代开用户踢人;
        this.c_to_c_add_radio_event(this.EVENT.hall_issue.hall_issue_delete_player, this.issue_info, this);
        //是否弹出回放pop
        this.c_to_c_add_radio_event(this.EVENT.base.is_show_player_back_pop, this.is_show_player_back_pop, this);
        /*---------俱乐部---------*/
        //俱乐部-申请加入
        this.c_to_c_add_radio_event(this.EVENT.base_popup.club_request_join, this.club_request_join, this);
        //俱乐部-申请离开
        this.c_to_c_add_radio_event(this.EVENT.base_popup.suqare_leave_popup, this.suqare_leave_popup, this);
        //俱乐部-接收创建房间广播;
        this.c_to_c_add_radio_event(this.EVENT.base.create_club_room_popup, this.club_create_room, this);
        //俱乐部-接收加入房间广播;
        this.c_to_c_add_radio_event(this.EVENT.base.join_club_room_popup, this.club_join_room, this);
        //俱乐部-我的成绩弹窗
        this.c_to_c_add_radio_event(this.EVENT.base.club_my_info_popup, this.add_my_info, this);
        /*---------游戏---------*/
        //设置弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.setup_popup, this.add_setting_view, this);
        //分享弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.share_popup, this.add_share_view, this);
        //聊天弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.chitchat, this.chitchat_pop, this);
        //小结算弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.add_xjs_pop, this.xjs_pop, this);
        //大结算弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.add_djs_pop, this.djs_pop, this);
        //四人-解散房间弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.r_room_dissolution_room, this.dissolve_room_pop, this);
        //定位弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.location, this.location_pop, this);
        //规则弹框
        this.c_to_c_add_radio_event(this.EVENT.popup_room.add_rule_pop, this.add_rule_pop, this);
    };
    //view接收的广播;
    Popup_control.prototype.view_add_event = function () {
        //分享弹窗-房间等待界面
        this.view.v_to_v_add_event(this.EVENT.base_popup.share, this.add_share_view, this);
        //浮层
        this.view.v_to_v_add_event(this.EVENT.popup.float_alert, this.float_alert, this);
        /*---------大厅---------*/
        //创建房间
        this.view.v_to_v_add_event(this.EVENT.popup.user_agree, this.user_agree, this);
        //创建房间
        this.view.v_to_v_add_event(this.EVENT.popup.create_room, this.send_create_room, this);
        //加入房间
        this.view.v_to_v_add_event(this.EVENT.popup.join_room, this.send_join_room, this);
        //获取战绩数据;
        this.view.v_to_v_add_event(this.EVENT.popup.hall_achievement, this.hall_achievement, this);
        //分享战绩数据;
        this.view.v_to_v_add_event(this.EVENT.popup.share_achievement, this.share_achievement, this);
        //牌局回放;
        this.view.v_to_v_add_event(this.EVENT.popup.play_back_info, this.play_back_info, this);
        //代开列表;
        this.view.v_to_v_add_event(this.EVENT.popup.issue_info, this.issue_info, this);
        //代开删除用户---踢人;
        this.view.v_to_v_add_event(this.EVENT.popup.delete_user, this.delete_user, this);
        //代开解散房间;
        this.view.v_to_v_add_event(this.EVENT.popup.dissolution_room, this.dissolution_room, this);
        //代开强制解散房间;
        this.view.v_to_v_add_event(this.EVENT.popup.qz_dissolution_room, this.qz_dissolution_room, this);
        //代开历史;
        this.view.v_to_v_add_event(this.EVENT.popup.issue_history, this.issue_history, this);
        //回放;
        this.view.v_to_v_add_event(this.EVENT.player_back.show_player, this.radio_player_back, this);
        /*---------俱乐部---------*/
        //俱乐部-我的战绩请求数据
        this.view.v_to_v_add_event(this.EVENT.base_popup.add_my_info, this.club_get_my_info, this);
        //俱乐部-申请离开
        this.view.v_to_v_add_event(this.EVENT.base.club_request_leave_popup, this.club_leave_popup, this);
        //俱乐部-战绩翻页刷新视图
        this.view.v_to_v_add_event(this.EVENT.base.club_update_my_info, this.club_update_my_info, this);
        /*---------游戏---------*/
        //发起解散房间监听
        this.view.v_to_v_add_event(this.EVENT.popup.room_dissolution_room, this.sponsor_dissolve_room, this);
        //同意or拒绝
        this.view.v_to_v_add_event(this.EVENT.dissolution_room.is_agree_diss_room, this.is_agree_diss_room, this);
        //房间解散成功-》请求大结算
        this.view.v_to_v_add_event(this.EVENT.popup_room.sponsor_DJS, this.sponsor_DJS, this);
        //发起-聊天
        this.view.v_to_v_add_event(this.EVENT.chat.send_chat_status, this.send_chat_status, this);
        //大结算-》返回大厅
        this.view.v_to_v_add_event(this.EVENT.popup.back_hall, this.pop_back_hall, this);
        //小结算-》发起下一局准备
        this.view.v_to_v_add_event(this.EVENT.popup_room.XJS_wait_ok, this.XJS_wait_ok, this);
    };
    //对model的监听;
    Popup_control.prototype.model_add_event = function () {
        //通用浮层弹窗;
        this.model.m_to_c_add_event(this.EVENT.base.base_float_alert, this.float_alert, this);
        //=========================大厅
        //监听model给的战绩数据;
        this.model.m_to_c_add_event(this.EVENT.popup.hall_achievement, this.get_hall_achievement_info, this);
        //监听model给的代开列表;
        this.model.m_to_c_add_event(this.EVENT.popup.issue_info, this.get_issue_info, this);
        //监听model给的俱乐部-我的成绩
        this.model.m_to_c_add_event(this.EVENT.base.club_get_my_info, this.add_my_info, this);
        //监听服务器更改房卡的信息;
        this.model.m_to_c_add_event(this.EVENT.popup.change_score, this.change_score, this);
        //代开历史;
        this.model.m_to_c_add_event(this.EVENT.popup.issue_history, this.get_issue_history, this);
        //加入房间成功;
        this.model.m_to_c_add_event(this.EVENT.popup.join_room_ok, this.join_room_ok, this);
        //加入房间失败;
        this.model.m_to_c_add_event(this.EVENT.popup.join_room_fail, this.join_room_fail, this);
        //创建房间成功;
        this.model.m_to_c_add_event(this.EVENT.popup.create_room_ok, this.create_room_ok, this);
        //创建房间成功;
        this.model.m_to_c_add_event(this.EVENT.socket.socket_close, this.socket_close, this);
        //代开房间创建成功跳转代开
        this.model.m_to_c_add_event(this.EVENT.base.issue_success, this.issue_success, this);
        //代开房间创建成功跳转代开
        this.model.m_to_c_add_event(this.EVENT.popup.issue_room_star_game, this.issue_room_star_game, this);
        //代开房间创建成功跳转代开
        this.model.m_to_c_add_event(this.EVENT.socket.socket_unusual, this.socket_unusual, this);
        //创建房间更新房卡
        this.model.m_to_c_add_event(this.EVENT.popup.create_room_update_money, this.create_room_update_money, this);
        //创建代开更新房卡
        this.model.m_to_c_add_event(this.EVENT.popup.create_replace_update_money, this.create_replace_update_money, this);
        //=========================俱乐部
        //俱乐部-我的战绩-数据刷新
        this.model.m_to_c_add_event(this.EVENT.base_popup.club_add_my_info, this.updata_club_my_info, this);
    };
    //通用浮层提示框
    Popup_control.prototype.popup_float_alert = function (info) {
        this.float_alert(info); //通用浮层提示框--方法调用
    };
    //model给的战绩数据;
    Popup_control.prototype.get_hall_achievement_info = function (info) {
        this.view.update_record_list(info);
    };
    //model给的代开历史数据;
    Popup_control.prototype.get_issue_history = function (info) {
        this.view.update_history_list(info);
    };
    //model给的代开列表
    Popup_control.prototype.get_issue_info = function (info) {
        //去更新代开界面的代开列表;
        this.view.update_issue_list(info);
    };
    //创建用户协议界面;
    Popup_control.prototype.create_user_Agree = function (userId) {
        this.view.create_user_Agree(userId);
    };
    //创建房间Popup;
    Popup_control.prototype.create_room_pop = function (userId) {
        var room_data = egret.localStorage.getItem("create_room_data") ? (JSON.parse(egret.localStorage.getItem("create_room_data"))) : null;
        this.view.create_room_popup(userId, 0, room_data);
    };
    //加入房间Popup;
    Popup_control.prototype.join_room_pop = function (userId) {
        this.view.join_room_popup(userId);
    };
    /*------------俱乐部Popup---------------*/
    //俱乐部创建房间Popup;
    Popup_control.prototype.club_create_room = function (clubId) {
        var userId = null;
        this.view.create_room_popup(userId, clubId);
    };
    //俱乐部加入房间Popup;
    Popup_control.prototype.club_join_room = function (info) {
        if (info.scene_status == this.CONST.club.square_scene) {
            this.view.add_hint_view("确认加入【" + info.roomId + "】房间?", function () {
                this.c_to_c_event_radio(this.EVENT.base.sure_club_join_room, info); //俱乐部确认加入房间
            }.bind(this), true);
        }
    };
    //俱乐部-申请加入Popup
    Popup_control.prototype.club_request_join = function (model) {
        this.view.add_club_request_join_popup(model);
    };
    //俱乐部-申请离开Popup
    Popup_control.prototype.suqare_leave_popup = function (data) {
        this.view.add_club_request_leave_popup(data);
    };
    //俱乐部-我的成绩Popup
    Popup_control.prototype.add_my_info = function (data) {
        this.view.add_club_my_info_popup(data, this.model);
    };
    //查看用户信息Popup;
    Popup_control.prototype.look_user_info = function (user_info) {
        this.view.look_user_info(user_info);
    };
    //充值Popup;
    Popup_control.prototype.pay_user_money = function (str) {
        this.view.pay_user_money(str);
    };
    //战绩Popup;
    Popup_control.prototype.add_record_view = function (userId) {
        this.view.add_record_view(userId);
    };
    //战绩popup;
    Popup_control.prototype.add_issue_view = function (userId) {
        this.view.add_issue_view(userId);
    };
    //通用popup;
    Popup_control.prototype.add_hint_view = function (info) {
        var view_str = info.str; //显示的文字;
        var view_back_func = info.back_fun; //回调方法;
        var view_is_addbtn = info._isAddCloseBtn; //是否显示关闭按钮;
        this.view.add_hint_view(view_str, view_back_func, view_is_addbtn);
    };
    //帮助popup;
    Popup_control.prototype.add_help_view = function () {
        this.view.add_help_view();
    };
    //分享popup;
    Popup_control.prototype.add_share_view = function () {
        this.view.show_share_popup();
    };
    //设置popup;
    Popup_control.prototype.add_setting_view = function (info) {
        this.view.add_setting_view(info);
    };
    //告诉model，去请求战绩数据;
    Popup_control.prototype.hall_achievement = function (userId) {
        this.model.send_record_info(userId, 1);
    };
    //弹出分享战绩界面;
    Popup_control.prototype.share_achievement = function () {
        this.view.show_share_popup();
    };
    //牌局回放;
    Popup_control.prototype.play_back_info = function (data) {
        //保存牌局回放页面的数据;
        this.model.player_back_data = data;
        this.view.init_play_back_info(data);
    };
    //代开列表;
    Popup_control.prototype.issue_info = function (userId) {
        this.model.send_issue_info(userId);
    };
    //是否弹出回放pop;
    Popup_control.prototype.is_show_player_back_pop = function () {
        if (this.model.player_back_data) {
            this.view.init_play_back_info(this.model.player_back_data);
            this.model.player_back_data = null;
        }
    };
    //代开删除用户;
    Popup_control.prototype.delete_user = function (data) {
        var name = Base_user_model.get_char(data.userName);
        this.view.add_hint_view("是否要将玩家【" + name + "】踢出本房间？", function () {
            //告诉model 我要删除用户;
            var send_data = {};
            send_data["userId"] = data.userId;
            send_data["roomId"] = data.roomId;
            this.model.send_delete_user(send_data);
        }.bind(this), true);
    };
    //代开解散房间;
    Popup_control.prototype.dissolution_room = function (roomId) {
        this.view.add_hint_view("确定要解散该房间吗？", function () {
            this.model.send_dissolution_room(roomId);
        }.bind(this), true);
    };
    //代开强制解散房间;
    Popup_control.prototype.qz_dissolution_room = function (roomId) {
        this.view.add_hint_view("房间已开局，是否要解散该房间？", function () {
            this.model.send_qz_dissolution_room(roomId);
        }.bind(this), true);
    };
    //代开历史;
    Popup_control.prototype.issue_history = function (data) {
        this.model.send_issue_history(data);
    };
    //用户协议;
    Popup_control.prototype.user_agree = function (userId) {
        //this.model.send_user_agree(userId);
        this.c_to_c_event_radio(this.EVENT.pop_to_hall.user_agree_back, userId);
    };
    //告诉服务器我要创建房间-这里用户习惯缓存功能还没有弄;
    Popup_control.prototype.send_create_room = function (info) {
        if (info.clubId) {
            this.c_to_c_event_radio(this.EVENT.base.sure_club_create_room, info);
        }
        else {
            /*
            *
            * {
             "userId": 386186,
             "circleNum": 2,
             "huaType": 1,
             "chiType": 2,
             "scoreType": 1,
             "roomType": 1,
             "interfaceId": "100007"
             }
            *
            *
            * */
            var rule_arr = [];
            var model_data = {};
            rule_arr = [info.chiType];
            //局数;
            switch (Number(info.circleNum)) {
                case 4:
                    model_data["circleNum"] = 1;
                    break;
                case 8:
                    model_data["circleNum"] = 2;
                    break;
                default:
                    model_data["circleNum"] = 0;
                    break;
            }
            //玩法
            switch (Number(info.huaType)) {
                case 2:
                    model_data["huaType"] = 1;
                    break;
                default:
                    model_data["huaType"] = 0;
                    break;
            }
            model_data["chiType"] = [];
            for (var i = 0; i < rule_arr.length; i++) {
                if (rule_arr[i] == 2) {
                    model_data["chiType"].push(i);
                }
            }
            //计分方式
            switch (Number(info.scoreType)) {
                case 2:
                    model_data["scoreType"] = 1;
                    break;
                case 3:
                    model_data["scoreType"] = 2;
                    break;
                case 4:
                    model_data["scoreType"] = 3;
                    break;
                default:
                    model_data["scoreType"] = 0;
                    break;
            }
            //开房模式
            model_data["roomType"] = info.roomType == 1 ? 0 : 1;
            egret.localStorage.setItem("create_room_data", JSON.stringify(model_data)); //创建选项设置缓存
            this.c_to_c_event_radio(this.EVENT.pop_to_hall.game_create_room_back, info);
        }
    };
    //告诉服务器我要加入房间;
    Popup_control.prototype.send_join_room = function (info) {
        if (info.clubId) {
            this.c_to_c_event_radio(this.EVENT.base.sure_club_join_room, info);
        }
        else {
            this.c_to_c_event_radio(this.EVENT.pop_to_hall.join_room_back, info);
        }
    };
    //俱乐部-我的战绩
    Popup_control.prototype.club_get_my_info = function (data) {
        this.c_to_c_event_radio(this.EVENT.base.club_get_my_info, data);
    };
    //更改房卡数量;
    //@Param
    Popup_control.prototype.change_score = function (num) {
        this.c_to_c_event_radio(this.EVENT.pop_to_hall.pop_change_money, num);
    };
    //代开房间解散成功;
    /*
     @Param str     浮层显示的文字
     @Param timeN  浮层显示的时间
     * */
    Popup_control.prototype.float_alert = function (info) {
        var data = {};
        data["str"] = info["str"];
        data["timeN"] = info["timeN"] ? info["timeN"] : 2500;
        this.view.popup_float_alert(data);
    };
    Popup_control.prototype.radio_player_back = function (data) {
        this.c_to_c_event_radio(this.EVENT.base.playback_cut_game, data);
    };
    //加入房间成功
    Popup_control.prototype.join_room_ok = function (info) {
        this.c_to_c_event_radio(this.EVENT.base.popup_join_room_ok, info);
    };
    //加入房间失败
    Popup_control.prototype.join_room_fail = function (info) {
        this.c_to_c_event_radio(this.EVENT.base.popup_join_room_fail, info);
    };
    //创建房间成功
    Popup_control.prototype.create_room_ok = function (info) {
        this.c_to_c_event_radio(this.EVENT.base.popup_create_room_ok, info);
    };
    //代开房间创建成功跳转代开界面
    Popup_control.prototype.issue_success = function () {
        this.c_to_c_event_radio(this.EVENT.base.issue_success);
    };
    //代开房间开局;
    Popup_control.prototype.issue_room_star_game = function (info) {
        this.view.update_issue_list_room(info);
    };
    //网络断开连接;
    Popup_control.prototype.socket_close = function () {
        this.view.add_hint_view("网络开小差了 请尝试刷新?", function () {
            window.location.reload(); /*重新加载*/
        }, false);
    };
    //网络异常;
    Popup_control.prototype.socket_unusual = function (str) {
        this.view.add_hint_view(str, function () {
            window.location.reload(); /*重新加载*/
        }, false);
    };
    //创建房间时更新房卡
    Popup_control.prototype.create_room_update_money = function (create_money) {
        this.c_to_c_event_radio(this.EVENT.popup.create_room_update_money, create_money);
    };
    //创建代开更新大厅房卡
    Popup_control.prototype.create_replace_update_money = function (money) {
        this.c_to_c_event_radio(this.EVENT.popup.create_replace_update_money, money);
    };
    //---设置弹框-》发起解散房间----------------------------------------事件监听-回应
    Popup_control.prototype.sponsor_dissolve_room = function () {
        this.c_to_c_event_radio(this.EVENT.popup_room.sponsor_dissolve_room);
    };
    //聊天弹框
    Popup_control.prototype.chitchat_pop = function () {
        this.view.chitchat_popup();
    };
    //发起-聊天
    Popup_control.prototype.send_chat_status = function (info) {
        this.c_to_c_event_radio(this.EVENT.popup_room.sponsor_chat, info);
    };
    //定位弹框
    Popup_control.prototype.location_pop = function (location_model) {
        this.view.location_popup(location_model);
    };
    //规则弹框
    Popup_control.prototype.add_rule_pop = function (point) {
        this.view.rule_popup(point);
    };
    //小结算弹框
    Popup_control.prototype.xjs_pop = function (XJS_model) {
        this.view.xjs_popup(XJS_model);
    };
    //大结算弹框
    Popup_control.prototype.djs_pop = function (info) {
        this.view.djs_popup(info);
    };
    //大结算-》返回大厅
    Popup_control.prototype.pop_back_hall = function () {
        this.c_to_c_event_radio(this.EVENT.base.DJS_back_hall);
    };
    //四人-解散房间-弹框
    Popup_control.prototype.dissolve_room_pop = function (dis_model) {
        this.view.update_dissolution_room(dis_model);
    };
    //同意or拒绝
    Popup_control.prototype.is_agree_diss_room = function (num) {
        this.c_to_c_event_radio(this.EVENT.dissolution_room.is_agree_diss_room, num);
    };
    //解散成功-》请求大结算
    Popup_control.prototype.sponsor_DJS = function () {
        this.c_to_c_event_radio(this.EVENT.popup_room.sponsor_DJS);
    };
    //小结算-》发起下一局准备
    Popup_control.prototype.XJS_wait_ok = function () {
        this.c_to_c_event_radio(this.EVENT.popup_room.XJS_wait_ok);
    };
    /*----------------------------------------添加-俱乐部-监听事件---------------------------------------*/
    //俱乐部-战绩翻页刷新视图
    Popup_control.prototype.club_update_my_info = function (data) {
        this.c_to_c_event_radio(this.EVENT.base.club_update_my_info, data);
    };
    //俱乐部-我的战绩-数据监听
    Popup_control.prototype.updata_club_my_info = function (data) {
        this.view.update_club_my_info(data);
    };
    //申请离开房间-监听Club_request_leave_popup
    Popup_control.prototype.club_leave_popup = function () {
        this.c_to_c_event_radio(this.EVENT.base.club_request_leave_popup);
    };
    //清空所有弹窗
    Popup_control.prototype.clear_all_popup = function () {
        this.view.close_all_popup_view();
    };
    return Popup_control;
}(Base_control));
__reflect(Popup_control.prototype, "Popup_control");
//# sourceMappingURL=Popup_control.js.map