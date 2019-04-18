/**
 * Created by JackerCao on 2018/4/19.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//战绩;
var Record_popup = (function (_super) {
    __extends(Record_popup, _super);
    function Record_popup() {
        var _this = _super.call(this, true, true) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.content = new egret.Sprite();
        return _this;
    }
    //派发监听;
    Record_popup.prototype.dis_event = function (userId) {
        //告诉popView我要战绩数据;
        this.v_to_v_dis_event(this.EVENT.popup.hall_achievement, userId); //监听获取战绩;
    };
    Record_popup.prototype.init_content = function (userId) {
        this.add_center_bg("p_record_view_bg_png", 1101, 544);
        this.add_img_title("h_record_title", { x: 535, y: 20 });
        this.add_close_btn("h_Return_btn", { x: 40, y: -20 });
        this.open_ani();
        this.userId = userId;
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height = 544;
        this.scroll_view.verticalScrollPolicy = "off";
        this.scroll_view.horizontalScrollPolicy = "on";
        this.scroll_view.setContent(this.content);
        this.scroll_view.x = 30;
        this.scroll_view.y = 30;
        this.content.y = -100;
        this.center_sp.addChild(this.scroll_view);
        //没有数据时绘制的白色底图
        this.add_center_white_bg(1047, 465, 1101, 544);
        //没有数据时的提示;
        this.no_info_img = new egret.Bitmap(RES.getRes("p_record_img"));
        this.no_info_img.anchorOffsetX = this.no_info_img.width / 2;
        this.no_info_img.anchorOffsetY = this.no_info_img.height / 2;
        this.no_info_img.x = Main.stageWidth / 2;
        this.no_info_img.y = Main.stageHeight / 2 - 30;
        this.center_sp.addChild(this.no_info_img);
        //提示拖动图片;
        var text_img = new egret.Bitmap(RES.getRes("l_prompt_img"));
        text_img.anchorOffsetX = text_img.width / 2;
        text_img.anchorOffsetY = text_img.height / 2;
        text_img.x = Main.stageWidth / 2;
        text_img.y = Main.stageHeight - 60;
        this.addChild(text_img);
        //手指;
        var finger_img = new egret.Bitmap(RES.getRes("p_hand_icon"));
        finger_img.anchorOffsetX = finger_img.width / 2;
        finger_img.anchorOffsetY = finger_img.height / 2;
        finger_img.x = Main.stageWidth / 2;
        finger_img.y = Main.stageHeight - 30;
        this.addChild(finger_img);
        //手指拖动动画;//丹阳特有的动画, 看需求, 暂时不用合并
        setTimeout(function () {
            egret.Tween.get(finger_img).to({ x: Main.stageWidth / 2 - 100 }, 300).wait(100).to({ x: Main.stageWidth / 2 - 100 }, 300).wait(500).to({ x: Main.stageWidth / 2 + 140 }, 300).wait(500).to({ x: Main.stageWidth / 2 }, 300).wait(100).call(function () {
                finger_img.scaleX = 0.6;
                finger_img.scaleY = 0.6;
                //this.removeChild(finger_img);
            }, this);
        }.bind(this), 1200);
        //派发监听;
        this.dis_event(userId);
    };
    //添加战绩数据;
    Record_popup.prototype.add_record_list = function (info) {
        var length = info.length;
        if (length > 0) {
            this.no_info_img.visible = false;
            this.remove_white_bg(); //清空白色底图
            for (var i = 0; i < length; i++) {
                var cell = new Achievement_single_view(info[i], this.userId);
                //让cell监听分享战绩;
                //之前的分享不用管它
                cell.v_to_v_add_event(this.EVENT.popup.share_achievement, this.share_record_pop, this); //之前的分享;
                cell.v_to_v_add_event(this.EVENT.popup.share, this.share_pop, this); //分享;
                cell.v_to_v_add_event(this.EVENT.popup.play_back_info, this.play_back_info_pop, this); //回放;
                cell.x = 20 + 350 * i;
                cell.y = 150;
                cell.scaleX = cell.scaleY = 0.95;
                this.content.addChild(cell);
            }
        }
    };
    //之前的分享战绩;
    Record_popup.prototype.share_record_pop = function () {
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.popup.share_achievement);
    };
    //重写的一个分享战绩;
    Record_popup.prototype.share_pop = function () {
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.popup.share);
    };
    //显示回放;
    Record_popup.prototype.play_back_info_pop = function (data) {
        //告诉popView弹出分享战绩View;
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info, data);
    };
    return Record_popup;
}(Base_popup));
__reflect(Record_popup.prototype, "Record_popup");
//# sourceMappingURL=Record_popup.js.map