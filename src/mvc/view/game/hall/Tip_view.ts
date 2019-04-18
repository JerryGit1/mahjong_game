import tr = egret.sys.tr;
/**
 * Created by Tang on 2018/3/14.
 * 文字提示框（小型）
 */
class Tip_view extends Base_view{
    protected bg:egret.Bitmap;
    protected messageTxt;//文字提示
    public  constructor(string,width=110,height=10,x?,y?){
        super();
        // this.name="H_tipView";
        this.add_bg();//添加背景
        this.messageTxt=new egret.TextField();
        this.messageTxt.size = 16;
        this.messageTxt.textColor=0xf7f0df;
        this.messageTxt.multiline=true;
        this.messageTxt.wordWrap = true;
        this.messageTxt.textAlign="left";
        this.messageTxt.verticalAlign="middle";
        this.messageTxt.lineSpacing=10;
        this.addChild(this.messageTxt);
        this.add_txt(string,width,height);//添加文字提示
    }

    //添加背景
    protected add_bg(){
        var tipBg = new egret.Bitmap(RES.getRes("l_rule_bg"));
        this.addChild(tipBg);
        this.bg = tipBg;
    }
    //添加文字提示
     public add_txt(str,width,height){

        this.messageTxt.width = width;
        this.messageTxt.x = -90;
        this.messageTxt.y = 15;
        if(width) this.messageTxt.width=width;
        this.messageTxt.text=str;
        if(this.messageTxt.height > this.bg.height){
            this.bg.scale9Grid = new egret.Rectangle(34,11,210,66);
        }else{
            this.bg.scale9Grid = new egret.Rectangle(24,19,245,102);
        }
        this.bg.width = this.messageTxt.width+30;//+10;
        this.bg.height = this.messageTxt.height+height+20;
        this.bg.x = -110;
    }
}