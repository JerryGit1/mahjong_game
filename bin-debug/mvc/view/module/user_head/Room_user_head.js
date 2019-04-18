var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
var Room_user_head = (function (_super) {
    __extends(Room_user_head, _super);
    function Room_user_head(user_model) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        _this.model = user_model;
        //基础头像
        _this.base_head_view = new User_head_view();
        _this.addChild(_this.base_head_view);
        _this.base_head_view.create_rect_head(70, 70, "head_bg");
        //点击
        _this.base_head_view.touchEnabled = true;
        _this.base_head_view.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.head_click, _this);
        //踢人按钮显示
        _this.model.m_to_c_add_event(_this.EVENT.user.set_tiren_btn, _this.update_kicking_btn, _this);
        //在线状态切换
        _this.model.m_to_c_add_event(_this.EVENT.user.update_online_status, _this.update_off_line_icon, _this);
        return _this;
    }
    //--------------------------更新视图----------------------------
    //更新基础信息--断线重连
    Room_user_head.prototype.update_base_info = function () {
        if (this.model.current_table_board_is_join) {
            //头像信息
            this.base_head_view.update_head_url(this.model.userImg);
            //昵称
            this.update_nick_name(this.model.userName);
            //分数
            this.update_score(this.model.score + "");
            //房主icon
            if (this.model.houseOwner)
                this.update_house_icon();
            //庄icon
            this.update_zhuang_icon(this.model.zhuang);
            //线上状态
            this.update_off_line_icon(this.model.state);
        }
        else {
            //头像信息
            this.base_head_view.update_head_url();
            //昵称
            this.update_nick_name("待入座..");
            //分数
            this.update_score();
            //庄icon
            this.update_zhuang_icon(false);
            //线上状态
            this.update_off_line_icon(true);
        }
    };
    //杠的时候----更新玩家分数
    Room_user_head.prototype.update_current_score = function () {
        this.update_score(this.model.score + "");
    };
    //更新昵称
    Room_user_head.prototype.update_nick_name = function (user_name) {
        if (user_name === void 0) { user_name = ""; }
        if (!this.nick_name_txt) {
            var sp = new egret.Sprite();
            this.addChild(sp);
            var bg = this.set_bit_center("g_name_bg", false);
            sp.addChild(bg);
            bg.x = -3;
            this.nick_name_txt = new egret.TextField();
            sp.addChild(this.nick_name_txt);
            this.nick_name_txt.size = 14;
            this.nick_name_txt.width = this.base_head_view.width;
            this.nick_name_txt.textAlign = "center";
            sp.y = this.base_head_view.height / 2 - 22;
            sp.x = -this.base_head_view.width / 2;
            this.nick_name_txt.y = 3;
        }
        this.nick_name_txt.text = user_name;
    };
    Room_user_head.prototype.update_score = function (score) {
        if (score === void 0) { score = ""; }
        if (!this.score_txt) {
            this.score_bg = this.set_bit_center("g_name_bg", true);
            this.addChild(this.score_bg);
            this.score_bg.y = 50;
            this.score_txt = new egret.TextField();
            this.addChild(this.score_txt);
            this.score_txt.width = this.base_head_view.width;
            this.score_txt.x = -this.base_head_view.width / 2;
            this.score_txt.textAlign = "center";
            this.score_txt.y = 43;
            this.score_txt.textColor = 0xffe868;
            this.score_txt.size = 15;
        }
        if (this.model.current_table_board_is_join) {
            this.score_bg.visible = this.score_txt.visible = true;
            this.score_txt.text = score;
        }
        else {
            this.score_bg.visible = this.score_txt.visible = false;
        }
    };
    //更新房主ICON
    Room_user_head.prototype.update_house_icon = function () {
        if (!this.house_icon) {
            this.house_icon = this.set_bit_center("g_host");
            this.addChild(this.house_icon);
            this.house_icon.x = 30;
            this.house_icon.y = -34;
        }
    };
    //更新庄ICON
    Room_user_head.prototype.update_zhuang_icon = function (_vis) {
        if (!this.zhuang_icon) {
            this.zhuang_icon = this.set_bit_center("g_zhuang");
            this.addChild(this.zhuang_icon);
            this.zhuang_icon.x = -26;
            this.zhuang_icon.y = -28;
        }
        this.zhuang_icon.visible = _vis;
    };
    //更新离线提示ICON
    Room_user_head.prototype.update_off_line_icon = function (_vis) {
        if (!this.off_line_icon) {
            this.off_line_icon = this.set_bit_center("g_u_off-line");
            this.addChildAt(this.off_line_icon, 2);
        }
        if (_vis == 1)
            this.off_line_icon.visible = false;
        else
            this.off_line_icon.visible = true;
    };
    //显示踢人按钮
    Room_user_head.prototype.update_kicking_btn = function (_vis) {
        if (!this.kicking_btn) {
            this.kicking_btn = new MyButton("g_kicking");
            this.addChild(this.kicking_btn);
            this.kicking_btn.addTouchEvent();
            this.kicking_btn.x = 35;
            this.kicking_btn.y = -31;
            this.kicking_btn.addEventListener("click", this.kicking_btn_click, this);
        }
        this.kicking_btn.visible = _vis;
    };
    //--------------------------事件----------------------------
    Room_user_head.prototype.head_click = function () {
        //查看用户详情
        this.v_to_v_dis_event(this.EVENT.room_popup.look_user_info, this.model.userId);
    };
    Room_user_head.prototype.kicking_btn_click = function () {
        //踢人
        var info = {
            userId: this.model.userId,
            user_name: this.model.userName
        };
        this.v_to_v_dis_event(this.EVENT.room_popup.kicking_user, info);
    };
    Room_user_head.prototype.clear = function () {
        if (this.kicking_btn) {
            this.kicking_btn.clear();
            this.kicking_btn.removeEventListener("click", this.kicking_btn_click, this);
        }
        this.base_head_view.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.head_click, this);
        this.model.m_to_c_remove_event(this.EVENT.user.set_tiren_btn, this.update_kicking_btn, this);
        _super.prototype.clear.call(this);
    };
    return Room_user_head;
}(Base_view));
__reflect(Room_user_head.prototype, "Room_user_head");
//# sourceMappingURL=Room_user_head.js.map