var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
var Room_bg_view = (function (_super) {
    __extends(Room_bg_view, _super);
    function Room_bg_view() {
        var _this = _super.call(this) || this;
        _this.EVENT = new Game_room_event_model(); //事件常量
        _this.init_view();
        return _this;
    }
    //--------------------------初始化-----------------------
    Room_bg_view.prototype.init_view = function () {
        //大背景
        var bg = this.set_bit_center("g_back", false);
        bg.width = Main.stageWidth;
        bg.height = Main.stageHeight;
        this.addChild(bg);
        //左上角
        this.init_top_left_view();
        //中间风向
        this.center_location_view = new Location_view();
        this.addChild(this.center_location_view);
        this.center_location_view.x = this.CONST.LOCATION_POINT.x;
        this.center_location_view.y = this.CONST.LOCATION_POINT.y;
        this.center_location_view.visible = false;
    };
    Room_bg_view.prototype.init_top_left_view = function () {
        this.top_left_sp = new egret.Sprite();
        this.addChild(this.top_left_sp);
        var bg = new egret.Bitmap(RES.getRes("g_left_roomInfo_bg"));
        this.top_left_sp.addChild(bg);
        //房间号
        var room_id_title = new egret.BitmapText();
        room_id_title.font = RES.getRes("room_num");
        room_id_title.letterSpacing = -9;
        room_id_title.x = 10;
        room_id_title.y = 14.5;
        room_id_title.text = "d";
        this.top_left_sp.addChild(room_id_title);
        this.room_id_txt = new egret.BitmapText();
        this.room_id_txt.font = RES.getRes("room_num");
        this.room_id_txt.letterSpacing = -9;
        this.room_id_txt.x = 80;
        this.room_id_txt.y = 14.5;
        this.top_left_sp.addChild(this.room_id_txt);
        //圈数
        var game_num_title = new egret.BitmapText();
        game_num_title.font = RES.getRes("room_num");
        game_num_title.letterSpacing = -9;
        game_num_title.x = 10;
        game_num_title.y = 48;
        game_num_title.text = "c";
        this.top_left_sp.addChild(game_num_title);
        this.game_num_txt = new egret.BitmapText();
        this.game_num_txt.font = RES.getRes("room_num");
        this.game_num_txt.letterSpacing = -9;
        this.top_left_sp.addChild(this.game_num_txt);
        this.game_num_txt.y = 48;
        this.game_num_txt.x = 82;
    };
    //--------------------------刷新-------------------------
    //房间号码
    Room_bg_view.prototype.update_room_id = function (id) {
        this.room_id_txt.text = id;
    };
    //圈数
    Room_bg_view.prototype.update_game_num = function (num, max_num) {
        this.game_num_txt.text = num + "/" + max_num;
    };
    //设置第一人称风向
    Room_bg_view.prototype.set_self_location = function (position) {
        if (position === void 0) { position = false; }
        this.center_location_view.visible = false;
        if (position) {
            this.center_location_view.visible = true;
            this.center_location_view.set_rotation(position);
        }
    };
    //更新当前出牌人风向
    Room_bg_view.prototype.update_current_location = function (position) {
        this.center_location_view.update_hand(position);
    };
    //更新剩余牌数量
    Room_bg_view.prototype.update_residue_card_num = function (num) {
        this.center_location_view.update_residue_card_num(num);
    };
    Room_bg_view.prototype.clear = function () {
        _super.prototype.clear.call(this);
    };
    return Room_bg_view;
}(Base_view));
__reflect(Room_bg_view.prototype, "Room_bg_view");
//# sourceMappingURL=Room_bg_view.js.map