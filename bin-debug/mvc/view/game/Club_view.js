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
var Club_view = (function (_super) {
    __extends(Club_view, _super);
    function Club_view() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_club_event_model(); //事件常量
        return _this;
    }
    //-------------------------------------------------------------------
    //切换俱乐部主页
    Club_view.prototype.cut_main = function (club_info, notice) {
        this.clear_scene();
        this.main_view = new Club_main_view(club_info, notice);
        //返回大厅
        this.main_view.v_to_v_add_event(this.EVENT.club.back_hall, this.back_hall, this);
        //跳转广场
        this.main_view.v_to_v_add_event(this.EVENT.club.cut_scene, this.skip_square_scene, this);
        //监听浮层文字
        this.main_view.v_to_v_add_event(this.EVENT.club.float_alert, this.float_alert, this);
        this.addChild(this.main_view);
    };
    //切换广场场景
    Club_view.prototype.cut_square = function (club_info, notice) {
        this.clear_scene();
        this.square_view = new Club_square_view(club_info, notice);
        //返回主页
        this.square_view.v_to_v_add_event(this.EVENT.club.cut_scene, this.back_main, this);
        //创建房间监听
        this.square_view.v_to_v_add_event(this.EVENT.club.create_room, this.square_create_popup, this);
        //加入房间监听
        this.square_view.v_to_v_add_event(this.EVENT.club.join_room, this.square_join_popup, this);
        //申请离开俱乐部
        this.square_view.v_to_v_add_event(this.EVENT.club.request_leave, this.square_leave_popup, this);
        //我的成绩弹窗
        this.square_view.v_to_v_add_event(this.EVENT.club.add_my_info, this.add_my_info, this);
        //刷新按钮
        this.square_view.v_to_v_add_event(this.EVENT.club.update_square_info, this.refresh_main_scene, this);
        this.addChild(this.square_view);
    };
    //跳转 广场场景
    Club_view.prototype.skip_square_scene = function (model) {
        this.v_to_v_dis_event(this.EVENT.club.cut_club_square, model);
    };
    //俱乐部创建房间
    Club_view.prototype.square_create_popup = function () {
        this.v_to_v_dis_event(this.EVENT.club.create_room);
    };
    //俱乐部加入房间
    Club_view.prototype.square_join_popup = function (info) {
        this.v_to_v_dis_event(this.EVENT.club.join_room, info);
    };
    //申请离开俱乐部
    Club_view.prototype.square_leave_popup = function () {
        this.v_to_v_dis_event(this.EVENT.club.request_leave);
    };
    //俱乐部-我的成绩弹窗
    Club_view.prototype.add_my_info = function () {
        this.v_to_v_dis_event(this.EVENT.club.add_my_info);
    };
    //刷新俱乐部场景---通过按钮和通过定时器去刷新
    Club_view.prototype.refresh_main_scene = function (clubId) {
        this.v_to_v_dis_event(this.EVENT.club.update_square_info, clubId);
    };
    //清理场景
    Club_view.prototype.clear_scene = function () {
        if (this.main_view) {
            //返回大厅
            this.main_view.v_to_v_remove_event(this.EVENT.club.back_hall);
            //跳转广场
            this.main_view.v_to_v_remove_event(this.EVENT.club.cut_scene);
            this.main_view.clear();
            this.removeChild(this.main_view);
            this.main_view = null;
        }
        if (this.square_view) {
            //返回主页
            this.square_view.v_to_v_remove_event(this.EVENT.club.cut_scene);
            this.square_view.clear();
            this.removeChild(this.square_view);
            this.square_view = null;
        }
    };
    //-------------------------事件
    // 返回大厅
    Club_view.prototype.back_hall = function () {
        this.v_to_v_dis_event(this.EVENT.club.back_hall);
    };
    //刷新俱乐部广场视图
    Club_view.prototype.update_square_info = function (data) {
        this.square_view.update_square_info(data);
    };
    //返回俱乐部首页
    Club_view.prototype.back_main = function () {
        this.v_to_v_dis_event(this.EVENT.club.cut_scene);
    };
    //监听浮层文字回调
    Club_view.prototype.float_alert = function (info) {
        this.v_to_v_dis_event(this.EVENT.club.float_alert, info);
    };
    Club_view.prototype.clear = function () {
        this.clear_scene();
        _super.prototype.clear.call(this);
    };
    return Club_view;
}(Base_view));
__reflect(Club_view.prototype, "Club_view");
//# sourceMappingURL=Club_view.js.map