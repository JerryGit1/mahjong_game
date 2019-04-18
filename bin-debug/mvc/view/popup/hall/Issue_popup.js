/**
 * Created by JackerCao on 2018/4/20.
 * 代开列表;
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Issue_popup = (function (_super) {
    __extends(Issue_popup, _super);
    function Issue_popup(userId) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.content = new egret.Sprite();
        _this.button_type = "list"; //列表和历史的状态--默认为列表状态;
        _this.cell_num = 0; //当前cell的数量;
        _this.userId = userId;
        _this.issue_list_arr = [];
        _this.init_content();
        return _this;
    }
    Issue_popup.prototype.init_content = function () {
        this.add_center_bg("p_record_view_bg_png", 1101, 544);
        this.add_close_btn("h_Return_btn", { x: 100, y: -20 });
        this.open_ani();
        var cell_num_text = new egret.TextField();
        cell_num_text.size = 18;
        cell_num_text.x = 912;
        cell_num_text.y = 0;
        this.center_sp.addChild(cell_num_text);
        this.cell_num_text = cell_num_text;
        //代开或者历史记录按钮;
        var issue_btn = new MyButton("h_replace_list_btn");
        issue_btn.x = Main.stageWidth / 2;
        issue_btn.y = -24;
        issue_btn.addTouchEvent();
        issue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change_button_type, this);
        this.center_sp.addChild(issue_btn);
        //规则按钮;
        var rule_btn = new MyButton("h_rule_btn");
        rule_btn.x = 888;
        rule_btn.y = 6;
        rule_btn.changeSize(0.6, 0.6);
        rule_btn.addTouchEvent();
        rule_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rule_back, this);
        this.center_sp.addChild(rule_btn);
        this.rule_btn = rule_btn;
        this.list_view = new Issue_list_view();
        this.list_view.v_to_v_add_event(this.EVENT.popup.delete_user, this.delete_user, this); //踢人;
        this.list_view.v_to_v_add_event(this.EVENT.popup.dissolution_room, this.dissolution_room, this); //解散房间;
        this.list_view.v_to_v_add_event(this.EVENT.popup.qz_dissolution_room, this.qz_dissolution_room, this); //强制解散房间;
        this.list_view.v_to_v_add_event(this.EVENT.popup.share, this.share, this); //邀请;
        this.list_view.v_to_v_add_event(this.EVENT.popup.get_history_info, this.dis_get_issue_history_info, this); //获取代开历史页数的数据;
        this.center_sp.addChild(this.list_view);
        this.history_view = new Issue_history_view();
        this.history_view.v_to_v_add_event(this.EVENT.popup.share, this.share, this);
        this.history_view.v_to_v_add_event(this.EVENT.popup.play_back_info, this.play_back_info, this);
        this.center_sp.addChild(this.history_view);
        this.history_view.visible = false;
    };
    //更新列表界面数据;
    Issue_popup.prototype.updata_list_cell = function (data) {
        this.cell_num = data.length;
        //this.cell_num_text.text="当前房间数量:"+this.cell_num+"/10";
        this.cell_num_text.textFlow = new egret.HtmlTextParser().parser("<font>当前房间数量</font>  <font color='#8dff73'>" + this.cell_num + "</font> <font>/10</font>");
        this.list_view.update_list(data);
    };
    //更新列表cell数据;
    Issue_popup.prototype.update_list_room_data = function (info) {
        this.list_view.update_cell_room_data(info);
    };
    Issue_popup.prototype.updata_history_cell = function (data) {
        if (data.infos) {
            this.history_view.update_list(data);
        }
    };
    //改变button状态;
    Issue_popup.prototype.change_button_type = function (e) {
        var btn = e.currentTarget;
        if (this.button_type == "list") {
            this.button_type = "history";
            btn.changTexture("h_replace_history_btn");
            this.dis_get_issue_history_info(1);
            this.list_view.visible = false;
            this.history_view.visible = true;
            this.cell_num_text.visible = false;
            this.rule_btn.visible = false;
            if (this._tip_view) {
                this._tip_view.visible = false;
            }
        }
        else {
            this.button_type = "list";
            btn.changTexture("h_replace_list_btn");
            this.list_view.visible = true;
            this.history_view.visible = false;
            this.cell_num_text.visible = true;
            this.rule_btn.visible = true;
            if (this._tip_view) {
                this._tip_view.visible = true;
            }
        }
    };
    //派发获取代开历史第num页;
    Issue_popup.prototype.dis_get_issue_history_info = function (num) {
        var data = {};
        data["userId"] = this.userId;
        data["page"] = num;
        this.v_to_v_dis_event(this.EVENT.popup.issue_history, data);
    };
    //代开删除用户;
    Issue_popup.prototype.delete_user = function (data) {
        this.v_to_v_dis_event(this.EVENT.popup.delete_user, data);
    };
    //代开解散房间;
    Issue_popup.prototype.dissolution_room = function (data) {
        this.v_to_v_dis_event(this.EVENT.popup.dissolution_room, data);
    };
    //代开强制解散房间;
    Issue_popup.prototype.qz_dissolution_room = function (data) {
        this.v_to_v_dis_event(this.EVENT.popup.qz_dissolution_room, data);
    };
    //邀请;
    Issue_popup.prototype.share = function () {
        this.v_to_v_dis_event(this.EVENT.popup.share);
    };
    Issue_popup.prototype.play_back_info = function (info) {
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info, info);
    };
    Issue_popup.prototype.rule_back = function () {
        if (this._tip_view) {
            this.center_sp.removeChild(this._tip_view);
            this._tip_view = null;
        }
        else {
            var str = "1.账号内房卡数达到100张才能使用代开功能\n2.最多只能同时代开10个房间\n3.未开局的牌局会在创建40分钟以后自动解散，已开始的牌局不受影响";
            this._tip_view = new Tip_view(str, 280);
            this._tip_view.x = 900;
            this._tip_view.y = 30;
            this.center_sp.addChild(this._tip_view);
        }
    };
    return Issue_popup;
}(Base_popup));
__reflect(Issue_popup.prototype, "Issue_popup");
//# sourceMappingURL=Issue_popup.js.map