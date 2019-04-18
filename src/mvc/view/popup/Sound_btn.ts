/**
 * Created by hyh on 2018/1/3.
 */
class Sound_btn_hyh extends Base_view{

    protected btn:egret.Bitmap;
    protected closeTexture;
    protected openTexture;
    protected bar1;
    protected backBg:egret.Shape;
    protected volumeBtn:egret.Bitmap;
    protected barWidth;
    protected moveBeginX;//世界坐标下的移动起始位置
    protected currentX;//移动目标当前实际位置
    public constructor(titleTexture,openTexture,closeTexture,volume){
        super();
        this.openTexture=openTexture;
        this.closeTexture=closeTexture;
        this.initContent(titleTexture,volume);
    }
    protected initContent(titleTexture,volume){
        /*文字标题*/
        var title=new egret.Bitmap(RES.getRes(titleTexture));
        title.x = -80;
        this.addChild(title);
        /*加载条背景*/
        var barBg=new egret.Bitmap(RES.getRes("l_load_bar_bg"));
        barBg.x =20;
        barBg.y =-5;
        this.addChild(barBg);

        this.barWidth = barBg.width;
        this.backBg=new egret.Shape();
        this.backBg.graphics.beginFill(0x00ff00,0);
        this.backBg.graphics.drawRect(barBg.x,barBg.y-barBg.height*3/2,barBg.width,barBg.height*3);
        this.backBg.graphics.endFill();
        this.addChildAt(this.backBg,0);
        this.backBg.touchEnabled=true;

        /*加载条*/
        this.bar1 = new egret.Bitmap(RES.getRes("l_pro_bar_img"));
        this.bar1.x = 24;
        this.bar1.y = -5;
        this.bar1.width = this.barWidth*volume;
        this.addChild(this.bar1);

        /*进度按钮*/
        this.volumeBtn=this.set_bit_center("h_strip_btn");
        this.volumeBtn.x=-2+volume*this.barWidth+20;
        this.volumeBtn.y = barBg.y+10;
        this.addChild(this.volumeBtn);
        this.backBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.changeVolumeBegin,this);
        
        /*开关按钮*/
        this.btn=new egret.Bitmap();
        this.btn.touchEnabled = true;
        this.addChild(this.btn);
        this.btn.x=400;
        this.btn.y=-14;
        this.changeTexture();
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
    }
    protected click(e:egret.TouchEvent){
        this.changeTexture();
    }
    //改变纹理
    protected changeTexture(_is=null){
        if(_is!=null)this.bar1.visible=this.volumeBtn.visible=_is;
    }
    protected changeVolumeBegin(e:egret.TouchEvent){
        this.changeEnd(null);
        this.backBg.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.changeVolume,this);
        this.backBg.addEventListener(egret.TouchEvent.TOUCH_END,this.changeEnd,this);
        this.moveBeginX = e.stageX;
        this.currentX=e.localX;
        this.changeVolume(e);
    }
    //改变音量
    protected changeVolume(e:egret.TouchEvent){
        var moveTarget = this.volumeBtn;
        var X1 = this.currentX+Math.floor(e.stageX- this.moveBeginX);
        var left_x=20;
        var right_x=362;

        if(X1 >=left_x && X1 <= right_x){
            moveTarget.x = X1;
        }else{
            if(X1<left_x) moveTarget.x = left_x;
            if(X1>right_x) moveTarget.x = right_x;
        }

        var current = moveTarget.x-left_x;
        var volume = current/this.barWidth;
        this.setVolume(volume);
        this.setProgress(current);
    }
    protected changeEnd(e){
        this.backBg.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.changeVolume,this);
        this.backBg.removeEventListener(egret.TouchEvent.TOUCH_END,this.changeEnd,this);
    }
    //设置音量
    protected setVolume(volume){

    }
    //设置进度条宽度
    public setProgress(current:number){
        this.bar1.width = current;
    }
    public clear(){
        this.changeEnd(null);
        this.backBg.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.changeVolumeBegin,this);
    }
}