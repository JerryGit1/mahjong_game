/**
 * Created by JackerCao on 2018-04-18.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//加入房间View;
var Join_room_popup = (function (_super) {
    __extends(Join_room_popup, _super);
    function Join_room_popup(userId) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.NumberBtn = ["h_1_btn", "h_2_btn", "h_3_btn", "h_4_btn", "h_5_btn", "h_6_btn", "h_7_btn", "h_8_btn", "h_9_btn", "h_0_btn", "h_clear_btn", "h_delete_btn"];
        _this.NumberText = ["h_please_icon", "h_transport_icon", "h_enter_icon", "h_room_icon", "h_between_icon", "h_number_icon"];
        _this.userId = userId;
        _this.input_box_arr = [];
        _this.input_btn_arr = [];
        _this.input_text_arr = [];
        _this.input_num_arr = [];
        _this.index_box = 0;
        _this.room_id = "";
        //背景;
        _this.init_content();
        //输入框背景;
        _this.init_Input_box();
        //初始化按钮;
        _this.init_btn_list();
        return _this;
    }
    //内容;
    Join_room_popup.prototype.init_content = function () {
        this.add_center_bg("p_join_room_bg_png", 733, 538);
        this.add_img_title("h_join_room_title", { x: 366, y: 0 });
        this.add_close_btn("l_close_btn", { x: 710, y: 10 });
        this.open_ani();
    };
    //初始化输入框;
    Join_room_popup.prototype.init_Input_box = function () {
        for (var i = 0; i < 6; i++) {
            var input_box = new egret.Bitmap(RES.getRes("h_input_bg"));
            input_box.x = 60 + i * 110;
            input_box.y = 80;
            this.center_sp.addChild(input_box);
            this.input_box_arr.push(input_box);
            var text_box = new egret.Bitmap(RES.getRes(this.NumberText[i]));
            text_box.x = input_box.x + 12;
            text_box.y = input_box.y + 10;
            this.center_sp.addChild(text_box);
            this.input_text_arr.push(text_box);
            var num_box = new egret.Bitmap();
            num_box.x = input_box.x + 12;
            num_box.y = input_box.y + 10;
            this.center_sp.addChild(num_box);
            this.input_num_arr.push(num_box);
        }
    };
    //初始化按钮;
    Join_room_popup.prototype.init_btn_list = function () {
        for (var i = 0; i < this.NumberBtn.length; i++) {
            var btn = new MyButton(this.NumberBtn[i]);
            btn.x = 110 + i % 4 * 170;
            btn.y = 220 + Math.floor(i / 4) * 110;
            btn.addTouchEvent();
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.input_btn_back, this);
            this.center_sp.addChild(btn);
            this.input_btn_arr.push(btn);
        }
    };
    //数字btn回调;
    Join_room_popup.prototype.input_btn_back = function (e) {
        var btn = e.currentTarget;
        var btn_name = btn.get_name();
        switch (btn_name) {
            case "h_delete_btn":
                if (this.index_box > 0) {
                    this.index_box--;
                    this.input_num_arr[this.index_box].texture = "";
                    this.room_id = this.room_id.substring(0, this.room_id.length - 1);
                }
                if (this.index_box == 0) {
                    this.clear_all_num();
                }
                break;
            case "h_clear_btn":
                this.clear_all_num();
                break;
            default:
                this.hide_text();
                var num = btn_name.replace(/[^0-9]/ig, "");
                var url = "h_" + num + "_num";
                if (this.index_box < 6) {
                    this.input_num_arr[this.index_box].texture = RES.getRes(url);
                    this.index_box++;
                    this.room_id += "" + num;
                }
                if (this.index_box == 6) {
                    //告诉服务器，我要加入房间
                    MyConsole.getInstance().trace("我要加入房间", 0);
                    this.jion_room();
                    // this.close_click(); //关闭弹框
                    this.clear_all_num(); //清空用户输入的房间号部分
                }
                break;
        }
    };
    //清空所有输入的数字;
    Join_room_popup.prototype.clear_all_num = function () {
        this.index_box = 0;
        this.room_id = "";
        for (var i = 0; i < this.input_num_arr.length; i++) {
            this.input_num_arr[i].texture = "";
        }
        this.show_text();
    };
    //隐藏文字;
    Join_room_popup.prototype.hide_text = function () {
        for (var i = 0; i < this.NumberText.length; i++) {
            this.input_text_arr[i].visible = false;
        }
    };
    //显示文字;
    Join_room_popup.prototype.show_text = function () {
        for (var i = 0; i < this.NumberText.length; i++) {
            this.input_text_arr[i].visible = true;
        }
    };
    Join_room_popup.prototype.jion_room = function () {
        var info = { "userId": this.userId, "roomId": this.room_id };
        this.v_to_v_dis_event(this.EVENT.popup.join_room, info);
    };
    return Join_room_popup;
}(Base_popup));
__reflect(Join_room_popup.prototype, "Join_room_popup");
//# sourceMappingURL=Join_room_popup.js.map