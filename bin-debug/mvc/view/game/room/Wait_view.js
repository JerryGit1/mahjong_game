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
var Wait_view = (function (_super) {
    __extends(Wait_view, _super);
    function Wait_view(_is_house_owner, rule_str) {
        if (_is_house_owner === void 0) { _is_house_owner = false; }
        if (rule_str === void 0) { rule_str = ""; }
        var _this = _super.call(this) || this;
        _this.add_share_btn(); //分享按钮
        _this.add_leave_btn(_is_house_owner); //离开or解散按钮
        _this.add_rule_txt(rule_str); //游戏规则
        return _this;
    }
    /**
     * 显示开局按钮状态
     * @param type  0人没有凑齐不显示 1显示
     */
    Wait_view.prototype.update_start_btn = function (type) {
        if (type === void 0) { type = 0; }
        if (!this.start_game_btn) {
            this.start_game_btn = new MyButton("openingBtn");
            this.addChild(this.start_game_btn);
            this.start_game_btn.x = this.share_btn.x;
            this.start_game_btn.y = this.share_btn.y;
            this.start_game_btn.addTouchEvent();
            this.start_game_btn.addEventListener("click", this.start_btn_click, this);
        }
        this.start_game_btn.visible = Boolean(type);
        this.share_btn.visible = !Boolean(type);
    };
    //--------------------事件-----------------------
    //发起开局
    Wait_view.prototype.start_btn_click = function () {
        this.v_to_v_dis_event(this.EVENT.room.start_game);
    };
    Wait_view.prototype.clear = function () {
        if (this.start_game_btn) {
            this.start_game_btn.clear();
            this.start_game_btn.removeEventListener("click", this.start_btn_click, this);
        }
        this.start_game_btn = null;
        _super.prototype.clear.call(this);
    };
    return Wait_view;
}(Base_wait_view));
__reflect(Wait_view.prototype, "Wait_view");
//# sourceMappingURL=Wait_view.js.map