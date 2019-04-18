/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
class Sound_model extends Scene_model{
    /*----------------------声音控制---------------------------*/
    private static bgSound_isPlay=true;
    private static effectSound_isPlay=true;
    private static soundLib={};
    // private static soundChannelLib={};
    private static soundVolume:number=1;
    private static musicVolume:number=1;

    public static getLocalStorage(){
        /*背景*/
        this.bgSound_isPlay=true;
        if(egret.localStorage.getItem("bgSound_isPlay")!=null){
            if(egret.localStorage.getItem("bgSound_isPlay")=="false"){
                this.bgSound_isPlay=false;
            }
        }
        /*音效*/
        this.effectSound_isPlay=true;
        if(egret.localStorage.getItem("effectSound_isPlay")!=null){
            if(egret.localStorage.getItem("effectSound_isPlay")=="false"){
                this.effectSound_isPlay=false;
            }
        }
        /*背景音量*/
        if(egret.localStorage.getItem("musicVolume")!=null){
            this.musicVolume=Number(egret.localStorage.getItem("musicVolume"));
        }
        /*音效音量*/
        if(egret.localStorage.getItem("soundVolume")!=null){
            this.soundVolume=Number(egret.localStorage.getItem("soundVolume"));
        }
    }
    /*===================背景音乐===================*/
    /*设置背景音乐开关*/
    public static setBgSound(){
        this.bgSound_isPlay=!this.bgSound_isPlay;
        if(this.bgSound_isPlay){
            this.playBackSound(this.currentBackSoundName);
        }else{
            this.stopBackSound();
        }
        egret.localStorage.setItem("bgSound_isPlay",String(this.bgSound_isPlay));
    }
    /*获取背景音乐开关*/
    public static getBgSound():Boolean{
        return this.bgSound_isPlay;
    }
    /*播放背景音乐*/
    private static backSoundChannel:egret.SoundChannel;
    private static currentBackSoundName:string;
    public static playBackSound(name,baseUrl=Const_model.getInstance().SOUND_PATH_BASE){
        this.currentBackSoundName=name;
        if(name && this.bgSound_isPlay){
            this.stopBackSound();
            if(this.soundLib[name]){
                var sound:egret.Sound=this.soundLib[name];
                if(sound){
                    this.backSoundChannel=sound.play();
                    this.backSoundChannel.volume = this.musicVolume;
                }
            }else{
                Load_control.loadExternalSound(baseUrl+name+".mp3",function (sound) {
                    this.soundLib[name]=sound;
                    this.playBackSound(name);
                }.bind(this));
            }


        }
    }
    /*暂停背景音乐*/
    public static stopBackSound(){
        if(this.backSoundChannel){
            this.backSoundChannel.stop();
            this.backSoundChannel=null;
        }
    }
    /*声音失去焦点处理*/
    public static set_page_focus(bl=true){
        if(!bl){
            this.stopBackSound();
        }else{
            this.playBackSound(this.currentBackSoundName);
        }

    }
    /*设置背景音乐音量大小*/
    public static setBackSoundVolume(volume){
        if(this.backSoundChannel){
            this.backSoundChannel.volume = volume;
        }
        this.musicVolume = volume;
        egret.localStorage.setItem("musicVolume",String(volume));
    }
    /*获取背景音乐音量大小*/
    public static getBackSoundVolume():number{
        return this.musicVolume;
    }
    /*===================音效===================*/
    /*设置音效开关*/
    public static setEffectSound(){
        this.effectSound_isPlay=!this.effectSound_isPlay;
        egret.localStorage.setItem("effectSound_isPlay",String(this.effectSound_isPlay));
    }
    /*获取置音声音开关*/
    public static getEffectSound():Boolean{
        return this.effectSound_isPlay;
    }
    /*播放音效*/
    public static playSoundEffect(name,soundChannel=null,baseUrl=Const_model.getInstance().SOUND_PATH_BASE){
        if(this.effectSound_isPlay){
            if(this.soundLib[baseUrl+name]){
                var soundChannel=this.soundLib[baseUrl+name].play(0,1);
                soundChannel.volume = this.soundVolume>1?1:this.soundVolume;
            }else{
                Load_control.loadExternalSound(baseUrl+name+".mp3",function (sound) {
                    if(sound){
                        this.soundLib[baseUrl+name]=sound;
                        var soundChannel=this.soundLib[baseUrl+name].play(0,1);
                        if(soundChannel)soundChannel.volume = this.soundVolume>1?1:this.soundVolume;
                    }

                }.bind(this));
            }
        }
    }
    // /*播放音效*/  --- 原生 舍弃
    // public static playSoundEffect_audio(name,soundChannel=null,baseUrl="resource/AH_MJ/sound/"){
    //     if(this.effectSound_isPlay){
    //         if(this.soundLib[name]){
    //             this.soundLib[name].play();
    //             this.soundLib[name].volume = this.soundVolume;
    //         }else{
    //             this.load_layer.loadExternalSound_audio(baseUrl+name+".mp3",function (sound) {
    //                 this.soundLib[name]=sound;
    //                 this.soundLib[name].play();
    //                 this.soundLib[name].volume = this.soundVolume;
    //             }.bind(this));
    //         }
    //     }
    // }
    /*暂停音效*/
    public static stopAllBackEffect(){
        // for(var i in this.soundChannelLib){
        //     if(this.soundChannelLib[i]){
        //         this.soundChannelLib[i].stop();
        //         this.soundChannelLib[i]=null;
        //     }
        // }
        // this.soundChannelLib=[];
    }
    /*设置音效音量大小*/
    public static setEffectVolume(volume){
        this.soundVolume = volume;
        egret.localStorage.setItem("soundVolume",String(volume));
    }
    /*获取背景音乐音量大小*/
    public static getEffectVolume():number{
        return this.soundVolume;
    }
}