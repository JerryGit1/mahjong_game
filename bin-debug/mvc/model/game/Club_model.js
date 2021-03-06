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
var Game_club_model = (function (_super) {
    __extends(Game_club_model, _super);
    function Game_club_model() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_club_event_model(); //事件常量
        _this.club_is_open = false; //俱乐部是否打开了 因为后端不会给 所以前端要自己设置
        //发送俱乐部玩家信息---发起socket
        _this.current_page = 0;
        //获取/刷新当前俱乐部信息
        _this.m_to_c_add_event(_this.EVENT.club.get_square_info, _this.get_club_info, _this);
        //返回首页
        _this.m_to_c_add_event(_this.EVENT.club.cut_scene, _this.get_my_club_list, _this);
        return _this;
    }
    Game_club_model.prototype.set_model = function (self_model, socket_model) {
        this.self_model = self_model;
        this.socket_model = socket_model;
        //侦听服务器事件
        //---------------------socket-------------------------
        //我的俱乐部列表信息
        this.socket_model.add_port_event(this.PORT.CONFIG.club_my_list, this.set_clubs_list_info, this);
        //获取某个俱乐部详情
        this.socket_model.add_port_event(this.PORT.CONFIG.club_info, this.set_club_info, this);
        //扫二维码申请加入俱乐部
        this.socket_model.add_port_event(this.PORT.CONFIG.club_request_join_before, this.club_join_before, this);
        //申请加入俱乐部
        this.socket_model.add_port_event(this.PORT.CONFIG.club_request_join, this.sure_join_club_response, this);
        //申请离开俱乐部
        this.socket_model.add_port_event(this.PORT.CONFIG.club_request_leave, this.sure_leave_club_response, this);
    };
    //--------------------获取数据--------------------
    Game_club_model.prototype.get_notice = function () {
        return this.self_model.notice;
    };
    Game_club_model.prototype.club_request_join_before = function (join_club_id) {
        this.current_request_join_club_id = join_club_id;
        this.socket_model.club_request_join_before({
            clubId: join_club_id,
            userId: this.CONST.USERID
        }); //zwb:扫二维码申请加入俱乐部前发送500001接口
    };
    //获取某个俱乐部详情----发起socket
    Game_club_model.prototype.get_club_info = function (club_id) {
        this.socket_model.get_club_info({ userId: this.self_model.userId, clubId: club_id });
    };
    //获取我的俱乐部列表
    Game_club_model.prototype.get_my_club_list = function () {
        this.socket_model.get_club_my_list({ userId: this.self_model.userId });
    };
    //申请加入俱乐部---发起socket
    Game_club_model.prototype.sure_join_club_send = function (club_id) {
        if (club_id) {
            this.socket_model.club_request_join({ userId: this.self_model.userId, clubId: club_id });
        }
        else {
            MyConsole.getInstance().trace("重大失誤,申请加入俱乐部---发起socket--club_id爲空", 0);
        }
    };
    //俱乐部-加入房间请求---发起socket
    Game_club_model.prototype.club_join_room_send = function (roomId, userId) {
        this.socket_model.club_join_room({ userId: userId, roomId: roomId });
    };
    //俱乐部-创建房间请求---发起socket
    Game_club_model.prototype.club_create_room_send = function (data) {
        this.socket_model.club_create_room(data);
    };
    //申请离开俱乐部---发起socket
    Game_club_model.prototype.sure_leave_club_send = function (club_id) {
        this.socket_model.club_request_leave({ userId: this.self_model.userId, clubId: club_id });
    };
    Game_club_model.prototype.set_club_get_my_info = function (data) {
        this.current_page = data.page;
        this.socket_model.club_get_my_info(data);
    };
    //--------------------接收数据--------------------
    //扫二维码申请加入俱乐部获取数据
    Game_club_model.prototype.club_join_before = function (data) {
        if (data.reqState == 15) {
            this.popup_float_alert({ "str": "您已经在该俱乐部了!", "timeN": 1000 });
        }
        else if (data.reqState == 18) {
            this.popup_float_alert({ "str": "您已经申请过了!", "timeN": 1000 });
        }
        else if (data.reqState == 23) {
            this.popup_float_alert({ "str": "该俱乐部不存在或已被解散", "timeN": 1500 });
        }
        else {
            var model = new Club_base_model();
            model.clubId = this.current_request_join_club_id;
            model.setParams(data);
            model["back_fun"] = this.sure_join_club_send.bind(this); //zwb:申请加入俱乐部接口500000
            this.m_to_c_dis_event(this.EVENT.club.request_join, model); //申请加入俱乐部弹窗
        }
    };
    //获取某个俱乐部详情
    Game_club_model.prototype.set_club_info = function (data) {
        if (this.scene_status == this.CONST.club.square_scene) {
            //刷新俱乐部广场视图
            if (data)
                this.set_info(data);
        }
        else if (this.scene_status == this.CONST.club.request_join) {
            MyConsole.getInstance().trace("----------当前场景-------------已在俱乐部中", 888888);
        }
    };
    //申请加入俱乐部
    Game_club_model.prototype.sure_join_club_response = function (data) {
        if (data) {
            switch (data.reqState) {
                case 15:
                    this.popup_float_alert({ "str": "您已经在这俱乐部里面了!", "timeN": 1000 });
                    return;
                case 17:
                    this.popup_float_alert({ "str": "申请发送成功 等待回应!", "timeN": 1000 });
                    return;
                case 16:
                    this.popup_float_alert({ "str": "该俱乐部已经人满!", "timeN": 1000 });
                    return;
                case 18:
                    this.popup_float_alert({ "str": "您已经申请过了!", "timeN": 1000 });
                    return;
                default:
                    this.popup_float_alert({ "str": "未知参数!", "timeN": 1000 });
                    return;
            }
        }
        this.popup_float_alert({ "str": "未知异常", "timeN": 1000 });
    };
    //接收我的到俱乐部信息
    Game_club_model.prototype.set_clubs_list_info = function (data) {
        if (data && data.length > 0) {
            this.club_info = [];
            for (var i in data) {
                var model = new Club_base_model();
                model.setParams(data[i]);
                this.club_info.push(model);
            }
            this.m_to_c_dis_event(this.EVENT.club.cut_club_scene);
        }
        else {
            //弹窗提示 还没有加入任何俱乐部
            this.popup_float_alert({ "str": "您还未加入任何俱乐部,快找身边的代理咨询加入方式吧!" });
        }
    };
    //-------俱乐部广场square------
    //申请离开俱乐部---回应socket
    Game_club_model.prototype.sure_leave_club_response = function (data) {
        if (data) {
            switch (data.reqState) {
                case 17:
                    this.popup_float_alert({ "str": "申请发送成功 等待回应!", "timeN": 1500 });
                    this.m_to_c_dis_event(this.EVENT.club.request_leave);
                    return;
                case 18:
                    this.popup_float_alert({ "str": "您已经申请过了!", "timeN": 1500 });
                    return;
                default:
                    this.popup_float_alert({ "str": "未知参数", "timeN": 1500 });
                    return;
            }
        }
        this.popup_float_alert({ "str": "未知异常!", "timeN": 1500 });
    };
    //接收到/去刷新俱乐部数据
    Game_club_model.prototype.set_info = function (data) {
        if (data) {
            this.club_base_info_model.setParams(data); //更新基础信息
            //房间信息
            this.club_room_list = [];
            if (data.roomInfo) {
                for (var i in data.roomInfo) {
                    var model = new Club_room_model();
                    model.setParams(data.roomInfo[i]);
                    this.club_room_list.push(model);
                }
            }
            //更新数据
            this.m_to_c_dis_event(this.EVENT.club.update_square_info, data);
        }
    };
    //俱乐部-通用浮层提示框
    Game_club_model.prototype.popup_float_alert = function (info) {
        this.m_to_c_dis_event(this.EVENT.club.float_alert, info);
    };
    return Game_club_model;
}(Scene_model));
__reflect(Game_club_model.prototype, "Game_club_model");
//# sourceMappingURL=Club_model.js.map