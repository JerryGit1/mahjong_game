/**
 * Created by Tang on 2018/1/8.
 */
class Double_btn extends MyButton{
    protected upImg:egret.Bitmap;
    public constructor(bgstr,str){
        super(bgstr);
        this.addUpImg(str);
    }
    protected addUpImg(str){
        var upImg = new egret.Bitmap(RES.getRes(str));
        upImg.x = -upImg.width/2;
        upImg.y = -upImg.height/2;
        upImg.touchEnabled = false;
        this.upImg = upImg;
        this.addChild(upImg);
    }
    public changeSize(scaleX,scaleY){
        super.changeSize(scaleX,scaleY);
        this.upImg.scaleX = scaleX;
        this.upImg.scaleY = scaleY;
        this.upImg.x += this.upImg.width*((1-scaleX)/2);
        this.upImg.y += this.upImg.height*((1-scaleY)/2);
    }
}