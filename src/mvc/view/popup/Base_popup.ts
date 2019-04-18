/**
 * Created by 周鹏斌大王 on 2018-04-16.
 */
class Base_popup extends Base_view{

    /*遮罩*/
    protected mask_shape:egret.Shape;
    /*关闭按钮*/
    protected close_btn:MyButton;
    /*中心区域*/
    protected center_sp:egret.Sprite;
    public popup_name="";//弹窗名字 删除销毁用到
    /**
     * @param _is_add_mask 是否显示遮罩
     * @param _click_bg_is_close 点击背景遮罩是否关闭弹窗
     */
    public constructor(_is_add_mask=true,_click_bg_is_close=false){
        super();
        //背景遮罩
        if(_is_add_mask)this.add_back_mask(_click_bg_is_close);
        //中心区域
        this.center_sp=new egret.Sprite();
        this.center_sp.touchEnabled = true;
        this.addChild(this.center_sp);
    }
    /*----------------------继承类调用-------------------------*/
    /**背景图片
     * @param bg_hyh
     * @param w width
     * @param h height
     * @param rectangle 九宫格
     */
    protected add_center_bg(bg_hyh="",w=500,h=500,rectangle=new egret.Rectangle(10,10,20,20)){
        //添加弹框背景
        var bg = new egret.Bitmap(RES.getRes(bg_hyh));
        //九宫格背景
        if(rectangle)bg.scale9Grid =rectangle;
        if(bg_hyh=="c_popup_bg"){
            bg.scale9Grid=new egret.Rectangle(95,54,572,329);
        }else if(bg_hyh=="p_join_room_bg_png"){
            bg.scale9Grid=new egret.Rectangle(91,67,551,404);
        }
        //大小
        bg.width=w;
        bg.height=h;
        //设置中心点
        this.set_center_point(w,h);
        this.center_sp.addChild(bg);
    }
    /**zwb:背景:白色底图
     * @param w 白色底图-宽
     * @param h 白色底图-高
     * @param bg_w 透明底图-宽
     * @param bg_h 透明底图-高
     */
    protected add_center_white_bg(w,h,bg_w,bg_h){
        var no_info_white_bg:egret.Shape=new egret.Shape();
        no_info_white_bg.graphics.beginFill(0xFDFDF9,1);
        no_info_white_bg.graphics.drawRoundRect(0,0,w,h,30,30);
        no_info_white_bg.graphics.endFill();
        this.center_sp.addChildAt(no_info_white_bg,1);
        no_info_white_bg.x=bg_w/2-no_info_white_bg.width/2;
        no_info_white_bg.y=bg_h/2-no_info_white_bg.height/2+10;
    }
    protected  remove_white_bg(){     //清空白色底图
        this.center_sp.removeChildAt(1);
    }
    /**
     * 关闭按钮
     * @param str
     * @param point
     */
    protected add_close_btn(str="",point=null){
        if(!point)point=new egret.Point(this.center_sp.width,0);
        this.close_btn=new MyButton(str);
        this.center_sp.addChild(this.close_btn);
        this.close_btn.addTouchEvent();
        this.close_btn.addEventListener("click",this.close_click,this);
        this.close_btn.x=point.x;
        this.close_btn.y=point.y;
        this.center_sp.addChild(this.close_btn);
    }
    /**
     * 图片----标题
     * @param str 图片
     * @param point 坐标
     */
    protected add_img_title(str="",point=null){
        if(!point)point=new egret.Point(this.center_sp.width/2,0);
        var title=this.set_bit_center(str);
        title.touchEnabled=true;
        title.x=point.x;
        title.y=point.y;
        this.center_sp.addChild(title);
        return title;
    }
    /**
     * 文本----标题
     * @param txt 图片
     * @param point 坐标
     */
    protected add_txt_title(txt="",point=null){
        if(!point)point=new egret.Point(this.center_sp.width/2,0);
        var title=new egret.TextField();
        title.textFlow = (new egret.HtmlTextParser()).parse(txt);
        title.size = 25;
        title.textColor=0x4C4437;
        title.fontFamily = "微软雅黑";
        title.anchorOffsetX = title.width/2;
        title.anchorOffsetY = title.height/2;
        title.x=point.x;
        title.y=point.y;
        this.center_sp.addChild(title);
    }
    /**弹窗--动画
     * */
    protected open_ani(){
        this.center_sp.scaleX=this.center_sp.scaleY=.8;
        this.center_sp.alpha=0;
        egret.Tween.get(this.center_sp).to({scaleX:1.1,scaleY:1.1,alpha:1},200).to({scaleX:.95,scaleY:.95},100).to({scaleX:1,scaleY:1},100);
    }
    /*----------------------基础视图-------------------------*/
    /*设置中心区域中心*/
    private set_center_point(w,h){
        this.center_sp.anchorOffsetX=w/2;
        this.center_sp.anchorOffsetY=h/2;
        this.center_sp.x=Main.stageWidth/2;
        this.center_sp.y=Main.stageHeight/2;
    }
    /*显示遮罩*/
    private add_back_mask(isEmptyClose){
        //遮罩
        this.mask_shape = new egret.Shape();
        this.mask_shape.graphics.beginFill(0x000000,.9);
        this.mask_shape.graphics.drawRect(0,0,Main.stageWidth,Main.stageHeight);
        this.mask_shape.graphics.endFill();
        this.mask_shape.touchEnabled=true;
        this.addChild(this.mask_shape);
        if(isEmptyClose){
            this.mask_shape.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close_click,this);
        }
    }

    //设置背景的透明度;
    public set_click_bg_apha(){
        if(this.mask_shape){
            this.mask_shape.alpha=0;
        }
    }
    /*---------------事件--------------------*/
    /*关闭按钮事件*/
    protected close_click(){
        this.dispatchEvent(new egret.Event("close"));
    }
    public clear(){
        if(this.close_btn){
            this.close_btn.clear();
            this.close_btn.removeEventListener("click",this.close_click,this);
        }
        super.clear();
    }

}