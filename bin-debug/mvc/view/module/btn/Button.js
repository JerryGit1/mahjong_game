var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Admin on 2015/12/22.
 */
var MyButton = (function (_super) {
    __extends(MyButton, _super);
    function MyButton(st1, aniType) {
        if (aniType === void 0) { aniType = 0; }
        var _this = _super.call(this) || this;
        _this.str1 = "";
        _this.isChangeTexture = false;
        _this.sX = 1;
        _this.sY = 1;
        _this.button_name = "";
        _this.str1 = st1;
        _this.addCard(_this.str1);
        _this.button_name = st1;
        if (aniType && aniType == 1) {
            _this.addAni1View(st1);
        }
        else if (aniType && aniType == 2) {
            _this.startAni2();
        }
        return _this;
    }
    //添加事件
    MyButton.prototype.addTouchEvent = function () {
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
    };
    //取消事件
    MyButton.prototype.cutTouchEvent = function () {
        this.touchEnabled = false;
    };
    //鼠标按下事件
    MyButton.prototype.touchBegin = function (e) {
        if (this.btnChannel) {
            this.btnChannel.stop();
        }
        if (RES.getRes(this.str1 + "_2")) {
            this.isChangeTexture = true;
            this.changTexture(this.str1 + "_2");
        }
        egret.Tween.get(this).to({ scaleX: this.sX + 0.1, scaleY: this.sY + 0.1 }, 70);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
    };
    //鼠标弹起
    MyButton.prototype.touchEnd = function (e) {
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchEnd, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.touchEnd, this);
        if (this.isChangeTexture)
            this.changTexture(this.str1);
        egret.Tween.get(this).to({ scaleX: this.sX, scaleY: this.sY }, 70).call(function () {
            if (e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_TAP) {
                //派发点击事件
                this.dispatchEvent(new egret.Event("click"));
            }
        }.bind(this));
        //2.1.0 解决苹果点击后声音还不出来问题
        if (e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_TAP) {
            //播放音效
            Sound_model.playSoundEffect("btn_click");
        }
    };
    //销毁
    MyButton.prototype.clear = function () {
        clearTimeout(this.aniTimer);
        if (this.ani1Sp)
            egret.Tween.removeTweens(this.ani1Sp);
        egret.Tween.removeTweens(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    MyButton.prototype.addCard = function (str) {
        if (this.card == null) {
            this.card = new egret.Bitmap();
            this.addChild(this.card);
        }
        this.card.texture = RES.getRes(str);
        this.card.anchorOffsetX = this.card.width / 2;
        this.card.anchorOffsetY = this.card.height / 2;
        this.height = this.card.height;
    };
    //改变纹理
    MyButton.prototype.changTexture = function (str) {
        this.addCard(str);
    };
    //缩放大小
    MyButton.prototype.changeSize = function (scaleX, scaleY) {
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.sX = scaleX;
        this.sY = scaleY;
    };
    MyButton.prototype.get_name = function () {
        return this.button_name;
    };
    /*动画1*/
    MyButton.prototype.addAni1View = function (str) {
        this.ani1Mask = new egret.Bitmap();
        this.addChild(this.ani1Mask);
        this.ani1Mask.texture = RES.getRes(str);
        this.ani1Mask.anchorOffsetX = this.ani1Mask.width / 2;
        this.ani1Mask.anchorOffsetY = this.ani1Mask.height / 2;
        //滚动条
        this.ani1Sp = new egret.Shape();
        this.ani1Sp.graphics.beginFill(0xffffff, .8);
        this.ani1Sp.graphics.drawRect(-this.ani1Mask.width / 8, -this.ani1Mask.height * 2 / 2, this.ani1Mask.width / 8, this.ani1Mask.height * 2);
        this.ani1Sp.graphics.endFill();
        this.ani1Sp.rotation = 45;
        this.addChild(this.ani1Sp);
        this.ani1Sp.mask = this.ani1Mask;
        this.ani1Sp.alpha = 0;
        this.startAni1();
    };
    MyButton.prototype.startAni1 = function () {
        if (!this)
            clearTimeout(this.aniTimer);
        var timer = Math.floor(Math.random() * 4000) + 3000;
        this.aniTimer = setTimeout(function () {
            this.ani1Sp.x = -this.ani1Mask.width / 2;
            this.ani1Sp.y = 0;
            this.ani1Sp.alpha = 1;
            egret.Tween.get(this.ani1Sp).to({ x: this.ani1Mask.width * .7, y: 10, alpha: .1 }, 400);
            this.startAni1();
        }.bind(this), timer);
    }; /*动画1*/
    MyButton.prototype.startAni2 = function () {
        if (!this)
            clearTimeout(this.aniTimer);
        var timer = Math.floor(Math.random() * 3000) + 4000;
        this.aniTimer = setTimeout(function () {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ scaleY: .8, scaleX: 1.05 }, 400).to({ scaleY: .8 }, 70).to({ scaleY: 1.1, scaleX: .95 }, 120).to({ scaleY: 1, scaleX: 1 }, 90).to({ scaleY: .9 }, 50).to({ scaleY: 1.08, scaleX: .97 }, 100).to({ scaleY: 1, scaleX: 1 }, 100);
            this.startAni2();
        }.bind(this), timer);
    };
    return MyButton;
}(Base_view));
__reflect(MyButton.prototype, "MyButton");
//# sourceMappingURL=Button.js.map