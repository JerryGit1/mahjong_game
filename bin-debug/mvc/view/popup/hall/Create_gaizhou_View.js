/**
 * Created by JackerCao on 2018/4/18.
 * 创建房间，丹阳特有-不用合并
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Create_gaizhou_view = (function (_super) {
    __extends(Create_gaizhou_view, _super);
    function Create_gaizhou_view(userId, clubId, room_data) {
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
        if (room_data && room_data.circleNum) {
            _this.set_box_select_cache(room_data);
        }
        else {
            //设置默认选择;
            _this.set_box_select();
        }
        return _this;
    }
    //局数;
    Create_gaizhou_view.prototype.init_jushu_check_box = function () {
        var jushu = new egret.Bitmap(RES.getRes("h_choice_game_text"));
        jushu.x = 200;
        jushu.y = 180;
        this.addChild(jushu);
        var jushu_info = { type: 1, checkBox_arr: [{ img: "h_2_circle_text" }, { img: "h_4_circle_text" }, { img: "h_8_circle_text" }] };
        this.jushu_checkBox_arr = new CheckboxArr(jushu_info);
        this.jushu_checkBox_arr.x = 240;
        this.jushu_checkBox_arr.y = jushu.y;
        this.addChild(this.jushu_checkBox_arr);
    };
    //玩法;
    Create_gaizhou_view.prototype.init_wanfa_check_box = function () {
        var wanfa = new egret.Bitmap(RES.getRes("h_choice_play_text"));
        wanfa.x = 200;
        wanfa.y = 240;
        this.addChild(wanfa);
        var wanfa_info_dan = { type: 1, checkBox_arr: [{ img: "h_no_flower_text" }, { img: "h_yes_flower_text" }] };
        this.wanfa_dan_checkBox_arr = new CheckboxArr(wanfa_info_dan, 5);
        this.wanfa_dan_checkBox_arr.x = 240;
        this.wanfa_dan_checkBox_arr.y = wanfa.y;
        this.addChild(this.wanfa_dan_checkBox_arr);
        var wanfa_info_duo = { type: 2, checkBox_arr: [{ img: "h_eat_text" }] };
        this.wanfa_duo_checkBox_arr = new CheckboxArr(wanfa_info_duo, 5);
        this.wanfa_duo_checkBox_arr.x = 240;
        this.wanfa_duo_checkBox_arr.y = wanfa.y + 60;
        this.addChild(this.wanfa_duo_checkBox_arr);
    };
    //计分;
    Create_gaizhou_view.prototype.init_jifen_check_box = function () {
        var jifen = new egret.Bitmap(RES.getRes("h_scoring_text"));
        jifen.x = 200;
        jifen.y = 370;
        this.addChild(jifen);
        var jifen_info = { type: 1, checkBox_arr: [{ img: "h_punching_package_text" }, { img: "h_punching_3_text" }, { img: "h_accompany_text" }, { img: "h_no_punching_text" }] };
        this.jifen_checkBox_arr = new CheckboxArr(jifen_info, 5);
        this.jifen_checkBox_arr.x = 240;
        this.jifen_checkBox_arr.y = jifen.y;
        this.addChild(this.jifen_checkBox_arr);
    };
    //开房;
    Create_gaizhou_view.prototype.init_kaifang_check_box = function () {
        if (!this.clubId) {
            var kaifang = new egret.Bitmap(RES.getRes("h_open_room_text"));
            kaifang.x = 200;
            kaifang.y = 440;
            this.addChild(kaifang);
            var kaifang_info = { type: 1, checkBox_arr: [{ img: "h_master_text" }, { img: "h_replace_text" }] };
            this.kaifang_checkBox_arr = new CheckboxArr(kaifang_info, 5);
            this.kaifang_checkBox_arr.x = 240;
            this.kaifang_checkBox_arr.y = kaifang.y;
            this.addChild(this.kaifang_checkBox_arr);
        }
    };
    //设置没缓存的默认选择;
    Create_gaizhou_view.prototype.set_box_select = function () {
        this.jushu_checkBox_arr.set_default_select([0]);
        this.wanfa_dan_checkBox_arr.set_default_select([0]);
        this.wanfa_duo_checkBox_arr.set_default_select([0]);
        this.jifen_checkBox_arr.set_default_select([0]);
        if (!this.clubId) {
            this.kaifang_checkBox_arr.set_default_select([0]);
        }
    };
    //设置you缓存的默认选择;
    Create_gaizhou_view.prototype.set_box_select_cache = function (room_data) {
        this.jushu_checkBox_arr.set_default_select([room_data.circleNum]);
        this.wanfa_dan_checkBox_arr.set_default_select([room_data.huaType]);
        this.wanfa_duo_checkBox_arr.set_default_select(room_data.chiType);
        this.jifen_checkBox_arr.set_default_select([room_data.scoreType]);
        if (!this.clubId) {
            this.kaifang_checkBox_arr.set_default_select([room_data.roomType]);
        }
    };
    //得到当前的选择;
    Create_gaizhou_view.prototype.get_box_select = function () {
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
        var info = { userId: this.userId,
            "circleNum": circleNum, "huaType": ruleJueGang, "chiType": chi, "scoreType": scoreType, "roomType": roomType };
        return info;
    };
    return Create_gaizhou_view;
}(Base_view));
__reflect(Create_gaizhou_view.prototype, "Create_gaizhou_view");
//# sourceMappingURL=Create_gaizhou_View.js.map