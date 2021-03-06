/**
 * Created by JackerCao on 2018/4/17.
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//创建房间经典玩法;
var Create_classic_view = (function (_super) {
    __extends(Create_classic_view, _super);
    function Create_classic_view(userId, clubId) {
        var _this = _super.call(this) || this;
        _this.userId = userId;
        _this.clubId = clubId;
        //添加局数;
        _this.init_jushu_check_box();
        //添加玩法;
        _this.init_wanfa_check_box();
        //计分方式;
        _this.init_jifen_check_box();
        //开房;
        _this.init_kaifang_check_box();
        return _this;
        // //设置默认选择;
        // this.set_box_select();
    }
    //局数;
    Create_classic_view.prototype.init_jushu_check_box = function () {
        var jushu = new egret.Bitmap(RES.getRes("h_choice_game_text"));
        jushu.x = 290;
        jushu.y = 166;
        this.addChild(jushu);
        var jushu_info = { type: 1, checkBox_arr: [{ img: "h_2_circle_text" }, { img: "h_4_circle_text" }, { img: "h_8_circle_text" }] };
        this.jushu_checkBox_arr = new CheckboxArr(jushu_info);
        this.jushu_checkBox_arr.x = 280;
        this.jushu_checkBox_arr.y = jushu.y;
        this.addChild(this.jushu_checkBox_arr);
    };
    //玩法;
    Create_classic_view.prototype.init_wanfa_check_box = function () {
        var wanfa = new egret.Bitmap(RES.getRes("h_choice_play_text"));
        wanfa.x = 290;
        wanfa.y = 224;
        this.addChild(wanfa);
        var wanfa_info_dan = { type: 1, checkBox_arr: [{ img: "h_play_type_jue" }, { img: "h_play_type_gang" }] };
        this.wanfa_dan_checkBox_arr = new CheckboxArr(wanfa_info_dan, 5);
        this.wanfa_dan_checkBox_arr.x = 280;
        this.wanfa_dan_checkBox_arr.y = wanfa.y;
        this.addChild(this.wanfa_dan_checkBox_arr);
        var wanfa_info_duo = { type: 2, checkBox_arr: [{ img: "h_play_type_xuanfenggang" }, { img: "h_play_type_zhangmao" }, { img: "h_play_type_tuidaohu" }, { img: "h_play_type_daihun" }, { img: "h_play_type_qionghu" }, { img: "h_play_type_qingyise" }, { img: "h_play_type_qidui" }, { img: "h_play_type_pufen" }] };
        this.wanfa_duo_checkBox_arr = new CheckboxArr(wanfa_info_duo, 5);
        this.wanfa_duo_checkBox_arr.x = 280;
        this.wanfa_duo_checkBox_arr.y = wanfa.y + 60;
        this.addChild(this.wanfa_duo_checkBox_arr);
    };
    //计分;
    Create_classic_view.prototype.init_jifen_check_box = function () {
        var jifen = new egret.Bitmap(RES.getRes("h_scoring_text"));
        jifen.x = 290;
        jifen.y = 400;
        this.addChild(jifen);
        var jifen_info = { type: 1, checkBox_arr: [{ img: "h_dianType_1" }, { img: "h_dianType_2" }] };
        this.jifen_checkBox_arr = new CheckboxArr(jifen_info, 5);
        this.jifen_checkBox_arr.x = 280;
        this.jifen_checkBox_arr.y = jifen.y;
        this.addChild(this.jifen_checkBox_arr);
    };
    //开房;
    Create_classic_view.prototype.init_kaifang_check_box = function () {
        if (!this.clubId) {
            var kaifang = new egret.Bitmap(RES.getRes("h_open_room_text"));
            kaifang.x = 290;
            kaifang.y = 460;
            this.addChild(kaifang);
            var kaifang_info = { type: 1, checkBox_arr: [{ img: "h_master_text" }, { img: "h_replace_text" }] };
            this.kaifang_checkBox_arr = new CheckboxArr(kaifang_info, 5);
            this.kaifang_checkBox_arr.x = 280;
            this.kaifang_checkBox_arr.y = kaifang.y;
            this.addChild(this.kaifang_checkBox_arr);
        }
    };
    //设置默认;
    Create_classic_view.prototype.set_box_select = function () {
        this.jushu_checkBox_arr.set_default_select([0]);
        this.wanfa_dan_checkBox_arr.set_default_select([0]);
        this.wanfa_duo_checkBox_arr.set_default_select([0, 1, 4, 5]);
        this.jifen_checkBox_arr.set_default_select([0]);
        if (!this.clubId) {
            this.kaifang_checkBox_arr.set_default_select([0]);
        }
    };
    //得到当前的选择;
    Create_classic_view.prototype.get_box_select = function () {
        //圈数;
        var circleNum = this.jushu_checkBox_arr.get_arr_select_index_select();
        //玩法;
        var ruleJueGang = this.wanfa_dan_checkBox_arr.get_arr_select_index_select();
        //计分;
        var scoreType = this.jifen_checkBox_arr.get_arr_select_index_select();
        //开房;
        if (!this.clubId) {
            var roomType = this.kaifang_checkBox_arr.get_arr_select_index_select();
        }
        //玩法多选项;
        var wanfa_duoxuan = this.wanfa_duo_checkBox_arr.get_arr_select_index_select();
        //吃;
        var chi = wanfa_duoxuan[0] == 1 ? 2 : 1;
        if (circleNum == 1) {
            circleNum = 2;
        }
        else if (circleNum == 2) {
            circleNum = 4;
        }
        else if (circleNum == 3) {
            circleNum = 8;
        }
        //丹阳特有--不用合并
        //创建房间返回
        var info = { userId: this.userId,
            "circleNum": circleNum, "huaType": ruleJueGang, "chiType": chi, "scoreType": scoreType, "roomType": roomType };
        return info;
    };
    return Create_classic_view;
}(Base_view));
__reflect(Create_classic_view.prototype, "Create_classic_view");
//# sourceMappingURL=Create_classic_view.js.map