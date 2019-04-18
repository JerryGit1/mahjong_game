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
var Game_control = (function (_super) {
    __extends(Game_control, _super);
    function Game_control(model, view) {
        var _this = _super.call(this, model, view) || this;
        _this.EVENT = new Game_event_model(); //事件常量
        /*zpb:显示大厅场景*/
        _this.a = 1;
        // this.model=model;
        //zpb:游戏层 侦听切换 大厅/房间 场景事件
        _this.model.m_to_c_add_event(_this.EVENT.game.cut_hall_scene, _this.cut_scene, _this);
        _this.model.m_to_c_add_event(_this.EVENT.game.cut_room_scene, _this.cut_scene, _this);
        _this.model.m_to_c_add_event(_this.EVENT.game.cut_club_scene, _this.cut_scene, _this);
        //分享链接--回放
        _this.model.m_to_c_add_event(_this.EVENT.game.share_play_game_back, _this.popup_playback_cut_game, _this);
        _this.hall_control = new Game_hall_control(_this.model.hall_model);
        _this.hall_control.c_to_c_add_event(_this.EVENT.base.parent_add_view, _this.add_child_view, _this);
        _this.hall_control.c_to_c_add_event(_this.EVENT.base.parent_remove_view, _this.remove_child_view, _this);
        _this.room_control = new Game_room_control(_this.model.room_model);
        _this.room_control.c_to_c_add_event(_this.EVENT.base.parent_add_view, _this.add_child_view, _this);
        _this.room_control.c_to_c_add_event(_this.EVENT.base.parent_remove_view, _this.remove_child_view, _this);
        //返回大厅
        _this.room_control.c_to_c_add_event(_this.EVENT.game.game_back_hall_scene, _this.game_back_hall_scene, _this);
        _this.club_control = new Game_club_control(_this.model.club_model);
        _this.club_control.c_to_c_add_event(_this.EVENT.base.parent_add_view, _this.add_child_view, _this);
        _this.club_control.c_to_c_add_event(_this.EVENT.base.parent_remove_view, _this.remove_child_view, _this);
        _this.club_control.c_to_c_add_event(_this.EVENT.base.hall_to_club_cut_scene, _this.hall_to_club_cut_scene, _this);
        _this.club_control.c_to_c_add_event(_this.EVENT.base.club_back_hall_scene, _this.club_back_hall_scene, _this);
        //----------------------------------------事件广播-----------------------------------------------
        //创建房间成功
        _this.c_to_c_add_radio_event(_this.EVENT.base.popup_create_room_ok, _this.popup_create_room_ok, _this);
        //加入房间成功
        _this.c_to_c_add_radio_event(_this.EVENT.base.popup_join_room_ok, _this.popup_join_room_ok, _this);
        //加入房间失败
        _this.c_to_c_add_radio_event(_this.EVENT.base.popup_join_room_fail, _this.popup_join_room_fail, _this);
        //大结算返回大厅;
        _this.c_to_c_add_radio_event(_this.EVENT.base.DJS_back_hall, _this.DJS_back_hall, _this);
        //回放进入游戏
        _this.c_to_c_add_radio_event(_this.EVENT.base.playback_cut_game, _this.popup_playback_cut_game, _this);
        //回放返回游戏
        _this.c_to_c_add_radio_event(_this.EVENT.game.game_play_back_hall_scene, _this.game_play_back_hall_scene, _this);
        return _this;
        //this.c_to_c_add_radio_event(this.EVENT.pop_to_game.show_player_back,);
    }
    /*zpb:切换场景*/
    Game_control.prototype.cut_scene = function (e, type) {
        switch (type) {
            case this.EVENT.game.cut_hall_scene:
                //加载基础资源
                this.c_to_c_dis_event(this.EVENT.base.load_resource_start, {
                    name: "hall",
                    back_fun: this.add_hall.bind(this)
                });
                break;
            case this.EVENT.game.cut_room_scene:
                //加载基础资源
                this.c_to_c_dis_event(this.EVENT.base.load_resource_start, {
                    name: "game",
                    back_fun: this.add_room.bind(this)
                });
                break;
            case this.EVENT.game.cut_club_scene:
                //加载基础资源
                this.c_to_c_dis_event(this.EVENT.base.load_resource_start, {
                    name: "club",
                    back_fun: this.add_club.bind(this)
                });
                break;
        }
    };
    Game_control.prototype.add_hall = function () {
        this.clear_scene(); //清空场景
        MyConsole.getInstance().trace("game_control 渲染大厅场景", 6);
        this.hall_control.add_view();
        // if(this.a==1){//回放测试示例
        //     this.popup_playback_cut_game({
        //         file_url:"resource/辅助文件/20180521175908-876239-1.txt",//20180521171852-418575-1.txt",//
        //         share_user_id:1111
        //     });
        //     this.a=2;
        // }
    };
    /*zpb:显示游戏场景*/
    Game_control.prototype.add_room = function () {
        this.clear_scene(); //清空场景
        this.model.room_model.room_load_state = this.CONST.ROOM_LOAD_STATUS.LOAD_OK;
        MyConsole.getInstance().trace("game_control 渲染游戏场景", 6);
        this.room_control.add_view();
    };
    /*zpb:显示俱乐部场景*/
    Game_control.prototype.add_club = function () {
        this.clear_scene(); //清空场景
        MyConsole.getInstance().trace("渲染俱乐部场景", 3);
        this.club_control.add_view();
    };
    //zwb:游戏场景返回大厅场景
    Game_control.prototype.game_back_hall_scene = function () {
        this.model.room_model.clear_room_info(); //zpb:房间数据清理
        this.model.set_game_scene({});
    };
    //zwb:确认发起大厅--跳转俱乐部
    Game_control.prototype.hall_to_club_cut_scene = function () {
        this.model.set_game_scene({});
    };
    //zwb:确认发起俱乐部--返回大厅
    Game_control.prototype.club_back_hall_scene = function () {
        this.model.set_game_scene({});
    };
    //来自popup----创建房间成功;
    Game_control.prototype.popup_create_room_ok = function (data) {
        this.model.create_room_ok(data);
    };
    //来自popup----加入房间成功;
    Game_control.prototype.popup_join_room_ok = function (data) {
        this.model.join_room_ok(data);
    };
    //来自popup----加入房间失败;
    Game_control.prototype.popup_join_room_fail = function () {
        this.model.join_room_fail();
    };
    //来自popup---回放进入游戏
    Game_control.prototype.popup_playback_cut_game = function (info) {
        //file_url 文件地址 ps:resource/辅助文件/20180508184006-106034-1.txt
        //share_user_id 第一人称视角玩家ID 没有默认第一个
        this.room_control.set_play_back_info(info.file_url, info.share_user_id, function (main_info) {
            this.CONST.PLAYBACK_MODEL = true;
            this.model.play_back_start(main_info);
        }.bind(this));
    };
    //回放结束---返回大厅
    Game_control.prototype.game_play_back_hall_scene = function () {
        this.CONST.PLAYBACK_MODEL = false;
        this.model.room_model.clear_room_info(); //zpb:房间数据清理
        this.model.set_game_scene({}); //切换场景
    };
    //大结算返回大厅;
    Game_control.prototype.DJS_back_hall = function () {
        this.model.room_model.clear_room_info(); //zpb:房间数据清理
        this.model.join_room_fail();
    };
    Game_control.prototype.clear_scene = function () {
        this.room_control.remove_view();
        this.hall_control.remove_view();
        this.club_control.remove_view();
        //清空动画
        this.c_to_c_event_radio(this.EVENT.base.clear_ani_scene);
        //清空弹窗
        this.c_to_c_event_radio(this.EVENT.base.clear_popup_scene);
    };
    return Game_control;
}(Base_control));
__reflect(Game_control.prototype, "Game_control");
//# sourceMappingURL=Game_control.js.map