var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2018-04-27.
 */
var Base_card_view = (function (_super) {
    __extends(Base_card_view, _super);
    function Base_card_view(base_card_model, w) {
        if (w === void 0) { w = 100; }
        var _this = _super.call(this) || this;
        //标准宽高
        _this.w = 0;
        _this.h = 0;
        //初始坐标
        _this.initX = 0;
        _this.initY = 0;
        _this._cur_touch_state = 0; //拖动时候用
        //是否花牌
        _this.is_hua = false;
        _this.model = base_card_model;
        _this.is_hua = Base_card_model.act_code_get_info(_this.model.act_code).type == _this.CONST.PLAYER_ACTION.hua;
        _this.code = _this.model.act_code;
        _this.w = w;
        _this.mj_sp = new egret.Sprite();
        _this.addChild(_this.mj_sp);
        //显示背景
        _this.update_bg();
        //显示牌面
        _this.add_front();
        //显示混icon
        _this.add_hun_icon();
        return _this;
        // this.graphics.beginFill(0x00ff00,1);
        // this.graphics.drawCircle(0,0,3);
    }
    //更新背景 view_status 牌状态 普通  亮 灰
    Base_card_view.prototype.update_bg = function (view_status) {
        if (view_status === void 0) { view_status = ""; }
        this.remove_bg();
        var str = "mj_";
        str += this.model.view_type + "_"; //类型
        str += (this.model.view_position == 4) ? 2 : this.model.view_position; //方位
        str += view_status ? ("_" + view_status) : ""; //状态
        this.back_img = new egret.Bitmap(RES.getRes(str));
        this.mj_sp.addChildAt(this.back_img, 0);
        //缩放
        var scale = this.w / this.back_img.width;
        this.mj_sp.scaleX = this.mj_sp.scaleY = scale;
        this.h = Math.floor(this.mj_sp.scaleX * this.back_img.height);
        if (this.model.view_position == 2) {
            if (this.model.view_type == this.CONST.CARD_TYPE.base_stop) {
                //二号位置 反转
                this.mj_sp.scaleX = -scale;
                this.mj_sp.x = this.w;
                this.mj_sp.y = -this.h;
            }
            else if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop
                || this.model.view_type == this.CONST.CARD_TYPE.an_g_stop
                || this.model.view_type == this.CONST.CARD_TYPE.play) {
                //二号位置 旋转
                this.mj_sp.rotation = -90;
                this.mj_sp.y = this.h - this.w;
            }
        }
        else if (this.model.view_position == 3) {
            if (this.model.view_type == this.CONST.CARD_TYPE.base_stop) {
                this.mj_sp.x = -this.w;
            }
            else if (this.model.view_type == this.CONST.CARD_TYPE.an_g_stop) {
                this.mj_sp.scaleX = this.mj_sp.scaleY = scale - .1;
                this.h = Math.abs(this.mj_sp.scaleX * this.back_img.height);
                this.mj_sp.y -= 2;
            }
        }
        else if (this.model.view_position == 4) {
            if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop
                || this.model.view_type == this.CONST.CARD_TYPE.an_g_stop
                || this.model.view_type == this.CONST.CARD_TYPE.play) {
                //旋转
                this.back_img.scaleX = -1;
                this.back_img.x = this.back_img.width;
                this.mj_sp.rotation = 90;
                this.mj_sp.y = 0;
                this.mj_sp.x = this.w;
            }
        }
    };
    //显示牌正面
    Base_card_view.prototype.add_front = function () {
        if (this.model.act_code != -1) {
            var card_img = this.set_bit_center("mj_z_" + this.model.act_code, false);
            this.mj_sp.addChild(card_img);
            if (this.model.view_position == 1) {
                if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop) {
                    card_img.scaleX = card_img.scaleY = .69;
                    card_img.x = 8.3;
                    card_img.y = 2.4; //吃碰杠牌
                }
                else if (this.model.view_type == this.CONST.CARD_TYPE.play) {
                    card_img.scaleX = .62;
                    card_img.scaleY = .55;
                    card_img.x = 9.7;
                    card_img.y = 3.09; //桌牌
                }
                else if (this.model.view_type == this.CONST.CARD_TYPE.base_stop) {
                    card_img.scaleX = 1.16;
                    card_img.scaleY = 1.17;
                    card_img.x = 5;
                    card_img.y = 12; //基础牌
                }
            }
            else if (this.model.view_position == 2) {
                card_img.x = 9;
                card_img.y = 16; //基础牌
                if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop
                    || this.model.view_type == this.CONST.CARD_TYPE.play) {
                    card_img.scaleX = .54;
                    card_img.scaleY = .55;
                    card_img.x = 21;
                    card_img.y = 16; //吃碰杠牌
                    card_img.skewY = -12;
                }
            }
            else if (this.model.view_position == 3) {
                card_img.x = 9;
                card_img.y = 16; //基础牌
                if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop || this.model.view_type == this.CONST.CARD_TYPE.play) {
                    card_img.scaleX = .62;
                    card_img.scaleY = .55;
                    card_img.x = 9.7;
                    card_img.y = 3.09; //吃碰杠牌//桌牌
                }
            }
            else if (this.model.view_position == 4) {
                card_img.x = 9;
                card_img.y = 16; //基础牌
                if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop
                    || this.model.view_type == this.CONST.CARD_TYPE.play) {
                    card_img.scaleX = .54;
                    card_img.scaleY = .55;
                    card_img.x = 1.9;
                    card_img.y = 10.4; //吃碰杠牌
                    card_img.skewY = 12;
                }
            }
            var hua_list = [180, 181, 182, 183, 184, 185, 186, 187];
            if (this.model.act_code > 34 && hua_list.indexOf(this.model.act_code) < 0) {
                MyConsole.getInstance().trace("重大失误,单张牌行为ID 最大为34-现在是" + this.model.act_code, 0);
            }
        }
    };
    //显示混ICON
    Base_card_view.prototype.add_hun_icon = function () {
        if (this.model._is_hun) {
            var hun_icon = this.set_bit_center("g_hun_icon");
            this.mj_sp.addChild(hun_icon);
            if (!this.CONST.PLAYBACK_MODEL) {
                if (this.model.view_position == 1) {
                    hun_icon.x = 52;
                    hun_icon.y = 25;
                    if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop || this.model.view_type == this.CONST.CARD_TYPE.play) {
                        hun_icon.visible = false;
                    }
                }
                else if (this.model.view_position == 2) {
                    hun_icon.visible = false;
                }
                else if (this.model.view_position == 3) {
                    hun_icon.visible = false;
                }
                else if (this.model.view_position == 4) {
                    hun_icon.visible = false;
                }
            }
            else {
                if (this.model.view_position == 1) {
                    hun_icon.x = 52;
                    hun_icon.y = 25;
                    if (this.model.view_type == this.CONST.CARD_TYPE.cpg_stop || this.model.view_type == this.CONST.CARD_TYPE.play) {
                        hun_icon.visible = false;
                    }
                }
                else if (this.model.view_position == 2) {
                    hun_icon.x = 40;
                    hun_icon.y = 16;
                    hun_icon.scaleX = .54;
                    hun_icon.scaleY = .55;
                    hun_icon.skewY = -12;
                }
                else if (this.model.view_position == 3) {
                    hun_icon.x = 39;
                    hun_icon.y = 10;
                    hun_icon.scaleX = .62;
                    hun_icon.scaleY = .55;
                }
                else if (this.model.view_position == 4) {
                    hun_icon.x = 20;
                    hun_icon.y = 17;
                    hun_icon.scaleX = .54;
                    hun_icon.scaleY = .55;
                    hun_icon.skewY = 12;
                }
            }
        }
    };
    Base_card_view.prototype.set_jian_tou_icon = function (bl) {
        if (bl === void 0) { bl = false; }
        if (!this.jian_tou_icon) {
            this.jian_tou_icon = this.set_bit_center("g_pointer");
            this.mj_sp.addChild(this.jian_tou_icon);
            this.jian_tou_icon.scaleY = this.jian_tou_icon.scaleX = .5;
            this.jian_tou_icon.x = Math.floor(this.w * .8) / 2;
            this.jian_tou_icon.y = -12;
        }
        this.jian_tou_icon.visible = bl;
    };
    //显示胡ICON
    Base_card_view.prototype.add_hu_icon = function () {
        var hu_icon = this.set_bit_center("g_hu_icon");
        this.mj_sp.addChild(hu_icon);
        hu_icon.x = 53;
        hu_icon.y = 82;
    };
    //显示吃的效果
    Base_card_view.prototype.add_chi_float = function () {
        var str = "mj_";
        str += this.model.view_type + "_"; //类型
        str += (this.model.view_position == 4) ? 2 : this.model.view_position; //方位
        str += "_chi"; //状态
        var bg = new egret.Bitmap(RES.getRes(str));
        if (this.model.view_position == 4) {
            //旋转
            bg.scaleX = -1;
            bg.x = this.back_img.width;
            bg.rotation = 0;
        }
        this.mj_sp.addChild(bg);
    };
    Base_card_view.prototype.remove_bg = function () {
        if (this.back_img) {
            this.mj_sp.removeChild(this.back_img);
            this.back_img = null;
        }
    };
    Object.defineProperty(Base_card_view.prototype, "cur_touch_state", {
        get: function () {
            return this._cur_touch_state;
        },
        set: function (value) {
            if (this._cur_touch_state != value) {
                this._cur_touch_state = value;
                //起立动画
                egret.Tween.removeTweens(this);
                if (this._cur_touch_state == 1) {
                    egret.Tween.get(this).to({ y: this.initY - 20, x: this.initX }, 100);
                }
                else if (this._cur_touch_state == 0) {
                    egret.Tween.get(this).to({ y: this.initY, x: this.initX }, 50);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Base_card_view.prototype, "hun", {
        get: function () {
            return this.model._is_hun;
        },
        enumerable: true,
        configurable: true
    });
    //一号位置发牌动画
    Base_card_view.prototype.update_bg_ani = function () {
        this.mj_sp.alpha = 0;
        var bg = this.set_bit_center("mj_4_1");
        this.addChild(bg);
        //缩放
        var scale = this.w / bg.width;
        bg.scaleX = bg.scaleY = scale;
        bg.x = 41;
        bg.y = 66;
        bg.alpha = 0;
        egret.Tween.get(bg).to({ alpha: 1 }, 30).wait(300).to({ scaleY: .9 }, 100).call(function () {
            this.removeChild(bg);
            var scale = this.mj_sp.scaleY;
            var h = (this.mj_sp.height * scale) / 2;
            this.mj_sp.anchorOffsetY = this.mj_sp.height / 2;
            this.mj_sp.y = h;
            this.mj_sp.scaleY = scale - .1;
            this.mj_sp.alpha = 1;
            egret.Tween.get(this.mj_sp).to({ alpha: 1, scaleY: scale }, 100);
        }, this);
    };
    return Base_card_view;
}(Base_view));
__reflect(Base_card_view.prototype, "Base_card_view");
//# sourceMappingURL=Base_card_view.js.map