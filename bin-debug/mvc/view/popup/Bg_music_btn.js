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
 * tyq: 背景音乐设置按钮
 */
var Bg_sound_btn = (function (_super) {
    __extends(Bg_sound_btn, _super);
    function Bg_sound_btn(bgTexture, openTexture, closeTexture) {
        var _this = this;
        var volume = Sound_model.getBackSoundVolume();
        _this = _super.call(this, bgTexture, openTexture, closeTexture, volume) || this;
        return _this;
    }
    Bg_sound_btn.prototype.click = function (e) {
        Sound_model.setBgSound();
        _super.prototype.click.call(this, e);
    };
    //改变纹理
    Bg_sound_btn.prototype.changeTexture = function () {
        this.btn.texture = RES.getRes(Sound_model.getBgSound() ? this.openTexture : this.closeTexture);
        _super.prototype.changeTexture.call(this, Sound_model.getBgSound());
    };
    //设置音量
    Bg_sound_btn.prototype.setVolume = function (volume) {
        Sound_model.setBackSoundVolume(volume);
    };
    return Bg_sound_btn;
}(Sound_btn_hyh));
__reflect(Bg_sound_btn.prototype, "Bg_sound_btn");
//# sourceMappingURL=Bg_music_btn.js.map