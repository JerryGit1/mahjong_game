var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by Tang on 2018/1/10.
 * tyq: 音效设置按钮
 */
var Effect_sound_btn = (function (_super) {
    __extends(Effect_sound_btn, _super);
    function Effect_sound_btn(bgTexture, openTexture, closeTexture) {
        var _this = this;
        var volume = Sound_model.getEffectVolume();
        _this = _super.call(this, bgTexture, openTexture, closeTexture, volume) || this;
        return _this;
    }
    Effect_sound_btn.prototype.click = function (e) {
        Sound_model.setEffectSound();
        _super.prototype.click.call(this, e);
    };
    //改变纹理
    Effect_sound_btn.prototype.changeTexture = function () {
        this.btn.texture = RES.getRes(Sound_model.getEffectSound() ? this.openTexture : this.closeTexture);
        _super.prototype.changeTexture.call(this, Sound_model.getEffectSound());
    };
    //设置音量
    Effect_sound_btn.prototype.setVolume = function (volume) {
        Sound_model.setEffectVolume(volume);
    };
    return Effect_sound_btn;
}(Sound_btn_hyh));
__reflect(Effect_sound_btn.prototype, "Effect_sound_btn");
//# sourceMappingURL=Effect_sound_btn.js.map