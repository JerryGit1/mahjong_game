/**
 * Created by Tang on 2018/1/10.
 * tyq: 音效设置按钮
 */
class Effect_sound_btn extends Sound_btn_hyh{
    public constructor(bgTexture,openTexture,closeTexture){
        var volume = Sound_model.getEffectVolume();
        super(bgTexture,openTexture,closeTexture,volume);
    }
    protected click(e){
        Sound_model.setEffectSound();
        super.click(e);
    }
    //改变纹理
    protected changeTexture(){
        this.btn.texture = RES.getRes(Sound_model.getEffectSound()?this.openTexture:this.closeTexture);
        super.changeTexture(Sound_model.getEffectSound());
    }
    //设置音量
    protected setVolume(volume){
        Sound_model.setEffectVolume(volume);
    }
}