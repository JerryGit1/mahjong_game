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
 * 俱乐部-我的战绩
 */
var Club_my_info_popup = (function (_super) {
    __extends(Club_my_info_popup, _super);
    function Club_my_info_popup(data) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Game_club_event_model(); //事件常量
        _this.button_type = "c_info_today"; //页面类型 今日 昨日
        _this.current_page = 1; //当前页数
        _this.userId = data.userId;
        _this.clubId = data.clubId;
        _this.popup_name = "club_my_info"; //删除事件用
        _this.add_center_bg("c_m_bg", 1101, 544); //弹框
        _this.add_img_title("l_prompt_img", { x: 585, y: Main.stageHeight - 150 }); //左右滑动，查看列表
        _this.finger_img(); //滑动-手
        _this.open_ani(); //弹窗动画效果
        _this.c_back_btn = new MyButton("c_back_btn"); //关闭按钮
        _this.center_sp.addChild(_this.c_back_btn);
        _this.c_back_btn.x = 50;
        _this.c_back_btn.y = -20;
        _this.c_back_btn.addTouchEvent();
        _this.c_back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.close_click, _this);
        //今日总分
        var sp1 = new egret.Sprite();
        _this.center_sp.addChild(sp1);
        sp1.x = 188;
        sp1.y = 520;
        var bg1 = _this.set_bit_center("c_score_icon");
        bg1.touchEnabled = true;
        bg1.x = -42 - 40;
        bg1.y = -162 + 215;
        sp1.addChild(bg1);
        //今日局数
        var sp2 = new egret.Sprite();
        _this.center_sp.addChild(sp2);
        sp2.x = 188;
        sp2.y = 520;
        var bg2 = _this.set_bit_center("c_ju_icon");
        bg2.touchEnabled = true;
        bg2.x = Main.stageWidth - 330;
        bg2.y = -162 + 215;
        sp2.addChild(bg2);
        //今日-昨日切换按钮
        var day_or_yesterday_btn = new MyButton("c_today_btn");
        day_or_yesterday_btn.x = Main.stageWidth / 2;
        day_or_yesterday_btn.y = -24;
        day_or_yesterday_btn.addTouchEvent();
        day_or_yesterday_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.change_button_type, _this);
        _this.center_sp.addChild(day_or_yesterday_btn);
        //俱乐部-战绩-今日view
        _this.view_today = new Club_achievement_list_today(data);
        _this.view_today.v_to_v_add_event(_this.EVENT.base_popup.club_play_back_info, _this.play_back_info_pop, _this); //回放popup
        _this.view_today.v_to_v_add_event(_this.EVENT.base_popup.share, _this.share_pop, _this); //分享popup
        _this.center_sp.addChild(_this.view_today);
        //俱乐部-战绩-昨日view
        _this.view_yesterday = new Club_achievement_list_yesterday(data);
        _this.view_yesterday.v_to_v_add_event(_this.EVENT.base_popup.club_play_back_info, _this.play_back_info_pop, _this); //回放popup
        _this.view_yesterday.v_to_v_add_event(_this.EVENT.base_popup.share, _this.share_pop, _this); //分享popup
        _this.center_sp.addChild(_this.view_yesterday);
        _this.view_yesterday.visible = false;
        return _this;
    }
    Club_my_info_popup.prototype.change_button_type = function (e) {
        var btn = e.currentTarget;
        if (this.button_type == "c_info_today") {
            this.button_type = "c_info_yesterday";
            btn.changTexture("c_yesterday_btn");
            this.view_today.visible = false;
            this.view_yesterday.visible = true;
        }
        else {
            this.button_type = "c_info_today";
            btn.changTexture("c_today_btn");
            this.view_today.visible = true;
            this.view_yesterday.visible = false;
        }
        var data = {
            page: this.current_page,
            clubId: this.clubId,
            userId: this.userId,
            date: this.button_type == "c_info_yesterday" ? 0 : 1
        };
        this.date = data.date;
        this.v_to_v_dis_event(this.EVENT.base.club_get_my_info, data);
    };
    //添加战绩数据--今日/昨日;
    Club_my_info_popup.prototype.add_club_record_list = function (info) {
        if (this.date == 0) {
            this.view_yesterday.add_club_yesterday_list(info);
        }
        else {
            this.view_today.add_club_today_list(info);
        }
        if (!this.day_score_txt) {
            //今日总分
            this.day_score_txt = this.create_txt(158, 564, "", info.score, 0xff0000);
            this.day_score_txt.touchEnabled = true;
        }
        if (!this.day_game_num_txt) {
            //今日局数
            this.day_game_num_txt = this.create_txt(1052, 563, "", info.juNum, 0xff7f00);
            this.day_game_num_txt.touchEnabled = true;
        }
    };
    //显示回放pop;
    Club_my_info_popup.prototype.play_back_info_pop = function (data) {
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.base_popup.club_play_back_info, data);
    };
    //分享pop
    Club_my_info_popup.prototype.share_pop = function () {
        this.v_to_v_dis_event(this.EVENT.base_popup.share);
    };
    //通用文本
    Club_my_info_popup.prototype.create_txt = function (x, y, sp, str, color) {
        if (sp === void 0) { sp = null; }
        if (str === void 0) { str = ""; }
        if (color === void 0) { color = 0xff0000; }
        var txt = new egret.TextField();
        txt.size = 25;
        txt.x = x;
        txt.y = y;
        txt.textColor = color;
        txt.text = str;
        this.center_sp.addChild(txt);
        return txt;
    };
    //手指动画
    Club_my_info_popup.prototype.finger_img = function () {
        //手指;
        var finger_img = new egret.Bitmap(RES.getRes("p_hand_icon"));
        finger_img.anchorOffsetX = finger_img.width / 2;
        finger_img.anchorOffsetY = finger_img.height / 2;
        finger_img.x = Main.stageWidth / 2;
        finger_img.y = Main.stageHeight - 30;
        this.addChild(finger_img);
        //手指拖动动画;
        setTimeout(function () {
            egret.Tween.get(finger_img).to({ x: Main.stageWidth / 2 - 120 }, 300).wait(500).to({ x: Main.stageWidth / 2 + 140 }, 300).wait(500).to({ x: Main.stageWidth / 2 }, 300).wait(300).
                to({ scaleX: 1.5, scaleY: 1.5, }, 300).to({ scaleX: 1, scaleY: 1, }, 300).to({ scaleX: 1.5, scaleY: 1.5, }, 300).to({ scaleX: 0.6, scaleY: 0.6, y: Main.stageHeight - 40 }, 300).call(function () {
                // finger_img.scaleX=0.6;
                // finger_img.scaleY=0.6;
            }, this);
        }.bind(this), 600);
    };
    return Club_my_info_popup;
}(Base_popup));
__reflect(Club_my_info_popup.prototype, "Club_my_info_popup");
//# sourceMappingURL=Club_my_info_popup.js.map