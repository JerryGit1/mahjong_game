/**
 * Created by pc-20171125 on 2018/5/4.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//大结算;
var Big_settle_popup = (function (_super) {
    __extends(Big_settle_popup, _super);
    function Big_settle_popup(model) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.model = model;
        _this.init_view();
        _this.init_content();
        _this.add_game_logo();
        return _this;
    }
    Big_settle_popup.prototype.init_view = function () {
        this.add_center_bg("g_settle_bg_1", 1136, 720);
        this.add_img_title("settle_title", { x: 568, y: 90 });
        this.open_ani();
        //中间背景;
        var content_bg = new egret.Bitmap(RES.getRes("g_settle_bg_2"));
        content_bg.y = -2;
        this.center_sp.addChild(content_bg);
    };
    Big_settle_popup.prototype.init_content = function () {
        //游戏提示信息
        var game_tips = new egret.TextField();
        game_tips.size = 20;
        game_tips.text = "游戏结果仅做娱乐用途\n禁止用于赌博行为！ ";
        game_tips.textColor = 0xD29C56;
        game_tips.lineSpacing = 5;
        game_tips.bold = true;
        game_tips.x = 30;
        game_tips.y = Main.stageHeight - 55;
        this.center_sp.addChild(game_tips);
        //规则
        var rule_text = new egret.TextField();
        rule_text.size = 19;
        rule_text.text = "丹阳推倒胡 " + this.model.rule_text;
        rule_text.textColor = 0xD29C56;
        rule_text.bold = true;
        rule_text.x = Main.stageWidth - rule_text.width - 10;
        rule_text.y = Main.stageHeight - 78;
        this.center_sp.addChild(rule_text);
        //房间号文字;
        var room_num_text = new egret.TextField();
        room_num_text.size = 19;
        room_num_text.text = "房间号:" + this.model.room_id;
        room_num_text.textColor = 0xD29C56;
        room_num_text.bold = true;
        room_num_text.x = 890;
        room_num_text.y = Main.stageHeight - 55;
        this.center_sp.addChild(room_num_text);
        //圈数文字;
        var circleNum_text = new egret.TextField();
        circleNum_text.size = 19;
        circleNum_text.text = "总圈数:" + this.model.quan_num + " 圈";
        circleNum_text.textColor = 0xD29C56;
        circleNum_text.bold = true;
        circleNum_text.x = room_num_text.x + room_num_text.width + 10;
        circleNum_text.y = room_num_text.y;
        this.center_sp.addChild(circleNum_text);
        for (var i = 0; i < this.model.user_list_model.length; i++) {
            var view = new Big_settle_view(this.model.user_list_model[i]);
            view.x = 100 + 280 * i;
            view.y = 180;
            this.center_sp.addChild(view);
        }
        //分享按钮;
        var share_btn = new MyButton("g_xjs_b_share");
        share_btn.x = this.center_sp.width / 2;
        share_btn.y = Main.stageHeight - 50;
        share_btn.addTouchEvent();
        share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.share_back, this);
        this.center_sp.addChild(share_btn);
        //继续按钮;
        var continue_btn = new MyButton("g_djs_b_next");
        continue_btn.x = 50;
        continue_btn.y = 50;
        continue_btn.addTouchEvent();
        continue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_back, this);
        this.center_sp.addChild(continue_btn);
    };
    //分享按钮回调;
    Big_settle_popup.prototype.share_back = function (e) {
        this.v_to_v_dis_event(this.EVENT.popup.share);
    };
    //继续按钮回调;
    Big_settle_popup.prototype.next_back = function (e) {
        this.v_to_v_dis_event(this.EVENT.popup.back_hall);
    };
    Big_settle_popup.prototype.add_game_logo = function () {
        // var game_logo=this.set_bit_center("g_logo");
        // this.center_sp.addChild(game_logo);
        // game_logo.x=Main.stageWidth-game_logo.width/2;
        // game_logo.y=Main.stageHeight-60;
        var time_txt = new egret.TextField();
        time_txt.text = this.model.time;
        time_txt.size = 19;
        time_txt.textColor = 0xD29C56;
        time_txt.bold = true;
        this.center_sp.addChild(time_txt);
        time_txt.x = 948;
        time_txt.y = Main.stageHeight - 35;
    };
    return Big_settle_popup;
}(Base_popup));
__reflect(Big_settle_popup.prototype, "Big_settle_popup");
//# sourceMappingURL=DJS_popup.js.map