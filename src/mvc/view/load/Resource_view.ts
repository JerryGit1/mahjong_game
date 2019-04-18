/**
 * Created by 周鹏斌大王 on 2017-12-23.
 * 丹阳特有的，合代码时不要动
 */
class Resource_view extends Base_view{
    protected bar;
    protected star:egret.Bitmap;
    protected barWidth=Main.stageWidth*.565;
    protected type;
    protected system;
    protected tip_text;//hyh 进度条提示文字
    protected girl:egret.Bitmap;
    protected _bg_loaded;
    public constructor(loadingType) {
        super();
        this.type = loadingType;
        this.createView();
    }
    protected createView():void {
        /*背景*/
        var bit:egret.Bitmap=new egret.Bitmap(RES.getRes("load_bg_png"));
        bit.width = Main.stageWidth;
        bit.height = Main.stageHeight;
        this.addChild(bit);

        /*显示加载条背景*/
        // var barBg=new egret.Bitmap(RES.getRes("loadingBg"));
        // barBg.y=Main.stageHeight - barBg.height*5+40;
        // barBg.x = Main.stageWidth/2 - barBg.width/2;
        // this.barWidth = barBg.width-4;
        // this.addChild(barBg);
        // /*显示加载条*/
        // this.bar = new egret.Bitmap(RES.getRes("loading"));
        // this.bar.y = barBg.y+5;
        // this.bar.x = Main.stageWidth/2-this.barWidth/2;
        // this.bar.scale9Grid = new egret.Rectangle(43,2,260,18);
        // this.bar.width = this.barWidth/5;
        // this.addChild(this.bar);
        //
        // /*显示小星星*/
        // this.star=this.set_bit_center("l_light_img");
        // this.star.x=this.bar.x;
        // this.star.y=this.bar.y+13;
        // this.star.visible=false;
        // egret.Tween.get(this.star,{loop:true}).to({alpha:.6},300).to({alpha:1},300);
        // this.addChild(this.star);
        // /*显示加载提示文本*/
        // var barTxtImg = new egret.Bitmap(RES.getRes("l_lading_text"));
        // barTxtImg.anchorOffsetX = barTxtImg.width/2;
        // barTxtImg.anchorOffsetY = barTxtImg.height/2;
        // barTxtImg.x = Main.stageWidth/2;
        // barTxtImg.y = this.bar.y+70;
        // //this.addChild(barTxtImg);

        this._bg_loaded = RES.getRes("load_bg_png")?true:false;
        // 进度条进度提示文字
        this.tip_text = new egret.TextField();
        this.tip_text.textColor = 0xffffff;
        this.tip_text.size = 19;
        this.addChild(this.tip_text);
    }
    public setProgress(current:number, total:number):void {
        if(this._bg_loaded){
            this.tip_text.text = "客官稍等，正在加载中...("+Math.floor((current/total)*100)+"%)";
            this.tip_text.anchorOffsetX = this.tip_text.width/2;
            this.tip_text.anchorOffsetY = this.tip_text.height/2;
            this.tip_text.x=Main.stageWidth/2;
            this.tip_text.y=Main.stageHeight*0.76;
        }
    }
    /*设置小星星位置 其他项目需要在cp下重写 zpb*/
    protected setStarPoint(w){
        this.star.visible=true;
        this.star.x=this.bar.x+w-this.star.width/2+10;
    }
    public clear(){
        // egret.Tween.removeTweens(this.star);
        // // this.system.stop(true);
        // this.system=null;
    }
}