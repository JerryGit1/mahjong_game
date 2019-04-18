/**
 * Created by zwb on 2018/5/15.
 * 俱乐部昨日战绩-列表-view
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Club_achievement_list_yesterday = (function (_super) {
    __extends(Club_achievement_list_yesterday, _super);
    function Club_achievement_list_yesterday(data) {
        var _this = _super.call(this) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.content = new egret.Sprite();
        _this.userId = data.userId;
        _this.clubId = data.clubId;
        _this.init_content();
        return _this;
    }
    Club_achievement_list_yesterday.prototype.init_content = function () {
        //列表-滚动
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height = 450;
        this.scroll_view.verticalScrollPolicy = "off";
        this.scroll_view.horizontalScrollPolicy = "on";
        this.scroll_view.setContent(this.content);
        this.scroll_view.x = 21;
        this.scroll_view.y = 54;
        this.scroll_view.touchEnabled = true;
        this.addChild(this.scroll_view);
        //没有数据时显示的白色底图
        this.add_white_bg();
        //没有数据时显示的图片;
        this.no_info_img = new egret.Bitmap(RES.getRes("p_record_img"));
        this.no_info_img.anchorOffsetX = this.no_info_img.width / 2;
        this.no_info_img.anchorOffsetY = this.no_info_img.height / 2;
        this.no_info_img.x = Main.stageWidth / 2;
        this.no_info_img.y = Main.stageHeight / 2 - 30;
        this.addChild(this.no_info_img);
    };
    //更新视图;
    Club_achievement_list_yesterday.prototype.add_club_yesterday_list = function (info) {
        var data = info.infos;
        //清空
        var len = this.content.numChildren;
        for (var i = 0; i < len; i++) {
            this.content.removeChildAt(0);
        }
        var length = data.length;
        if (length > 0) {
            this.no_info_img.visible = false; //清空无战绩提示图
            this.no_info_white_bg.visible = false; //清空无战绩白色底图
            for (var i_1 = 0; i_1 < length; i_1++) {
                this.cell_yesterday = new Club_achievement_single_yesterday(data[i_1], this.userId); //战绩-昨日
                this.cell_yesterday.v_to_v_add_event(this.EVENT.popup.play_back_info, this.play_back_info_pop, this); //回放pop
                this.cell_yesterday.v_to_v_add_event(this.EVENT.popup.share, this.share_pop, this); //分享pop
                this.cell_yesterday.x = 20 + 350 * i_1;
                this.cell_yesterday.y = 10;
                this.cell_yesterday.scaleX = this.cell_yesterday.scaleY = 0.95;
                this.content.addChild(this.cell_yesterday);
            }
        }
    };
    //显示回放pop
    Club_achievement_list_yesterday.prototype.play_back_info_pop = function (data) {
        this.v_to_v_dis_event(this.EVENT.base_popup.club_play_back_info, data);
    };
    //分享pop
    Club_achievement_list_yesterday.prototype.share_pop = function () {
        this.v_to_v_dis_event(this.EVENT.base_popup.share);
    };
    //没有数据时显示的白色底图
    Club_achievement_list_yesterday.prototype.add_white_bg = function () {
        this.no_info_white_bg = new egret.Shape();
        this.no_info_white_bg.graphics.beginFill(0xFDFDF9, 1);
        this.no_info_white_bg.graphics.drawRoundRect(0, 0, 1047, 465, 30, 30);
        this.no_info_white_bg.graphics.endFill();
        this.addChild(this.no_info_white_bg);
        this.no_info_white_bg.x = 1101 / 2 - this.no_info_white_bg.width / 2;
        this.no_info_white_bg.y = 544 / 2 - this.no_info_white_bg.height / 2 + 10;
    };
    return Club_achievement_list_yesterday;
}(Base_view));
__reflect(Club_achievement_list_yesterday.prototype, "Club_achievement_list_yesterday");
//# sourceMappingURL=Club_achievement_list_yesterday.js.map