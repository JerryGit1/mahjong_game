/**
 * Created by Admin on 2015/12/22.
 */
class MyButton extends Base_view{
    public card:egret.Bitmap;
    protected str1="";
    protected isChangeTexture:boolean=false;
    protected sX:number=1;
    protected sY:number=1;
    protected ani1Sp;
    protected ani1Mask;
    protected button_name:string ="";
    public constructor(st1,aniType=0) {
        super();
        this.str1 = st1;
        this.addCard(this.str1);
        this.button_name=st1;
        if(aniType&&aniType==1){
            this.addAni1View(st1);
        }else if(aniType&&aniType==2){
            this.startAni2();
        }
    }
    //添加事件
    public addTouchEvent():void{
        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
    }
    //取消事件
    public cutTouchEvent():void{
        this.touchEnabled=false;
    }
    private btnChannel:egret.SoundChannel;
    //鼠标按下事件
    private touchBegin(e:egret.TouchEvent):void{
        if(this.btnChannel){
            this.btnChannel.stop();
        }
        if(RES.getRes(this.str1+"_2")){
            this.isChangeTexture = true;
            this.changTexture(this.str1+"_2");
        }
        egret.Tween.get(this).to({scaleX:this.sX+0.1,scaleY:this.sY+0.1},70);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.touchEnd,this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL,this.touchEnd,this);
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
                this.dispatchEvent(new egret.Event("click"));
            }
        }.bind(this));
        //2.1.0 解决苹果点击后声音还不出来问题
        if(e.type==egret.TouchEvent.TOUCH_END||e.type==egret.TouchEvent.TOUCH_TAP){
            //播放音效
            Sound_model.playSoundEffect("btn_click");
        }
    }
    //销毁
    public clear():void{
        clearTimeout(this.aniTimer);
        if(this.ani1Sp)egret.Tween.removeTweens(this.ani1Sp);
        egret.Tween.removeTweens(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
    }
    private addCard(str) {
        if (this.card == null) {
            this.card = new egret.Bitmap();
            this.addChild(this.card);
        }
        this.card.texture = RES.getRes(str);
        this.card.anchorOffsetX = this.card.width/2;
        this.card.anchorOffsetY = this.card.height/2;
        this.height=this.card.height;
    }
    //改变纹理
    public changTexture(str){
        this.addCard(str);
    }
    //缩放大小
    public changeSize(scaleX,scaleY){
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.sX = scaleX;
        this.sY = scaleY;
    }

    public get_name():string{
        return this.button_name;
    }
    
    private aniTimer;
    /*动画1*/
    private addAni1View(str){
        this.ani1Mask = new egret.Bitmap();
        this.addChild(this.ani1Mask);
        this.ani1Mask.texture = RES.getRes(str);
        this.ani1Mask.anchorOffsetX = this.ani1Mask.width/2;
        this.ani1Mask.anchorOffsetY = this.ani1Mask.height/2;

        //滚动条
        this.ani1Sp=new egret.Shape();
        this.ani1Sp.graphics.beginFill(0xffffff,.8);
        this.ani1Sp.graphics.drawRect(-this.ani1Mask.width/8,-this.ani1Mask.height*2/2,this.ani1Mask.width/8,this.ani1Mask.height*2);
        this.ani1Sp.graphics.endFill();
        this.ani1Sp.rotation=45;
        this.addChild(this.ani1Sp);
        this.ani1Sp.mask=this.ani1Mask;
        this.ani1Sp.alpha=0;
        this.startAni1();
    }
    private startAni1(){
        if(!this)clearTimeout(this.aniTimer);
        var timer=Math.floor(Math.random()*4000)+3000;
        this.aniTimer=setTimeout(function () {
            this.ani1Sp.x=-this.ani1Mask.width/2;
            this.ani1Sp.y=0;
            this.ani1Sp.alpha=1;
            egret.Tween.get(this.ani1Sp).to({x:this.ani1Mask.width*.7,y:10,alpha:.1},400);
            this.startAni1();
        }.bind(this),timer);
    }/*动画1*/
    private startAni2(){
        if(!this)clearTimeout(this.aniTimer);
        var timer=Math.floor(Math.random()*3000)+4000;
        this.aniTimer=setTimeout(function () {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({scaleY:.8,scaleX:1.05},400).to({scaleY:.8},70).to({scaleY:1.1,scaleX:.95},120).to({scaleY:1,scaleX:1},90).to({scaleY:.9},50).to({scaleY:1.08,scaleX:.97},100).to({scaleY:1,scaleX:1},100);
            this.startAni2();
        }.bind(this),timer);
    }
}



