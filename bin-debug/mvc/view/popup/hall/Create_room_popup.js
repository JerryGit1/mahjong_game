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
 * 创建房间-丹阳特有-不用合并
 */
var Create_room_popup = (function (_super) {
    __extends(Create_room_popup, _super);
    function Create_room_popup(userId, clubId, room_data) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.userId = userId;
        _this.clubId = clubId;
        _this.room_data = room_data;
        _this.init_content();
        _this.view_type = { CLASSIC: 1, GAIZHOU: 2 };
        //默认盖州玩法;
        _this.show_gaizhou_view();
        return _this;
    }
    //添加背景+内容选项
    Create_room_popup.prototype.init_content = function () {
        this.add_center_bg("p_create_room_bg_png", 986, 565);
        var contentBg = new egret.Bitmap(RES.getRes("p_create_room_bg_2_png"));
        contentBg.scale9Grid = new egret.Rectangle(100, 100, 540, 300);
        contentBg.width = 900;
        contentBg.anchorOffsetX = contentBg.width / 2;
        contentBg.anchorOffsetY = contentBg.height / 2;
        contentBg.x = 490;
        contentBg.y = 280;
        this.center_sp.addChild(contentBg);
        this.add_img_title("h_create_room_title", { x: 493, y: 0 });
        this.add_close_btn("l_close_btn", { x: 960, y: 10 });
        this.open_ani();
        //盖州玩法按钮;
        this.gaizhou_btn = new MyButton("gaizhou_btn_2");
        this.gaizhou_btn.x = 104;
        this.gaizhou_btn.y = 130;
        this.gaizhou_btn.addTouchEvent();
        this.gaizhou_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_gaizhou_view, this);
        this.center_sp.addChild(this.gaizhou_btn);
        //经典玩法按钮;
        this.classic_btn = new MyButton("jingdian_btn_2");
        this.classic_btn.x = 104;
        this.classic_btn.y = 220;
        this.classic_btn.addTouchEvent();
        this.classic_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.show_classic_view, this);
        this.center_sp.addChild(this.classic_btn);
        //创建房间----经典玩法界面;
        this.create_classic = new Create_classic_view(this.userId, this.clubId);
        this.create_classic.x = -70;
        this.create_classic.y = -70;
        this.center_sp.addChild(this.create_classic);
        //创建房间----盖州玩法界面;
        this.create_gaizhou = new Create_gaizhou_view(this.userId, this.clubId, this.room_data);
        this.create_gaizhou.x = -70;
        this.create_gaizhou.y = -70;
        this.center_sp.addChild(this.create_gaizhou);
        //完成创建;
        var create_room_button = new MyButton("h_create_ok_btn");
        create_room_button.x = Main.stageWidth * 0.45;
        create_room_button.y = Main.stageHeight - 240;
        create_room_button.addTouchEvent();
        create_room_button.addEventListener(egret.TouchEvent.TOUCH_END, this.create_room_back, this);
        this.center_sp.addChild(create_room_button);
    };
    //显示经典玩法界面;
    Create_room_popup.prototype.show_classic_view = function () {
        this.classic_btn.changTexture("jingdian_btn_1"); //改变经典玩法纹理;
        this.gaizhou_btn.changTexture("gaizhou_btn_2"); //改变盖州玩法纹理;
        this.show_view_type = this.view_type.CLASSIC; //页面状态为经典;
        this.show_view();
    };
    //显示盖州玩法界面;
    Create_room_popup.prototype.show_gaizhou_view = function () {
        this.classic_btn.changTexture("jingdian_btn_2"); //改变经典玩法纹理;
        this.gaizhou_btn.changTexture("gaizhou_btn_1"); //改变盖州玩法纹理;
        this.show_view_type = this.view_type.GAIZHOU; //页面状态为经典;
        this.show_view();
    };
    //显示当前view;
    Create_room_popup.prototype.show_view = function () {
        if (this.show_view_type == this.view_type.CLASSIC) {
            this.create_classic.visible = true;
            this.create_gaizhou.visible = false;
        }
        else if (this.show_view_type == this.view_type.GAIZHOU) {
            this.create_classic.visible = false;
            this.create_gaizhou.visible = true;
        }
    };
    //创建房间;
    Create_room_popup.prototype.create_room_back = function () {
        var info;
        if (this.show_view_type == this.view_type.CLASSIC) {
            info = this.create_classic.get_box_select();
        }
        else if (this.show_view_type == this.view_type.GAIZHOU) {
            info = this.create_gaizhou.get_box_select();
        }
        if (info) {
            //讲数据传给PopupView;
            if (this.clubId) {
                info["clubId"] = this.clubId;
                info["userId"] = this.CONST.USERID;
            }
            this.v_to_v_dis_event(this.EVENT.popup.create_room, info);
        }
        else {
            MyConsole.getInstance().trace("什么鬼？为何info没有数据？？？", 0);
        }
        this.close_click();
    };
    return Create_room_popup;
}(Base_popup));
__reflect(Create_room_popup.prototype, "Create_room_popup");
//# sourceMappingURL=Create_room_popup.js.map