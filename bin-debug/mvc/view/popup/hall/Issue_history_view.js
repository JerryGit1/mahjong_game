/**
 * Created by pc-20171125 on 2018/4/23.
 * 代开历史
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Issue_history_view = (function (_super) {
    __extends(Issue_history_view, _super);
    function Issue_history_view() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Popup_event_model(); //事件常量
        _this.pageNum = 1;
        _this.content = new egret.Sprite();
        _this.init_content();
        return _this;
    }
    //没有数据时显示的白色底图
    Issue_history_view.prototype.add_white_bg = function () {
        this.no_info_white_bg = new egret.Shape();
        this.no_info_white_bg.graphics.beginFill(0xFDFDF9, 1);
        this.no_info_white_bg.graphics.drawRoundRect(0, 0, 1047, 465, 30, 30);
        this.no_info_white_bg.graphics.endFill();
        this.addChild(this.no_info_white_bg);
        this.no_info_white_bg.x = 1101 / 2 - this.no_info_white_bg.width / 2;
        this.no_info_white_bg.y = 544 / 2 - this.no_info_white_bg.height / 2 + 10;
    };
    Issue_history_view.prototype.init_content = function () {
        this.scroll_view = new egret.ScrollView();
        this.scroll_view.width = 1050;
        this.scroll_view.height = 450;
        this.scroll_view.verticalScrollPolicy = "on";
        this.scroll_view.horizontalScrollPolicy = "off";
        this.scroll_view.setContent(this.content);
        this.scroll_view.addEventListener(egret.Event.CHANGE, this.update_ListView, this);
        this.scroll_view.y = 60;
        this.addChild(this.scroll_view);
        //没有数据时显示的白色底图
        this.add_white_bg();
        //没有数据时显示的图片;
        this.no_info_img = new egret.Bitmap(RES.getRes("h_replace_history_img"));
        this.no_info_img.anchorOffsetX = this.no_info_img.width / 2;
        this.no_info_img.anchorOffsetY = this.no_info_img.height / 2;
        this.no_info_img.x = Main.stageWidth / 2;
        this.no_info_img.y = Main.stageHeight / 2 - 30;
        this.addChild(this.no_info_img);
    };
    //更新视图;
    Issue_history_view.prototype.update_list = function (data) {
        this.pageAll = data.pages;
        var list = data.infos;
        //清空
        var len = this.content.numChildren;
        for (var i = 0; i < len; i++) {
            this.content.removeChildAt(0);
        }
        var length = list.length;
        if (length > 0) {
            this.no_info_img.visible = false;
            this.no_info_white_bg.visible = false;
            for (var i_1 = 0; i_1 < length; i_1++) {
                var issue_history_cell = new Issue_history_cell(list[i_1], i_1);
                // issue_cell.v_to_v_add_event(this.EVENT.popup.delete_user,this.delete_user,this);                     //代开删除用户;
                //issue_cell.v_to_v_add_event(this.EVENT.popup.dissolution_room,this.dissolution_room,this);            //解散房间;
                issue_history_cell.v_to_v_add_event(this.EVENT.popup.share, this.share_issue_room, this); //分享代开历史;
                issue_history_cell.v_to_v_add_event(this.EVENT.popup.play_back_info, this.play_back_info, this); //记录按钮回调;
                issue_history_cell.x = 70;
                issue_history_cell.y = 150 * i_1;
                this.content.addChild(issue_history_cell);
            }
        }
    };
    //分享代开记录;
    Issue_history_view.prototype.share_issue_room = function () {
        this.v_to_v_dis_event(this.EVENT.popup.share);
    };
    //记录按钮回调;
    Issue_history_view.prototype.play_back_info = function (info) {
        this.v_to_v_dis_event(this.EVENT.popup.play_back_info, info);
    };
    Issue_history_view.prototype.update_ListView = function () {
        if (this.scroll_view.scrollTop > 865 * this.pageNum) {
            var num = this.pageNum + 1;
            if (num <= this.pageAll) {
                this.v_to_v_dis_event(this.EVENT.popup.get_history_info, num);
                this.pageNum = num;
                this.scroll_view.removeEventListener(egret.Event.CHANGE, this.update_ListView, this);
            }
        }
    };
    return Issue_history_view;
}(Base_view));
__reflect(Issue_history_view.prototype, "Issue_history_view");
//# sourceMappingURL=Issue_history_view.js.map