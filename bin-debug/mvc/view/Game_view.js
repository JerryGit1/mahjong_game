var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-15.
 */
var Game_view = (function (_super) {
    __extends(Game_view, _super);
    function Game_view() {
        return _super.call(this) || this;
    }
    return Game_view;
}(Base_view));
__reflect(Game_view.prototype, "Game_view");
//# sourceMappingURL=Game_view.js.map