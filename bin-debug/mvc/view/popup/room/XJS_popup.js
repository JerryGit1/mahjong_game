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
//小结算
var XJS_popup = (function (_super) {
    __extends(XJS_popup, _super);
    function XJS_popup(model) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this._is_btn_click = false;
        _this.model = model;
        //背景
        _this.add_bg();
        //房间号和圈数
        _this.add_room_info();
        //胜利/失败/流局标题
        _this.add_game_type();
        //混牌
        if (_this.model.hun_model)
            _this.add_hun_pai();
        //玩法
        _this.add_rule();
        //用户信息
        _this.add_user_info();
        //底部按钮
        _this.add_btn();
        //游戏标题和时间
        _this.add_game_logo();
        return _this;
    }
    XJS_popup.prototype.add_bg = function () {
        var bg = this.set_bit_center(this.model.hu_type == 1 ? ("g_settle_bg_win") : ("g_settle_bg_fail"), false);
        this.center_sp.addChild(bg);
    };
    XJS_popup.prototype.add_room_info = function () {
        //房间号
        var room_id_title = new egret.BitmapText();
        room_id_title.font = RES.getRes("room_num");
        room_id_title.letterSpacing = -9;
        room_id_title.x = 10;
        room_id_title.y = 14;
        room_id_title.text = "d";
        this.center_sp.addChild(room_id_title);
        var room_id_txt = new egret.BitmapText();
        room_id_txt.font = RES.getRes("room_num");
        room_id_txt.letterSpacing = -9;
        room_id_txt.x = 80;
        room_id_txt.y = 14;
        room_id_txt.text = "" + this.model.room_id;
        this.center_sp.addChild(room_id_txt);
        //圈数
        var game_num_title = new egret.BitmapText();
        game_num_title.font = RES.getRes("room_num");
        game_num_title.letterSpacing = -9;
        game_num_title.x = 10;
        game_num_title.y = 48;
        game_num_title.text = "c";
        this.center_sp.addChild(game_num_title);
        var game_num_txt = new egret.BitmapText();
        game_num_txt.font = RES.getRes("room_num");
        game_num_txt.letterSpacing = -9;
        game_num_txt.x = 82;
        game_num_txt.y = 48;
        game_num_txt.text = "" + this.model.quan_num;
        this.center_sp.addChild(game_num_txt);
        //计分方式
        var score_type = new egret.Bitmap(RES.getRes("g_scoreType_" + this.model.score_type));
        score_type.x = 10;
        score_type.y = 82;
        this.center_sp.addChild(score_type);
    };
    XJS_popup.prototype.add_game_type = function () {
        var title = this.set_bit_center("g_xjs_t_" + this.model.hu_type);
        this.center_sp.addChild(title);
        title.x = Main.stageWidth / 2;
        title.y = 92;
        //zwb:1胜利 2失败 3流局  音效
        if (this.model.hu_type == 1) {
            Sound_model.playSoundEffect("xjs_win_sound");
        }
        else if (this.model.hu_type == 2) {
            Sound_model.playSoundEffect("xjs_loss_sound");
        }
        else {
            Sound_model.playSoundEffect("xjs_liuju_sound");
        }
    };
    XJS_popup.prototype.add_hun_pai = function () {
        var hun_title = new egret.Bitmap(RES.getRes("g_settle_hun"));
        hun_title.x = 966;
        hun_title.y = 70;
        this.center_sp.addChild(hun_title);
        var hun_card = new Base_card_view(this.model.hun_model, 60);
        this.center_sp.addChild(hun_card);
        hun_card.x = 1036;
        hun_card.y = 24;
        var hun_icon = this.set_bit_center("g_hun_icon"); //zwb:xjs 搭子牌右上角添加角标
        hun_icon.x = hun_card.x + hun_card.width - hun_icon.width + 7;
        hun_icon.y = hun_card.y + hun_icon.height;
        this.addChild(hun_icon);
    };
    XJS_popup.prototype.add_rule = function () {
        var r_bg = this.set_bit_center("g_xjs_r_bg_" + (this.model.hu_type == 1 ? 1 : 2), false);
        this.center_sp.addChild(r_bg);
        r_bg.x = 29;
        r_bg.y = 120;
        var rule_txt = new egret.TextField();
        rule_txt.textColor = 0xfce0b9;
        rule_txt.size = 19;
        rule_txt.text = "勾选玩法:" + this.model.rule_tips;
        this.center_sp.addChild(rule_txt);
        rule_txt.x = 33;
        rule_txt.y = 125;
    };
    XJS_popup.prototype.add_user_info = function () {
        var max_h = (Main.stageHeight - 158 - 87) / 4; //最大间隔
        var dis_h = max_h < 120 ? 120 : max_h;
        var cover_gang = [];
        for (var i in this.model.user_list_model) {
            cover_gang.push(this.model.user_list_model[i].cpg_stop_card);
            var xjs_view = new XJS_user_view(this.model.user_list_model[i], cover_gang);
            xjs_view.y = 158 + Number(i) * dis_h;
            this.center_sp.addChild(xjs_view);
        }
    };
    XJS_popup.prototype.add_btn = function () {
        this.next_btn = new MyButton("g_xjs_b_next", 2);
        this.center_sp.addChild(this.next_btn);
        this.next_btn.x = Main.stageWidth / 2;
        this.next_btn.y = Main.stageHeight - this.next_btn.height / 2 - 18;
        this.next_btn.addTouchEvent();
        this.next_btn.addEventListener("click", this.next_btn_click, this);
    };
    XJS_popup.prototype.next_btn_click = function () {
        if (this._is_btn_click)
            return;
        this._is_btn_click = true;
        this.next_btn.clear();
        this.v_to_v_dis_event(this.EVENT.popup_room.XJS_wait_ok);
        this.close_click();
    };
    XJS_popup.prototype.add_game_logo = function () {
        var game_logo = this.set_bit_center("g_logo");
        this.center_sp.addChild(game_logo);
        game_logo.x = Main.stageWidth - game_logo.width / 2;
        game_logo.y = Main.stageHeight - 60;
        var time_txt = new egret.TextField();
        time_txt.text = this.model.time;
        time_txt.size = 19;
        time_txt.textColor = 0xD29C56;
        this.center_sp.addChild(time_txt);
        time_txt.x = 948;
        time_txt.y = Main.stageHeight - 35;
    };
    return XJS_popup;
}(Base_popup));
__reflect(XJS_popup.prototype, "XJS_popup");
//# sourceMappingURL=XJS_popup.js.map