/**
 * Created by 周鹏斌大王 on 2018-05-10.
 */
//开关按钮

class On_off_btn extends MyButton{

    public _bl=true;//true开启状态 false关闭状态
    private on_str;//默认开
    private off_str;
    private chang_fun;
    public constructor(on_str,off_str,chang_fun=null){
        super(on_str);
        this.off_str=off_str;
        this.on_str=on_str;
        this.chang_fun=chang_fun;
    }
    public set bl(bl){
        this._bl=bl;
        if(this._bl){
            this.changTexture(this.on_str);
        }else{
            this.changTexture(this.off_str);
        }
    }
    public get bl(){
        return this._bl;
    }
    //鼠标弹起
    protected touchEnd(e:egret.TouchEvent):void{
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchEnd,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEnd,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchEnd,this);
        if(this.isChangeTexture) this.changTexture(this.str1);

        egret.Tween.get(this).to({scaleX:this.sX,scaleY:this.sY},70).call(function () {
            if(e.type==egret.TouchEvent.TOUCH_END||e.type==egret.TouchEvent.TOUCH_TAP){
                //派发点击事件
                this.bl=!this.bl;
                if(this.chang_fun)this.chang_fun(this.bl);
                this.dispatchEvent(new egret.Event("click"));
            }
        }.bind(this));
        //2.1.0 解决苹果点击后声音还不出来问题
        if(e.type==egret.TouchEvent.TOUCH_END||e.type==egret.TouchEvent.TOUCH_TAP){
            //播放音效
            Sound_model.playSoundEffect("btn_click");
        }
    }


}