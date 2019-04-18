/**
 * Created by JackerCao on 2018/4/20.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Playback_record_popup = (function (_super) {
    __extends(Playback_record_popup, _super);
    function Playback_record_popup(data) {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.content = new egret.Sprite();
        _this.init_view();
        _this.init_content(data);
        _this.playback_record_data = data;
        return _this;
    }
    Playback_record_popup.prototype.init_view = function () {
        this.add_center_bg("p_record_view_bg_png", 1100, 544);
        this.add_img_title("h_playback_title", { x: 550, y: -20 });
        this.add_close_btn("h_Return_btn", { x: 40, y: -20 });
        this.open_ani();
        //提示;
        var prompt_text = new egret.TextField();
        prompt_text.text = "友情提示:回放录像保存3天\n战绩记录保存3天";
        prompt_text.textAlign = "right";
        prompt_text.size = 20;
        prompt_text.x = 850;
        prompt_text.y = -30;
        this.center_sp.addChild(prompt_text);
    };
    Playback_record_popup.prototype.init_content = function (data) {
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height = 450;
        this.scroll_view.verticalScrollPolicy = "on";
        this.scroll_view.horizontalScrollPolicy = "off";
        this.scroll_view.setContent(this.content);
        this.scroll_view.y = 60;
        this.scroll_view.x = 20;
        this.center_sp.addChild(this.scroll_view);
        this.add_table_cell(data);
    };
    Playback_record_popup.prototype.add_table_cell = function (data) {
        var data_arr = JSON.parse(data.cell_info);
        for (var i = 0; i < data_arr.length; i++) {
            var rule_str = data.rule_str;
            var names = data.player_name;
            var info = data_arr[i];
            var cell_data = { rule: rule_str, name: names, cell_data: info, roomId: data.roomId, time: data.time, backUrl: data.backUrl };
            var cell = new Record_playback_view(cell_data, i);
            cell.v_to_v_add_event(this.EVENT.player_back.show_player, this.show_player, this);
            cell.v_to_v_add_event(this.EVENT.popup.share, this.show_share_view, this);
            cell.y = 150 * i;
            this.content.addChild(cell);
        }
    };
    Playback_record_popup.prototype.show_player = function (data) {
        this.v_to_v_dis_event(this.EVENT.player_back.show_player, data);
    };
    //跳出分享;
    Playback_record_popup.prototype.show_share_view = function () {
        this.v_to_v_dis_event(this.EVENT.popup.share);
    };
    return Playback_record_popup;
}(Base_popup));
__reflect(Playback_record_popup.prototype, "Playback_record_popup");
//# sourceMappingURL=Playback_record_popup.js.map