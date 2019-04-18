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
//用户协议
var User_agree_popup = (function (_super) {
    __extends(User_agree_popup, _super);
    function User_agree_popup(userId) {
        var _this = _super.call(this, true, false) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.userId = userId;
        _this.init_content();
        return _this;
    }
    User_agree_popup.prototype.init_content = function () {
        this.add_center_bg("p_popup_view_Bg_png", 919, 527);
        this.add_img_title("l_user_agreement_title", { x: 460, y: 10 });
        this.open_ani();
        this.show_user_agree_info();
    };
    User_agree_popup.prototype.show_user_agree_info = function () {
        var content = new egret.DisplayObjectContainer();
        var contentText = new egret.TextField();
        contentText.width = 830;
        contentText.wordWrap = true;
        contentText.lineSpacing = 15;
        contentText.size = 20;
        contentText.textColor = 0x805042;
        contentText.fontFamily = "微软雅黑";
        contentText.text = RES.getRes("user_protocol_text");
        content.addChild(contentText);
        var myscrollView = new egret.ScrollView();
        myscrollView.horizontalScrollPolicy = "off";
        myscrollView.setContent(content);
        myscrollView.width = 900;
        myscrollView.height = this.height * .45;
        myscrollView.y = 80;
        myscrollView.x = 50;
        this.center_sp.addChild(myscrollView);
        // 同意按钮
        var agreeBtn = new MyButton("l_confirm_btn");
        agreeBtn.x = 458;
        agreeBtn.y = 454;
        agreeBtn.addTouchEvent();
        agreeBtn.addEventListener("click", function () {
            this.v_to_v_dis_event(this.EVENT.popup.user_agree, this.userId);
            this.close_click();
        }, this);
        this.center_sp.addChild(agreeBtn);
    };
    return User_agree_popup;
}(Base_popup));
__reflect(User_agree_popup.prototype, "User_agree_popup");
//# sourceMappingURL=User_agree_popup.js.map