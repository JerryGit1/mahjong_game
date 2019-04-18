/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */

//用户头像
class User_head_view extends Base_view{

    protected head_bg:egret.Bitmap;//背景
    protected head_border_img:egret.Bitmap;//头像边框
    protected head_img:egret.Bitmap;//头像图片
    public constructor(){
        super();

    }
    /***
     * 方形头像
     *w,h
     * _is_border 是否需要边框
     * */
    public create_rect_head(w,h,bg_str="",_is_border=false){
        //玩家头像遮罩
        var mask=new egret.Shape();
        mask.graphics.beginFill(0x00ff00,4);
        var mw=Math.floor(w*.9),mh=Math.floor(h*.9);
        mask.graphics.drawRoundRect(-mw/2,-mh/2,mw,mh,18,18);
        mask.graphics.endFill();

        this.add_head(w,h,bg_str,_is_border,mask);
    }
    //圆形头像
    public create_circe_head(w,h,bg_str="",_is_border=false){
        //玩家头像遮罩
        var mask=new egret.Shape();
        mask.graphics.beginFill(0x00ff00,4);
        mask.graphics.drawCircle(0,0,w/2);
        mask.graphics.endFill();

        this.add_head(w,h,bg_str,_is_border,mask);
    }

    /*更新头像信息  headImgUrl为空隐藏头像*/
    public update_head_url(headImgUrl=null){
        this.head_img.visible=false;
        if(headImgUrl){
            this.head_img.visible=true;
            Load_control.loadExternalBit(this.head_img,headImgUrl);
        }else{

        }
    }
    /**
     * 渲染显示头像
     *w,h
     * _is_border 是否需要边框
     **/
    protected add_head(w,h,bg_str="",_is_border=false,mask){
        //头像背景
        if(bg_str)this.add_bg(bg_str,w,h);
        //边框
        if(_is_border)this.add_border(w,h);
        //头像
        this.head_img=new egret.Bitmap();
        this.addChild(this.head_img);
        this.head_img.width=w;
        this.head_img.height=h;
        this.head_img.anchorOffsetX=this.head_img.width/2;
        this.head_img.anchorOffsetY=this.head_img.height/2;
        //遮罩
        this.addChild(mask);
        this.head_img.mask=mask;
    }
    //背景
    public add_bg(str,w,h){
        this.head_bg = this.set_bit_center(str);
        this.head_bg.width = w;
        this.head_bg.height = h;
        this.head_bg.anchorOffsetX=this.head_bg.width/2;
        this.head_bg.anchorOffsetY=this.head_bg.height/2;
        this.addChild(this.head_bg);
    }
    //边框
    protected add_border(w,h){
        this.head_border_img = this.set_bit_center("headImgBar");
        this.head_border_img.width = w;
        this.head_border_img.height = h;
        this.head_border_img.anchorOffsetX=this.head_border_img.width/2;
        this.head_border_img.anchorOffsetY=this.head_border_img.height/2;
        this.addChild(this.head_border_img);
    }
}