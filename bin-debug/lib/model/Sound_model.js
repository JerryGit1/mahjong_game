var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
var Sound_model = (function (_super) {
    __extends(Sound_model, _super);
    function Sound_model() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sound_model.getLocalStorage = function () {
        /*背景*/
        this.bgSound_isPlay = true;
        if (egret.localStorage.getItem("bgSound_isPlay") != null) {
            if (egret.localStorage.getItem("bgSound_isPlay") == "false") {
                this.bgSound_isPlay = false;
            }
        }
        /*音效*/
        this.effectSound_isPlay = true;
        if (egret.localStorage.getItem("effectSound_isPlay") != null) {
            if (egret.localStorage.getItem("effectSound_isPlay") == "false") {
                this.effectSound_isPlay = false;
            }
        }
        /*背景音量*/
        if (egret.localStorage.getItem("musicVolume") != null) {
            this.musicVolume = Number(egret.localStorage.getItem("musicVolume"));
        }
        /*音效音量*/
        if (egret.localStorage.getItem("soundVolume") != null) {
            this.soundVolume = Number(egret.localStorage.getItem("soundVolume"));
        }
    };
    /*===================背景音乐===================*/
    /*设置背景音乐开关*/
    Sound_model.setBgSound = function () {
        this.bgSound_isPlay = !this.bgSound_isPlay;
        if (this.bgSound_isPlay) {
            this.playBackSound(this.currentBackSoundName);
        }
        else {
            this.stopBackSound();
        }
        egret.localStorage.setItem("bgSound_isPlay", String(this.bgSound_isPlay));
    };
    /*获取背景音乐开关*/
    Sound_model.getBgSound = function () {
        return this.bgSound_isPlay;
    };
    Sound_model.playBackSound = function (name, baseUrl) {
        if (baseUrl === void 0) { baseUrl = Const_model.getInstance().SOUND_PATH_BASE; }
        this.currentBackSoundName = name;
        if (name && this.bgSound_isPlay) {
            this.stopBackSound();
            if (this.soundLib[name]) {
                var sound = this.soundLib[name];
                if (sound) {
                    this.backSoundChannel = sound.play();
                    this.backSoundChannel.volume = this.musicVolume;
                }
            }
            else {
                Load_control.loadExternalSound(baseUrl + name + ".mp3", function (sound) {
                    this.soundLib[name] = sound;
                    this.playBackSound(name);
                }.bind(this));
            }
        }
    };
    /*暂停背景音乐*/
    Sound_model.stopBackSound = function () {
        if (this.backSoundChannel) {
            this.backSoundChannel.stop();
            this.backSoundChannel = null;
        }
    };
    /*声音失去焦点处理*/
    Sound_model.set_page_focus = function (bl) {
        if (bl === void 0) { bl = true; }
        if (!bl) {
            this.stopBackSound();
        }
        else {
            this.playBackSound(this.currentBackSoundName);
        }
    };
    /*设置背景音乐音量大小*/
    Sound_model.setBackSoundVolume = function (volume) {
        if (this.backSoundChannel) {
            this.backSoundChannel.volume = volume;
        }
        this.musicVolume = volume;
        egret.localStorage.setItem("musicVolume", String(volume));
    };
    /*获取背景音乐音量大小*/
    Sound_model.getBackSoundVolume = function () {
        return this.musicVolume;
    };
    /*===================音效===================*/
    /*设置音效开关*/
    Sound_model.setEffectSound = function () {
        this.effectSound_isPlay = !this.effectSound_isPlay;
        egret.localStorage.setItem("effectSound_isPlay", String(this.effectSound_isPlay));
    };
    /*获取置音声音开关*/
    Sound_model.getEffectSound = function () {
        return this.effectSound_isPlay;
    };
    /*播放音效*/
    Sound_model.playSoundEffect = function (name, soundChannel, baseUrl) {
        if (soundChannel === void 0) { soundChannel = null; }
        if (baseUrl === void 0) { baseUrl = Const_model.getInstance().SOUND_PATH_BASE; }
        if (this.effectSound_isPlay) {
            if (this.soundLib[baseUrl + name]) {
                var soundChannel = this.soundLib[baseUrl + name].play(0, 1);
                soundChannel.volume = this.soundVolume > 1 ? 1 : this.soundVolume;
            }
            else {
                Load_control.loadExternalSound(baseUrl + name + ".mp3", function (sound) {
                    if (sound) {
                        this.soundLib[baseUrl + name] = sound;
                        var soundChannel = this.soundLib[baseUrl + name].play(0, 1);
                        if (soundChannel)
                            soundChannel.volume = this.soundVolume > 1 ? 1 : this.soundVolume;
                    }
                }.bind(this));
            }
        }
    };
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
    Sound_model.stopAllBackEffect = function () {
        // for(var i in this.soundChannelLib){
        //     if(this.soundChannelLib[i]){
        //         this.soundChannelLib[i].stop();
        //         this.soundChannelLib[i]=null;
        //     }
        // }
        // this.soundChannelLib=[];
    };
    /*设置音效音量大小*/
    Sound_model.setEffectVolume = function (volume) {
        this.soundVolume = volume;
        egret.localStorage.setItem("soundVolume", String(volume));
    };
    /*获取背景音乐音量大小*/
    Sound_model.getEffectVolume = function () {
        return this.soundVolume;
    };
    return Sound_model;
}(Scene_model));
/*----------------------声音控制---------------------------*/
Sound_model.bgSound_isPlay = true;
Sound_model.effectSound_isPlay = true;
Sound_model.soundLib = {};
// private static soundChannelLib={};
Sound_model.soundVolume = 1;
Sound_model.musicVolume = 1;
__reflect(Sound_model.prototype, "Sound_model");
//# sourceMappingURL=Sound_model.js.map