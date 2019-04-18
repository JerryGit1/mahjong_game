/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Setting_popup = (function (_super) {
    __extends(Setting_popup, _super);
    function Setting_popup(info) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.init_view();
        _this.init_centent(info);
        return _this;
    }
    Setting_popup.prototype.init_view = function () {
        this.add_center_bg("p_user_view_Bg_png", 701, 402);
        this.add_img_title("l_setting_title", { x: 350, y: 10 });
        this.add_close_btn("l_close_btn", { x: 690, y: 10 });
        this.open_ani();
    };
    Setting_popup.prototype.init_centent = function (is_show) {
        //================音效开关
        var switchBtn = new Effect_sound_btn("l_effect_text", "l_effect_on_btn", "l_effect_off_btn");
        this.center_sp.addChild(switchBtn);
        switchBtn.x = this.center_sp.width / 2 - switchBtn.width * .5;
        switchBtn.y = Main.stageHeight * 0.20;
        //==============音乐开关
        var switchBtn1 = new Bg_sound_btn("l_music_text", "l_music_on_btn", "l_music_off_btn");
        this.center_sp.addChild(switchBtn1);
        switchBtn1.x = switchBtn.x;
        switchBtn1.y = switchBtn.y + 84;
        //是否显示解散房间;
        if (is_show) {
            //退出游戏 or 解散房间
            var closeGameBtn = new MyButton("g_killRoomBtn_1");
            closeGameBtn.x = 368;
            closeGameBtn.y = 336;
            closeGameBtn.addTouchEvent();
            closeGameBtn.addEventListener("click", function () {
                this.v_to_v_dis_event(this.EVENT.popup.room_dissolution_room);
                this.close_click();
            }.bind(this), this);
            this.center_sp.addChild(closeGameBtn);
        }
    };
    return Setting_popup;
}(Base_popup));
__reflect(Setting_popup.prototype, "Setting_popup");
//# sourceMappingURL=Setting_popup.js.map