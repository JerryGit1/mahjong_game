var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tween = egret.Tween;
/**
 * Created by 周鹏斌大王 on 2018-04-17.
 */
var Location_view = (function (_super) {
    __extends(Location_view, _super);
    function Location_view() {
        var _this = _super.call(this) || this;
        _this.bg = _this.set_bit_center("g_clockBg1");
        _this.addChild(_this.bg);
        _this.hand = new egret.Bitmap();
        _this.hand.texture = RES.getRes("g_clock_east");
        _this.hand.anchorOffsetX = _this.hand.width / 2;
        _this.hand.anchorOffsetY = _this.hand.height / 2;
        _this.addChild(_this.hand);
        _this.clock_num_txt = new egret.BitmapText();
        _this.clock_num_txt.font = RES.getRes("g_clock_num");
        _this.clock_num_txt.letterSpacing = -3;
        _this.addChild(_this.clock_num_txt);
        _this.clock_num_txt.x = -17;
        _this.clock_num_txt.y = -20;
        return _this;
    }
    /*更新风向旋转 不同玩家风向不同*/
    Location_view.prototype.set_rotation = function (position) {
        this.self_position = position;
        this.bg.texture = RES.getRes("g_clockBg" + position);
    };
    /*系统剩余牌显示*/
    Location_view.prototype.update_residue_card_num = function (str) {
        if (!this.pai_num_txt) {
            this.pai_num_txt = new egret.TextField();
            this.addChild(this.pai_num_txt);
            this.pai_num_txt.x = -this.width / 2;
            this.pai_num_txt.width = this.width;
            this.pai_num_txt.textAlign = "center";
            this.pai_num_txt.size = 16;
            this.pai_num_txt.y = 65;
            this.pai_num_txt.size = 17;
            this.pai_num_txt.textColor = 0x063532;
            this.pai_num_txt.stroke = 1;
            this.pai_num_txt.strokeColor = 0x6ca7a1;
        }
        if (str)
            this.pai_num_txt.text = "剩余牌数:" + str;
    };
    //更新出牌指针方向
    Location_view.prototype.update_hand = function (position) {
        switch (this.self_position) {
            case 1:
                this.hand.texture = RES.getRes("g_clock_east" + position);
                break;
            case 2:
                this.hand.texture = RES.getRes("g_clock_south" + position);
                break;
            case 3:
                this.hand.texture = RES.getRes("g_clock_west" + position);
                break;
            case 4:
                this.hand.texture = RES.getRes("g_clock_north" + position);
                break;
            default:
                this.stop_count_down();
                MyConsole.getInstance().trace("重大失误 更新当前操作人风向时 玩家自己方位没确认呢", 0);
                return;
        }
        if (this.hand) {
            Tween.removeTweens(this.hand);
            this.hand.alpha = 1;
            this.hand.anchorOffsetX = this.hand.width / 2;
            this.hand.anchorOffsetY = this.hand.height / 2;
        }
        this.start_count_down();
    };
    Location_view.prototype.start_count_down = function () {
        var num = 10;
        this.stop_count_down(num + "");
        this.timer = setInterval(function () {
            if (num > 0) {
                this.clock_num_txt.text = num < 10 ? ("0" + num) : num;
                if (num == 3) {
                    //倒计时提示
                    egret.Tween.get(this.hand, { loop: true }).to({ alpha: 0.5 }, 300).wait(100).to({ alpha: 1 }, 300); //,{"loop":true}
                }
                num--;
            }
            else {
                this.stop_count_down();
            }
        }.bind(this), 1000);
    };
    Location_view.prototype.stop_count_down = function (str) {
        if (str === void 0) { str = "00"; }
        this.clock_num_txt.text = str;
        clearInterval(this.timer);
    };
    return Location_view;
}(Base_view));
__reflect(Location_view.prototype, "Location_view");
//# sourceMappingURL=Location_view.js.map