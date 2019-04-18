var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Tang on 2018/1/8.
 */
var Hint_popup = (function (_super) {
    __extends(Hint_popup, _super);
    //_isAddCloseBtn 是否显示关闭按钮 true false;
    // type 默认 min 可选值 max
    function Hint_popup(str, backFunc, _isAddCloseBtn, type, runBackFunc) {
        if (backFunc === void 0) { backFunc = null; }
        if (_isAddCloseBtn === void 0) { _isAddCloseBtn = true; }
        if (type === void 0) { type = "min"; }
        if (runBackFunc === void 0) { runBackFunc = null; }
        var _this = _super.call(this, true, false) || this;
        _this.str = str;
        _this.runBackFunc = runBackFunc;
        _this.initBg(type);
        _this.addText();
        if (backFunc) {
            _this.backFunc = backFunc;
            _this.addCurrentBtn(_isAddCloseBtn);
        }
        _this.open_ani();
        return _this;
    }
    Hint_popup.prototype.initBg = function (type) {
        // if(type =="max"){
        //     this.add_center_bg("popup_view_Bg_png",Main.stageWidth*.8,Main.stageHeight*.7);
        // }else{
        //     this.add_center_bg("popup_view_Bg_png",Main.stageWidth*.6,Main.stageHeight*.6);
        // }
        this.add_center_bg("p_popup_view_Bg_png", 700, 400);
        this.add_img_title("l_prompt_title", { x: 350, y: 0 });
        // this.addTitle("b_p_hint_title",this.centerSp.width/2+4,65);
        // return bg;
    };
    Hint_popup.prototype.closeClick = function () {
        //super.closeClick();
        //if(this.runBackFunc) this.runBackFunc();
    };
    Hint_popup.prototype.addText = function () {
        var tt = new egret.TextField();
        tt.textColor = 0xcc4225;
        tt.textAlign = "center";
        tt.lineSpacing = 10;
        tt.width = 600;
        tt.height = this.height * .8;
        tt.multiline = true;
        tt.verticalAlign = "middle";
        tt.fontFamily = "微软雅黑";
        tt.size = 30;
        tt.text = this.str;
        // tt.textFlow = (new egret.HtmlTextParser()).parser(this.str);
        tt.x = 54;
        tt.y = -110;
        this.center_sp.addChild(tt);
    };
    Hint_popup.prototype.addCurrentBtn = function (_isAddCloseBtn) {
        if (_isAddCloseBtn) {
            //确认按钮;
            this.confirmBtn = new MyButton("l_confirm_btn");
            this.confirmBtn.x = 540;
            this.confirmBtn.y = 320;
            this.center_sp.addChild(this.confirmBtn);
            this.confirmBtn.addTouchEvent();
            this.confirmBtn.addEventListener("click", this.confirmBtnClick, this);
            //取消按钮;
            var close_btn = new MyButton("l_cancel_btn");
            close_btn.x = 200;
            close_btn.y = 320;
            this.center_sp.addChild(close_btn);
            close_btn.addTouchEvent();
            close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close_click, this);
        }
        else {
            //确认按钮;
            this.confirmBtn = new MyButton("l_confirm_btn");
            this.confirmBtn.x = Main.stageWidth / 2 - 220;
            this.confirmBtn.y = 320;
            this.center_sp.addChild(this.confirmBtn);
            this.confirmBtn.addTouchEvent();
            this.confirmBtn.addEventListener("click", this.confirmBtnClick, this);
        }
    };
    Hint_popup.prototype.confirmBtnClick = function () {
        this.dispatchEvent(new egret.Event("close"));
        if (this.backFunc)
            this.backFunc();
    };
    Hint_popup.prototype.clear = function () {
        _super.prototype.clear.call(this);
        if (this.confirmBtn) {
            this.confirmBtn.clear();
            this.confirmBtn.removeEventListener("click", this.confirmBtnClick, this);
        }
    };
    return Hint_popup;
}(Base_popup));
__reflect(Hint_popup.prototype, "Hint_popup");
//# sourceMappingURL=Hint_popup.js.map