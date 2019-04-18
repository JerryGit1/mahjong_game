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
var Game_club_control = (function (_super) {
    __extends(Game_club_control, _super);
    function Game_club_control(model) {
        var _this = _super.call(this, model, null) || this;
        _this.EVENT = new Game_club_event_model(); //事件常量
        _this.model = model;
        //确认可以从大厅跳转俱乐部
        _this.model.m_to_c_add_event(_this.EVENT.club.cut_club_scene, _this.cut_club_scene, _this); //切换俱乐部
        _this.model.m_to_c_add_event(_this.EVENT.club.request_join, _this.club_request_join, _this); //申请加入俱乐部
        _this.model.m_to_c_add_event(_this.EVENT.club.request_leave, _this.leave_to_main, _this); //申请离开俱乐部
        _this.model.m_to_c_add_event(_this.EVENT.club.float_alert, _this.popup_float_alert, _this); //通用浮层提示框
        _this.model.m_to_c_add_event(_this.EVENT.club.update_square_info, _this.update_square_view, _this); //刷新俱乐部视图
        //接受广播事件
        //大厅通知俱乐部有一个申请加入的俱乐部ID
        _this.c_to_c_add_radio_event(_this.EVENT.base.hall_to_club_join_id, _this.hall_to_club_join_id, _this);
        //大厅通知俱乐部切换到俱乐部场景
        _this.c_to_c_add_radio_event(_this.EVENT.base.hall_to_club_cut_scene, _this.hall_to_club_cut_scene, _this);
        //俱乐部确认加入房间
        _this.c_to_c_add_radio_event(_this.EVENT.base.sure_club_join_room, _this.sure_club_join_room, _this);
        //俱乐部确认创建房间
        _this.c_to_c_add_radio_event(_this.EVENT.base.sure_club_create_room, _this.sure_club_create_room, _this);
        //俱乐部确认我的战绩
        _this.c_to_c_add_radio_event(_this.EVENT.base.club_get_my_info, _this.club_get_my_info, _this);
        //俱乐部-战绩翻页刷新视图
        _this.c_to_c_add_radio_event(_this.EVENT.base.club_update_my_info, _this.club_get_my_info, _this);
        //俱乐部确认申请离开
        _this.c_to_c_add_radio_event(_this.EVENT.base.club_request_leave_popup, _this.club_leave_popup, _this); //申请离开俱乐部
        return _this;
    }
    //添加视图
    Game_club_control.prototype.add_view = function () {
        this.view = new Club_view();
        _super.prototype.add_view.call(this);
        if (this.model.scene_status == this.CONST.club.square_scene) {
            //在俱乐部广场
            this.cut_club_square_scene(this.model.club_base_info_model);
        }
        else {
            this.cut_club_main_scene(); //在这之前已经获取到数据了
        }
        //-------------------事件侦听--------------------
        this.view.v_to_v_add_event(this.EVENT.club.cut_club_square, this.cut_club_square_scene, this);
        this.view.v_to_v_add_event(this.EVENT.club.create_room, this.square_create_popup, this); //创建房间
        this.view.v_to_v_add_event(this.EVENT.club.join_room, this.square_join_popup, this); //加入房间
        this.view.v_to_v_add_event(this.EVENT.club.request_leave, this.square_leave_popup, this); //申请离开
        this.view.v_to_v_add_event(this.EVENT.club.add_my_info, this.add_my_info, this); //我的成绩弹窗
        this.view.v_to_v_add_event(this.EVENT.club.back_hall, this.back_hall_scene, this); //返回大厅
        this.view.v_to_v_add_event(this.EVENT.club.cut_scene, this.back_main, this); //返回俱乐部主页
        this.view.v_to_v_add_event(this.EVENT.club.update_square_info, this.update_square_info, this); //刷新按钮
        this.view.v_to_v_add_event(this.EVENT.club.float_alert, this.popup_float_alert, this); //申请离开俱乐部-浮层文字监听
    };
    //第1步------通过分享ID弹出申请加入俱乐部
    Game_club_control.prototype.hall_to_club_join_id = function (join_club_id) {
        if (join_club_id) {
            //设置场景状态
            this.model.scene_status = this.CONST.club.request_join;
            //走500001接口获取
            this.model.club_request_join_before(join_club_id);
        }
    };
    //第2步------弹出申请加入俱乐部弹窗
    Game_club_control.prototype.club_request_join = function (model) {
        model["back_fun"] = this.sure_join_club_send.bind(this);
        this.c_to_c_event_radio(this.EVENT.base_popup.club_request_join, model);
    };
    //第3步------确认加入俱乐部
    Game_club_control.prototype.sure_join_club_send = function (club_id) {
        this.model.sure_join_club_send(club_id);
    };
    //第4步------大厅通知俱乐部弹出场景
    Game_club_control.prototype.hall_to_club_cut_scene = function (user_id) {
        //判断这个人是否有俱乐部列表
        //设置场景状态
        this.model.scene_status = this.CONST.club.request_cut_main_scene;
        //获取我的俱乐部列表信息
        this.model.get_my_club_list();
    };
    //第5步-----通知game_control 切换俱乐部场景 确认可以从大厅跳转俱乐部
    Game_club_control.prototype.cut_club_scene = function () {
        if (this.model.scene_status == this.CONST.club.request_cut_main_scene) {
            this.model.club_is_open = true; //设置俱乐部开启
            this.model.scene_status = this.CONST.club.main_scene;
            this.c_to_c_dis_event(this.EVENT.base.hall_to_club_cut_scene, this);
        }
        else if (this.model.scene_status == this.CONST.club.square_scene) {
            this.model.scene_status = this.CONST.club.main_scene;
            this.cut_club_main_scene();
        }
        else {
        }
    };
    //第6步-----进入俱乐部主页
    Game_club_control.prototype.cut_club_main_scene = function () {
        this.view.cut_main(this.model.club_info, this.model.get_notice());
    };
    //第7步------进入俱乐部广场
    Game_club_control.prototype.cut_club_square_scene = function (model) {
        this.model.scene_status = this.CONST.club.square_scene;
        this.model.club_base_info_model = model;
        //渲染场景-----特殊情况 视图先出现 再刷新数据
        this.view.cut_square(this.model, this.model.get_notice());
        //获取数据
        this.update_square_info();
        // this.update_square_view();
    };
    //第7.1步-----请求刷新俱乐部广场
    Game_club_control.prototype.update_square_info = function () {
        if (this.model.scene_status == this.CONST.club.square_scene) {
            this.model.get_club_info(this.model.club_base_info_model.clubId);
        }
    };
    //第7.2步-----刷新俱乐部广场视图
    Game_club_control.prototype.update_square_view = function (data) {
        if (this.model.scene_status == this.CONST.club.square_scene) {
            this.view.update_square_info(data);
        }
    };
    //第8步-----弹窗加入某个牌桌
    Game_club_control.prototype.square_join_popup = function (info) {
        var data = {
            roomId: info.roomId,
            userId: info.userId,
            scene_status: this.model.scene_status,
        };
        this.c_to_c_event_radio(this.EVENT.base.join_club_room_popup, data);
    };
    //第8.1步----确认加入某个牌桌--hall
    Game_club_control.prototype.sure_club_join_room = function (info) {
        this.model.club_join_room_send(info.roomId, info.userId);
    };
    //第9步----弹窗创建房间
    Game_club_control.prototype.square_create_popup = function () {
        this.c_to_c_event_radio(this.EVENT.base.create_club_room_popup, this.model.club_base_info_model.clubId);
    };
    //第9.1步--确认创建房间----hall
    Game_club_control.prototype.sure_club_create_room = function (data) {
        this.model.club_create_room_send(data);
    };
    //第10步----弹窗我的战绩
    Game_club_control.prototype.add_my_info = function () {
        var data = {
            clubId: this.model.club_base_info_model.clubId,
            userId: this.model.self_model.userId,
            page: 1,
            date: 1
        };
        this.c_to_c_event_radio(this.EVENT.base.club_my_info_popup, data);
    };
    //第10.1步----确认我的战绩
    Game_club_control.prototype.club_get_my_info = function (data) {
        //请求我的战绩信息
        this.model.set_club_get_my_info(data);
    };
    //第11步----弹窗申请离开
    Game_club_control.prototype.square_leave_popup = function () {
        var data = {
            clubName: this.model.club_base_info_model.clubName,
            clubId: this.model.club_base_info_model.clubId,
        };
        this.c_to_c_event_radio(this.EVENT.base_popup.suqare_leave_popup, data);
    };
    //第11.1步--确认申请离开
    Game_club_control.prototype.club_leave_popup = function () {
        this.model.sure_leave_club_send(this.model.club_base_info_model.clubId);
    };
    //第11.2步--申请离开后返回俱乐部主页
    Game_club_control.prototype.leave_to_main = function () {
        this.model.get_my_club_list();
    };
    //第12步------返回大厅
    Game_club_control.prototype.back_hall_scene = function () {
        this.model.club_is_open = false;
        this.c_to_c_dis_event(this.EVENT.base.club_back_hall_scene, this);
    };
    //第13步------返回俱乐部主页----返回按钮
    Game_club_control.prototype.back_main = function () {
        this.model.get_my_club_list();
    };
    //刷新俱乐部场景---通过按钮和通过定时器去刷新
    Game_club_control.prototype.refresh_main_scene = function (clubId) {
        this.model.get_club_info(clubId);
    };
    //通用浮层提示框
    Game_club_control.prototype.popup_float_alert = function (info) {
        this.c_to_c_event_radio(this.EVENT.base.base_float_alert, info); //通用浮层提示框
    };
    //移除视图
    Game_club_control.prototype.remove_view = function () {
        _super.prototype.remove_view.call(this);
    };
    return Game_club_control;
}(Base_control));
__reflect(Game_club_control.prototype, "Game_club_control");
//# sourceMappingURL=Game_club_control.js.map