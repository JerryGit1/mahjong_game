var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by zwb on 2018/5/15.
 * 俱乐部主页--按钮
 */
var Club_btn = (function (_super) {
    __extends(Club_btn, _super);
    function Club_btn(str, info) {
        var _this = _super.call(this, str) || this;
        // 俱乐部名字
        var txt = new egret.TextField();
        _this.addChild(txt);
        txt.width = _this.width;
        txt.anchorOffsetX = txt.width / 2;
        txt.y = 5;
        txt.textAlign = "center";
        txt.size = 35;
        _this.addChild(txt);
        txt.text = info.clubName;
        // 主持人
        var txt = new egret.TextField();
        _this.addChild(txt);
        txt.width = _this.width;
        txt.size = 25;
        txt.x = -45 + 62;
        txt.y = 69;
        _this.addChild(txt);
        txt.text = String(decodeURIComponent(info.clubUserName));
        // 人数
        var txt = new egret.TextField();
        _this.addChild(txt);
        txt.width = _this.width;
        txt.size = 25;
        txt.x = -3;
        txt.y = 101;
        _this.addChild(txt);
        txt.text = info.allNums + "人";
        return _this;
    }
    return Club_btn;
}(MyButton));
__reflect(Club_btn.prototype, "Club_btn");
//# sourceMappingURL=Club_btn.js.map