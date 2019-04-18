/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
//解散房间
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dissolve_room_popup = (function (_super) {
    __extends(Dissolve_room_popup, _super);
    function Dissolve_room_popup(dis_model) {
        var _this = _super.call(this, true, false) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.popup_name = "dissolve_room_popup";
        _this.is_diss_view = false; //是否已经退出房间;
        _this.model = dis_model;
        //初始化视图;
        _this.init_view();
        //初始化内容;
        _this.init_content();
        _this.addTip();
        _this.countdown();
        _this.user_head_list = [];
        _this.user_name_list = [];
        return _this;
    }
    //初始化视图;
    Dissolve_room_popup.prototype.init_view = function () {
        this.add_center_bg("p_user_view_Bg_png", 701, 402);
        this.open_ani();
        //同意解散
        this.agreeBtn = new MyButton("g_agreeBtn");
        this.agreeBtn.x = 500;
        this.agreeBtn.y = 320;
        this.agreeBtn.addTouchEvent();
        this.agreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agreeBtnClick, this);
        this.center_sp.addChild(this.agreeBtn);
        //拒绝解散
        this.disAgreeBtn = new MyButton("g_disagreeBtn");
        this.disAgreeBtn.x = 240;
        this.disAgreeBtn.y = 320;
        this.disAgreeBtn.addTouchEvent();
        this.disAgreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.disAgreeBtnClick, this);
        this.center_sp.addChild(this.disAgreeBtn);
    };
    //初始化内容;
    Dissolve_room_popup.prototype.init_content = function () {
    };
    Dissolve_room_popup.prototype.update_view = function (dis_model) {
        this.model = dis_model;
        //清理一遍用户数据
        this.clear_user();
        //发起人的信息
        this.title_str = "<font color='#ff0000'>" + "[" + this.model.respond_user_name + "]" + "</font>发起投票解散对局"; //投票解散对局
        this.add_txt_title(this.title_str, { x: 350, y: 40 });
        //同意解散房间的人数;
        var agree_player_num = 0; //同意解散人数;
        var refuse_player_num = 0; //拒绝解散人数;
        var list = this.model.user_list_model;
        for (var i = 0; i < list.length; i++) {
            var dis_user_model = this.model.user_list_model[i];
            if (dis_user_model.userId == this.CONST.USERID && dis_user_model.agree != 0) {
                this.setButtonEnabled();
            }
            //用户头像;
            var player_head = new User_head_view();
            player_head.create_rect_head(80, 80);
            player_head.update_head_url(dis_user_model.userImg);
            player_head.y = 140;
            player_head.x = 150 + 150 * i;
            this.center_sp.addChild(player_head);
            this.user_head_list.push(player_head);
            //昵称;
            var player_name = new egret.TextField();
            player_name.text = dis_user_model.userName;
            player_name.size = 20;
            player_name.x = player_head.x - player_name.width / 2;
            player_name.y = player_head.y + 40;
            player_name.textColor = 0xCB6F01;
            player_name.textAlign = "center";
            player_name.verticalAlign = "middle";
            this.center_sp.addChild(player_name);
            this.user_name_list.push(player_name);
            if (dis_user_model.agree == 1) {
                agree_player_num++;
                //当有人同意时，显示同意的标记;
                var agree_img = new egret.Bitmap(RES.getRes("g_agreeSign"));
                agree_img.x = player_name.x + player_name.width / 2;
                agree_img.y = player_name.y - player_name.height / 2;
                this.center_sp.addChild(agree_img);
            }
            else if (dis_user_model.agree == 2) {
                //有人拒绝了
                refuse_player_num++;
                var agree_img = new egret.Bitmap(RES.getRes("g_disagreeSign"));
                agree_img.x = player_name.x + player_name.width / 2;
                agree_img.y = player_name.y - player_name.height / 2;
                this.center_sp.addChild(agree_img);
            }
            //加上自己，同意人数达到3，就解散房间;
            if (agree_player_num >= 3) {
                //当有2个人同意时，就解散房间
                //停顿1秒
                this.setButtonEnabled();
                setTimeout(function () {
                    this.timerComFunc();
                    //发起大结算
                    if (this)
                        this.v_to_v_dis_event(this.EVENT.popup.sponsor_DJS);
                    if (this)
                        this.close_click();
                }.bind(this), 1000);
                this.v_to_v_dis_event(this.EVENT.popup.float_alert, { str: "解散房间成功" });
            }
            else {
                //有2个拒绝的，就解散失败;
                if (refuse_player_num >= 2) {
                    this.setButtonEnabled();
                    setTimeout(function () {
                        if (!this.is_diss_view) {
                            this.is_diss_view = true;
                            if (this)
                                this.close_click();
                        }
                    }.bind(this), 1000);
                    this.v_to_v_dis_event(this.EVENT.popup.float_alert, { str: "解散房间失败" });
                }
            }
        }
    };
    Dissolve_room_popup.prototype.addTip = function () {
        //提示
        var tipInfo = new egret.TextField();
        tipInfo.size = 19;
        tipInfo.textColor = 0x67615c;
        tipInfo.textAlign = "center";
        tipInfo.verticalAlign = "middle";
        tipInfo.fontFamily = "微软雅黑";
        tipInfo.text = "三人同意即可解散，解散后将根据目前的分进行最终结算";
        tipInfo.x = this.center_sp.width / 2 - tipInfo.width / 2;
        tipInfo.y = 230;
        this.center_sp.addChild(tipInfo);
        //倒计时
        var tipTxt = new egret.TextField();
        tipTxt.size = 22;
        tipTxt.textColor = 0xfafafa;
        tipTxt.multiline = true;
        tipTxt.textAlign = "center";
        tipTxt.verticalAlign = "middle";
        tipTxt.width = 600;
        tipTxt.x = 45;
        tipTxt.y = 270;
        tipTxt.fontFamily = "微软雅黑";
        this.test_point(tipTxt);
        this.tipTxt = tipTxt;
        this.center_sp.addChild(tipTxt);
        this.onTimer();
    };
    Dissolve_room_popup.prototype.countdown = function () {
        this.timer = new egret.Timer(1000, 301);
        this.timer.start();
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    Dissolve_room_popup.prototype.onTimer = function () {
        var starTime = this.model.dissolveTime;
        var nowTime = (new Date()).getTime();
        var time = Math.floor(((starTime + 300000) - nowTime) / 1000);
        time--;
        if (time >= 0) {
            this.tipTxt.textFlow = new egret.HtmlTextParser().parser("<font color='0x67615c'>剩余</font>  <font color='#dc143c'>" + time + "</font> <font color='0x67615c'>s</font>");
        }
    };
    Dissolve_room_popup.prototype.timerComFunc = function () {
        this.timer.stop();
    };
    /*同意*/
    Dissolve_room_popup.prototype.agreeBtnClick = function () {
        this.setButtonEnabled();
        this.v_to_v_dis_event(this.EVENT.dissolution_room.is_agree_diss_room, 1);
    };
    /*拒绝*/
    Dissolve_room_popup.prototype.disAgreeBtnClick = function () {
        this.setButtonEnabled();
        this.v_to_v_dis_event(this.EVENT.dissolution_room.is_agree_diss_room, 2);
    };
    /*设置按钮不可用*/
    Dissolve_room_popup.prototype.setButtonEnabled = function () {
        this.agreeBtn.visible = false;
        //this.agreeBtn.changTexture("g_agree1");
        this.disAgreeBtn.visible = false;
        //this.disAgreeBtn.changTexture("g_dissagree1");
    };
    Dissolve_room_popup.prototype.clear_user = function () {
        for (var h = 0; h < this.user_head_list.length; h++) {
            this.center_sp.removeChild(this.user_head_list[h]);
            this.user_head_list[h] = null;
        }
        this.user_head_list = [];
        for (var n = 0; n < this.user_name_list.length; n++) {
            this.center_sp.removeChild(this.user_name_list[n]);
            this.user_name_list[n] = null;
        }
        this.user_name_list = [];
    };
    return Dissolve_room_popup;
}(Base_popup));
__reflect(Dissolve_room_popup.prototype, "Dissolve_room_popup");
//# sourceMappingURL=Dissolve_room_popup.js.map