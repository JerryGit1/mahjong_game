var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-01-27.
 */
var Chat_popup = (function (_super) {
    __extends(Chat_popup, _super);
    function Chat_popup() {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.w = 0;
        _this.h = 0;
        _this.set_click_bg_apha();
        _this.init_view();
        return _this;
    }
    Chat_popup.prototype.init_view = function () {
        //渲染背景图
        this.add_bg();
        //渲染层
        this.layer_list_view = new Chat_layer_view(this.w, this.h);
        //播放
        this.layer_list_view.v_to_v_add_event(this.EVENT.chat.click_sponsor_action, this.play_ani, this);
        this.center_sp.addChild(this.layer_list_view);
        this.add_btn();
        // //渲染切换按钮
        //
        // this.btn_list_view=new Chat_btn_list_view();
        // //this.btn_list_view.v_to_v_add_event(this.EVENT.btn.click_sure,this.cut_layer,this);
        // this.btn_list_view.init_view(this.w,this.h);
        // this.btn_list_view.x=this.w-28;
        // this.layer_list_view.x=this.w/2-this.layer_list_view.width/2-30;
        // this.center_sp.addChild(this.btn_list_view);
    };
    Chat_popup.prototype.add_bg = function () {
        var bg = this.set_bit_center("chat_bg");
        this.w = bg.width;
        this.h = bg.height;
        bg.anchorOffsetX = bg.anchorOffsetY = 0;
        this.center_sp.addChild(bg);
        this.center_sp.anchorOffsetX = this.w;
        this.center_sp.anchorOffsetY = this.h;
        this.center_sp.x = Main.stageWidth; //-90;
        this.center_sp.y = Main.stageHeight - 20;
        this.center_sp.scaleX = this.center_sp.scaleY = .1;
        this.center_sp.alpha = 0;
        egret.Tween.get(this.center_sp).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400, egret.Ease.backOut);
    };
    Chat_popup.prototype.add_btn = function () {
        var btn = new MyButton("chat_btn_1");
        this.center_sp.addChild(btn);
        btn.x = btn.width / 2 + 4;
        btn.y = btn.height / 2 + 8;
        btn["str"] = "text";
        btn.graphics.beginFill(0x00ff00, 0);
        btn.graphics.drawRect(-btn.width / 2, -btn.height / 2, btn.width, btn.height);
        btn.addTouchEvent();
        btn.addEventListener("click", this.set_btn, this);
    };
    Chat_popup.prototype.set_btn = function (e) {
        var btn = e.currentTarget;
        var tab = btn["str"];
        if (tab == "text") {
            btn["str"] = "face";
            btn.changTexture("chat_btn_2");
            this.cut_layer(2);
        }
        else {
            btn["str"] = "text";
            //显示当前
            btn.changTexture("chat_btn_1");
            this.cut_layer(1);
        }
    };
    Chat_popup.prototype.cut_layer = function (page) {
        this.layer_list_view.cut_layer(page);
    };
    //播放
    Chat_popup.prototype.play_ani = function (info) {
        this.v_to_v_dis_event(this.EVENT.chat.send_chat_status, info);
        this.dispatchEvent(new egret.Event("close"));
    };
    return Chat_popup;
}(Base_popup));
__reflect(Chat_popup.prototype, "Chat_popup");
//# sourceMappingURL=Chat_popup.js.map