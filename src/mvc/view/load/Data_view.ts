/**
 * Created by 周鹏斌大王 on 2017-12-23.
 */
class Data_view extends Base_view{
    protected loadingBg:egret.Sprite;
    protected loadingPic:egret.Bitmap;
    protected loadingTxt:egret.TextField;
    public constructor(str){
        super();
        //遮罩
        this.loadingBg = new egret.Sprite();
        this.loadingBg.width = Main.stageWidth;
        this.loadingBg.height = Main.stageHeight;
        this.loadingBg.graphics.beginFill(0x000000,.2);
        this.loadingBg.graphics.drawRect(0,0,Main.stageWidth,Main.stageHeight);
        this.loadingBg.graphics.endFill();

        // 旋转的图片
        // this.loadingPic = new egret.Bitmap(RES.getRes("h_loading"));
        // this.loadingPic.x = Main.stageWidth/2;
        // this.loadingPic.y = Main.stageHeight/2;
        // this.loadingPic.anchorOffsetX = this.loadingPic.$getWidth()/2;
        // this.loadingPic.anchorOffsetY = this.loadingPic.$getHeight()/2;

        // 提示的文字
        // this.loadingTxt = new egret.TextField();
        // this.loadingTxt.text = str;
        // this.loadingTxt.x = Main.stageWidth/2 - this.loadingTxt.$getWidth()/3 ;
        // this.loadingTxt.y = this.loadingPic.y+this.loadingPic.height/2 + 20;
        // this.loadingTxt.fontFamily = "微软雅黑";
        // this.loadingTxt.size = 18;
        // this.loadingBg.addChild(this.loadingTxt);
        // this.loadingBg.addChild(this.loadingPic);
        this.addChild(this.loadingBg);

        // egret.Tween.get(this.loadingPic,{loop:true}).to({rotation:360},2000);
        // this.touchEnabled = true;
    }
    public clear(){
        // egret.Tween.removeTweens(this.loadingPic);
    }
}