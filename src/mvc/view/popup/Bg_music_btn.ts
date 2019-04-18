/**
 * Created by Tang on 2018/1/10.
 * tyq: 背景音乐设置按钮
 */
class Bg_sound_btn extends Sound_btn_hyh{
    public constructor(bgTexture,openTexture,closeTexture){
        var volume = Sound_model.getBackSoundVolume();
        super(bgTexture,openTexture,closeTexture,volume);
    }
    protected click(e){
        Sound_model.setBgSound();
        super.click(e);
    }
    //改变纹理
    protected changeTexture(){
        this.btn.texture = RES.getRes(Sound_model.getBgSound()?this.openTexture:this.closeTexture);
        super.changeTexture(Sound_model.getBgSound());
    }
    //设置音量
    protected setVolume(volume){
        Sound_model.setBackSoundVolume(volume);
    }
}