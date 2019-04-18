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
var Game_hall_model = (function (_super) {
    __extends(Game_hall_model, _super);
    function Game_hall_model() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_event_model(); //事件常量
        _this.curr_is_silence_join = false; //当前是否静默加入房间状态
        return _this;
    }
    Game_hall_model.prototype.set_model = function (self_model, socket_model) {
        this.self_model = self_model;
        this.socket_model = socket_model;
        //侦听服务器事件
        this.port_socket();
    };
    //---------------------监听服务器给的消息--------------------;
    Game_hall_model.prototype.port_socket = function () {
        //删除用户--代开房间踢人;
        this.socket_model.add_port_event(this.PORT.CONFIG.hall_deleteUser, this.delete_user.bind(this), this);
    };
    //------------------------获取数据--------------------------
    Game_hall_model.prototype.get_userAgree = function () {
        return this.self_model.userAgree;
    };
    Game_hall_model.prototype.get_self_user_id = function () {
        return this.self_model.userId;
    };
    //------------------------设置数据----------------------------
    //zpb 获取用户弹窗信息
    Game_hall_model.prototype.get_user_info_popup_info = function () {
        return this.self_model;
    };
    //个人信心界面需要的数据;
    Game_hall_model.prototype.get_user_model_info = function () {
        return {
            "userImg": this.self_model.userImg,
            "userName": this.self_model.userName,
            "userId": this.self_model.userId,
            "gender": this.self_model.gender,
            "ip": this.self_model.ip,
            "money": this.self_model.money,
            "notice": this.self_model.notice
        };
    };
    //hyh 发送加入房间信息 _is_silence_join 是否静默加入（通过分享房间号码）
    Game_hall_model.prototype.join_room = function (data) {
        data["userId"] = this.self_model.userId;
        if (data._is_jing_mo_join_new_room_type) {
            this.CONST.curr_is_silence_join = data._is_jing_mo_join_new_room_type; //静默状态
        }
        this.socket_model.join_room(data);
    };
    //---------------------像服务器发送请求------------------
    //告诉服务器，同意用户协议;
    Game_hall_model.prototype.send_user_agree = function (userId) {
        this.socket_model.send_user_agreement_hyh(userId);
    };
    //创建房间;
    Game_hall_model.prototype.send_create_room = function (data) {
        this.socket_model.set_create_room(data);
    };
    //加入房间;
    Game_hall_model.prototype.join_create_room = function (data) {
        this.socket_model.join_room(data);
    };
    //---------------------接收服务器下行-------------------
    //接收踢人下行;
    Game_hall_model.prototype.delete_user = function (info) {
        //代开房间踢人成功;
        if (info.reqState == 1) {
            if (this.CONST.USERID) {
                //this.send_issue_info(this.CONST.USERID);
                //重新请求刷新代开列表;
                this.m_to_c_dis_event(this.EVENT.issue.h_issue_delete_player, this.CONST.USERID);
            }
            else {
                MyConsole.getInstance().trace("我的userId呢？？？" + this.CONST.USERID, 2);
            }
            //文字提示;
            this.m_to_c_dis_event(this.EVENT.popup.float_alert, { "str": "踢出玩家成功" });
        }
    };
    return Game_hall_model;
}(Scene_model));
__reflect(Game_hall_model.prototype, "Game_hall_model");
//# sourceMappingURL=Hall_model.js.map