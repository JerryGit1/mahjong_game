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
var Game_hall_control = (function (_super) {
    __extends(Game_hall_control, _super);
    function Game_hall_control(model) {
        var _this = _super.call(this, model, null) || this;
        _this.EVENT = new Game_hall_event_model(); //事件常量
        _this.model = model;
        //监听其他control发来的广播;
        _this.add_radio_event();
        //对model的监听;
        _this.model_add_event();
        return _this;
    }
    //添加视图
    Game_hall_control.prototype.add_view = function () {
        this.view = new Hall_view(this.model);
        _super.prototype.add_view.call(this);
        //-------------------事件侦听--------------------
        //头像点击---用户信息弹窗
        //this.view.v_to_v_add_event(this.EVENT.hall_popup.look_user_info,this.view_look_user_info_event,this);
        //房卡点击
        //this.view.v_to_v_add_event(this.EVENT.hall_popup.pay_user_money,this.pay_user_money_popup,this);
        //创建房间
        this.view.v_to_v_add_event(this.EVENT.hall_popup.create_room, this.create_room_popup, this);
        //加入房间
        this.view.v_to_v_add_event(this.EVENT.hall_popup.join_room, this.join_room_popup, this);
        //俱乐部
        this.view.v_to_v_add_event(this.EVENT.hall_popup.skip_club, this.skip_club, this);
        //查看用户信息
        this.view.v_to_v_add_event(this.EVENT.hall_popup.look_user_info, this.look_user_info, this);
        //充值
        this.view.v_to_v_add_event(this.EVENT.hall_popup.pay_user_money, this.pay_user_money, this);
        //战绩
        this.view.v_to_v_add_event(this.EVENT.hall_popup.record, this.add_record_view, this);
        //代开
        this.view.v_to_v_add_event(this.EVENT.hall_popup.issue, this.add_issue_view, this);
        //规则--帮助
        this.view.v_to_v_add_event(this.EVENT.hall_popup.help, this.add_help_view, this);
        //分享
        this.view.v_to_v_add_event(this.EVENT.hall_popup.share, this.add_share_view, this);
        //规则--设置
        this.view.v_to_v_add_event(this.EVENT.hall_popup.setting, this.add_setting_view, this);
        //加入房间
        //俱乐部
        //设置
        //战绩
        //代开
        //玩法
        //分享
        //-------------------主动触发--------------------
        //捕获加入俱乐部
        if (this.CONST.CLUB_SHARE_ID) {
            this.c_to_c_event_radio(this.EVENT.base.hall_to_club_join_id, this.CONST.CLUB_SHARE_ID);
            this.CONST.CLUB_SHARE_ID = null; //注销下次加入
        }
        else {
            //捕获用户协议
            if (!this.model.get_userAgree()) {
                var self_model = this.model.get_user_info_popup_info();
                var userId = self_model.userId;
                this.c_to_c_event_radio(this.EVENT.base_popup.add_user_Agree_pop, userId);
            }
        }
        //是否弹出回放pop;
        this.c_to_c_event_radio(this.EVENT.base.is_show_player_back_pop);
        //设置分享
        Weixin_JSSDK_model.getInstance().hallShare(); //游戏中只能分享大厅信息
        //播放声音
        Sound_model.playBackSound("bg_dating"); // 大厅背景音乐
        //动态更新个人数据;
        var info = this.model.get_user_model_info();
        this.view.updata_userInfo(info);
        //动态更新跑马灯;
        var notice_text = info.notice;
        this.view.update_notice_text(notice_text);
    };
    //--------------------事件侦听-------------------
    //对model的监听;
    Game_hall_control.prototype.model_add_event = function () {
        this.model.m_to_c_add_event(this.EVENT.issue.h_issue_delete_player, this.hall_delete_player, this);
    };
    //监听其他control发来的广播;
    Game_hall_control.prototype.add_radio_event = function () {
        //监听房卡数量的改变;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.pop_change_money, this.view_change_money, this);
        //同意用户协议;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.user_agree_back, this.user_agree_back, this);
        //创建房间监听;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.game_create_room_back, this.create_room_back, this);
        //加入房间监听;
        this.c_to_c_add_radio_event(this.EVENT.pop_to_hall.join_room_back, this.join_room_back, this);
        //代开房间创建成功跳转代开界面
        this.c_to_c_add_radio_event(this.EVENT.base.issue_success, this.add_issue_view, this);
        //创建房间时更新房卡
        this.c_to_c_add_radio_event(this.EVENT.popup.create_room_update_money, this.create_room_update_money, this);
        //监听房间改变房卡数量;
        this.c_to_c_add_radio_event(this.EVENT.room_to_hall.room_change_money, this.room_change_money, this);
        //创建代开时-更新大厅房卡
        this.c_to_c_add_radio_event(this.EVENT.popup.create_replace_update_money, this.create_replace_update_money, this);
    };
    //改变房卡的值;
    Game_hall_control.prototype.view_change_money = function (num) {
        this.view.update_money_text(num); //更新房卡视图
        this.model.self_model.money = num; //更新自己的房卡
    };
    //解散房间时更新大厅房卡;
    Game_hall_control.prototype.room_change_money = function (data) {
        var roomId = "" + data.roomId;
        if (roomId.length == 6) {
            var user_money = this.model.self_model.money;
            var user_newest_money = Number(user_money) + Number(data.money_num);
            this.model.self_model.money = user_newest_money;
            this.view.update_money_text(user_newest_money); //更新房卡--丹阳特有--放营口里面会报错
        }
    };
    //同意用户协议;
    Game_hall_control.prototype.user_agree_back = function (userId) {
        //发送同意用户协议;
        this.model.send_user_agree(userId);
        this.model.self_model.userAgree = true;
    };
    //创建房间回调;
    Game_hall_control.prototype.create_room_back = function (info) {
        this.model.send_create_room(info);
    };
    //加入房间回调;
    Game_hall_control.prototype.join_room_back = function (info) {
        this.model.join_create_room(info);
    };
    //--------------------弹窗-------------------
    Game_hall_control.prototype.pay_user_money_popup = function () {
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.pay_user_info);
    };
    //创建房间
    Game_hall_control.prototype.create_room_popup = function () {
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.add_create_room_pop, this.model.get_self_user_id());
    };
    //加入房间
    Game_hall_control.prototype.join_room_popup = function () {
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.add_join_room_pop, this.model.get_self_user_id());
    };
    //俱乐部
    Game_hall_control.prototype.skip_club = function () {
        //切换俱乐部场景
        this.c_to_c_event_radio(this.EVENT.base.hall_to_club_cut_scene);
    };
    //查看用户信息
    Game_hall_control.prototype.look_user_info = function () {
        //获取个人信息所需要的数据;
        var user_model_info = this.model.get_user_model_info();
        var user_info = { "userId": user_model_info.userId, "userName": user_model_info.userName, "userImg": user_model_info.userImg, "userIp": user_model_info.ip, "userMoney": user_model_info.money, "gender": user_model_info.gender };
        //给弹出窗层--执行视图
        this.c_to_c_event_radio(this.EVENT.base_popup.look_user_info, user_info);
    };
    //充值;
    Game_hall_control.prototype.pay_user_money = function () {
        var str = this.model.get_user_model_info().notice;
        // var str="推广员咨询请加官方微信：dymikf文明娱乐，禁止赌博";
        var cutStr = str.replace(/^[\'\"]+|[\'\"]+$/g, ""); //正则表达式，去掉字符串中的引号
        this.c_to_c_event_radio(this.EVENT.base_popup.pay_user_money, cutStr.replace(",", "\n\n　　　")); //添加换行符
    };
    //广播战绩;
    Game_hall_control.prototype.add_record_view = function () {
        var userId = this.model.get_self_user_id();
        this.c_to_c_event_radio(this.EVENT.base_popup.record, userId);
    };
    //广播代开；
    Game_hall_control.prototype.add_issue_view = function () {
        var userId = this.model.get_self_user_id();
        this.c_to_c_event_radio(this.EVENT.base_popup.issue, userId);
    };
    //创建房间时更新房卡
    Game_hall_control.prototype.create_room_update_money = function (create_money) {
        var user_money = this.model.self_model.money;
        var user_newest_money = user_money - create_money;
        this.model.self_model.money = user_newest_money;
    };
    //创建代开时更新房卡
    Game_hall_control.prototype.create_replace_update_money = function (money) {
        var user_money = this.model.self_model.money; //获取当前这个玩家的个人信息
        var user_newest_money = Number(user_money) - money; //得到这个玩家的最新 money
        this.model.self_model.money = user_newest_money;
        this.view.update_money_text(user_newest_money); //更新房卡
    };
    //广播帮助;
    Game_hall_control.prototype.add_help_view = function () {
        this.c_to_c_event_radio(this.EVENT.base_popup.help);
    };
    //广播分享;
    Game_hall_control.prototype.add_share_view = function () {
        this.c_to_c_event_radio(this.EVENT.base_popup.share);
    };
    //广播设置;
    Game_hall_control.prototype.add_setting_view = function (info) {
        this.c_to_c_event_radio(this.EVENT.base_popup.setting, info);
    };
    //代开房间踢人的大厅处理;
    Game_hall_control.prototype.hall_delete_player = function (info) {
        if (this.view) {
            this.c_to_c_event_radio(this.EVENT.hall_issue.hall_issue_delete_player, info);
        }
    };
    //移除视图
    Game_hall_control.prototype.remove_view = function () {
        //移除view事件
        //头像点击---用户信息弹窗
        //房卡点击
        //创建房间
        //加入房间
        //俱乐部
        //设置
        //战绩
        //代开
        //玩法
        //分享
        _super.prototype.remove_view.call(this);
    };
    return Game_hall_control;
}(Base_control));
__reflect(Game_hall_control.prototype, "Game_hall_control");
//# sourceMappingURL=Game_hall_control.js.map