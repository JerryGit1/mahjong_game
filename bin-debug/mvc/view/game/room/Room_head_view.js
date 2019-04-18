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
var Room_heads_view = (function (_super) {
    __extends(Room_heads_view, _super);
    function Room_heads_view(user_group_model) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        //头像组
        _this.user_views = [];
        _this.init_view(user_group_model);
        return _this;
    }
    Room_heads_view.prototype.init_view = function (user_group_model) {
        this.add_user_list(user_group_model);
        this.init_right_btn();
        this.add_marquee_view();
    };
    //头像列表
    Room_heads_view.prototype.add_user_list = function (user_group_model) {
        for (var i = 1; i <= 4; i++) {
            var view = new Room_user_head(user_group_model.position_id_get_user_model(i));
            this.user_views.push(view);
            this.addChild(view);
            view.v_to_v_add_event(this.EVENT.room_popup.look_user_info, this.look_user_info, this);
            view.v_to_v_add_event(this.EVENT.room_popup.kicking_user, this.kicking_user, this);
        }
        this.update_head_pos(this.CONST.HEAD_POS_wait);
    };
    //右侧按钮
    Room_heads_view.prototype.init_right_btn = function () {
        //设置按钮
        this.right_setting_btn = new MyButton("g_settingBtn");
        this.addChild(this.right_setting_btn);
        this.right_setting_btn.x = Main.stageWidth - this.right_setting_btn.width / 2 - 10;
        this.right_setting_btn.y = 50;
        //玩法提示按钮
        this.rule_btn = new MyButton("g_helpInfoBtn");
        this.addChild(this.rule_btn);
        this.rule_btn.x = this.right_setting_btn.x;
        this.rule_btn.y = 138;
        //定位按钮
        this.location_btn = new MyButton("locationBtn");
        this.addChild(this.location_btn);
        this.location_btn.x = this.right_setting_btn.x;
        this.location_btn.y = Main.stageHeight * .6;
        //聊天按钮
        this.chitchat_btn = new MyButton("g_chatBtn");
        this.addChild(this.chitchat_btn);
        this.chitchat_btn.x = this.right_setting_btn.x;
        this.chitchat_btn.y = this.location_btn.y + this.location_btn.height + 10;
        this.right_setting_btn.addTouchEvent();
        this.right_setting_btn.addEventListener("click", this.setting_btn_click, this); //设置按钮
        this.location_btn.addTouchEvent();
        this.location_btn.addEventListener("click", this.location_btn_click, this); //定位按钮
        this.chitchat_btn.addTouchEvent();
        this.chitchat_btn.addEventListener("click", this.chitchat_btn_click, this); //聊天按钮
        this.rule_btn.addTouchEvent();
        this.rule_btn.addEventListener("click", this.rule_btn_click, this); //玩法提示按钮
        this.set_rule_btn();
    };
    //跑马灯
    Room_heads_view.prototype.add_marquee_view = function () {
        this.marquee_view = new Marquee_view();
        this.addChild(this.marquee_view);
        this.marquee_view.x = Main.stageWidth / 2 - this.marquee_view.width / 2;
        this.marquee_view.y = 10;
        // this.marquee_view.visible = false;
        this.marquee_view.set_text_by_times(this.CONST.marquee_tips, 30);
    };
    //--------------------------更新------------------------
    //更新头像坐标
    Room_heads_view.prototype.update_head_pos = function (pos_list) {
        for (var i in this.user_views) {
            this.user_views[i].x = pos_list[i].x;
            this.user_views[i].y = pos_list[i].y;
        }
    };
    //更新玩家基础信息
    Room_heads_view.prototype.update_base_view = function () {
        for (var i in this.user_views) {
            this.user_views[i].update_base_info();
        }
    };
    //更新玩家实时分数
    Room_heads_view.prototype.update_score = function () {
        for (var i in this.user_views) {
            this.user_views[i].update_current_score();
        }
    };
    //设置规则按钮
    Room_heads_view.prototype.set_rule_btn = function (_is) {
        if (_is === void 0) { _is = false; }
        this.rule_btn.visible = _is;
    };
    //回放
    Room_heads_view.prototype.set_playback = function () {
        this.right_setting_btn.visible = false;
        this.location_btn.visible = false;
        this.chitchat_btn.visible = false;
        this.rule_btn.visible = false;
    };
    // //更新跑马灯内容
    // public set_marquee_tips(str){
    //     this.marquee_view.visible = true;
    //     this.marquee_view.set_notice_round_play(str,3);
    // }
    //--------------------------事件-------------------------
    Room_heads_view.prototype.setting_btn_click = function () {
        //设置弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.setup_popup);
    };
    Room_heads_view.prototype.location_btn_click = function () {
        //定位弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.location);
    };
    Room_heads_view.prototype.chitchat_btn_click = function () {
        //聊天弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.chitchat);
    };
    Room_heads_view.prototype.rule_btn_click = function () {
        //规则弹窗
        this.v_to_v_dis_event(this.EVENT.room_popup.rule, { x: this.rule_btn.x, y: this.rule_btn.y });
    };
    Room_heads_view.prototype.look_user_info = function (user_id) {
        //查看用户详情
        this.v_to_v_dis_event(this.EVENT.room_popup.look_user_info, user_id);
    };
    Room_heads_view.prototype.kicking_user = function (info) {
        //踢人
        this.v_to_v_dis_event(this.EVENT.room_popup.kicking_user, info);
    };
    Room_heads_view.prototype.set_touch_event = function (bl) {
        for (var i = 0; i < this.numChildren - 1; i++) {
            if (this.getChildAt(i)["cutTouchEvent"]) {
                if (bl) {
                    this.getChildAt(i)["addTouchEvent"]();
                }
                else {
                    this.getChildAt(i)["cutTouchEvent"]();
                }
            }
        }
    };
    Room_heads_view.prototype.clear = function () {
        this.right_setting_btn.clear();
        this.right_setting_btn.removeEventListener("click", this.setting_btn_click, this);
        this.location_btn.clear();
        this.location_btn.removeEventListener("click", this.location_btn_click, this);
        this.chitchat_btn.clear();
        this.chitchat_btn.removeEventListener("click", this.chitchat_btn_click, this);
        for (var i in this.user_views) {
            var view = this.user_views[i];
            view.v_to_v_remove_event(this.EVENT.room_popup.look_user_info, this.look_user_info, this);
            view.clear();
        }
        _super.prototype.clear.call(this);
    };
    return Room_heads_view;
}(Base_view));
__reflect(Room_heads_view.prototype, "Room_heads_view");
//# sourceMappingURL=Room_head_view.js.map