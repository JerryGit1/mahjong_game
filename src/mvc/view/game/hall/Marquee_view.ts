/**
 * Created by 周鹏斌大王 on 2018-04-16.
 * 大厅跑马灯，丹阳(使用图片)特有的
 */
class Marquee_view extends Base_view{
    protected notice_txt:egret.Bitmap;
    private bg_W;
    private bg_H;
    public constructor(){
        super();
        this.init_bg();
        this.init_content();
    }
    //初始化背景
    private init_bg(){
        var bg = new egret.Bitmap(RES.getRes("h_horn_bg"));
        bg.y=15;
        this.bg_W = bg.width;
        this.bg_H = bg.height;
        this.addChild(bg);
    }

    //初始化公告内容
    private init_content(){
        //遮罩
        var mask = new egret.Shape();
        mask.graphics.beginFill(0x000000);
        mask.graphics.drawRect(0,0,this.bg_W-190,this.bg_H+10);
        mask.graphics.endFill();
        mask.x = 160;
        this.addChild(mask);
        //内容

        //房主表示
        this.notice_txt=new egret.Bitmap(RES.getRes("h_marquee_img"));
        this.notice_txt.y=22;
        this.addChild(this.notice_txt);

        // 内容添加遮罩层
        this.notice_txt.mask = mask;
    }
    // 设置公告开始移动动画
    public set_text_pos(str:string){
        // if(str){
            // var cutStr = str.replace(/^[\'\"]+|[\'\"]+$/g,"");//tyq: 作用-去掉公告中的双引号
            // if(cutStr && cutStr.length>0){
            //     this.notice_txt.text = cutStr;
                this.notice_txt.x = this.bg_W;
                egret.Tween.removeTweens(this.notice_txt);
                egret.Tween.get(this.notice_txt,{loop:true}).to({x:-this.notice_txt.$getWidth()},15000 + (30*100));
            // }
        // }
    }
    //设置多少次数后停止公告移动
    public set_text_by_times(str:string,num:number){
        //文字公告
        // var cutStr = str.replace(/^[\'\"]+|[\'\"]+$/g,"");//tyq: 作用-去掉公告中的双引号
        // this.notice_txt.text = cutStr;

        this.notice_txt.x = this.bg_W;
        var times = 0;
        egret.Tween.removeTweens(this.notice_txt);
        egret.Tween.get(this.notice_txt,{loop:true}).to({x:-this.notice_txt.$getWidth()},15000 + (30*100)).call(function () {
            times ++;
            if(times >=num){
                egret.Tween.removeTweens(this.notice_txt);
                this.visible = false;
            }
        },this);
    }
}